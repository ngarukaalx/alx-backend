const kue = require('kue');

const queue = kue.createQueue();

// create an object containg the job data
const jobData = {
	phoneNumber: '0712408072',
	message: 'Welcome to topcounty its good to have you',
}

// create a job
const job = queue.create('push_notification_code', jobData).save((err) => {
	if (!err) {
		console.log('Notification job created: ', job.id);
	}
});

// Event handler for job completion
job.on('complete', () => {
	console.log('Notification job completed');
});

//Event handler
job.on('failed', () => {
	console.log('Notification job failed');
});
