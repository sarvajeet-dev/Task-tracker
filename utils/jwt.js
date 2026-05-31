import jwt from "jsonwebtoken"

export const generateToken = (user) =>{
   return jwt.sign(
    {
        id: user._id,
        role : user.role,
        organisationId : user.organisationId

    } , 
    process.env.JWT_SECRET , 
    {
        expiresIn : "15m"
    }
   )
}

export const generaterefreshToken = (user) => {
    return jwt.sign({
        id : user._id

    },
    process.env.JWT_SECRET,
    {
        expiresIn : "7d"
    }
)
}