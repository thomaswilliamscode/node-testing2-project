const express = require('express');
// const session = require('express-session');
// const Store = require('connect-session-knex')(session);

const userRouter = require('../api/users/users-router');
const authRouter = require('../api/auth/auth-router');

const server = express();

server.use(express.json());
// server.use(
// 	session({
// 		name: 'chocolatechip',
// 		secret: 'keep it secret',
// 		cookie: {
// 			maxAge: 1000 * 60 * 60,
// 			secure: false,
// 			httpOnly: true,
// 		},
// 		resave: false,
// 		saveUninitialized: false,
// 		store: new Store({
// 			knex: require('../data/db-config'),
// 			tablename: 'sessions',
// 			sidfieldname: 'sid',
// 			createtable: true,
// 			clearInterval: 1000 * 60 * 60,
// 		}),
// 	})
// );

server.use('/api/users', userRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
	res.json({ api: 'up' });
});

server.use((err, req, res, next) => {
	// eslint-disable-line
	res.status(err.status || 500).json({
		message: err.message,
		stack: err.stack,
	});
});

module.exports = server;