import { NextResponse, NextRequest } from 'next/server'

export const config = {
    runtime: 'nodejs',
}

export function middleware(request: NextRequest) {
    const requestHeaders = request.headers;
    const country = requestHeaders.get("x-vercel-ip-country");

    if (country === "CN") {
        return new NextResponse(
            `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Gaur.com</title>
            </head>
            <body style="height: 100vh; display: flex; flex-direction: column;justify-content: center; align-items:center;  padding: 0; background: #1a1a1a;">
                <div class="page word-break-word2" style="display: flex; flex-direction: column; align-items: center; background: #1a1a1a; text-align: center;">
                    <div class="header" style="width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 20px 16px 12px; box-sizing: border-box;">
                        <p class="title" style="flex: 1; color: #fff; font-size: 17px;  line-height: normal;">Attention</p >
                    </div>
                    <div class="main" style="width: 100%; padding: 0 16px 25px; box-sizing: border-box; display: flex; flex-direction: column; text-align: center;">
                        <p class="text" style="color: #878787; text-align: center; font-size: 14px;">Sorry, due to local laws, you have been blocked. You are unable to access Game.com.</p >
                    </div>
                </div>
            </body>
            </html>
            `,
            { status: 403, headers: { 'content-type': 'text/html; charset=utf-8' } }
        );
    }
    return NextResponse.next();
}