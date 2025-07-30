"use client";

import { useState } from 'react';

interface CountClientProps {
    initialCount: number;
}

export default function CountClient({ initialCount }: CountClientProps) {
    const [count, setCount] = useState(initialCount);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
            
            const data = await res.json();
            setCount(data.count);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : '操作失败，请重试';
            setError(errorMessage);
            console.error('Count increment failed:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-6 p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto">
            <div className="text-6xl font-bold text-blue-600 mb-4">
                {count}
            </div>
            
            {error && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md border border-red-200">
                    {error}
                </div>
            )}
            
            <button 
                onClick={handleClick} 
                disabled={loading}
                className={`
                    px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200
                    ${loading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
                    } 
                    text-white shadow-md hover:shadow-lg transform hover:scale-105
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
                ) : '点击增加'}
            </button>
            
            <div className="text-gray-500 text-sm">
                当前计数: {count}
            </div>
        </div>
    );
} 