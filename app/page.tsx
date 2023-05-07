import NotesModal from "./notesmodal"
import NotesList from "./noteslist"
import Logout from "./logout"

export default async function Home() {
  return (
    <main>
      <Logout/>
      <NotesModal/>
      <NotesList/>
    </main>
  )
}
