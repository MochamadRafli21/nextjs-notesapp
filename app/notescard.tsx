'use client'

import React from 'react'
import { atom, useAtom, useSetAtom } from 'jotai'
import { modalDisplayed, currentContent, currentTitle } from './notesmodal'

export const notesId = atom(0)

type cardInfo = {
        id: number
        title: string
        content: string | undefined
    }

export default function NotesCard(props: cardInfo) {
    const [isDetail, setDetail] = useAtom(modalDisplayed)
    const setTitle = useSetAtom(currentTitle)
    const setContent = useSetAtom(currentContent)
    const setNotesId = useSetAtom(notesId)
    const updateDetail = ()=> {
        setNotesId(props.id)
        setTitle(props.title)
        if(props.content){
            setContent(props.content)
            }
        setDetail(!isDetail)
    }
    return (
        <>
        <div onClick={updateDetail} className='w-full md:w-[230px] border-2 border-gray-200 px-2 py-4 rounded-lg ' key={props.id}>
        <h2 className='border-b-2 border-b-cyan-200'><b> {props.title}</b></h2>
        <p className='text-ellipsis'> {props.content}</p>
        </div>
        </>
    )
}
