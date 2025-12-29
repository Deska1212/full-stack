import Person from "./Person"

const PersonList = ({persons}) => (
    <ul>
        {
            persons.map((person) => (
                // Note: key needs to be in scope of the map that is creating the element
                <Person key={person.name} person={person}/>
            ))
        }
    </ul>
)

export default PersonList