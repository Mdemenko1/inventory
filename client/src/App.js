import React, { useState, useEffect } from 'react'
import './App.css'
import Axios from 'axios'

function App() {
  const [itemName, setItemName] = useState('')
  const [itemQuantity, setItemQuantity] = useState()
  // const [increment, setIncrement] = useState()

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

  const deleteItem = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`)
  }

  const increment = (id) => {
    Axios.put(`http://localhost:3001/api/update/increment/${id}`)
  }

  const decrement = (id) => {
    Axios.put(`http://localhost:3001/api/update/decrement/${id}`)
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

      {itemList.length === 0 ? (
        <p>Inventory empty</p>
      ) : (
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
                  <td>
                    <button onClick={() => increment(item.id)}>+</button>
                  </td>
                  <td>
                    <button onClick={() => decrement(item.id)}> - </button>
                  </td>
                  <td>
                    <button onClick={() => deleteItem(item.id)}>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App
