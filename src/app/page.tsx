import CountClient from '@/components/CountClient';

export default async function Home() {
  // 服务端获取初始数据
  const count = 0;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CountClient initialCount={Number(count)} />
    </div>
  );
}
