import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import Layout from './components/Layout/Layout';

// Placeholder for missing pages in bottom nav
function EmptyPage({ title }: { title: string }) {
  return (
    <div className="flex h-full items-center justify-center bg-[#FAFAFA]">
      <p className="text-lg font-bold text-gray-400">{title} 준비 중입니다.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Layout routes with bottom navigation */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/posts" element={<EmptyPage title="게시글" />} />
          <Route path="/write" element={<EmptyPage title="글쓰기" />} />
          <Route path="/ranking" element={<EmptyPage title="랭킹" />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
