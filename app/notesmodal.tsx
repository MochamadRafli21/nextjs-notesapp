'use client'
import {atom, useAtom} from 'jotai'
import React, {useTransition} from 'react'
import { notesId } from './notescard'
import { useRouter } from 'next/navigation';

export const modalDisplayed = atom(false)
export const currentTitle = atom('')
export const currentContent = atom('')

export default function NotesModal ()  {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const [isDisplay, setIsDisplay] = useAtom(modalDisplayed)
    const [title, setTitle] = useAtom(currentTitle)
    const [content, setContent] = useAtom(currentContent)
    const [currentNotes] = useAtom(notesId)
    const updateDisplay = ()=>{
        setIsDisplay(!isDisplay)
    }

    async function submitNotes(e: React.FormEvent){
        e.preventDefault()
        if(currentNotes){
            const data = await fetch(`/api/notes/${currentNotes}`,{
                    method: "PUT",
                    body: JSON.stringify({title, content})
                })
        if(!data.ok){
            console.log(data)
            return
        }
        startTransition(() => {
            // Refresh the current route and fetch new data from the server without
            // losing client-side browser or React state.
            router.refresh();
        });
        }else{
           const data = await fetch(`/api/notes`,{
                method: "POST",
                body: JSON.stringify({title, content})
            })
        if(!data.ok){
            console.log(data)
            return
        }
        startTransition(() => {
            // Refresh the current route and fetch new data from the server without
            // losing client-side browser or React state.
            router.refresh();
        });
        }
        setTitle('')
        setContent('')
        updateDisplay()

    }
    return (
            <>
            {isDisplay? <div className='z-10 h-screen flex mx-auto items-center: justify-center w-full bg-gray-50' >
            <form onSubmit={submitNotes} className='bg-white h-fit  flex flex-col justify-center items-center '> 
            <input placeholder='title' onChange={(e)=> setTitle(e.target.value)} value={title} />
            <textarea placeholder='content' onChange={(e)=> setContent(e.target.value)} value={content}/>
            <div className='justify-end py-2'>
                <button type='button' onClick={updateDisplay} className='px-4 py-2 mx-2 rounded-lg bg-gray-50 text-red-500 border-gray-400'>Cancel</button>
                <button type='submit' className='px-4 py-2 rounded-lg bg-cyan-200'>Create Notes</button>
            </div>
            </form>
            </div>: 
                <div className='md:w-full my-4 flex justify-center items-center'>
                    <button className='px-4 py-2 rounded-lg bg-cyan-200' onClick={updateDisplay}>Create new notes</button>
                </div>
            }
            </>
          )
}
