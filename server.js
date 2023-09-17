const express = require('express');
// imported from routes 
const approute= require('./Routes/route.js');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api', approute);

app.listen(PORT , ()=>{
    console.log(`server is started on PORT:${PORT}....`);
})