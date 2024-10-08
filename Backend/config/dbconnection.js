const mongoose = require('mongoose');

const connectDb = async () =>{
    try {
         const conn = await mongoose.connect(process.env.DBCONNECTIONURL, {
            // useNewUrlparser : true,
            // useUnifiedtopology : true,
         }) ;
         console.log(`MongoDb connected : ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error : ${error.message}`)
        process.exit();
    }
};

module.exports = connectDb;