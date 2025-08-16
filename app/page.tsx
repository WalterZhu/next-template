import CountClient from '../components/CountClient';
import GeoInfo from '../components/GeoInfo';
import { getCount } from '../lib/count';
import { headers } from 'next/headers';

export default async function Home() {
  // 服务端获取初始数据
  const count = await getCount();
  
  // 获取地理位置信息
  const headersList = await headers();
  const country = headersList.get('x-vercel-ip-country') || 'Unknown';
  const region = headersList.get('x-vercel-ip-region') || undefined;
  const city = headersList.get('x-vercel-ip-city') || undefined;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        <GeoInfo country={country} region={region} city={city} />
        
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Next.js 计数器
        </h1>
        <p className="text-gray-600 mb-8">
          使用 Redis 和 App Router 构建的实时计数器
        </p>
        <CountClient initialCount={Number(count)} />
      </div>
    </main>
  );
}
