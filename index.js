const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cros = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000

//create app
const app = express()



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h5pfr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect()
        const serviceCollection = client.db('qk-car').collection('service')

        app.get('/service', async(req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query)
            const services = await cursor.toArray()
            res.send(services)
        })

        app.get('/service/:id', async(req, res) => {
            const id = req.params.id
            const query = {_id: ObjectId(id)}
            const service = await serviceCollection.findOne(query)
            res.send(service)
        })

        app.post('/service', async (req, res) => {
            const newService = req.body
            const result = await serviceCollection.insertOne(newService)
            res.send(result)
        })

        app.delete('/service/:id', async (req, res) => {
            const id = req.params.id
            const query = {_id: ObjectId(id)}
            const result = await serviceCollection.deleteOne(query)
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(console.dir)


//middleware use
app.use(cros())
app.use(express.json())



app.get('/', (req, res) => {
    res.send('hello world')
})


app.listen(port, () => {
    console.log('listening on port', port)
})