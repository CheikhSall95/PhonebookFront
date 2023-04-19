const Person = ({ person, removePerson}) => {
    return (
      <li>{person.name} {person.number} <button onClick={() => removePerson(person.id)}>Delete</button></li>
    )
  }

  export default Person