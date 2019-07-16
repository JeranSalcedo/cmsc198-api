const express = require('express');
const accountController = require('../../controllers/accountController');

const router = express.Router();
const controller = new accountController();

router.get('/', (req, res) => {
	const request =	controller.getMembers();
	request.then(data => {
		res.json(data);
	});
});

router.get('/:id', (req, res) => {
	// const found = members.some(member => {
	// 	return member.id === parseInt(req.params.id);
	// });

	// if(found){
	// 	res.json(members.filter(member => member.id === parseInt(req.params.id)));
	// } else {
	// 	res.status(400).json({
	// 		msg: `No member with the id of ${req.params.id}`
	// 	});
	// }

})

router.post('/', (req, res) => {
	const studentId = req.body.studentId;
	const password = req.body.password;

	if(!studentId || !password){
		return res.status(400).json({
			msg: 'Please include a studentId and password'
		});
	}

	const request = controller.login(studentId, password);
	request.then(() => {
		res.json({
			msg: 'Login successful!'
		});
	}, err => {
		return res.status(400).json({
			err
		});
	});
});

router.post('/addUser', (req, res) => {
	const studentId = req.body.studentId;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const password = req.body.password;

	if(!studentId || !firstName || !lastName || !email || !password){
		return res.status(400).json({
			msg: 'Please include all required fields'
		});
	}

	const request = controller.addUser(studentId, firstName, lastName, email, password);
	request.then(id => {
		res.json({
			msg: 'Successfully added user!',
			id
		});
	});
});

router.put('/:id', (req, res) => {
	// const found = members.some(member => {
	// 	member.id === parseInt(req.params.id);
	// });

	// if(found){
	// 	const updMember = req.body;
	// 	members.forEach(member => {
	// 		if(member.id === parseInt(req.params.id)){
	// 			member.name = updMember.name? updMember.name : member.name;
	// 			member.email = updMember.email? updMember.email : member.email;
				
	// 			res.json({ msg: 'Member updated', member });
	// 		}
	// 	});
	// } else {
	// 	res.status(400).json({
	// 		msg: `No member with the id of ${req.params.id}`
	// 	});
	// }
});

router.delete('/:id', (req, res) => {
	// const found = members.some(member => {
	// 	member.id === parseInt(req.params.id);
	// });

	// if(found){
	// 	res.json({
	// 		msg: 'Member deleted',
	// 		members: members.filter(member => member.id !== parseInt(req.params.id))
	// 	});
	// } else {
	// 	res.status(400).json({
	// 		msg: `No member with the id of ${req.params.id}`
	// 	});
	// }
})

module.exports = router;