import redis from 'redis';

// create a Redis client
const subscriber = redis.createClient();

// check on errors
subscriber.on('error', (err) => {
	console.error(`Redis client not connected to the server: ${err.message}`);
});

// connect
subscriber.on('connect', () => {
	console.log('Redis client connected to the server');
});

// subscribe to a channel
subscriber.subscribe('holberton school channel');

// Listen for messages
subscriber.on('message', (channel, message) => {
	// check if message is KILL_SERVER
	if (message === 'KILL_SERVER') {
		// unsubscribe from the channel
		subscriber.unsubscribe('holberton school channel', () => {
			// quit
			subscriber.quit();
		});
	}
	console.log(message);

});
