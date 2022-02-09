const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')

//creating a connection to our databse
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mayla2020',
  database: 'inventory_db',
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  db.query('SELECT * FROM inventory_table;', (err, result) => {
    res.send(result)
  })
})

app.listen(3001, () => {
  console.log('running on port 3001')
})
