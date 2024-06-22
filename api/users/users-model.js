const db = require('../../data/db-config');

async function find() {
	const users = await db('users')
	.select('user_id', 'name')
	.orderBy('user_id', 'asc');
	return users;
}

async function findBy(filter) {
	return db('users').where(filter);
}

async function findById(user_id) {
	const [answer] = await db('users')
		.where('user_id', user_id);
	return answer;
}

async function add(user) {
	const [newUser] = await db('users').insert(user);
	return newUser;
}

async function remove(user_id) {
	const [oldUser] = await db('users').where('user_id', user_id)
	await db('users').where('user_id', user_id).del()
	return oldUser
}


module.exports = {
	add,
	findById,
	findBy,
	find,
	remove
};