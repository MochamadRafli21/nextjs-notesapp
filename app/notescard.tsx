'use client'

import React,{useState} from 'react'
type cardInfo = {
        id: number
        title: string
        content: string | undefined
    }

export default function NotesCard(props: cardInfo) {
    const [isDetail, setDetail] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const updateDetail = ()=> {
        setTitle(props.title)
        if(props.content){
            setContent(props.content)
            }
        setDetail(!isDetail)
    }
    async function updateNotes(e: React.FormEvent){
        e.preventDefault()
        const data = await fetch(`/api/notes/${props.id}`,{
            method: "PUT",
            body: JSON.stringify({title, content})
        })
        if(!data.ok){
            console.log(data)
            return
        }
        updateDetail()

    }
    return (
        <>
        {isDetail?
        <div className='z-50 h-screen flex mx-auto items-center: justify-center w-full bg-gray-50' >
            <form onSubmit={updateNotes} className='bg-white h-fit  flex flex-col justify-center items-center '> 
            <input placeholder='title' onChange={(e)=> setTitle(e.target.value)} value={title} />
            <textarea placeholder='content' onChange={(e)=> setContent(e.target.value)} value={content}/>
            <div className='justify-end py-2'>
                <button type='button' onClick={updateDetail} className='px-4 py-2 mx-2 rounded-lg bg-gray-50 text-red-500 border-gray-400'>Cancel</button>
                <button type='submit' className='px-4 py-2 rounded-lg bg-cyan-200'>Create Notes</button>
            </div>
            </form>
        </div>:
        <div onClick={updateDetail} className='w-[230px] border-2 border-gray-200 px-2 py-4 rounded-lg ' key={props.id}>
        <h2 className='border-b-2 border-b-cyan-200'><b> {props.title}</b></h2>
        <p className='text-ellipsis'> {props.content}</p>
        </div>
        }
        </>
    )
}
