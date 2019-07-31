const express = require('express');
const classController = require('../../controllers/classController');

const router = express.Router();
const controller = new classController();

router.get('/section/:id/classWork', (req, res) => {
	const request = controller.getClassWork_id(req.params.id);
	request.then(data => {
		res.json(data);
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

router.get('/section/:id/quiz', (req, res) => {
	const request = controller.getQuiz_id(req.params.id);
	request.then(data => {
		res.json(data);
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

router.get('/section/:id/assignment', (req, res) => {
	const request = controller.getAssignment_id(req.params.id);
	request.then(data => {
		res.json(data);
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

router.get('/section/:id/exam', (req, res) => {
	const request = controller.getExam_id(req.params.id);
	request.then(data => {
		res.json(data);
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

router.get('/section/:id', (req, res) => {
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

router.post('/section/quiz/new', (req, res) => {
	const request = controller.addQuiz_section(req.body);
	request.then(id => {
		res.json({
			msg: 'Successfully added quiz!',
			id
		});
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

router.post('/section/assignment/new', (req, res) => {
	const request = controller.addAssignment_section(req.body);
	request.then(id => {
		res.json({
			msg: 'Successfully added assignment!',
			id
		});
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

router.post('/section/exam/new', (req, res) => {
	const request = controller.addExam_section(req.body);
	request.then(id => {
		res.json({
			msg: 'Successfully added exam!',
			id
		});
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

router.put('/section/standing', (req, res) => {
	const request = controller.updateClassSectionStanding_id(req.body.section);
	request.then(data => {
		res.json(data);
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

router.put('/section/updateAbsences', (req, res) => {
	const request = controller.updateAbsences_id(req.body.operation, req.body.section);
	request.then(id => {
		res.json({
			msg: 'Successfully updated absences!',
			id
		});
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

router.put('/section/percentage/edit', (req, res) => {
	const request = controller.updatePercentages_id(req.body);
	request.then(id => {
		res.json({
			msg: 'Successfully updated percentages!',
			id
		});
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

router.delete('/section/quiz/:typeId/:count', (req, res) => {
	const request = controller.deleteClassWork_section_id('quiz', req.params.typeId, req.params.count);
	request.then(data => {
		res.json(data);
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

router.delete('/section/assignment/:typeId/:count', (req, res) => {
	const request = controller.deleteClassWork_section_id('assignment', req.params.typeId, req.params.count);
	request.then(data => {
		res.json(data);
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

router.delete('/section/exam/:typeId/:count', (req, res) => {
	const request = controller.deleteClassWork_section_id('exam', req.params.typeId, req.params.count);
	request.then(data => {
		res.json(data);
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