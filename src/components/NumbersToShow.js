import Person from './Person'

const NumbersToShow = ({ namesToShow, removePerson}) => {


    return (
      <div>
        {namesToShow.map(person => 
        
            <Person key={person.id} person={person} removePerson={removePerson} />
          )}

      </div>
    )
  }

  export default NumbersToShow