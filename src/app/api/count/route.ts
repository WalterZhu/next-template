// app/api/count/route.ts
import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv();

const countKey = 'next_template_count'

export async function GET () {
    const count = await redis.get(countKey)
    if (count) {
        return NextResponse.json({ count: count })
    } else {
        redis.set(countKey, 0)
        return NextResponse.json({ count: 0 })
    }
}

export async function POST () {
    await redis.incr('countKey')
    return NextResponse.json({ count: await redis.get('count') })
}
