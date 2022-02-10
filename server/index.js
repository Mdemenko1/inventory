const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mayla2020',
  database: 'inventory_db',
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/get', (req, res) => {
  const sqlSelect = 'Select * FROM inventory_table'
  db.query(sqlSelect, (err, result) => {
    res.send(result)
  })
})

app.post('/api/insert', (req, res) => {
  const itemName = req.body.itemName
  const itemQuantity = req.body.itemQuantity

  const sqlInsert = 'INSERT INTO inventory_table (title, quantity) VALUES (?,?)'
  db.query(sqlInsert, [itemName, itemQuantity], (err, result) => {
    console.log(result)
  })
})

app.delete('/api/delete/:id', (req, res) => {
  const id = req.params.id
  const sqlDelete = `DELETE FROM inventory_table WHERE id = ?`

  db.query(sqlDelete, id, (error, result) => {
    if (error) console.log(error)
  })
})

//Increment
app.put('/api/update/increment/:id', (req, res) => {
  const name = req.params.id
  const sqlUpdate = `UPDATE inventory_table SET quantity = quantity + 1 WHERE id = ?`

  db.query(sqlUpdate, name, (error, result) => {
    if (error) console.log(error)
  })
})

//Decrement
app.put('/api/update/decrement/:id', (req, res) => {
  const name = req.params.id
  const sqlUpdate = `UPDATE inventory_table SET quantity = quantity - 1 WHERE id = ?`

  db.query(sqlUpdate, name, (error, result) => {
    if (error) console.log(error)
  })
})

app.listen(3001, () => {
  console.log('running on port 3001')
})
