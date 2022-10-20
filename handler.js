'use strict';

require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('./db');
const Planeta = require('./models/Planeta');
const fetch = require('node-fetch');

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() =>
    Planeta.create(JSON.parse(event.body))
    )
    .then(planeta => callback(null, {
      statusCode: 200,
      body: JSON.stringify(planeta)
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'No se puede crear el planeta.'
    }));
}

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() =>
    Planeta.findById(event.pathParameters.id)
    )
    .then(planeta => callback(null, {
      statusCode: 200,
      body: JSON.stringify(planeta)
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'No se puede obtener el planeta'
    }));
};

module.exports.getAll = (event, context, callback) => {
    let url = "http://swapi.py4e.com/api/planets/1/";
    let settings = { method: "Get" };

    fetch(url, settings)
        .then(res => res.json())
        .then((json) => {
          const planetas = JSON.parse(json)

          return planetas;  
        });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() =>
      Planeta.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
    )
    .then(planeta => callback(null, {
      statusCode: 200,
      body: JSON.stringify(planeta)
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'No se puede actualizar el planeta.'
    }));
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() =>
      Planeta.findByIdAndRemove(event.pathParameters.id)
    )
    .then(planeta => callback(null, {
      statusCode: 200,
      body: JSON.stringify({ message: 'Planeta removido con el id: ' + planeta._id, planeta: planeta })
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'No se puede borrar el planeta.'
    }));
};