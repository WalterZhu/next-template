import CountDisplay from '../components/CountDisplay';
import IncrementButton from '../components/IncrementButton';
import GeoInfo from '../components/GeoInfo';
import { SessionProvider } from '../components/SessionProvider';
import { getCount } from '../lib/count';
import { headers, cookies } from 'next/headers';
import { getSession, type AnonymousSession } from '../lib/session';

async function getServerData() {
  const [count, cookieStore, headersList] = await Promise.all([
    getCount(),
    cookies(),
    headers()
  ]);

  const sessionId = cookieStore.get('session-id')?.value;
  const session = sessionId ? await getSession(sessionId) : null;

  const geoInfo = {
    country: headersList.get('x-vercel-ip-country') || 'Unknown',
    region: headersList.get('x-vercel-ip-region') || undefined,
    city: headersList.get('x-vercel-ip-city') || undefined,
  };

  return { count: Number(count), session, geoInfo };
}

export default async function Home() {
  const { count, session, geoInfo } = await getServerData();

  return (
    <SessionProvider sessionData={session}>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-2xl mx-auto space-y-8">
          <Header />
          <GeoSection {...geoInfo} />
          <CounterSection count={count} session={session} />
        </div>
      </main>
    </SessionProvider>
  );
}

function Header() {
  return (
    <div className="text-center pt-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-3">
        Next.js 计数器
      </h1>
      <p className="text-gray-600 text-lg">
        使用 Redis 和 App Router 构建的实时计数器
      </p>
    </div>
  );
}

function GeoSection({ country, region, city }: { 
  country: string; 
  region?: string; 
  city?: string; 
}) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md">
        <GeoInfo country={country} region={region} city={city} />
      </div>
    </div>
  );
}

function CounterSection({ count, session }: { 
  count: number; 
  session: AnonymousSession | null; 
}) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md space-y-6">
        <CountDisplay count={count} session={session} />
        <IncrementButton />
      </div>
    </div>
  );
}
