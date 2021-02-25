'use strict';

process.env.SECRET = 'toes';

const server = require('../src/server.js').server;
const supergoose = require('@code-fellows/supergoose');
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

// describe('Testing Authenticated v2 API Routes', () => {
//   it('Allow a bearer with \'create\' permissions to add an item to the DB on /api/v2/POST', async () => {
//     const response = await mockRequest.post('/signup').send(users.editor);
//     const userObject = response.body;
//     const userToken = userObject.token;
//     console.log(userObject);

//     const postResponse = await mockRequest.post('/api/v2/food/').send({
//       name: 'Pizza',
//       calories: 380,
//       type: 'VEGETABLE',
//     }).set({'Authorization': `Bearer ${userToken}`});

//     expect(postResponse.status).toEqual(201);
//     expect(postResponse.body._id).toBeTruthy();
//     expect(postResponse.body.name).toEqual('Pizza');
//   });
// });