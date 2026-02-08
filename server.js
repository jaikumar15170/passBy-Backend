const express = require('express')
const dontenv = require('dotenv')
const { MongoClient, Collection } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require('cors')
dontenv.config()


const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'PassBy';
const app = express()
const port = process.env.PORT || 3000
app.use(bodyparser.json())
app.use(cors())

client.connect();

// Get all the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const Collection = db.collection('passwords');
    const findResult = await Collection.find({}).toArray();
    res.json(findResult)
})

// save a password
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const Collection = db.collection('passwords');
    const findResult = await Collection.insertOne(password);
    res.send({ success: true, result: findResult })
})

// To Delete a Password
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const Collection = db.collection('passwords');
    const findResult = await Collection.deleteOne(password);
    res.send({ success: true, result: findResult })
})




app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})