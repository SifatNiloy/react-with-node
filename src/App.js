import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))


  }, [])
  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    fetch('http://localhost:5000/users', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }
  return (
    <div className="App">
      <h1>My own data:{users.length} </h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" placeholder='name' required />
        <input type="text" name="email" id="" placeholder='email' required />
        <input type="submit" value="add user" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>Name: {user.name} Email: {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
