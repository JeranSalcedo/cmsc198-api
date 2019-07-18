const express = require('express');
const userController = require('../../controllers/userController');

const router = express.Router();
const controller = new userController();

router.get('/:id/class', (req, res) => {
	const request =	controller.getClasses_user(req.params.id);
	request.then(data => {
		res.json(data);
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
	});
});

// router.get('/', (req, res) => {
// 	const request =	controller.getMembers();
// 	request.then(data => {
// 		res.json(data);
// 	});
// });

// router.get('/:id', (req, res) => {
// 	// const found = members.some(member => {
// 	// 	return member.id === parseInt(req.params.id);
// 	// });

// 	// if(found){
// 	// 	res.json(members.filter(member => member.id === parseInt(req.params.id)));
// 	// } else {
// 	// 	res.status(400).json({
// 	// 		msg: `No member with the id of ${req.params.id}`
// 	// 	});
// 	// }

// })

// router.put('/:id', (req, res) => {
// 	// const found = members.some(member => {
// 	// 	member.id === parseInt(req.params.id);
// 	// });

// 	// if(found){
// 	// 	const updMember = req.body;
// 	// 	members.forEach(member => {
// 	// 		if(member.id === parseInt(req.params.id)){
// 	// 			member.name = updMember.name? updMember.name : member.name;
// 	// 			member.email = updMember.email? updMember.email : member.email;
				
// 	// 			res.json({ msg: 'Member updated', member });
// 	// 		}
// 	// 	});
// 	// } else {
// 	// 	res.status(400).json({
// 	// 		msg: `No member with the id of ${req.params.id}`
// 	// 	});
// 	// }
// });

// router.delete('/:id', (req, res) => {
// 	// const found = members.some(member => {
// 	// 	member.id === parseInt(req.params.id);
// 	// });

// 	// if(found){
// 	// 	res.json({
// 	// 		msg: 'Member deleted',
// 	// 		members: members.filter(member => member.id !== parseInt(req.params.id))
// 	// 	});
// 	// } else {
// 	// 	res.status(400).json({
// 	// 		msg: `No member with the id of ${req.params.id}`
// 	// 	});
// 	// }
// })

module.exports = router;