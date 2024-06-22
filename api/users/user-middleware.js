const postCheck = (req, res, next) => {
	let { name, age, weight } = req.body
	if ( name && age && weight ) {
		if (typeof name === 'string' && typeof age === 'number' && typeof weight === 'number') {
			next()
		} else {
			res.status(400).json({message: 'please make name a string and age and weight a number'})
		}
	} else {
		res.status(400).json({message: 'please include name, age, and weight'})
	}
}

module.exports = {
	postCheck
}