import React from 'react';
import Chat from './Chat';

const App = () => {
  return (
    <div className="app" style={{ backgroundColor: 'white', padding: '5px' }}>
      <main className="app-main">
        <Chat />
      </main>
    </div>
  );
};

export default App;
