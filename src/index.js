import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import Context, { FirebaseContext } from './store/firebaseContext';
import { firebaseApp } from './firebase/config';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebaseApp }} >
      <Context>
      <App />
      </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>,
)


