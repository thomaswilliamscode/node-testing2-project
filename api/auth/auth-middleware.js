const UserModel = require('../users/users-model');

function restricted(req, res, next) {
	if (!req.session.user) {
		res.status(401).json({ message: 'You shall not pass!' });
	} else {
		next();
	}
}

async function checkUsernameFree(req, res, next) {
	const { username } = req.body;
	const [answer] = await UserModel.findBy({ username: username });
	if (answer) {
		res.status(422).json({ message: 'Username taken' });
	} else {
		next();
	}
}

async function checkUsernameExists(req, res, next) {
	const { username } = req.body;
	const find = {
		username: username,
	};
	const [answer] = await UserModel.findBy(find);

	if (answer) {
		req.user = answer;
		next();
	} else {
		res.status(401).json({ message: 'invalid credentials' });
	}
}

function checkPasswordLength(req, res, next) {
	const { password } = req.body;
	if (!password || password.length <= 3) {
		res.status(422).json({ message: 'Password must be longer than 3 chars' });
	} else {
		next();
	}
}

module.exports = {
	checkPasswordLength,
	checkUsernameExists,
	checkUsernameFree,
	restricted,
};