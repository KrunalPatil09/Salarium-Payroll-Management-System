const express = require("express");
const dotenv = require('dotenv');   
const connectDb = require('./config/dbconnection');
const adminRoutes = require('./routes/adminRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
dotenv.config();

connectDb();

const app = express();
app.use(express.json())

app.get('/', (req, res)=>{
    res.send("the api is runnuing")
})

app.use('/api/admin',adminRoutes)
app.use('/api/employee',employeeRoutes)


const port =process.env.PORT
app.listen({port}, ()=>{
    console.log(`server started on ${port}`);
})