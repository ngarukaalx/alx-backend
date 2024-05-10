import kue from 'kue';
import chai from 'chai';

// import function to test
import createPushNotificationsJobs from './8-job.js';

let  queue = kue.createQueue();

// Enter test mode
queue.testMode.enter();

// Clear the queue
queue.testMode.clear();

//run tests
describe('createPushNotificationsJobs', () => {
	it('displays an error message if jobs is not an array', (done) => {
		const data = { phoneNumber: '4153518780' };
		try {
			createPushNotificationsJobs(data, queue, () => {});
			throw new Error('Function did not throw an error');
		} catch (error) {
			chai.expect(error.message).to.equal('Jobs is not an array');
		}
		queue.testMode.exit();
		queue.testMode.clear();
		done();

	});
	it('creates two new jobs to the queue', (done) => {
		const data = [
			{
				phoneNumber: '4153518780',
				message: 'This is the code 1234 to verify your account'
			},
			{
				phoneNumber: '0712408072',
				message: 'This is the code 1235 to verify your account'
			}
		];
		createPushNotificationsJobs(data, queue, () => { 
		// Get the jobs in the queue
		const jobs_created = queue.jobs();

		console.log(jobs_created);

		// exit test mode and clear the queue
		queue.testMode.exit();
		queue.testMode.clear();
		});
		done();
	});
});
