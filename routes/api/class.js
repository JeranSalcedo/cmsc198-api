const express = require('express');
const classController = require('../../controllers/classController');

const router = express.Router();
const controller = new classController();

router.post('/', (req, res) => {
	// const request =	controller.getClasses_user(req.params.id);
	// request.then(data => {
	// 	res.json(data);
	// });
});

module.exports = router;