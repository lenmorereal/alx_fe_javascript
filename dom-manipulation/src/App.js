// src/App.js
import React, { useEffect, useState } from 'react';
import syncQuotesWithServer from './utils/syncQuotes';
import Notification from './components/Notification';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const syncData = async () => {
      await syncQuotesWithServer();
      setMessage('Quotes synced with server successfully.');
    };
    syncData();
  }, []);

  return (
    <div className="App">
      {message && <Notification message={message} />}
      {/* Rest of your app components */}
    </div>
  );
}

export default App;
