const Q = require('q');
// const bcrypt = require('bcrypt');
const User = require('../models/User');
const Class = require('../models/Class');

const saltRounds = 15;
const userModel = new User();
const classModel = new Class();

class userController {
	getUser_all(){
		const def = Q.defer()

		const request = userModel.getUser_all();
		request.then(data => {
			def.resolve(data);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	getClasses_user(id){
		const def = Q.defer()

		const request = classModel.getClasses_user(id);
		request.then(data => {
			def.resolve(data);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}
	
	// addUser(studentId, firstName, lastName, email, password){
	// 	const def = Q.defer()

	// 	bcrypt.hash(password, saltRounds, (err, hash) => {
	// 		if(err){
	// 			throw err;
	// 		}

	// 		const request = userModel.addUser(studentId, firstName, lastName, email, hash);
	// 		request.then(id => {
	// 			def.resolve(id);
	// 		}, err => {
	// 			def.reject(err);
	// 		});
	// 	});

	// 	return def.promise;
	// }
}

module.exports = userController;