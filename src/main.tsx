import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from "./app";

ReactDOM.render(<BrowserRouter>
  <Routes>
    <Route path='/share/:id' element={<App />} />
    <Route path='/share' element={<h1>Hello SHare</h1>} />
    <Route path='/' element={<h1>Hello Home</h1>} />
  </Routes>
</BrowserRouter>, document.getElementById('app'))