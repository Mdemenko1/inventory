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

// Testing if connection is correct with mysql
// app.get('/', (req, res) => {
//   const sqlInsert =
//     'INSERT INTO inventory_table (title, quantity) VALUES ("banana", 1)'
//   db.query(sqlInsert, (err, result) => {
//     res.send(err)
//   })
// })

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

app.listen(3001, () => {
  console.log('running on port 3001')
})
