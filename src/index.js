import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthState from "./Context/Auth/AuthState";

ReactDOM.render(
    <React.StrictMode>
        <AuthState>
            <App />
        </AuthState>

    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
