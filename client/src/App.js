import React, { useState, useEffect } from 'react'
import './App.css'
import Axios from 'axios'

function App() {
  const [itemName, setItemName] = useState('')
  const [itemQuantity, setItemQuantity] = useState()

  const createItem = () => {
    Axios.post('http://localhost:3001/api/insert', {
      itemName: itemName,
      itemQuantity: itemQuantity,
    }).then(() => {
      alert('successful insert')
    })
  }

  return (
    <div className="App">
      <h1>Inventory Tracking App</h1>
      <div>Create new item:</div>
      <form>
        <input
          type="text"
          name="itemName"
          onChange={(event) => {
            setItemName(event.target.value)
          }}
        />
        <input
          type="number"
          name="itemQuantity"
          onChange={(event) => {
            setItemQuantity(event.target.value)
          }}
        />
        <button type="submit" onClick={createItem}>
          Create
        </button>
      </form>
    </div>
  )
}

export default App
