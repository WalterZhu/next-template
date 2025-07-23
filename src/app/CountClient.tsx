"use client";

import { useState } from 'react';

export default function CountClient({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/count', { method: 'POST' });
      const data = await res.json();
      setCount(data.count);
    } catch {
      // 错误处理可根据需要补充
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>{count}</div>
      <button onClick={handleClick} disabled={loading} style={{ fontSize: '1.5rem', padding: '0.5rem 2rem' }}>
        {loading ? 'Loading...' : '增加'}
      </button>
    </div>
  );
} 