const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const mongoClient = require('mongoose');


const app = express();

const userRoute = require('./routes/user')
    // Middlewares 

mongoClient.connect('mongodb://localhost/nodejsapistarter')
    .then(() => { console.log("Connected database from MongoDb ✔🐱‍🚀🐱‍🚀🐱‍👓✔✔") })
    .catch((error) => { console.error(`Connect database is failed with error which is ${error}`) });


app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/users', userRoute);
// Routes

app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Server is OK!'
    })
})

// Catch ERROR

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err); // Hàm đón nhận các lỗi để xử lý cuối cùng
})

// Error hanlder function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    // response to client 
    return res.status(status).json({
        error: {
            message: error.message
        }
    })
})

// Start the server

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});