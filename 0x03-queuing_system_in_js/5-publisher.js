import redis from 'redis';

const client = redis.createClient();

// check errors
client.on('error', (err) => {
	console.error(`Redis client not connected to the server: ${err.message}`);
});

// connect to redis-server
client.on('connect', () => {
	console.log('Redis client connected to the server');
});

function publishMessage(message, time) {
	// execute after a specified time
	setTimeout(() => {
		console.log(`About to send MESSAGE ${message}`);
		client.publish('holberton school channel', message);
	}, time);
};
publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);
