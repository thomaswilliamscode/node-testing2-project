const express = require('express');
const router = express.Router();

const Middle = require('../auth/auth-middleware');

const User = require('../users/users-model');

const bcrypt = require('bcryptjs');

router.post(
	'/register',
	Middle.checkUsernameFree,
	Middle.checkPasswordLength,
	async (req, res) => {
		const { username, password } = req.body;
		const hash = bcrypt.hashSync(password, 10);
		const newUser = {
			username: username,
			password: hash,
		};
		const result = await User.add(newUser);
		const position = await User.findById(result);
		res.status(200).json(position);
	}
);

router.post(
	'/login',
	Middle.checkUsernameExists,
	Middle.checkPasswordLength,
	(req, res) => {
		const { password } = req.body;
		if (bcrypt.compareSync(password, req.user.password)) {
			req.session.user = req.user;
			res.json({ message: `Welcome ${req.user.username}!` });
		} else {
			res.status(401).json({ message: 'invalid credentials' });
		}
	}
);

router.get('/logout', (req, res) => {
	if (req.session.user) {
		console.log('in the if ');
		req.session.destroy((err) => {
			console.log('in the destroy');
			if (err) {
				console.log('error ');
				res.json({ message: 'you can never leave!' });
			} else {
				console.log('session destroyed ');
				res.json({ message: 'logged out' });
			}
		});
	} else {
		console.log('in the else ');
		res.json({ message: 'no session' });
	}
});

module.exports = router;
