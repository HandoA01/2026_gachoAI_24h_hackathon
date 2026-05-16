import { apiClient } from './client';
import type { PostListResponse, Post, PostStatus } from '../types/post';

// 백엔드 donation 응답 → 프론트 Post 어댑터
// 명세 기준:
//   status 0 = 모집 마감, 1 = 모집 중
//   exercise/study/music/game/clean: 0 = 관련 있음, 1 = 관련 없음
function toPost(d: any): Post {
  const tags: string[] = [];
  if (d.exercise === 0) tags.push('운동');
  if (d.study === 0) tags.push('공부');
  if (d.music === 0) tags.push('음악');
  if (d.game === 0) tags.push('게임');
  if (d.clean === 0) tags.push('청소');

  const status: PostStatus = d.status === 1 ? 'RECRUITING' : 'COMPLETED';

  return {
    id: d.didx,
    title: d.title ?? '',
    content: d.text ?? '',
    author: {
      id: d.writeridx ?? 0,
      userId: '',
      name: '',
      email: '',
      coin: 0,
      tags: [],
      expertTitles: [],
      createdAt: '',
    },
    tags,
    roles: [],
    totalCoinReward: 0,
    status,
    deadline: d.duedate ?? '',
    createdAt: '',
    updatedAt: '',
    participants: [],
    commentCount: 0,
  };
}

export const postApi = {
  getPosts: async (params?: {
    page?: number;
    size?: number;
    tag?: string;
    status?: string;
  }): Promise<PostListResponse> => {
    // 백엔드는 body 없는 요청에 411 응답 → 빈 객체 보장
    const response = await apiClient.post('/api/donation/list', params ?? {});
    console.log('getPosts response:', response.data);

    const rawList: any[] =
      response.data?.donations ??
      response.data?.posts ??
      response.data?.list ??
      (Array.isArray(response.data) ? response.data : []);

    const posts: Post[] = rawList.map(toPost);

    return {
      posts,
      totalCount: posts.length,
      hasNext: false,
    };
  },
  getPostById: async (postId: number): Promise<Post> => {
    const response = await apiClient.get(`/api/donation/${postId}`);
    console.log('getPostById response:', response.data);
    return response.data;
  },
  createPost: async (data: any): Promise<Post> => {
    const response = await apiClient.post('/api/donation/write', data);
    console.log('createPost response:', response.data);
    return response.data;
  },
  joinPost: async (postId: number, roleId: number): Promise<void> => {
    await apiClient.post(`/api/donation/${postId}/join`, { roleId });
  },
  updateParticipantStatus: async (postId: number, participantId: number, status: 'APPROVED' | 'REJECTED'): Promise<void> => {
    await apiClient.patch(`/api/donation/${postId}/participants/${participantId}`, { status });
  },
};
