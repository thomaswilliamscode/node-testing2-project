exports.seed = function (knex) {
	return knex('users').insert([
		{
			name: 'Ruby',
			age: 8,
			weight: 69,
		},
		{
			name: 'Abigail',
			age: 8,
			weight: 45,
		},
		{
			name: 'Emmy',
			age: 4,
			weight: 40,
		},
		{
			name: 'Yuki',
			age: 1,
			weight: 51,
		}
	]);
};
