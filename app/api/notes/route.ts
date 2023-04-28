import prisma from "../../../prisma/client"

type NotePayload = {
    title: string
    content: string | undefined
}

export async function GET() {
    try{
        const data = await prisma.note.findMany()
        console.log(data)
        return new Response(JSON.stringify(data),{
            status: 200
        })
    }catch(error){
        console.log(error)
        return new Response(JSON.stringify({"message": error}),{
            status: 400
        })
    }
}

export async function POST(request: Request){
    const {title , content}:NotePayload  = await request.json()

    if(!title){
        return new Response(JSON.stringify({"message":"Title Cant be empty"}),{
            status: 400
        })
    }

    try{
        const data = await prisma.note.create({
            data:{
                title,
                content
            }
        })

        if(data){
            return new Response(JSON.stringify(data), {status: 201})
        }
    }catch(error){
        return new Response(JSON.stringify({error}), {status: 400})
    }
}
