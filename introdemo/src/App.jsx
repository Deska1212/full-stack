import { useEffect, useState } from 'react'
import Filter from './Components/Filter'
import PersonList from './Components/PersonList'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('Use effect called')

    
    axios.get('http://localhost:3001/persons').then(response => {
      console.log('Retrieved promise data')
      setPersons(response.data)
    }
    )
  }, [])


  const handleFilterChange = (event) =>
  {
    const textToFilterBy = event.target.value
    console.log(textToFilterBy)
    setFilter(textToFilterBy)
  }



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
      name: newName,
      number: newNumber,
    }
    
    // This is some fuckery with React's state changes being batched
    // Basically have to give it a function to update it and reference
    // The updated variable if we are wanting to reference it straight away
    setPersons(prev => {
      const updated = prev.concat(newPerson)
      console.log("Current Phonebook Array: ", updated)
      return updated
    })

    console.log(`Added new person to phonebook with name: ${newName}, and number ${newNumber}`);
    
    setNewName('')
    setNewNumber('')
  }

  const handleNewNameChange = (event) =>
  {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const normalizedFilter = filter.trim().toLowerCase()
  const personsToShow = normalizedFilter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(normalizedFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Search</h3>
      <div>
        <Filter value={filter} onChange={handleFilterChange} />
      </div>

      <h3>Add</h3>
      <form>
        <div>
          name: <input value={newName} onChange={handleNewNameChange}/>
        </div>
        <div>
          number : <input value={newNumber} onChange={handleNewNumberChange}/>
        </div>
        <div>debug: {`${newName} (${newNumber})`}</div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <PersonList persons={personsToShow}/>
    </div>
  )
}

export default App