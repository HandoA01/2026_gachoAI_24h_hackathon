import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Profile from './pages/Profile/Profile';
import { useAuthStore } from './store/authStore';

// 임시 홈 placeholder (로그인 성공 시 이동)
function HomePlaceholder() {
  const { uidx, clearAuth } = useAuthStore();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6">
      <h1 className="text-text-primary text-2xl font-bold">홈 (Placeholder)</h1>
      <p className="text-text-secondary">uidx: {uidx ?? '없음'}</p>
      <div className="flex gap-4">
        <Link to="/profile" className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent/90">
          프로필 보기
        </Link>
        <button
          type="button"
          onClick={clearAuth}
          className="bg-primary text-text-inverse rounded-xl px-4 py-2 text-sm transition-colors hover:bg-primary-hover"
        >
          로그아웃
        </button>
      </div>
      <Link to="/login" className="text-primary text-sm font-semibold mt-4">
        로그인 페이지로
      </Link>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePlaceholder />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
