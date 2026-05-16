// 인증 관련 타입 (실제 백엔드: https://hackathon.gdgoc.net 기준)

export interface LoginRequest {
  gachon_id: string;
  password: string;
}

// 성공: { res_status: true, uidx: number } / 실패: { res_status: false }
export interface LoginResponse {
  res_status: boolean;
  uidx?: number;
}

// ── 회원가입 ──────────────────────────────────────────

// ① OTP 발송 요청
export interface CreateOtpRequest {
  gachon_id: string;
}
export interface CreateOtpResponse {
  res_status: boolean;
  tidx?: number; // 트랜잭션 ID — 이후 OTP 인증에 사용
}

// ② OTP 인증
export interface VerifyOtpRequest {
  tidx: number;
  otp: number;
}
export interface VerifyOtpResponse {
  res_status: boolean;
}

// ③ 회원가입 완료
export interface SignUpRequest {
  gachon_id: string;
  name: string;
  password: string;
}
export interface SignUpResponse {
  res_status: boolean;
}

export interface AuthState {
  uidx: number | null;
  isAuthenticated: boolean;
  setAuth: (uidx: number) => void;
  clearAuth: () => void;
}
