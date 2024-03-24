import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import LoginProvider from './contexts/LoginContextProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  {/*providing global store to app */}
    <LoginProvider>
      <App />
    </LoginProvider>
    
  </React.StrictMode>
);
