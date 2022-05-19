const express = require("express");
const app = express();
const port = process.env.PORT || 5000;






// create api

app.get('/', (req, res) => {
    res.send("server is running");
})

app.listen(port, () => {
    console.log("Server is Running", port)
});