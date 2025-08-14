import CountClient from '../components/CountClient';
import { getCount } from '../lib/count';

export default async function Home() {
  // 服务端获取初始数据
  const count = await getCount();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center">
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
