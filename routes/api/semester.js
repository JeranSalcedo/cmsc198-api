const express = require('express');
const semesterController = require('../../controllers/semesterController');

const router = express.Router();
const controller = new semesterController();

router.get('/', (req, res) => {
	const request =	controller.getSemesters_all();
	request.then(data => {
		res.json(data);
	}, err => {
		res.status(400).json({
			err
		});
	});
});

router.get('/:count', (req, res) => {
	const request =	controller.getSemesters_count(req.params.count);
	request.then(data => {
		res.json(data);
	}, err => {
		res.status(400).json({
			err
		});
	});
});

router.get('/:id/class', (req, res) => {
	const request =	controller.getClasses_semester(req.params.id);
	request.then(data => {
		res.json(data);
	}, err => {
		res.status(400).json({
			err
		});
	});
});

router.post('/new', (req, res) => {
	const year = req.body.year;
	const length = req.body.length;

	const request =	controller.addSemester_year(year, length);
	request.then(id => {
		res.json({
			msg: 'Successfully added semester!',
			id
		});
	}, err => {
		res.status(400).json({
			err
		});
	});
});

module.exports = router;