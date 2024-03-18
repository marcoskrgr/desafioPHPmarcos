import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from './routes/Home.jsx';
import Categories from './routes/Categories.jsx';
import Products from './routes/Products.jsx';
import History from './routes/History.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "Categories",
        element: <Categories />
      },
      {
        path: "History",
        element: <History />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)