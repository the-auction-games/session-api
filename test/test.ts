// Imports
import request from 'supertest';
import { app, server } from '../src';

// The Mocha Test Suite for the Session API
describe('Session API', function () {

  // Called once before any of the tests in this block begin.
  this.beforeAll(function (done) {
    // Start the server
    console.log('Starting server...');

    // Call done
    done();
  });

  // Called once after all of the tests in this block complete.
  this.afterAll(function (done) {
    // Stop the server
    console.log('Stopping server...');

    // Close the connection
    server.close();

    // Call done
    done();
  });

  // Test the health check endpoint
  it('Health Check should return 200 / OK', function (done) {
    request(app)
      .get('/')
      .expect(200, done);
  });

  // Test the create session endpoint with valid payload
  it('Create should return 201 Created on valid payload', function (done) {
    request(app)
      .post('/api/v1/sessions')
      .send({
        "id": "1234",
        "accountId": "1234",
        "creationTimestamp": "1234",
        "expirationTimestamp": "1234"
      })
      .expect(201, done);
  });

  // Test the create session endpoint with invalid payload
  it('Create should return 400 Bad Request on invalid payload', function (done) {
    request(app)
      .post('/api/v1/sessions')
      .send({
        "invalid": "payload"
      })
      .expect(400, done);
  });

  // Test the get session endpoint with a valid id
  it('Get should return 200 OK on valid id', function (done) {
    request(app)
      .get('/api/v1/sessions/1234')
      .expect(200, done);
  });

  // Test the delete session endpoint with a valid id
  it('Delete should return 204 No Content on valid id', function (done) {
    request(app)
      .delete('/api/v1/sessions/1234')
      .expect(204, done);
  });

  // Test the get session endpoint with an invalid id
  it('Get should return 404 Not Found on invalid id', function (done) {
    request(app)
      .get('/api/v1/sessions/1234')
      .expect(404, done);
  });

  // Test the delete session endpoint with an invalid id
  it('Delete should return 204 No Content on invalid id', function (done) {
    request(app)
      .delete('/api/v1/sessions/1234')
      .expect(204, done);
  });
});