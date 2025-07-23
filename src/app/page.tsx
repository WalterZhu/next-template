export default async function Home() {
  // 直接在服务端请求本地 API
  const res = await fetch('/api/count', { cache: 'no-store' });
  const data = await res.json();
  const count = data.count;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '4rem' }}>
      {count}
    </div>
  );
}
