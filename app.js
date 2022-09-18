const { MongoClient } = require("mongodb");

// Connection URI
const uri =
  "mongodb://localhost:27017";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    //database
    const database = client.db("insertDB");
    const fruits = database.collection("fruits");

    //create a document
    const docs = [
        {
            title:"apple",
            score:9,
        },
        {
            title:"banana",
            score:8,
        },
        {
            title:"orange",
            score:7,
        }
    ]

    

    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };
    
    
    const result = await fruits.insertMany(docs,options);
    console.log(`${result.insertedCount} documents were added!\n`);
    
    const query = {score:{$gt:7}};
    const optionsFruits = {sort:{title:1},projection:{_id:1,title:1,score:1}}
    const read = fruits.find(query,optionsFruits);
    await read.forEach(console.dir);
    



    // Establish and verify connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
