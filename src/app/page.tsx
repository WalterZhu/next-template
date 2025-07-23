import { getCount } from '@/lib/count';
import CountClient from './countClient';

export default async function Home() {
  // 服务端获取初始数据
  const count = await getCount();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CountClient initialCount={count} />
    </div>
  );
}
