require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./utils/Errors/NotFoundError');
const rateLimiter = require('./middlewares/rateLimiter');
const CorsError = require("./utils/Errors/CorsError");

const { PORT = 3002} = process.env;

const allowedOrigins = [
    'https://flashpoint.twilightparadox.com',
    'http://localhost:3000',
];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new CorsError(origin));
        }
    },
    credentials: true
};

const app = express();

app.use(rateLimiter);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

mongoose.connect('mongodb://127.0.0.1:27017/flash_point_db');

app.use(requestLogger);

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/articles', require('./routes/articles'));

app.use((req, res, next) => next(new NotFoundError('Requested resource not found')));

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);