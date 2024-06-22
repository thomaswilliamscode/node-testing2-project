const db = require('../data/db-config')
const request = require('supertest')
const server = require('./server')

beforeAll( async () => {
	await db.migrate.rollback()
	await db.migrate.latest()
})

beforeEach( async () => {
	await db.seed.run()
})

describe( '[GET] /api/users', () => {
	test('responds with 200 ok', async () => {
		const res = await request(server).get('/api/users')
		expect(res.status).toBe(200)
	})
	test('responds with all users', async () => {
		const res = await request(server).get('/api/users');
		expect(res.body).toHaveLength(4)
	});
})

describe('[GET] /api/users/:id', () => {
	let user_id = 1;
	test('responds with 200', async () => {
		let res = await request(server).get(`/api/users/${user_id}`)
		expect(res.status).toBe(200)
	})
	test('responds with json', async () => {
		let user = await db('users').where('user_id', user_id).first()
		let res = await request(server).get(`/api/users/${user_id}`);
		expect(res.body).toHaveProperty('name', user.name);
	});
});

describe( '[POST] /api/users', () => {
	let newUser = {}
	test('requires name key', async () => {
		const res = await request(server).post('/api/users', newUser)
		expect(res.status).toBe(400)
	})
	test('requires age key', async () => {
		newUser = { name: 'Thomas', weight: 290}
		const res = await request(server).post('/api/users', newUser);
		expect(res.status).toBe(400);
	});
	test('requires weight key', async () => {
		newUser = { name: 'Thomas', age: 33 };
		const res = await request(server).post('/api/users', newUser);
		expect(res.status).toBe(400);
	});
})

describe( '[DELETE] /api/users/:id', () => {
	let user_id = 4;
	test('after delete returns 200', async () => {
		const res = await request(server).del(`/api/users/${user_id}`)
		expect(res.status).toBe(200)
	})
	test('responds with proper json', async () => {
		const user = await db('users').where('user_id', user_id).first()
		const res = await request(server).del(`/api/users/${user_id}`);
		expect(res.body).toHaveProperty('name', user.name)
	});
	test('truly deletes from database', async () => {
		const res = await request(server).del(`/api/users/${user_id}`);
		const deletedUser = await db('users').where('user_id', user_id).first()
		expect(deletedUser).toBe(undefined)
	})
})

