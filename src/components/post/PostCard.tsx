import React from 'react';
import type { Post } from '../../types/post';
import StatusBadge from '../common/StatusBadge';
import TagChip from '../common/TagChip';

interface PostCardProps {
  post: Post;
  onClick?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  const isDeadlinePassed = new Date(post.deadline) < new Date();

  return (
    <div
      onClick={onClick}
      className="flex w-full flex-col gap-3 rounded-2xl border border-border-light bg-bg p-5 shadow-card transition-active active:scale-[0.98] active:opacity-80"
    >
      <div className="flex items-start justify-between">
        <h3 className="text-[18px] font-semibold text-text-primary">{post.title}</h3>
        <StatusBadge status={post.status} />
      </div>

      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <TagChip key={tag} name={tag} />
        ))}
      </div>

      <p
        className={`text-[13px] ${
          isDeadlinePassed ? 'text-error' : 'text-text-secondary'
        }`}
      >
        마감 기한 : {post.deadline}
      </p>
    </div>
  );
};

export default PostCard;
