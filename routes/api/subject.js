const express = require('express');
const subjectController = require('../../controllers/subjectController');

const router = express.Router();
const controller = new subjectController();

router.get('/', (req, res) => {
	const request =	controller.getSubjects_all();
	request.then(data => {
		res.json(data);
	});
});

router.post('/new', (req, res) => {
	const code = req.body.code;
	const title = req.body.title;

	if(!code || !title){
		return res.status(400).json({
			msg: 'Please input all required fields'
		});
	}

	const request = controller.addSubject(code, title);
	request.then(id => {
		res.json({
			msg: 'Successfully added subject!',
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
	const code = req.body.code;
	const title = req.body.title;

	const request = controller.editSubject_id(id, code, title);
	request.then(id => {
		res.json({
			msg: 'Successfully edited subject!',
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

	const request = controller.deleteSubject_id(id);
	request.then(() => {
		res.json({
			msg: 'Successfully deleted subject!'
		});
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

module.exports = router;