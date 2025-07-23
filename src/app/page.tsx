import { useEffect, useState } from 'react';

export default function Home() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/count')
      .then(res => res.json())
      .then(data => setCount(data.count))
      .catch(() => setCount(null));
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '4rem' }}>
      {count !== null ? count : 'Loading...'}
    </div>
  );
}
