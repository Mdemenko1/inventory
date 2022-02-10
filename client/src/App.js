import React, { useState, useEffect } from 'react'
import './App.css'
import Axios from 'axios'

function App() {
  const [itemName, setItemName] = useState('')
  const [itemQuantity, setItemQuantity] = useState()

  const [itemList, setItemList] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setItemList(response.data)
    })
  })

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
          required
        />
        <input
          type="number"
          name="itemQuantity"
          onChange={(event) => {
            setItemQuantity(event.target.value)
          }}
          required
        />
        <button type="submit" onClick={createItem}>
          Create
        </button>
      </form>

      <table className="table table-hover ">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((item) => {
            return (
              <tr>
                <td> {item.id}</td>
                <td> {item.title}</td>
                <td> {item.quantity}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App
