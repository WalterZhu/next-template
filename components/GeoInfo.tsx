interface GeoInfoProps {
  country: string;
  region?: string;
  city?: string;
}

export default function GeoInfo({ country, region, city }: GeoInfoProps) {
  // 国家代码到国家名称的映射
  const countryNames: Record<string, string> = {
    'CN': '中国',
    'US': '美国',
    'JP': '日本',
    'GB': '英国',
    'DE': '德国',
    'FR': '法国',
    'CA': '加拿大',
    'AU': '澳大利亚',
    'RU': '俄罗斯',
    'KP': '朝鲜',
    'KR': '韩国',
    'IN': '印度',
    'SG': '新加坡',
    'HK': '香港',
    'TW': '台湾',
  };

  const getFlagEmoji = (countryCode: string) => {
    const flags: Record<string, string> = {
      'CN': '🇨🇳',
      'US': '🇺🇸',
      'JP': '🇯🇵',
      'GB': '🇬🇧',
      'DE': '🇩🇪',
      'FR': '🇫🇷',
      'CA': '🇨🇦',
      'AU': '🇦🇺',
      'RU': '🇷🇺',
      'KP': '🇰🇵',
      'KR': '🇰🇷',
      'IN': '🇮🇳',
      'SG': '🇸🇬',
      'HK': '🇭🇰',
      'TW': '🇹🇼',
    };
    return flags[countryCode] || '🌐';
  };

  const countryName = countryNames[country] || country;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
          <span>🌍</span>
          <span>访问位置</span>
        </h3>
        <span className="text-xs text-gray-500 bg-gray-100/80 px-2 py-1 rounded-full">
          {new Date().toLocaleTimeString()}
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-4">
          <div className="text-3xl drop-shadow-sm">{getFlagEmoji(country)}</div>
          <div className="flex-1">
            <div className="font-semibold text-gray-800 text-lg">
              {countryName}
            </div>
            <div className="text-sm text-gray-500 font-mono">
              {country}
            </div>
          </div>
        </div>
        
        {(region && region !== 'Unknown') || (city && city !== 'Unknown') ? (
          <div className="bg-gray-50/80 rounded-lg p-3 ml-12 space-y-1">
            {region && region !== 'Unknown' && (
              <div className="text-sm text-gray-600">
                <span className="text-gray-500">地区:</span> {region}
              </div>
            )}
            {city && city !== 'Unknown' && (
              <div className="text-sm text-gray-600">
                <span className="text-gray-500">城市:</span> {city}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}