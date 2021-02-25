'use strict';

process.env.SECRET = 'toes';

const server = require('../src/server.js').server;
const supergoose = require('@code-fellows/supergoose');
const base64 = ('base-64');
const bearer = require('../src/auth/middleware/bearer.js');

const mockRequest = supergoose(server);

let users = {
  admin: { username: 'admin', password: 'password', role: 'admin' },
  editor: { username: 'editor', password: 'password', role: 'editor' },
  user: { username: 'user', password: 'password' },
};

describe('Testing Auth Router', () => {

  Object.keys(users).forEach(userType => {

    describe(`${userType} users`, () => {

      it('can create one', async () => {

        const response = await mockRequest.post('/signup').send(users[userType]);
        const userObject = response.body;

        expect(response.status).toBe(201);
        expect(userObject.token).toBeDefined();
        expect(userObject.user._id).toBeDefined();
        expect(userObject.user.username).toEqual(users[userType].username);

      });

      it('can signin with basic', async () => {

        const response = await mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password);

        const userObject = response.body;
        expect(response.status).toBe(200);
        expect(userObject.token).toBeDefined();
        expect(userObject.user._id).toBeDefined();
        expect(userObject.user.username).toEqual(users[userType].username);

      });

    });

  });

});

let retainedId;
let secondId;
let userToken;

describe('Testing Authenticated v2 API Routes', () => {

  it('Allow a bearer with \'create\' permissions to add an item to the DB on /api/v2/POST', async () => {
    const response = await mockRequest.post('/signup').send({ username: 'wash', password: 'pilot', role: 'admin' });
    const userObject = response.body;
    let userToken = userObject.token;

    const postResponse = await mockRequest.post('/api/v2/food/').send({
      name: 'Pizza',
      calories: 380,
      type: 'VEGETABLE',
    }).set({'Authorization': `Bearer ${userToken}`});

    retainedId = postResponse.body._id;

    expect(postResponse.status).toEqual(201);
    expect(postResponse.body._id).toBeTruthy();
    expect(postResponse.body.name).toEqual('Pizza');

    const secondPostResponse = await mockRequest.post('/api/v2/food/').send({
      name: 'Bacon',
      calories: 120,
      type: 'PROTIEN',
    }).set({'Authorization': `Bearer ${userToken}`});

    secondId = secondPostResponse.body._id;

  });

  it('Allow a bearer with \'read\' permissions to read a list of model items on /api/v2/GET', async () => {
    const response = await mockRequest.get('/api/v2/food').set({'Authorization': `Bearer ${userToken}`});

    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
  });

  it('Returns a single item to bearer with \'read\' permissions on GET to /api/v2/food/', async () => {
    const response = await mockRequest.get(`/api/v2/food/${retainedId}`).set({'Authorization': `Bearer ${userToken}`});

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Pizza');
  });

  // it('Allows bearer with \'update\' permissions change a record on PUT to /api/v2/food/', async () => {
  //   const response = await mockRequest.put(`/api/v2/food/${secondId}`).send({
  //     name: 'Pineapple',
  //     calories: 90,
  //     type: 'FRUIT',
  //   }).set({'Authorization': `Bearer ${userToken}`});

  //   expect(response.status).toEqual(200);
  //   expect(response.body.name).toEqual('Pineapple');
  // });


});