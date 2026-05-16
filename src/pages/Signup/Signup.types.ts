// Signup 페이지 Props 타입
export interface SignupProps {}

// 내부 단계 분기
export type SignupStep = 'verify' | 'info';
// verify: ID 입력 + (성공 후) OTP 입력까지 같은 화면
// info:  Name / ID(readOnly) / Password / Password확인 입력 화면
