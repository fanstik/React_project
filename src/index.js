import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'; //安装react-router-dom，引入RouterProvider
// import App from './App';
import './index.scss'
import router from './router/index';
import { Provider } from 'react-redux';
import store from './store';
import 'normalize.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}></RouterProvider>
        </Provider>
    </React.StrictMode>
);

