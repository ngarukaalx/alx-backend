import redis from 'redis';

// create a redis client
const client = redis.createClient();

// listen for errors
client.on('error', err => {
	console.log('Error failed to connect:', err);
});

// connect to the server
client.on('connect', () => {
	console.log('Redis client connected to the server');
});

function setHash() {
	const keyValue = { Portland: 50, Seattle: 80, 'New York': 20, Bogota: 20, Cali: 40, Paris: 2 };
	const key = 'HolbertonSchools';
	// iterate through each key, value
	Object.entries(keyValue).forEach(([field, value]) => {
		// set hash values
		client.hset(key, field, value, (err, reply) => {
			if (err) {
				console.error(err);
			} else {
				console.log('Reply: ', reply);
			}
		});
	});
	client.hgetall(key, (err, reply) => {
		if (err) {
			console.error(err);
		} else {
			console.log(reply);
		}
	});
};
// call the fuction
setHash()
