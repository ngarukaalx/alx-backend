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

function setNewSchool(schoolName, value) {
	// set the value pair
	client.set(schoolName, value, (err, reply) => {
		if (err) {
			console.err('Error setting: ', err);
		} else {
			console.log(reply);
		}
	});
};

function displaySchoolValue(schoolName) {
	// display value for a key
	client.get(schoolName, (err, reply) => {
		if (err) {
			console.err('Error getting: ', err);
		} else {
			console.log(reply);
		}
	});
};

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
