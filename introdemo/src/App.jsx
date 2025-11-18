import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (newName === "") return

    let exists = persons.some(p => p.name === newName);
    if(exists)
    {
      alert(`${newName} already exists in the phonebook`)
      setNewName("")
      return
    }


    const newPerson = {
      name: newName
    }
    
    // This is some fuckery with React's state changes being batched
    // Basically have to give it a function to update it and reference
    // The updated variable if we are wanting to reference it straight away
    setPersons(prev => {
      const updated = prev.concat(newPerson)
      console.log("Current Phonebook Array: ", updated)
      return updated
    })

    setNewName('')
    console.log("Added new person to Phonebook: ", newPerson.name);
  }

  const handleNewNameChange = (event) =>
  {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNewNameChange}/>
        </div>
        <div>debug: {newName}</div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {
            persons.map((person) => (
              <li key={person.name}>{person.name}</li>
            ))
          }
        </ul>
    </div>
  )
}

export default App