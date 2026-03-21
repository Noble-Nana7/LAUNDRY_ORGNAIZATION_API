require('dotenv').config()
const express = require('express'); 
const PORT = process.env.PORT ;
const sequelize = require('./database/sequelize')
const router = require('./routes/organisationRoute')
// const multer = require('multer')

const app = express()
// app.use(express.json())
app.use(router)
// log multer error
app.use((err, req, res, next)=> {
    if (err) {
        console.log(err)
        res.status(500).json({
            message: err.message
        })
    }
    next()
});

// db connection test
const dbConnection =  async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
dbConnection();

app.listen(PORT, () => {
    console.log(`App is running on PORT: ${PORT}`)
}) 