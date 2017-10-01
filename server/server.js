if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');

const mongoose = require('mongoose');
mongoose.Promise = Promise;

const config = require('../config');
const schema = require('./schema');
const db = process.env.DB || config.DB;
const env= process.env.NODE_ENV || 'dev';

const app = express();

mongoose.connect(db, {useMongoClient: true})
  .then(() => console.log('successfully connected to', db))
  .catch(err => console.log('connection failed', err));

app.use(bodyParser.json());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: env === 'dev'
}));

module.exports = app;
