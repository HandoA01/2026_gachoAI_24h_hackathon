import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import { useAuthStore } from '../../store/authStore';
import { postApi, type PostDetail } from '../../api/post';
import { getAcceptDetail, type AcceptRole } from '../../api/accept';
import {
  getCommentDetail,
  writeComment,
  writeReply,
  type CommentItem,
} from '../../api/comment';
import { getProfileInfo } from '../../api/profile';

function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const { uidx } = useAuthStore();

  const [post, setPost] = useState<PostDetail | null>(null);
  const [accepts, setAccepts] = useState<AcceptRole[]>([]);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 댓글 작성
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // 대댓글 작성 (열려있는 부모 cidx)
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  // uidx → name 캐시 (작성자/댓글/대댓글 이름 표시용)
  const [userNames, setUserNames] = useState<Map<number, string>>(new Map());

  useEffect(() => {
    if (!postId) return;
    const didx = Number(postId);
    if (!Number.isFinite(didx)) return;

    const fetchAll = async () => {
      setIsLoading(true);
      try {
        const [postRes, acceptRes, commentRes] = await Promise.all([
          postApi.getPostDetail(didx),
          getAcceptDetail(didx),
          getCommentDetail(didx),
        ]);
        setPost(postRes);
        setAccepts(acceptRes);
        setComments(commentRes);
      } catch (err) {
        console.error('Failed to fetch post detail:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, [postId]);

  // post/comments 로드되면 등장하는 모든 uidx의 닉네임 병렬 조회
  useEffect(() => {
    const uidxSet = new Set<number>();
    if (post?.writerIdx) uidxSet.add(post.writerIdx);
    comments.forEach((c) => {
      if (c.writeidx) uidxSet.add(c.writeidx);
      c.reply.forEach((r) => {
        if (r.writeidx) uidxSet.add(r.writeidx);
      });
    });

    // 이미 캐시된 건 제외
    const toFetch = [...uidxSet].filter((u) => !userNames.has(u));
    if (toFetch.length === 0) return;

    let cancelled = false;
    Promise.all(
      toFetch.map((uidx) =>
        getProfileInfo({ uidx })
          .then((res) => ({ uidx, name: res.name }))
          .catch(() => ({ uidx, name: undefined as string | undefined })),
      ),
    ).then((results) => {
      if (cancelled) return;
      setUserNames((prev) => {
        const next = new Map(prev);
        results.forEach(({ uidx, name }) => {
          next.set(uidx, name ?? `사용자 #${uidx}`);
        });
        return next;
      });
    });

    return () => {
      cancelled = true;
    };
  }, [post?.writerIdx, comments, userNames]);

  function getName(uidx: number | null | undefined): string {
    if (uidx == null) return '익명';
    return userNames.get(uidx) ?? `사용자 #${uidx}`;
  }

  // 로딩 / 에러 처리
  if (isLoading) {
    return (
      <div className="flex min-h-full flex-col bg-bg">
        <Header title="게시글 상세" />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-text-secondary">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-full flex-col bg-bg">
        <Header title="게시글 상세" />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-text-secondary">게시글을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const isRecruiting = post.status === 1;
  const didx = post.didx;

  // 댓글만 다시 불러오기 (작성 후 새로고침용)
  async function refreshComments() {
    const data = await getCommentDetail(didx);
    setComments(data);
  }

  async function handleSubmitComment() {
    if (!uidx) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (!commentText.trim() || isSubmittingComment) return;
    setIsSubmittingComment(true);
    try {
      const res = await writeComment({
        uidx,
        didx,
        text: commentText.trim(),
      });
      if (res.res_status) {
        setCommentText('');
        await refreshComments();
      } else {
        alert('댓글 작성에 실패했습니다.');
      }
    } catch (err) {
      console.error('Failed to write comment:', err);
      alert('댓글 작성 중 오류가 발생했습니다.');
    } finally {
      setIsSubmittingComment(false);
    }
  }

  async function handleSubmitReply(parentCidx: number) {
    if (!uidx) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (!replyText.trim() || isSubmittingReply) return;
    setIsSubmittingReply(true);
    try {
      const res = await writeReply({
        uidx,
        cidx: parentCidx,
        text: replyText.trim(),
      });
      if (res.res_status) {
        setReplyText('');
        setReplyingTo(null);
        await refreshComments();
      } else {
        alert('답글 작성에 실패했습니다.');
      }
    } catch (err) {
      console.error('Failed to write reply:', err);
      alert('답글 작성 중 오류가 발생했습니다.');
    } finally {
      setIsSubmittingReply(false);
    }
  }

  // 모집 역할 버튼 상태 분기
  function renderRoleButton(role: AcceptRole) {
    // 게시글 자체가 모집 마감
    if (!isRecruiting) {
      return (
        <div className="flex h-9 items-center rounded-lg bg-neutral-65 px-4 text-[13px] font-semibold text-text-inverse">
          모집 마감
        </div>
      );
    }
    // 비어있음 → 지원 가능
    if (role.uidx === null) {
      return (
        <button
          type="button"
          onClick={() => alert('지원 API 명세를 받으면 연결됩니다.')}
          className="h-9 rounded-lg bg-success px-4 text-[13px] font-semibold text-text-inverse active:scale-95"
        >
          지원하기
        </button>
      );
    }
    // 내가 지원한 자리
    if (role.uidx === uidx) {
      return (
        <div className="flex h-9 items-center rounded-lg bg-error px-4 text-[13px] font-semibold text-text-inverse">
          지원완료
        </div>
      );
    }
    // 다른 사람이 이미 차지
    return (
      <div className="flex h-9 items-center rounded-lg bg-neutral-65 px-4 text-[13px] font-semibold text-text-inverse">
        모집 마감
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col bg-bg">
      <Header title="게시글 상세" />

      <main className="flex flex-1 flex-col gap-6 px-5 py-5 pb-10">
        {/* 제목 + 상태 배지 */}
        <section className="flex items-start justify-between gap-2">
          <h1 className="text-[24px] font-bold leading-tight text-text-primary">
            {post.title}
          </h1>
          <span
            className={`mt-1 flex h-7 shrink-0 items-center rounded-full px-3 text-[12px] font-semibold text-text-inverse ${
              isRecruiting ? 'bg-success' : 'bg-neutral-65'
            }`}
          >
            {isRecruiting ? '모집중' : '모집 마감'}
          </span>
        </section>

        {/* 태그 + 작성자/마감 박스 */}
        <section className="flex flex-col gap-3 rounded-2xl bg-bg-subtle p-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.length === 0 ? (
              <span className="text-[13px] text-text-tertiary">태그 없음</span>
            ) : (
              post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[13px] font-medium text-text-secondary"
                >
                  # {tag}
                </span>
              ))
            )}
          </div>
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-text-secondary">
              작성자 : {getName(post.writerIdx)}
            </span>
            <span className="text-text-secondary">
              마감 기한 : {post.duedate}
            </span>
          </div>
        </section>

        {/* 내용설명 */}
        <section className="flex flex-col gap-3">
          <h2 className="text-[16px] font-semibold text-text-primary">내용설명</h2>
          <div className="min-h-[120px] whitespace-pre-wrap rounded-2xl bg-bg-subtle p-4 text-[14px] leading-relaxed text-text-primary">
            {post.text}
          </div>
        </section>

        {/* 모집 역할 */}
        <section className="flex flex-col gap-3">
          <h2 className="text-[16px] font-semibold text-text-primary">모집 역할</h2>
          <div className="flex flex-col gap-3">
            {accepts.length === 0 ? (
              <p className="rounded-2xl bg-bg-subtle p-4 text-center text-[13px] text-text-tertiary">
                모집 역할이 없습니다.
              </p>
            ) : (
              accepts.map((role) => (
                <div
                  key={role.aidx}
                  className="flex items-center justify-between rounded-2xl bg-bg-subtle p-4"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[15px] font-semibold text-text-primary">
                      {role.role}
                    </span>
                    <span className="text-[13px] font-medium text-text-secondary">
                      🪙 {role.point} 코인
                    </span>
                  </div>
                  {renderRoleButton(role)}
                </div>
              ))
            )}
          </div>
        </section>

        {/* 댓글 */}
        <section className="flex flex-col gap-3">
          <h2 className="text-[16px] font-semibold text-text-primary">댓글</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="내용을 입력하세요."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  void handleSubmitComment();
                }
              }}
              className="h-11 flex-1 rounded-xl bg-bg-subtle px-4 text-[14px] text-text-primary outline-none placeholder:text-text-tertiary"
            />
            <button
              type="button"
              onClick={() => void handleSubmitComment()}
              disabled={!commentText.trim() || isSubmittingComment}
              className="h-11 rounded-xl bg-neutral-10 px-5 text-[14px] font-semibold text-text-inverse active:scale-95 disabled:bg-border disabled:text-text-tertiary disabled:cursor-not-allowed"
            >
              {isSubmittingComment ? '등록 중...' : '등록'}
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {comments.length === 0 ? (
              <p className="py-4 text-center text-[13px] text-text-tertiary">
                아직 댓글이 없습니다.
              </p>
            ) : (
              comments.map((c) => (
                <div
                  key={c.cidx}
                  className="flex flex-col gap-2 rounded-2xl bg-bg-subtle p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[12px] font-bold text-text-inverse">
                      U
                    </div>
                    <span className="text-[13px] font-semibold text-text-primary">
                      {getName(c.writeidx)}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap pl-11 text-[13px] text-text-secondary">
                    {c.text}
                  </p>

                  {/* 답글 토글 버튼 */}
                  <button
                    type="button"
                    onClick={() => {
                      setReplyingTo(replyingTo === c.cidx ? null : c.cidx);
                      setReplyText('');
                    }}
                    className="ml-11 self-start text-[12px] font-semibold text-text-secondary hover:text-primary"
                  >
                    {replyingTo === c.cidx ? '취소' : '답글'}
                  </button>

                  {/* 대댓글 입력창 */}
                  {replyingTo === c.cidx && (
                    <div className="ml-11 mt-1 flex gap-2">
                      <input
                        type="text"
                        placeholder="답글을 입력하세요."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            void handleSubmitReply(c.cidx);
                          }
                        }}
                        autoFocus
                        className="h-10 flex-1 rounded-lg bg-bg px-3 text-[13px] text-text-primary outline-none placeholder:text-text-tertiary"
                      />
                      <button
                        type="button"
                        onClick={() => void handleSubmitReply(c.cidx)}
                        disabled={!replyText.trim() || isSubmittingReply}
                        className="h-10 rounded-lg bg-neutral-10 px-3 text-[13px] font-semibold text-text-inverse active:scale-95 disabled:bg-border disabled:text-text-tertiary disabled:cursor-not-allowed"
                      >
                        {isSubmittingReply ? '...' : '등록'}
                      </button>
                    </div>
                  )}

                  {/* 대댓글 목록 */}
                  {c.reply.length > 0 && (
                    <div className="ml-11 mt-2 flex flex-col gap-2 border-l-2 border-border pl-3">
                      {c.reply.map((r, i) => (
                        <div key={i} className="flex flex-col gap-1">
                          <span className="text-[12px] font-semibold text-text-secondary">
                            {getName(r.writeidx)}
                          </span>
                          <p className="whitespace-pre-wrap text-[12px] text-text-secondary">
                            {r.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default PostDetailPage;
