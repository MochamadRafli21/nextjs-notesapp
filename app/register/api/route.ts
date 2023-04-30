import prisma from "@/prisma/client";
import * as argon from "argon2";
import { errorToJSON } from "next/dist/server/render";

type registerPayload = {
  fullname: string,
  email: string,
  password: string
}

export async function POST(req: Request){
  try {
    // check if payload correct
    const {fullname, email, password}: registerPayload = await req.json()
    if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/) && !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
      return new Response(JSON.stringify({"error": "invalid format for email or password"}))
    }
    // check if email already registered
    const user = await prisma.user.findFirst({where:{email}})
    if(user){
      return new Response(JSON.stringify({"error": "user already exist"}))
    }
    // hash password
    const hash = await argon.hash(password)
    // create user
    const res = await prisma.user.create({
      data:{
        fullname,
        email,
        password: hash
      }
    })

    return new Response(JSON.stringify({"data": res}))
    
  } catch (error) {
    console.log(error)
  } 
} 
