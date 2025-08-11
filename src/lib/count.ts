import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv();
const countKey = 'next_template_count'

export async function getCount(): Promise<number> {
    try {
        const count = await redis.get(countKey);
        if (count !== null && count !== undefined) {
            return Number(count);
        } else {
            await redis.set(countKey, 0);
            return 0;
        }
    } catch (error) {
        console.error('Error getting count:', error);
        // 返回默认值而不是抛出错误
        return 0;
    }
}

export async function increaseCount(): Promise<number> {
    try {
        await redis.incr(countKey);
        const newCount = await redis.get(countKey);
        return Number(newCount) || 0;
    } catch (error) {
        console.error('Error increasing count:', error);
        throw new Error('Failed to increase count');
    }
}