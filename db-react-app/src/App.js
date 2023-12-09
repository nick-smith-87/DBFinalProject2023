import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/greet')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {message ? <p>{message}</p> : <p>Loading...</p>}
      </header>
    </div>
  );
}

export default App;