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
      <div className="flex min-h-full w-full items-center justify-center bg-bg-subtle">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col bg-bg-subtle pb-6 font-sans">
      {/* Top Header Icons */}
      <div className="flex justify-end gap-3 px-6 pt-6 pb-2">
        <button className="text-text-secondary" aria-label="확장">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"></path><path d="M21 8V5a2 2 0 0 0-2-2h-3"></path><path d="M3 16v3a2 2 0 0 0 2 2h3"></path><path d="M16 21h3a2 2 0 0 0 2-2v-3"></path></svg>
        </button>
        <button className="text-text-secondary" aria-label="설정">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </button>
      </div>

      <div className="flex flex-col gap-4 px-6">
        {error && (
          <div className="mb-2 rounded-xl border border-red-90 bg-red-95 p-4 text-sm text-error">
            {error}
          </div>
        )}

        {/* Tabs with sliding animation */}
        <div className="relative flex items-center gap-2">
          {/* Sliding Active Background */}
          <div
            className="absolute top-0 bottom-0 z-0 rounded-xl bg-primary shadow-md transition-all duration-300 ease-out"
            style={{
              left: activeTab === 'home' ? '0px' : '66px',
              width: activeTab === 'home' ? '58px' : '98px',
            }}
          />

          <button
            onClick={() => setActiveTab('home')}
            className={`relative z-10 w-[58px] rounded-xl py-2.5 text-sm font-bold transition-colors duration-300 ${
              activeTab === 'home'
                ? 'bg-transparent text-text-inverse'
                : 'bg-bg-subtle text-text-tertiary hover:bg-neutral-89'
            }`}
          >
            홈
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`relative z-10 w-[98px] rounded-xl py-2.5 text-sm font-bold transition-colors duration-300 ${
              activeTab === 'history'
                ? 'bg-transparent text-text-inverse'
                : 'bg-bg-subtle text-text-tertiary hover:bg-neutral-89'
            }`}
          >
            포인트 내역
          </button>
        </div>

        {/* Animated Content Area */}
        <div className="mt-1 grid">
          {/* Home Content */}
          <div
            className={`col-start-1 row-start-1 flex flex-col gap-1 transition-all duration-500 ease-out ${
              activeTab === 'home'
                ? 'pointer-events-auto z-10 translate-y-0 opacity-100'
                : 'pointer-events-none z-0 translate-y-4 opacity-0'
            }`}
          >
            {/* Primary Points Banner */}
            <div className="flex items-center justify-between rounded-xl bg-primary p-5 text-text-inverse shadow-sm">
              <div className="text-lg font-bold">
                보유 포인트{' '}
                <span className="ml-1 text-xl font-extrabold">
                  {point.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-1 rounded-lg bg-primary-hover px-3 py-1.5 text-sm font-bold shadow-inner">
                <button className="hover:opacity-80">송금</button>
                <span className="mx-1 text-text-inverse/50">|</span>
                <button className="hover:opacity-80">기부</button>
              </div>
            </div>

            {/* Empty Placeholder Card */}
            <div className="h-64 w-full rounded-2xl bg-neutral-89"></div>
          </div>

          {/* History Content */}
          <div
            className={`col-start-1 row-start-1 flex flex-col gap-1 transition-all duration-500 ease-out ${
              activeTab === 'history'
                ? 'pointer-events-auto z-10 translate-y-0 opacity-100'
                : 'pointer-events-none z-0 translate-y-4 opacity-0'
            }`}
          >
            {/* Thin Placeholder Card */}
            <div className="h-12 w-full rounded-xl bg-neutral-89"></div>

            {/* Large Primary History Card */}
            <div className="flex min-h-[300px] flex-col rounded-xl bg-primary p-5 text-text-inverse shadow-sm">
              <div className="mb-6 text-lg font-bold">
                보유 포인트{' '}
                <span className="ml-2 text-xl font-extrabold">
                  {point.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col gap-3 text-[15px] font-bold tracking-wide">
                {logs.length > 0 ? (
                  logs.map((log, index) => (
                    <div key={index}>
                      {log.description}{' '}
                      {log.change > 0
                        ? `+ ${log.change.toLocaleString()}`
                        : `- ${Math.abs(log.change).toLocaleString()}`}
                    </div>
                  ))
                ) : (
                  <div className="font-medium text-text-inverse/70">
                    아직 포인트 내역이 없습니다.
                  </div>
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
