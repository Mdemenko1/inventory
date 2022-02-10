const util = require('util')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')
const nodemailer = require('nodemailer')

const db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'mayla2020',
})

db.query('CREATE DATABASE IF NOT EXISTS inventory_db', function (err, result) {
  if (err) throw err

  db.query(
    `CREATE TABLE IF NOT EXISTS inventory_db.inventory_table (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(45) NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    PRIMARY KEY (id));
  `,
    function (err, result) {
      if (err) throw err

      console.log('inventory_table table created')
    }
  )
  console.log('inventory_db database created')
})

// Promisify for Node.js async/await.
db.query = util.promisify(db.query)

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/get', (req, res) => {
  const sqlSelect = 'Select * FROM inventory_db.inventory_table'
  db.query(sqlSelect, (err, result) => {
    res.send(result)
  })
})

app.post('/api/insert', (req, err) => {
  const itemName = req.body.itemName
  const itemQuantity = req.body.itemQuantity

  const sqlInsert =
    'INSERT INTO inventory_db.inventory_table (title, quantity) VALUES (?,?)'
  if (itemQuantity === 0) console.log('Item Quantity need to be a minimum of 1')
  else {
    db.query(sqlInsert, [itemName, itemQuantity], (err, result) => {
      if (err) console.log(err)
      console.log(result)
    })
  }
})

app.delete('/api/delete/:id', (req, res) => {
  const id = req.params.id
  const sqlDelete = `DELETE FROM inventory_db.inventory_table WHERE id = ?`

  db.query(sqlDelete, id, (error, result) => {
    if (error) console.log(error)
  })
})

// delete all inventory
app.delete('/api/deleteinventory', (res) => {
  const sqlDeleteInventory = `DELETE FROM inventory_db.inventory_table`
  const sqlResetTable = `ALTER TABLE inventory_db.inventory_table AUTO_INCREMENT = 1;`

  db.query(sqlDeleteInventory, (error) => {
    if (error) console.log(error)
  })

  db.query(sqlResetTable, (error) => {
    if (error) console.log(error)
  })
})

//Increment
app.put('/api/update/increment/:id', (req, res) => {
  const name = req.params.id
  const sqlUpdate = `UPDATE inventory_db.inventory_table SET quantity = quantity + 1 WHERE id = ?`

  db.query(sqlUpdate, name, (error, result) => {
    if (error) console.log(error)
  })
})

//Decrement
app.put('/api/update/decrement/:id', (req, res) => {
  const id = req.params.id
  const sqlUpdate = `UPDATE inventory_db.inventory_table SET quantity = quantity - 1 WHERE id = ?`
  const sqlItemName = `SELECT title FROM inventory_db.inventory_table WHERE id = ?`
  const sqlItemQuantity = `SELECT quantity FROM inventory_db.inventory_table WHERE id = ?`

  db.query(sqlUpdate, id, (error, result) => {
    if (error) console.log(error)
  })

  db.query(sqlItemQuantity, id, (error, result) => {
    if (error) console.log(error)
    else {
      if (result[0].quantity === 1) {
        db.query(sqlItemName, id, (error, result) => {
          const dbItemTitle = [result[0].title]
          if (error) console.log(error)

          // Nodemailer initialization connected to Mailtrap.io
          var transport = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
              user: 'c22b9d9b627b32',
              pass: 'fe9ca3c9139a98',
            },
          })

          // Email template
          const output = `
          <p>Hello,</p>
          <p>Item <strong>${dbItemTitle} </strong> currently is out of stock. Please accept our apologies for this inconvenience.</p>
          <p> Sincerely</p>
          <p> Inventory Tracking App Team</p>
          `
          // Email information
          var mailOptions = {
            from: 'inventoryappctd@gmail.com',
            to: 'example@gmail.com',
            subject: `Inventory Tracking App Notification: Item ${dbItemTitle} is out of stock.`,
            html: output,
          }

          // Send email
          transport.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error)
            } else {
              console.log(
                'Email sent to: ' +
                  info.envelope.to +
                  ' Subject: ' +
                  mailOptions.subject
              )
            }
          })
        })
      }
    }
  })
})

app.listen(3001, () => {
  console.log('running on port 3001')
})
