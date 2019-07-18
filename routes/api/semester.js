const express = require('express');
const semesterController = require('../../controllers/semesterController');

const router = express.Router();
const controller = new semesterController();

router.get('/', (req, res) => {
	const request =	controller.getSemesters_all();
	request.then(data => {
		res.json(data);
	});
});

router.get('/:count', (req, res) => {
	const request =	controller.getSemesters_count(req.params.count);
	request.then(data => {
		res.json(data);
	});
});

router.post('/new/:year/:length', (req, res) => {
	const request =	controller.addSemester_year(req.params.year, req.params.length);
	request.then(id => {
		res.json({
			msg: 'Successfully added semester!',
			id
		});
	});
});

module.exports = router;