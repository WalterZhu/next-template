"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function IncrementButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/count', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // 增加成功后刷新页面以获取最新的SSR数据
      router.refresh();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '操作失败，请重试';
      setError(errorMessage);
      console.error('Count increment failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {error && (
        <div className="bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          <div className="flex items-center space-x-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      <button
        onClick={handleClick}
        disabled={loading}
        className={`
          relative overflow-hidden px-10 py-4 text-lg font-semibold rounded-2xl 
          transition-all duration-300 transform
          ${loading
            ? 'bg-gray-400 cursor-not-allowed scale-95'
            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 active:scale-95'
          } 
          text-white shadow-xl hover:shadow-2xl
          before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/10 before:to-white/0
          before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700
        `}
      >
        {loading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            加载中...
          </span>
        ) : (
          <span className="flex items-center">
            <span className="mr-2">✨</span>
            点击增加
          </span>
        )}
      </button>
    </div>
  );
}