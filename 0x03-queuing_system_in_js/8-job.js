// job creation function
function createPushNotificationsJobs(jobs, queue) {
	// if jobs is not an array through an error
	if (!Array.isArray(jobs)) {
		throw new Error('Jobs is not an array');
	}
	// create a job in the queue for each job
	jobs.forEach(obj => {
		const job = queue.create('push_notification_code_3', obj);
		job.save((err) => {
			if (!err) {
				console.log(`Notification job created: ${job.id}`);
			}
		});
		// check completion
		job.on('completion', () => {
			console.log(`Notification job ${job.id} completed`);
		});
		// check failure
		job.on('failed', (err) => {
			console.log(`Notification job ${job.id} failed: ${err}`);
		});
		// check progress
		job.on('progress', (progress, data) => {
			console.log(`Notification job ${job.id} ${progress}% complete`);
		});
	});
};
// export function
module.exports = createPushNotificationsJobs;
