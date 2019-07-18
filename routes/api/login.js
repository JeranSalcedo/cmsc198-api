const express = require('express');
const loginController = require('../../controllers/loginController');

const router = express.Router();
const controller = new loginController();

router.post('/', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	if(!username || !password){
		return res.status(400).json({
			msg: 'Please input all required fields'
		});
	}

	const request = controller.login(username, password);
	request.then(data => {
		res.json(data);
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

module.exports = router;