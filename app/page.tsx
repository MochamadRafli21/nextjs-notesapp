import NotesModal from "./notesmodal"
import NotesList from "./noteslist"

export default async function Home() {
    return (
    <main>
    <NotesModal/>
    <NotesList/>
    </main>
  )
}
