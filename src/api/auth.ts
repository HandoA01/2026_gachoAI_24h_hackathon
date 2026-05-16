import { apiClient } from './client';
import type {
  LoginRequest,
  LoginResponse,
  CreateOtpRequest,
  CreateOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  SignUpRequest,
  SignUpResponse,
} from '../types/auth';

// POST /api/login - 가천대 계정 로그인
export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>('/api/login', payload);
  return data;
}

// POST /api/signUp/createOtp - 인증 이메일(OTP) 발송
export async function createOtp(payload: CreateOtpRequest): Promise<CreateOtpResponse> {
  const { data } = await apiClient.post<CreateOtpResponse>('/api/signUp/createOtp', payload);
  return data;
}

// POST /api/signUp/otp - OTP 검증
export async function verifyOtp(payload: VerifyOtpRequest): Promise<VerifyOtpResponse> {
  const { data } = await apiClient.post<VerifyOtpResponse>('/api/signUp/otp', payload);
  return data;
}

// POST /api/signUp/user - 회원 정보 등록
export async function signUp(payload: SignUpRequest): Promise<SignUpResponse> {
  const { data } = await apiClient.post<SignUpResponse>('/api/signUp/user', payload);
  return data;
}
