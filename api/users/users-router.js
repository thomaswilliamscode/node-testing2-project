const express = require('express');
const router = express.Router();

const Model = require('./users-model');
const AuthMiddle = require('../auth/auth-middleware');
const UserMiddle = require('../users/user-middleware')

router.get('/', /* AuthMiddle.restricted, */ async (req, res) => {
	const answer = await Model.find();
	res.status(200).json(answer);
});
router.get(
	'/:id',
	/* AuthMiddle.restricted, */ async (req, res) => {
		let id = req.params.id
		const answer = await Model.findById(id);
		res.status(200).json(answer);
	}
);

router.post(
	'/',
	UserMiddle.postCheck, async (req, res) => {
		const { name, age, weight } = req.body
		const user = { name, age, weight }
		const answer = await Model.add(user);
		const newUser = await Model.findById(answer)
		res.status(200).json(newUser);
	}
);

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const answer = await Model.remove(id);
	// const newUser = Model.findById(answer);
	res.status(200).json(answer);
});

module.exports = router;