import { NextResponse } from "next/server";

export const serverErrResponse = (statusCode: number, message: string) => {
    return new NextResponse(JSON.stringify({ message }), {
        status: statusCode,
    })
}