import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Main from './Main'
import ItemDetails from './ItemDetails'

function App() {
  return (
    <div>
      <h1 className="mt-5 text-purple text-center">Inventory Tracking App</h1>

      {/* <Link to="/">Home</Link> */}

      <Router>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/itemdetails/:id" element={<ItemDetails />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
