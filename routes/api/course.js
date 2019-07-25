const express = require('express');
const courseController = require('../../controllers/courseController');

const router = express.Router();
const controller = new courseController();

router.get('/', (req, res) => {
	const request =	controller.getCourses_all();
	request.then(data => {
		res.json(data);
	});
});

router.post('/new', (req, res) => {
	const subjectId = req.body.subjectId;
	const number = req.body.number;
	const title = req.body.title;

	if(!number || !title){
		return res.status(400).json({
			msg: 'Please input all required fields'
		});
	}

	const request = controller.addCourse(subjectId, number, title);
	request.then(id => {
		res.json({
			msg: 'Successfully added course!',
			id
		});
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

router.put('/edit', (req, res) => {
	const id = req.body.id;
	const number = req.body.number;
	const title = req.body.title;

	if(!number && !title){
		return res.status(400).json({
			msg: 'Empty body'
		});
	}

	const request = controller.editCourse_id(id, number, title);
	request.then(id => {
		res.json({
			msg: 'Successfully edited course!',
			id
		});
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;

	const request = controller.deleteCourse_id(id);
	request.then(() => {
		res.json({
			msg: 'Successfully deleted course!'
		});
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

module.exports = router;