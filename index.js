const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;



//middleware
app.use(cors());
app.use(express.json());




//connect database 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9x7m2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     console.log("db connect")
//     client.close();
// });


async function run() {
    try {
        await client.connect();
        const collection = client.db("todo_APP").collection("app_data");
        app.get('/task/:email', async (req, res) => {
            const email = req.params.email;
            const query = { "task.email": email };
            const cursor = await collection.find(query).toArray();

            res.send(cursor);


        });

        // post app task

        app.post('/task', async (req, res) => {
            const task = req.body;
            console.log(task)
            const doc = {
                task

            }
            const result = await collection.insertOne(doc);

            res.send(result);
        });

        //delete task 
        app.delete('/task/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await collection.deleteOne(query);
            res.send(result);
        });

        //  checked task or complated task

        app.put('/task/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    "task.status": false,

                }
            };
            const result = await collection.updateOne(query, updateDoc, options);
            res.send(result);

        });


    }
    finally {
        // client.close();
    }
}
run().catch(console.dir);

// create api test

app.get('/', (req, res) => {
    res.send("server is running");
})

app.listen(port, () => {
    console.log("Server is Running", port)
});