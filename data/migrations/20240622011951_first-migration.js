exports.up = function (knex) {
	return knex.schema.createTable('users', (users) => {
		users.increments('user_id');

		users.string('name', 128).notNullable().unique();

		users.integer('age', 128).notNullable();

		users.integer('weight', 128).notNullable();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('users');
};
