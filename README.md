# Access Control
---

## Overview

In this final phase, the new requirement is to extend the restrictive capabilities of our routes to our API, implementing a fully functional, authenticated and authorized API Server using the latest coding techniques

## Author: William Moreno

## Collaboration

- Carly Dekock
- James Gerstenberger
- Jason Dormier
- Jason Quaglia
- Nick Magruder
- Seid Mohammed

## Deployment

The app is deployed on Heroku at the following link:

- [Auth-API](https://wmoreno-auth-api.herokuapp.com/)

## Dependencies

Requires an .env file with the following values:

PORT=
MONGODB_URI=mongodb+srv://bill_moreno:pr4ct1c3@cluster0.oeetc.mongodb.net/bearerAuth?retryWrites=true&w=majority
SECRET=c0d1n615fun

## Daily Pull Request

Work was accomplished on the `dev` branch. The pull request to merge the code into the `main` branch is here:

- [Pull Request](https://github.com/William-Moreno/auth-api/pull/1)

Working features implemented:
- API and Authentication servers combined into one complete server
- POST route for both `'/signup'` and `'/signin'` uses basic authorization and returns a token
- GET routes to `'/secret'` and `'/users'` send authorization headers with bearer tokens


## Tests

Test suite written to test:

AUTH Routes
V1 (Unauthenticated API) routes

  - Tests Passing

V2 (Authenticated API) routes

  - Untested at this time, but functional in swagger


## UML

UML drawing created with [miro](https://miro.com/)

![UML Diagram](./assets/auth-api.PNG)