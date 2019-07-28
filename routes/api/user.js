const express = require('express');
const userController = require('../../controllers/userController');

const router = express.Router();
const controller = new userController();

router.get('/', (req, res) => {
	const request =	controller.getUser_all();
	request.then(data => {
		res.json(data);
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

router.get('/:id/class', (req, res) => {
	const request =	controller.getClasses_user(req.params.id);
	request.then(data => {
		res.json(data);
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

router.post('/new', (req, res) => {
	const username = req.body.username;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const password = req.body.password;

	if(!username || !firstName || !lastName || !email || !password){
		return res.status(400).json({
			msg: 'Please include all required fields'
		});
	}

	const request = controller.addUser(username, firstName, lastName, email, password);
	request.then(id => {
		res.json({
			msg: 'Successfully added user!',
			id
		});
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

module.exports = router;