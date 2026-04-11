import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Project from './pages/Project';
import Contact from './pages/Contact';
const router = createBrowserRouter([
    {
        path: '/',
        element: _jsx(App, {}),
        children: [
            { index: true, element: _jsx(Home, {}) },
            { path: 'about', element: _jsx(About, {}) },
            { path: 'projects', element: _jsx(Projects, {}) },
            { path: 'projects/:slug', element: _jsx(Project, {}) },
            { path: 'contact', element: _jsx(Contact, {}) }
        ]
    }
]);
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(RouterProvider, { router: router }) }));
console.log('REAL APP TSX LOADED');
