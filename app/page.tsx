import CountDisplay from '../components/CountDisplay';
import IncrementButton from '../components/IncrementButton';
import GeoInfo from '../components/GeoInfo';
import { getCount } from '../lib/count';
import { getOrCreateSessionServerSide } from '../lib/session';
import { headers } from 'next/headers';

export default async function Home() {
  // 服务端获取初始数据
  const count = await getCount();
  
  // 获取或创建session（不设置cookie）
  const session = await getOrCreateSessionServerSide();
  
  // 获取地理位置信息
  const headersList = await headers();
  const country = headersList.get('x-vercel-ip-country') || 'Unknown';
  const region = headersList.get('x-vercel-ip-region') || undefined;
  const city = headersList.get('x-vercel-ip-city') || undefined;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* 页面标题 */}
        <div className="text-center pt-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Next.js 计数器
          </h1>
          <p className="text-gray-600 text-lg">
            使用 Redis 和 App Router 构建的实时计数器
          </p>
        </div>

        {/* 地理位置信息 */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <GeoInfo country={country} region={region} city={city} />
          </div>
        </div>

        {/* 计数器主体 */}
        <div className="flex justify-center">
          <div className="w-full max-w-md space-y-6">
            <CountDisplay count={Number(count)} session={session} />
            <IncrementButton />
          </div>
        </div>
      </div>
    </main>
  );
}
