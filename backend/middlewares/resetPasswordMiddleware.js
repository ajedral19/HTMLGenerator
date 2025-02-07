import { responsder } from "../Utils/util.js"

export const ResetPasswordMiddleware = async(req, res, next) => {
    
    // authenticate tokens
    // if teken is not valid -> reject request

    // else continue proceed to controller
    if(false) return res.status(403).header().json(responsder(false, {error: "Unauthorized request."}))
    next()
}