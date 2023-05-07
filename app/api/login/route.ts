import prisma from "@/prisma/client";
import * as argon from "argon2"
import * as jwt from "jsonwebtoken"
type LoginPayload = {
  email: string,
  password: string,
}

export async function POST(req: Request) {
  try{
    const {email, password}: LoginPayload = await req.json()
    const user = await prisma.user.findFirst({where:{"email":email}})
    if(!user){
      return new Response(JSON.stringify("Cant find user with this data"))
    }
    if(await argon.verify(user.password, password)){
      //create jwt
      const access = jwt.sign({
        email
      }, process.env.SECRETS,{
        expiresIn: '10m'
      })

      const refresh = jwt.sign({
        email
      }, process.env.SECRETS, {
        expiresIn: '1d'
      })

      return new Response(JSON.stringify({data:{
        access,
        refresh
      }}))
    }else{
      return new Response(JSON.stringify("Cant find user with this data"))
    }
  }catch(error){
    console.log(error)
    return new Response(JSON.stringify(error))
  }
}
