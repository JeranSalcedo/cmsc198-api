const express = require('express');
const classController = require('../../controllers/classController');

const router = express.Router();
const controller = new classController();

router.get('/section/:id', (req, res) => {
	console.log(req.params.id);
	const request = controller.getClassSection_id(req.params.id);
	request.then(data => {
		res.json(data);
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

router.get('/:userId/:semesterId', (req, res) => {
	const request = controller.getClass_user_semester(req.params.userId, req.params.semesterId);
	request.then(data => {
		res.json(data);
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

router.post('/new', (req, res) => {
	const request = controller.addClass_user_semester(req.body);
	request.then(id => {
		res.json({
			msg: 'Successfully added class!',
			id
		});
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

router.delete('/:id', (req, res) => {
	const request = controller.deleteClass_id(req.params.id);
	request.then(() => {
		res.json({
			msg: 'Successfully deleted class!',
		});
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

module.exports = router;