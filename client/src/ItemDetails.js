import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Axios from 'axios'
// import {itemlist} from "../data" // fetch from url

function ItemDetails() {
  const { id } = useParams()
  const [myId, setMyId] = useState(id)

  const [item, setItem] = useState()
  const [itemList, setItemList] = useState([])

  //Getting the data from the inventory table to display on the page
  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setItemList(response.data)
    })
  })

  useEffect(() => {
    setMyId(myId)
  }, [id])

  return (
    <div className="containter d-flex justify-content-center ">
      {itemList
        .filter((item) => item.id === parseInt(myId))
        .map((item) => {
          return (
            <div className="col-3 text-center btn-border mt-5 bg-light-purple m-2">
              <h3>Item Details:</h3>
              <div>Item title: {item.title}</div>
              <div>Quantity in stock: {item.quantity}</div>
              <div>Item Id: {item.id}</div>
              <Link to="/" className="btn btn-outline-purple btn-border my-3">
                Home
              </Link>
            </div>
          )
        })}
    </div>
  )
}

export default ItemDetails
