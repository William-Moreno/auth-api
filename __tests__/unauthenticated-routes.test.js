'use strict';

require('@code-fellows/supergoose');
const supertest = require('supertest');
const server = require('../src/server.js');
const request = supertest(server.server);


describe('Testing unauthenticated API routes', () => {

  
  it('Should successfully create a food on POST /api/v1/food', async () => {
    const response = await request.post('/api/v1/food/').send({
      name: 'Pizza',
      calories: 380,
      type: 'VEGETABLE',
    });

    expect(response.status).toEqual(201);
    expect(response.body._id).toBeTruthy();
    expect(response.body.name).toEqual('Pizza');
  });

  it('Should successfully create clothes on POST /api/v1/clothes', async () => {
    const response = await request.post('/api/v1/clothes').send({
      name: 'Socks',
      color: 'White',
      size: 'One Size',
    });

    expect(response.status).toEqual(201);
    expect(response.body._id).toBeTruthy();
    expect(response.body.color).toEqual('White');
  });
  
  it('Should return a list of records using GET /api/v1/food', async () => {
    const response = await request.get('/api/v1/food');

    expect(response.status).toEqual(200);
    expect(response.body[0].type).toEqual('VEGETABLE');
  });

  it('Should return a list of records using GET /api/v1/clothes', async () => {
    const response = await request.get('/api/v1/clothes');

    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('Socks');
  });

  it('Should return specified food by request parameter on GET /api/v1/food/', async () => {
    const response = await request.post('/api/v1/food').send({
      name: 'Waffles',
      calories: 600,
      type: 'PROTIEN',
    });
    let foodTestId = response.body._id;

    const getResponse = await request.get(`/api/v1/food/${foodTestId}`);

    expect(getResponse.status).toEqual(200);
    expect(getResponse.body._id).toEqual(foodTestId);
    expect(getResponse.body.name).toEqual('Waffles');
  });

  it('Should return specified clothes by request parameter on GET /api/v1/clothes/', async () => {
    const response = await request.post('/api/v1/clothes').send({
      name: 'Jacket',
      color: 'Red',
      size: 'Large',
    });
    let clothesTestId = response.body._id;

    const getResponse = await request.get(`/api/v1/clothes/${clothesTestId}`);

    expect(getResponse.status).toEqual(200);
    expect(getResponse.body._id).toEqual(clothesTestId);
    expect(getResponse.body.name).toEqual('Jacket');
  });

  it('Should update specified record by request parameter on PUT /api/v1/food', async () => {
    const response = await request.post('/api/v1/food').send({
      name: 'PB&J',
      calories: 250,
      type: 'PROTIEN',
    });
    let foodTestId = response.body._id;

    const putResponse = await request.put(`/api/v1/food/${foodTestId}`).send({
      name: 'Ice Cream',
      calories: 800,
      type: 'FRUIT',
    });

    expect(putResponse.status).toEqual(200);
    expect(putResponse.body._id).toEqual(foodTestId);
    expect(putResponse.body.name).toEqual('Ice Cream');
  });

  it('Should update specified record by request parameter on PUT /api/v1/clothes', async () => {
    const response = await request.post('/api/v1/clothes').send({
      name: 'Hat',
      color: 'Blue',
      size: 'One Size',
    });
    let clothesTestId = response.body._id;

    const putResponse = await request.put(`/api/v1/clothes/${clothesTestId}`).send({
      name: 'Pants',
      color: 'Black',
      size: 'Medium',
    });

    expect(putResponse.status).toEqual(200);
    expect(putResponse.body._id).toEqual(clothesTestId);
    expect(putResponse.body.color).toEqual('Black');
  });

  it('Should destroy specified record by request parameter on DELETE /api/v1/food', async () => {
    const response = await request.post('/api/v1/food').send({
      name: 'PB&J',
      calories: 250,
      type: 'PROTIEN',
    });
    let foodTestId = response.body._id;

    const deleteResponse = await request.delete(`/api/v1/food/${foodTestId}`);


    expect(deleteResponse.status).toEqual(200);
    expect(deleteResponse.body._id).toEqual(foodTestId);
    expect(deleteResponse.body.name).toEqual('PB&J');

    const checkDelete = await request.get(`/api/v1/food/${foodTestId}`);
    
    expect(checkDelete.body).toBeFalsy();
  });

  it('Should destroy specified record by request parameter on DELETE /api/v1/clothes', async () => {
    const response = await request.post('/api/v1/clothes').send({
      name: 'Gloves',
      color: 'White',
      size: 'Large',
    });
    let clothesTestId = response.body._id;

    const deleteResponse = await request.delete(`/api/v1/clothes/${clothesTestId}`);

    expect(deleteResponse.status).toEqual(200);
    expect(deleteResponse.body._id).toEqual(clothesTestId);
    expect(deleteResponse.body.name).toEqual('Gloves');

    const checkDelete = await request.get(`/api/v1/clothes/${clothesTestId}`);
    
    expect(checkDelete.body).toBeFalsy();
  });

});