import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';

const App = () => {
  useEffect(() => {
    // Non-blocking background warmup ping for Render free-tier instance
    const warmupBackend = () => {
      const apiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
      if (apiUrl) {
        fetch(`${apiUrl}/health`, { mode: 'cors' }).catch(() => null);
      }
    };
    warmupBackend();
  }, []);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#020817]">
          <div className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
