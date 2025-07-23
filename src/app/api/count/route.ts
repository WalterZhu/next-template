// app/api/count/route.ts
import { NextResponse } from 'next/server'
import { getCount, increaseCount } from '@/lib/count'


export async function GET () {
    return NextResponse.json({ count: await getCount() })
}

export async function POST () {
    return NextResponse.json({ count: await increaseCount() })
}
