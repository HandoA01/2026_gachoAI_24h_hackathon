import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createOtp, verifyOtp, signUp, login } from '../../api/auth';
import { useAuthStore } from '../../store/authStore';
import type { SignupProps, SignupStep } from './Signup.types';

function Signup(_props: SignupProps) {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  // 전체 흐름 분기
  const [step, setStep] = useState<SignupStep>('verify');

  // Step 1 (verify) 상태
  const [gachonId, setGachonId] = useState('');
  const [tidx, setTidx] = useState<number | null>(null); // OTP 발송 후 받은 tidx
  const [otpSent, setOtpSent] = useState(false); // OTP input 노출 여부
  const [otp, setOtp] = useState('');

  // Step 2 (info) 상태
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // 공통
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Step 1-a: OTP 발송 ──
  async function handleSendOtp() {
    if (!gachonId.trim() || isSubmitting) return;
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      const data = await createOtp({ gachon_id: gachonId.trim() });
      if (data.res_status && typeof data.tidx === 'number') {
        setTidx(data.tidx);
        setOtpSent(true);
      } else {
        setErrorMessage('인증번호 발송에 실패했습니다. 가천대 아이디를 확인해주세요.');
      }
    } catch (err) {
      setErrorMessage(toErrorMessage(err, '인증번호 발송에 실패했습니다.'));
    } finally {
      setIsSubmitting(false);
    }
  }

  // ── Step 1-b: OTP 검증 ──
  async function handleVerifyOtp() {
    if (!otp.trim() || tidx === null || isSubmitting) return;
    const otpNum = Number(otp);
    if (!Number.isInteger(otpNum)) {
      setErrorMessage('인증번호는 숫자만 입력 가능합니다.');
      return;
    }
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      const data = await verifyOtp({ tidx, otp: otpNum });
      if (data.res_status) {
        setStep('info'); // Step 2로 이동
      } else {
        setErrorMessage('인증번호가 올바르지 않습니다.');
      }
    } catch (err) {
      setErrorMessage(toErrorMessage(err, '인증번호 확인 중 오류가 발생했습니다.'));
    } finally {
      setIsSubmitting(false);
    }
  }

  // ── Step 2: 가입 완료 → 자동 로그인 ──
  async function handleSignUp() {
    if (isSubmitting) return;
    if (!name.trim() || !password || !passwordConfirm) return;
    if (password !== passwordConfirm) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      const data = await signUp({
        gachon_id: gachonId.trim(),
        name: name.trim(),
        password,
      });
      if (!data.res_status) {
        setErrorMessage('회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.');
        return;
      }
      // 가입 응답에 uidx가 없어 자동 로그인을 한 번 더 호출
      const loginRes = await login({ gachon_id: gachonId.trim(), password });
      if (loginRes.res_status && typeof loginRes.uidx === 'number') {
        setAuth(loginRes.uidx);
        navigate('/');
      } else {
        // 가입은 됐지만 자동 로그인 실패 → 로그인 화면으로 유도
        navigate('/login');
      }
    } catch (err) {
      setErrorMessage(toErrorMessage(err, '회원가입 중 오류가 발생했습니다.'));
    } finally {
      setIsSubmitting(false);
    }
  }

  // ── Step 1 (verify) UI ──
  function renderVerifyStep() {
    const buttonDisabled = otpSent
      ? !otp.trim() || isSubmitting
      : !gachonId.trim() || isSubmitting;

    const buttonText = isSubmitting
      ? otpSent
        ? '확인 중...'
        : '전송 중...'
      : 'Sign in';

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!otpSent) void handleSendOtp();
          else void handleVerifyOtp();
        }}
        className="flex flex-col gap-3"
      >
        <input
          type="text"
          value={gachonId}
          onChange={(e) => setGachonId(e.target.value)}
          placeholder="ID"
          autoComplete="username"
          readOnly={otpSent}
          className="bg-primary-light text-text-primary placeholder:text-text-tertiary focus:border-primary read-only:opacity-70 h-13 rounded-xl border border-transparent px-4 text-[15px] outline-none focus:border-2"
        />

        {/* OTP 발송 성공 후에만 노출 */}
        {otpSent && (
          <input
            type="text"
            inputMode="numeric"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="인증번호를 입력해주세요."
            autoFocus
            className="bg-primary-light text-text-primary placeholder:text-text-tertiary focus:border-primary h-13 rounded-xl border border-transparent px-4 text-[15px] outline-none focus:border-2"
          />
        )}

        {errorMessage && (
          <p className="text-error text-center text-sm" role="alert">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={buttonDisabled}
          className="bg-primary text-text-inverse hover:bg-primary-hover disabled:bg-border disabled:text-text-tertiary mt-6 h-13 rounded-xl text-[15px] font-semibold transition-colors disabled:cursor-not-allowed"
        >
          {buttonText}
        </button>
      </form>
    );
  }

  // ── Step 2 (info) UI ──
  function renderInfoStep() {
    const disabled =
      !name.trim() ||
      !password ||
      !passwordConfirm ||
      password !== passwordConfirm ||
      isSubmitting;

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void handleSignUp();
        }}
        className="flex flex-col gap-3"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          autoComplete="name"
          autoFocus
          className="bg-primary-light text-text-primary placeholder:text-text-tertiary focus:border-primary h-13 rounded-xl border border-transparent px-4 text-[15px] outline-none focus:border-2"
        />
        {/* Step 1에서 인증한 ID — readOnly */}
        <input
          type="text"
          value={gachonId}
          readOnly
          aria-label="가천대 ID"
          className="bg-primary-light text-text-secondary h-13 rounded-xl border border-transparent px-4 text-[15px] opacity-70 outline-none"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="new-password"
          className="bg-primary-light text-text-primary placeholder:text-text-tertiary focus:border-primary h-13 rounded-xl border border-transparent px-4 text-[15px] outline-none focus:border-2"
        />
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="Password 확인"
          autoComplete="new-password"
          className="bg-primary-light text-text-primary placeholder:text-text-tertiary focus:border-primary h-13 rounded-xl border border-transparent px-4 text-[15px] outline-none focus:border-2"
        />

        {errorMessage && (
          <p className="text-error text-center text-sm" role="alert">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={disabled}
          className="bg-primary text-text-inverse hover:bg-primary-hover disabled:bg-border disabled:text-text-tertiary mt-6 h-13 rounded-xl text-[15px] font-semibold transition-colors disabled:cursor-not-allowed"
        >
          {isSubmitting ? '가입 중...' : 'Sign in'}
        </button>
      </form>
    );
  }

  return (
    <main className="flex min-h-full flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-89.5">
        <header className="mb-10 text-center">
          <h1 className="text-primary text-3xl font-extrabold tracking-tight">Login here</h1>
          <p className="text-text-primary mt-4 text-base font-semibold leading-relaxed">
            가천대학교 계정으로
            <br />
            회원가입 하세요.
          </p>
        </header>

        {step === 'verify' ? renderVerifyStep() : renderInfoStep()}

        {/* 하단 로그인 링크 */}
        <div className="mt-2 flex justify-center">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-primary text-sm font-semibold"
          >
            로그인
          </button>
        </div>
      </div>
    </main>
  );
}

// 공통 에러 메시지 헬퍼 (400 = 백엔드 검증 실패 / 그 외 = 일반 오류)
function toErrorMessage(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err) && err.response?.status === 400) {
    return fallback;
  }
  return '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
}

export default Signup;
