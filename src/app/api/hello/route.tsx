// app/api/hello.ts
import { NextResponse } from 'next/server'

export async function GET (request: Request) {
    if (request.method === 'GET') {
        return NextResponse.json({ name: 'John' })
    } else {
        return NextResponse.json('Method Not Allowed')
    }
}