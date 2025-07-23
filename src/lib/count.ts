import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv();
const countKey = 'next_template_count'

export async function getCount() {
    const count = await redis.get(countKey)
    if (count) {
        return count
    } else {
        redis.set(countKey, 0)
        return 0
    }
}

export async function increaseCount() {
    await redis.incr(countKey)
    return await redis.get(countKey)
}