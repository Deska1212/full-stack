import { useEffect, useState } from 'react'
import Filter from './Components/Filter'
import PersonList from './Components/PersonList'
import noteService from './Services/phonebookService'

// Make it possible for users to delete entries from the phonebook

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('Use effect called')

    // Retrieve the initial DB state from the server
    noteService.getAll().then(response => {
      console.log('Retrieved initial records from server')
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

    // Validate inputs
    if (newName.trim() === "")
    {
      alert('Name cannot be empty')
      return
    }

    if(newNumber.trim() === '')
    {
      alert('Number cannot be empty')
      return
    }

    // Check if name already exists and update number if different
    const exists = persons.find(p => p.name === newName);
    if(exists)
    {
      const oldPerson = exists
      console.log(`Found existing person of name ${oldPerson.name}`)
      
      const newPerson = {
        name: oldPerson.name,
        number: newNumber
      }

      
      noteService.update(oldPerson.id, newPerson)
        .then(response => {
          const updatedPerson = response.data
          setPersons(prev => prev.map(p => p.id === updatedPerson.id ? updatedPerson : p))
          setNewName('')
          setNewNumber('')
          console.log(`Updated number of ${updatedPerson.name} on client`)
        })
        .catch(error => {
         console.error('Update failed', error)
         alert('Failed to update person on server.')
      })

      return
    }


    // Add record to server - One doesn't already exist

    // Create person object (Without ID, recieves ID from server)
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    
    
    // Create the user on the server and update clientside
    noteService.create(newPerson).then(response => {
      const person = response.data
      setPersons(prev => prev.concat(person))
      setNewName('')
      setNewNumber('')
      console.log(`Created user: ${person.name} (${person.number})`)
    })
    .catch(error => {
        console.log('Create failed', error)
        alert('Failed to add person to server.')
      }
    )
  }



  const removeName = (id) => {
    // Guard clause if we hit cancel on the prompt
    if(!window.confirm("Delete person from Phonebook?"))
    {
      console.log(`Phonebook record of ID ${id} has not been deleted`)
      return
    }

    // Delete user from server
    noteService.remove(id).then(response => {
      const removedUser = response.data
      setPersons(prev => prev.filter(p => p.id !== removedUser.id))
      console.log(`User ${removedUser.name} of ID ${removedUser.id} has been removed from server`)
    })
    .catch(error => {
        console.error('Failed to delete user from server', error)
        alert('Failed to delete user from server')
      }
    )

    

    
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
        <PersonList persons={personsToShow} removePerson={removeName}/>
    </div>
  )
}

export default App