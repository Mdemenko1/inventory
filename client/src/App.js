import React, { useState, useEffect } from 'react'
import './App.css'
import Axios from 'axios'

function App() {
  const [itemName, setItemName] = useState('')
  const [itemQuantity, setItemQuantity] = useState('')
  const [itemList, setItemList] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setItemList(response.data)
    })
  })

  const createItem = (event) => {
    event.preventDefault()
    Axios.post('http://localhost:3001/api/insert', {
      itemName: itemName,
      itemQuantity: parseInt(itemQuantity),
    }).then(() => {
      alert('successful insert')
    })
    setItemName('')
    setItemQuantity('')
  }

  const deleteItem = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`)
  }

  const deleteInventory = (event) => {
    event.preventDefault()
    Axios.delete(`http://localhost:3001/api/deleteinventory`)
  }

  const increment = (id) => {
    Axios.put(`http://localhost:3001/api/update/increment/${id}`)
  }

  const decrement = (id) => {
    Axios.put(`http://localhost:3001/api/update/decrement/${id}`)
  }

  return (
    <div className="container text-center btn-border mt-5 bg-light-purple">
      <h1 className="mt-5 text-purple">Inventory Tracking App</h1>
      <h5>Create new item:</h5>
      <form
        className="form d-flex flex-column col-3 mx-auto mb-3"
        onSubmit={(e) => createItem(e)}
      >
        <input
          type="text"
          value={itemName}
          onChange={(event) => {
            setItemName(event.target.value)
          }}
          className="form-control my-1"
          placeholder="Item Name"
          required
        />
        <input
          type="number"
          value={itemQuantity}
          min="1"
          onChange={(event) => {
            setItemQuantity(event.target.value)
          }}
          className="form-control my-1"
          placeholder="Quantity"
          required
        />
        <button
          type="submit"
          className="btn btn-outline-purple btn-border mt-2"
        >
          Create
        </button>
      </form>

      {itemList.length === 0 ? (
        <h5>Inventory is currently empty.</h5>
      ) : (
        <>
          <table className="table table-hover table-sm align-middle w-75 mx-auto">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Increment</th>
                <th scope="col">Decrement</th>
              </tr>
            </thead>
            <tbody>
              {itemList.map((item) => {
                return (
                  <tr key={item.id}>
                    <td> {item.id}</td>
                    <td className="text-capitalize"> {item.title}</td>
                    {item.quantity === 0 ? (
                      <td>Out of stock</td>
                    ) : (
                      <td>{item.quantity}</td>
                    )}
                    <td>
                      <button
                        onClick={() => increment(item.id)}
                        className="btn btn-small"
                      >
                        +
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => decrement(item.id)}
                        className="btn btn-small"
                      >
                        -
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="btn btn-small btn-outline-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <form onSubmit={deleteInventory}>
            <button
              type="submit"
              className="btn btn-small btn-outline-danger my-4 mx-auto"
            >
              Delete all inventory
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default App
