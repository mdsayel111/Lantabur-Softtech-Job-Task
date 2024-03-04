const jwt = require("jsonwebtoken")
export const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET)
        if (decoded.email) {
            return true
        }
        return false
    } catch (error) {
        return false
    }
}