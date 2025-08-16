interface CountDisplayProps {
  count: number;
  session?: {
    id: string;
    createdAt: string;
    userId?: string | null;
  } | null;
}

export default function CountDisplay({ count, session }: CountDisplayProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
      {/* 计数器显示 */}
      <div className="text-center mb-6">
        <div className="text-7xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-2">
          {count}
        </div>
        <div className="text-gray-500 text-sm font-medium tracking-wide uppercase">
          当前计数
        </div>
      </div>
      
      {/* Session信息 */}
      {session && (
        <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-200/50">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">
            会话信息
          </div>
          <div className="space-y-1 text-sm text-gray-700">
            <div className="font-mono text-xs break-all">
              ID: {session.id}
            </div>
            <div>
              创建: {new Date(session.createdAt).toLocaleString('zh-CN')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}