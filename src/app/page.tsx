import CountClient from './CountClient';

export default async function Home() {
  // 服务端获取初始数据
  const res = await fetch('/api/count', { cache: 'no-store' });
  const data = await res.json();
  const count = data.count;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CountClient initialCount={count} />
    </div>
  );
}
