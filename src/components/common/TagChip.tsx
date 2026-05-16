import React from 'react';

interface TagChipProps {
  name: string;
}

const TagChip: React.FC<TagChipProps> = ({ name }) => {
  const getTagStyle = (tagName: string) => {
    switch (tagName) {
      case '공부':
      case 'Physics':
        return 'bg-tag-physics-bg text-tag-physics';
      case '화학':
      case 'Chemistry':
        return 'bg-tag-chemistry-bg text-tag-chemistry';
      case '수학':
      case 'Maths':
        return 'bg-tag-maths-bg text-tag-maths';
      case '프로그래밍':
      case 'Programming':
        return 'bg-tag-programming-bg text-tag-programming';
      case '언어':
      case 'Language':
        return 'bg-tag-language-bg text-tag-language';
      default:
        return 'bg-neutral-94 text-neutral-42';
    }
  };

  return (
    <div className={`flex h-[28px] items-center rounded-full px-3 text-[13px] font-medium ${getTagStyle(name)}`}>
      <span className="mr-1 text-neutral-65">#</span>
      {name}
    </div>
  );
};

export default TagChip;
