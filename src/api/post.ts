import { apiClient } from './client';
import { PostListResponse, Post } from '../types/post';

export const postApi = {
  getPosts: async (params?: {
    page?: number;
    size?: number;
    tag?: string;
    status?: string;
  }): Promise<PostListResponse> => {
    try {
      // 실제 API 호출 (백엔드 준비 시 주석 해제)
      // const response = await apiClient.get('/api/posts', { params });
      // return response.data;

      // Mock Data for "전체 글.png"
      const mockPosts: Post[] = [
        {
          id: 1,
          title: '1',
          content: '첫 번째 게시글입니다.',
          author: { id: 1, userId: 'user1', name: '홍길동', email: 'test@gachon.ac.kr', coin: 100, tags: [], expertTitles: [], createdAt: '' },
          tags: ['공부'],
          roles: [],
          totalCoinReward: 0,
          status: 'RECRUITING',
          deadline: '2026-12-31',
          createdAt: '2026-05-16',
          updatedAt: '2026-05-16',
          participants: [],
          commentCount: 0,
        },
        {
          id: 2,
          title: '2',
          content: '두 번째 게시글입니다.',
          author: { id: 2, userId: 'user2', name: '김철수', email: 'test2@gachon.ac.kr', coin: 100, tags: [], expertTitles: [], createdAt: '' },
          tags: ['음악'],
          roles: [],
          totalCoinReward: 0,
          status: 'RECRUITING',
          deadline: '2026-12-31',
          createdAt: '2026-05-16',
          updatedAt: '2026-05-16',
          participants: [],
          commentCount: 0,
        },
        {
          id: 3,
          title: '333',
          content: '세 번째 게시글입니다.',
          author: { id: 1, userId: 'user1', name: '홍길동', email: 'test@gachon.ac.kr', coin: 100, tags: [], expertTitles: [], createdAt: '' },
          tags: ['공부'],
          roles: [],
          totalCoinReward: 0,
          status: 'RECRUITING',
          deadline: '2026-12-31',
          createdAt: '2026-05-16',
          updatedAt: '2026-05-16',
          participants: [],
          commentCount: 0,
        },
        {
          id: 4,
          title: '44444',
          content: '네 번째 게시글입니다.',
          author: { id: 3, userId: 'user3', name: '이영희', email: 'test3@gachon.ac.kr', coin: 100, tags: [], expertTitles: [], createdAt: '' },
          tags: ['공부'],
          roles: [],
          totalCoinReward: 0,
          status: 'RECRUITING',
          deadline: '2026-12-31',
          createdAt: '2026-05-16',
          updatedAt: '2026-05-16',
          participants: [],
          commentCount: 0,
        },
        {
          id: 5,
          title: '555555',
          content: '마감된 게시글입니다.',
          author: { id: 1, userId: 'user1', name: '홍길동', email: 'test@gachon.ac.kr', coin: 100, tags: [], expertTitles: [], createdAt: '' },
          tags: ['공부'],
          roles: [],
          totalCoinReward: 0,
          status: 'COMPLETED',
          deadline: '2026-05-10', // 이미 지난 날짜
          createdAt: '2026-05-01',
          updatedAt: '2026-05-10',
          participants: [],
          commentCount: 0,
        },
      ];

      return {
        posts: mockPosts,
        totalCount: mockPosts.length,
        hasNext: false,
      };
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      throw error;
    }
  },
};
