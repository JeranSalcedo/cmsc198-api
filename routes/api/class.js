const express = require('express');
const classController = require('../../controllers/classController');

const router = express.Router();
const controller = new classController();

// router.post('/new', (req, res) => {
// 	const request =	controller.addClass_user(req.params.id);
// 	request.then(data => {
// 		res.json(data);
// 	}, err => {
// 		res.status(400).json({
// 			err
// 		});
// 	});
// });

module.exports = router;