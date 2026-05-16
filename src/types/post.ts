export interface ExpertTitle {
  id: number;
  tag: string;
  level: 'Bronze' | 'Silver' | 'Gold';
  earnedAt: string;
}

export interface User {
  id: number;
  userId: string;
  name: string;
  email: string;
  profileImage?: string;
  coin: number;
  tags: string[];
  expertTitles: ExpertTitle[];
  createdAt: string;
}

export type PostStatus = 'RECRUITING' | 'COMPLETED' | 'REJECTED' | 'CANCELED';

export type TagColor =
  | 'physics'
  | 'chemistry'
  | 'maths'
  | 'programming'
  | 'language';

export interface Role {
  id: number;
  name: string;
  maxCount: number;
  currentCount: number;
  coinReward: number;
}

export interface Participant {
  id: number;
  user: User;
  role: Role;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  joinedAt: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: User;
  tags: string[];
  roles: Role[];
  totalCoinReward: number;
  status: PostStatus;
  deadline: string;
  createdAt: string;
  updatedAt: string;
  participants: Participant[];
  commentCount: number;
}

export interface Tag {
  id: number;
  name: string;
  color: TagColor;
}

export interface PostListResponse {
  posts: Post[];
  totalCount: number;
  hasNext: boolean;
}
