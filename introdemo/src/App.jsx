import { useState } from 'react'
import Note from './Components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)

  // Define function for us to use to add notes
  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
<form onSubmit={addNote}>
  <input />
  <button type='submit'>save</button>
</form>

    </div>
  )
}

export default App