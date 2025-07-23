//import CountClient from './countClient';

import { getCount } from '@/lib/count'

export default async function Home() {
  // 服务端获取初始数据
  const count = await getCount();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <span>{String(count)}</span>
    </div>
  );
}
