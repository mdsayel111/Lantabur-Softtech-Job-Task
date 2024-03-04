import { User } from "@/models"
import { serverErrResponse } from "@/utils/error_response"
import { hashPassword } from "@/utils/hash"
import { connectDB } from "@/utils/mongoDB"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    try {
        const { email, password }: { email: string, password: string } = await req.json()
        // hash password
        const hashPass = hashPassword(password)
        // creat userObj
        const userObj = { email, password: hashPass }
        // save user in DB
        await connectDB()
        const newUser = new User(userObj)
        await newUser.save()
        return NextResponse.json({ message: "SignUp Successful" })
    } catch (error: any) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            return serverErrResponse(400, "Email already in use")
        }
        console.log(error.message)
        return serverErrResponse(500, "Internal server error")
    }
}