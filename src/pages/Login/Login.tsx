import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login } from '../../api/auth';
import { useAuthStore } from '../../store/authStore';
import type { LoginProps } from './Login.types';

function Login(_props: LoginProps) {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [gachonId, setGachonId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDisabled = !gachonId.trim() || !password.trim() || isSubmitting;

  async function handleSubmit() {
    if (isDisabled) return;

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const data = await login({ gachon_id: gachonId, password });

      if (data.res_status && typeof data.uidx === 'number') {
        setAuth(data.uidx);
        navigate('/');
      } else {
        // 백엔드가 200으로 res_status: false 반환하는 케이스
        setErrorMessage('ID 또는 비밀번호가 올바르지 않습니다');
      }
    } catch (err) {
      // 400(res_status: false) 또는 네트워크 에러
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        setErrorMessage('ID 또는 비밀번호가 올바르지 않습니다');
      } else {
        setErrorMessage('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-full flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-89.5">
        {/* 타이틀 영역 */}
        <header className="mb-10 text-center">
          <h1 className="text-primary text-3xl font-extrabold tracking-tight">Login here</h1>
          <p className="text-text-primary mt-4 text-base font-semibold leading-relaxed">
            가천대학교 계정으로
            <br />
            로그인 하세요.
          </p>
        </header>

        {/* 입력 폼 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit();
          }}
          className="flex flex-col gap-3"
        >
          <input
            type="text"
            value={gachonId}
            onChange={(e) => setGachonId(e.target.value)}
            placeholder="ID"
            autoComplete="username"
            className="bg-primary-light text-text-primary placeholder:text-text-tertiary focus:border-primary h-13 rounded-xl border border-transparent px-4 text-[15px] outline-none focus:border-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            className="bg-primary-light text-text-primary placeholder:text-text-tertiary focus:border-primary h-13 rounded-xl border border-transparent px-4 text-[15px] outline-none focus:border-2"
          />

          {/* 에러 메시지 */}
          {errorMessage && (
            <p className="text-error text-center text-sm" role="alert">
              {errorMessage}
            </p>
          )}

          {/* Login 버튼 */}
          <button
            type="submit"
            disabled={isDisabled}
            className="bg-primary text-text-inverse hover:bg-primary-hover disabled:bg-border disabled:text-text-tertiary mt-6 h-13 rounded-xl text-[15px] font-semibold transition-colors disabled:cursor-not-allowed"
          >
            {isSubmitting ? '로그인 중...' : 'Login'}
          </button>

          {/* 회원가입 텍스트 버튼 */}
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="text-primary mt-2 text-sm font-semibold"
          >
            회원가입
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
