import { responsder } from "../Utils/util.js"

export const ResetPasswordMiddleware = async(req, res, next) => {
    if(false) return res.status(403).header().json(responsder(false, {error: "Unauthorized request."}))
    next()
}