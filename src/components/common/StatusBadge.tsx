import React from 'react';
import type { PostStatus } from '../../types/post';

interface StatusBadgeProps {
  status: PostStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusInfo = (status: PostStatus) => {
    switch (status) {
      case 'RECRUITING':
        return { label: '모집중', className: 'bg-green-48 text-white' };
      case 'COMPLETED':
        return { label: '모집 마감', className: 'bg-neutral-42 text-white' };
      case 'REJECTED':
        return { label: '반려', className: 'bg-error text-white' };
      case 'CANCELED':
        return { label: '취소', className: 'bg-neutral-65 text-white' };
      default:
        return { label: status, className: 'bg-neutral-79 text-white' };
    }
  };

  const { label, className } = getStatusInfo(status);

  return (
    <span
      className={`flex h-6 items-center justify-center rounded-full px-2.5 text-[12px] font-semibold ${className}`}
    >
      {label}
    </span>
  );
};

export default StatusBadge;
