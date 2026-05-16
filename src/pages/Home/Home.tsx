import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { getProfilePoint, getProfilePointLog } from '../../api/profile';
import type { PointLogItem } from '../../api/profile';

const Home = () => {
  const navigate = useNavigate();
  const { uidx } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'home' | 'history'>('home');
  const [point, setPoint] = useState<number>(0);
  const [logs, setLogs] = useState<PointLogItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!uidx) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError('');
      try {
        const reqData = { uidx };
        const [pointRes, logRes] = await Promise.allSettled([
          getProfilePoint(reqData),
          getProfilePointLog(reqData)
        ]);

        if (pointRes.status === 'fulfilled' && pointRes.value.res_status && pointRes.value.point !== undefined) {
          setPoint(pointRes.value.point);
        }

        if (logRes.status === 'fulfilled' && logRes.value.res_status && logRes.value.logs) {
          setLogs(logRes.value.logs);
        }
      } catch (err) {
        console.error('Failed to fetch home data:', err);
        setError('일부 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [uidx, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#FAFAFA] min-h-screen">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#5C67FF] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#FAFAFA] min-h-full pb-6 font-sans">
      {/* Top Header Icons */}
      <div className="flex justify-end gap-3 px-6 pt-6 pb-2">
        <button className="text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"></path><path d="M21 8V5a2 2 0 0 0-2-2h-3"></path><path d="M3 16v3a2 2 0 0 0 2 2h3"></path><path d="M16 21h3a2 2 0 0 0 2-2v-3"></path></svg>
        </button>
        <button className="text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </button>
      </div>

      <div className="px-6 flex flex-col gap-4">
        {error && (
          <div className="rounded-xl bg-red-50 p-4 text-sm text-red-500 border border-red-100 mb-2">
            {error}
          </div>
        )}
        {/* Tabs with sliding animation */}
        <div className="relative flex items-center gap-2">
          {/* Sliding Active Background */}
          <div
            className="absolute top-0 bottom-0 rounded-xl bg-[#5C67FF] shadow-md transition-all duration-300 ease-out z-0"
            style={{
              left: activeTab === 'home' ? '0px' : '66px',
              width: activeTab === 'home' ? '58px' : '98px'
            }}
          />
          
          <button 
            onClick={() => setActiveTab('home')}
            className={`relative z-10 w-[58px] rounded-xl py-2.5 text-sm font-bold transition-colors duration-300 ${
              activeTab === 'home' 
                ? 'text-white bg-transparent' 
                : 'bg-[#F0F0F0] text-[#8A8A8A] hover:bg-[#E5E5E5]'
            }`}
          >
            홈
          </button>
          
          <button 
            onClick={() => setActiveTab('history')}
            className={`relative z-10 w-[98px] rounded-xl py-2.5 text-sm font-bold transition-colors duration-300 ${
              activeTab === 'history' 
                ? 'text-white bg-transparent' 
                : 'bg-[#F0F0F0] text-[#8A8A8A] hover:bg-[#E5E5E5]'
            }`}
          >
            포인트 내역
          </button>
        </div>

        {/* Animated Content Area */}
        <div className="grid mt-1">
          {/* Home Content */}
          <div 
            className={`col-start-1 row-start-1 transition-all duration-500 ease-out flex flex-col gap-1 ${
              activeTab === 'home' 
                ? 'opacity-100 translate-y-0 pointer-events-auto z-10' 
                : 'opacity-0 translate-y-4 pointer-events-none z-0'
            }`}
          >
            {/* Blue Points Banner */}
            <div className="flex items-center justify-between rounded-xl bg-[#5C67FF] p-5 text-white shadow-sm">
              <div className="text-lg font-bold">
                보유 포인트 <span className="ml-1 text-xl font-extrabold">{point.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 bg-[#4A54F0] px-3 py-1.5 rounded-lg text-sm font-bold shadow-inner">
                <button className="hover:text-gray-200">송금</button>
                <span className="mx-1 text-white/50">|</span>
                <button className="hover:text-gray-200">기부</button>
              </div>
            </div>

            {/* Empty Gray Card */}
            <div className="h-64 w-full rounded-2xl bg-[#EBEBEB]"></div>
          </div>

          {/* History Content */}
          <div 
            className={`col-start-1 row-start-1 transition-all duration-500 ease-out flex flex-col gap-1 ${
              activeTab === 'history' 
                ? 'opacity-100 translate-y-0 pointer-events-auto z-10' 
                : 'opacity-0 translate-y-4 pointer-events-none z-0'
            }`}
          >
            {/* Thin Gray Card */}
            <div className="h-12 w-full rounded-xl bg-[#EBEBEB]"></div>

            {/* Large Blue History Card */}
            <div className="flex flex-col rounded-xl bg-[#5C67FF] p-5 text-white shadow-sm min-h-[300px]">
              <div className="text-lg font-bold mb-6">
                보유 포인트 <span className="ml-2 text-xl font-extrabold">{point.toLocaleString()}</span>
              </div>
              <div className="flex flex-col gap-3 text-[15px] font-bold tracking-wide">
                {logs.length > 0 ? (
                  logs.map((log, index) => (
                    <div key={index}>
                      {log.description} {log.change > 0 ? `+ ${log.change.toLocaleString()}` : `- ${Math.abs(log.change).toLocaleString()}`}
                    </div>
                  ))
                ) : (
                  <div className="text-white/70 font-medium">아직 포인트 내역이 없습니다.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
