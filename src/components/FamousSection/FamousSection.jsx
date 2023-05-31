import React, { useEffect, useState } from 'react';
import './FamousSection.css';
import axios from 'axios';

function FamousSection() {
  let [famousPersonName, setPersonName] = useState('');
  let [famousPersonRole, setPersonRole] = useState('');
  let [famousPeopleArray, setPeopleArray] = useState([]);

  // TODO: on load, call the fetchPeople() function
  useEffect(() => {
    fetchPeople();
  }, [])

  const fetchPeople = () => {
    // TODO: fetch the list of people from the server
    axios.get('/people')
    .then((response) => {
      console.log(response.data)
      setPeopleArray(response.data)
    }).catch((err) => {
      console.log(err);
    })
  }

  const addPerson = (evt) => {
    evt.preventDefault();
    
    // TODO: create POST request to add this new person to the database
    axios.post('/people', {
      name: famousPersonName,
      role: famousPersonRole
    }).then((response) => {
      console.log(response.data)
      fetchPeople();
      setPersonName('');
      setPersonRole('');
    }).catch((err) => {
      console.log(err)
    })
  }

    return (
      <section className="new-person-section">
        <form onSubmit={addPerson}>
          <label htmlFor="name-input">Name:</label>
          <input value={famousPersonName} id="name-input" onChange={e => setPersonName(e.target.value)} />
          <label htmlFor="role-input">Famous for:</label>
          <input value={famousPersonRole} id="role-input" onChange={e => setPersonRole(e.target.value)} />
          <button type="submit">Done</button>
        </form>
        <ul>
          {/* TODO: Render the list of famous people */}
          {famousPeopleArray.map(person => (
          <li key={person.name}>
            {person.name} is famous for {person.role}
          </li>
          ))}
        </ul>
      </section>
    );
}

export default FamousSection;
