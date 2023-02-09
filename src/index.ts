// Import statments
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';

// Express port to run on
const port = 3000;

// Base url of session microservice
const baseEndpointUrl = '/api/v1/sessions';

// Base url of sidecar
const baseSidecarUrl = 'http://localhost:3503/v1.0/state/cache';

// Create a new express application instance
const app: Express = express();

// Enable json parsing globally
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable cors globally
app.use(cors());

// Endpoint for getting a session
app.get(`${baseEndpointUrl}/:id`, (req: Request, res: Response) => {

  // Log the session id
  console.log('Getting session with id: ' + req.params.id);

  // Get the session from the cache
  axios.get(baseSidecarUrl + '/' + req.params.id)
    .then((response) => {
      // Check if the session exists
      if (response.data.length == 0) {
        // Log not found
        console.log('Session with id: ' + req.params.id + ' not found!');

        // Return not found
        res.status(404).send();
      } else {
        // Return valid response
        res.status(200).send(response.data);
      }
    });
});

// Endpoint for creating a session
app.post(`${baseEndpointUrl}`, (req: Request, res: Response) => {

  // Cast the body to a session
  let session = req.body;

  // Check if valid body
  if (session.id == undefined || session.accountId == undefined || session.creationTimestamp == undefined || session.expirationTimestamp == undefined) {
    // Return bad request
    res.status(400).send();
    return;
  }

  // Create the payload for the post request
  let payload = [
    {
      "key": session.id,
      "value": session
    }
  ];

  // Log the payload
  console.log('Creating session...');
  console.log(payload);

  // Post to the cache
  axios.post(baseSidecarUrl, payload)
    .then((response) => {
      // Return response code, either 200 for ok, 500 for server error
      res.status(response.status == 204 ? 201 : 500).send();
    });
});

// Endpoint for deleting a session
app.delete(`${baseEndpointUrl}/:id`, (req: Request, res: Response) => {
  // Log the session id
  console.log('Deleting session with id: ' + req.params.id);

  // Delete the session from the cache
  axios.delete(baseSidecarUrl + '/' + req.params.id)
    .then((response) => {
      // Return response code, either 200 for ok, 500 for server error
      res.status(response.status == 204 ? 204 : 500).send();
    });
});

// Health check
app.get('/', (req: Request, res: Response) => {
  res.status(200).send();
});

// Start the app
const server = app.listen(port, () => {
  console.log(`Session Microservice up and running @ http://localhost:${port}`);
});

// Export app and server
export { app, server };