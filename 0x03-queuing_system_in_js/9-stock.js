import redis from 'redis';
import util from 'util';
import express from 'express';

// create a client
const client = redis.createClient();

// In stock in Redis
function reserveStockById(itemId, stock) {
	const value = JSON.stringify(stock);
	client.set(itemId, value, (err, reply) => {
		if (err) {
			console.log('Error setting', err);
		} else {
			console.log(reply);
		}
	});
};

// It will return the reserved stock for a specific item
async function getCurrentReservedStockById(ItemId) {
	const promisify = util.promisify;
	const getAsync = promisify(client.get).bind(client);

	try {
		const  value = await getAsync(ItemId);
		const parsedValue = JSON.parse(value);
		return parsedValue;
	} catch (err) {
		throw new Error('Not found');
	}
};

let listProducts = [
	{ Id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
	{ Id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
	{ Id: 3, name: 'Suitcase 650', price: 350, stock: 0 },
	{ Id: 4, name: 'Suitcase 1050', price: 550, stock: 5 }
];

// Data access
function getItemById(id) {
	let item = null;
	for (let i = 0; i < listProducts.length; i++) {
		const obj = listProducts[i];
		const idInt = parseInt(id, 10);
		if (obj.Id === idInt) {
			item = obj;
			break;
		}
	}
	return item;
};

const app = express();

const port = 1245;

app.get('/', (req, res) => {
	res.send('cool!');
});

// GET /list_products
app.get('/list_products', (req, res) => {
	res.json(listProducts);
});

// GET /list_products/:itemId
app.get('/list_products/:itemId', (req, res) => {
	const itemId = req.params.itemId;
	getCurrentReservedStockById(itemId)
		.then(result => {
			if (result !== null) {
				res.json(result);
			} else {
				const msg = { status: 'Product not found'};
				res.json(msg);
			}
		})
		.catch((error) => {
			const msg = { status: 'Product not found'};
			res.json(msg);
		});
});

// GET /reserve_product/:itemId
app.get('/reserve_product/:itemId', (req, res) => {
	const itemid = req.params.itemId;
	const item = getItemById(itemid);
	if (item === null) {
		const msg = { status: 'Product not found' };
		res.json(msg);
	}
	const stock = item.stock;
	if (stock < 1) {
		const msg = { status: 'Not enough stock available', itemId: itemid };
		res.json(msg);
	}
	if (stock >= 1) {
		reserveStockById(itemid, item);
		const msg = { status: 'Resevation confirmed', itemId: itemid };
		res.json(msg);
	}
});

app.listen(port, () => {
	console.log(`Express app listening on port ${port}`);
});
