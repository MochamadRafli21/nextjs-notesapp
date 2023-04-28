import prisma from "../../../../prisma/client"

export async function PUT(request: Request, { params }: {
  params: { notesId: number }
}) {
  const id = parseInt( params.notesId );
  const {title, content} = await request.json()
  const res = await prisma.note.update({
    where:{
        id
    },
    data:{
        title,
        content
    }
  })
  return new Response(JSON.stringify({data: res}),{status:200})
}

export async function GET({ params }: {
  params: { notesId: number }
}) {
  const id = parseInt(params.notesId);
  const data = await prisma.note.findUnique({
    where:{
        id
    }
  })
  return new Response(JSON.stringify(data), {status: 200})
}
