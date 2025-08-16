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
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
          <span>🌍</span>
          <span>访问位置</span>
        </h3>
        <span className="text-xs text-gray-500">
          {new Date().toLocaleTimeString()}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getFlagEmoji(country)}</span>
          <div>
            <div className="font-medium text-gray-800">
              {countryName}
            </div>
            <div className="text-sm text-gray-600">
              {country}
            </div>
          </div>
        </div>
        
        {region && region !== 'Unknown' && (
          <div className="text-sm text-gray-600 pl-8">
            地区: {region}
          </div>
        )}
        
        {city && city !== 'Unknown' && (
          <div className="text-sm text-gray-600 pl-8">
            城市: {city}
          </div>
        )}
      </div>
    </div>
  );
}