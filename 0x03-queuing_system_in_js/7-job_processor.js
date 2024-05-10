import kue from 'kue';

// blacklisted number
const blackList = ['4153518780', '4153518781'];

function sendNotification(phoneNumber, message, job, done) {
	// track the process of the job when fuction is called
	job.progress(0, 100);

	// ckeck if phoneNumber is blacklisted
	if (blackList.includes(phoneNumber)) {
		// fail the job with an error msg
		const msg = `Phone number ${phoneNumber} is blacklisted`;
		done(new Error(msg));
	} else {
		job.progress(50, 100);
		console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
		// finish job
		done();
	}
}

// create a queue with a concurrency 2
const queue = kue.createQueue({ concurrency: 2 });

// process jobs from the queue
queue.process('push_notification_code_2', 2, (job, done) => {
	// Extract data
	const { phoneNumber, message } = job.data;
	// call fuction to send notifications
	sendNotification(phoneNumber, message, job, done)

});
