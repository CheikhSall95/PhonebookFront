import { useState, useEffect } from 'react'
import NumbersToShow from './components/NumbersToShow'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const names = []
    {persons.map(person => names.push(person.name))}
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    const checkPerson = persons.find(person => 
      person.name.toLowerCase() === nameObject.name.toLowerCase())
    if (names.includes(nameObject.name))
    {   
      
      if (window.confirm(`${newName} is already there, replace the old number with a new ?`)) {
      const personUpdate = { ...checkPerson, number: newNumber }
        personService
          .update(checkPerson.id, personUpdate)
          .then(returnedPerson =>{
            setPersons(
              persons
                .map(person =>
                  person.id !== checkPerson.id 
                    ? person 
                    : returnedPerson)
                  )
                  setMessage(
                  {message: `${newName} updated ` ,
                  type : "success"}
                  )
                  setTimeout(() => {
                    setMessage(null)
                  }, 5000)
                
                
                } ) 
      }
    }


      
    
    else {
    personService
    .create(nameObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setMessage(
        {message:`Added ${newName} `,
        type : "success"}
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })

    }
   

 
  }
  
  const namesToShow = filter
  ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  : persons

  const removePerson = (id) => {
    const filteredPerson = persons.filter(person => person.id === id)
    const personName = filteredPerson[0].name
    const personId = filteredPerson[0].id
    if (window.confirm(`Delete ${personName} ?`)) {
      personService
        .remove(personId)
        .then(() => {
          setMessage(
            {message:`${personName} was successfully deleted`,
          type :"success"}
          )
          setPersons(persons.filter(person => person.id !== personId))
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      .catch(error => {
        setMessage(
          {message:`${personName}' was already removed from server`,
        type: "error"}
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
     
      })

    }
  }




  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <div>
        <Filter filter={filter} handleFilter={handleFilter} />
        </div>
        <div>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      </div>
      <h2>Numbers</h2>
      <NumbersToShow namesToShow={namesToShow} removePerson={removePerson} />
    </div>
  )
}

export default App