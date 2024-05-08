// Using Babel and ES6.It should connect
// to the Redis server running on my machine:

import redis from 'redis';

// create a Redis client
const client = redis.createClient();

// listen for errors
client.on('error', err => {
	console.log(`Redis client not connected to the server: ${err.message}`);
});

// connect to the redis server
client.on('connect', () => {
	console.log('Redis client connected to the server');
});
