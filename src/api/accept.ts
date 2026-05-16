import { apiClient } from './client';

// 역할별 신청 상태
// 0 = 신청 가능, 1 = 신청 완료, 2 = 포인트 지급 승인, 3 = 포인트 지급 반려
export type AcceptStatus = 0 | 1 | 2 | 3;

export interface AcceptRole {
  aidx: number;
  uidx: number | null; // null = 미신청
  status: AcceptStatus;
  role: string;
  point: number;
}

export interface AcceptDetailResponse {
  res_status: boolean;
  accept?: AcceptRole[];
}

// 명세: POST /api/accept/detail { didx }
export async function getAcceptDetail(didx: number): Promise<AcceptRole[]> {
  const { data } = await apiClient.post<AcceptDetailResponse>(
    '/api/accept/detail',
    { didx },
  );
  console.log('getAcceptDetail response:', data);
  if (!data?.res_status) return [];
  return data.accept ?? [];
}
