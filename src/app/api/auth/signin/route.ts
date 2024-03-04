import { User } from "@/models"
import { serverErrResponse } from "@/utils/error_response"
import { matchPass } from "@/utils/hash"
import { connectDB } from "@/utils/mongoDB"
import { NextRequest, NextResponse } from "next/server"
var jwt = require('jsonwebtoken');

export const POST = async (req: NextRequest) => {
    try {
        const { email, password }: { email: string, password: string } = await req.json()
        await connectDB()
        // get user from DB
        const userFromDB = await User.findOne({ email })
        // compare password with hash password
        const isPassMatch = matchPass(password, userFromDB.password)
        // is password match
        if (isPassMatch) {
            const token = jwt.sign({
                email
            }, process.env.NEXT_PUBLIC_SECRET, { expiresIn: '1d' })
            return new NextResponse(JSON.stringify({ message: "SignIn successful", token }), {
                headers: { "Set-Cookie": `token=${token}; sameSite=strict; Path=/; httpOnly=true; Expires=${new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}; maxAge=${60 * 60 * 24};` }
            })
        }
        return serverErrResponse(401, "Email or password doesn't match")
    } catch (error: any) {
        return serverErrResponse(500, error.message)
    }
}