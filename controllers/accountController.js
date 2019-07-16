const Q = require('q');
const bcrypt = require('bcrypt');
const Users = require('../models/Users');

const saltRounds = 15;
const usersModel = new Users();

class accountController {
	addUser(studentId, firstName, lastName, email, password){
		const def = Q.defer()

		bcrypt.hash(password, saltRounds, (err, hash) => {
			if(err){
				throw err;
			}

			const request = usersModel.addUser(studentId, firstName, lastName, email, hash);
			request.then(id => {
				def.resolve(id);
			}, err => {
				def.reject(err);
			});
		});

		return def.promise;
	}

	login(studentId, password){
		const def = Q.defer()

		const request = usersModel.getUser_studentId(studentId);
		request.then(data => {
			if(data === undefined || data.length == 0){
				def.reject('User does not exist.');
			}

			bcrypt.compare(password, data.password, (err, res) => {
				if(err){
					throw err;
				}

				if(res){
					def.resolve();
				} else {
					def.reject('Incorrect password');
				}
			});
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}
}

module.exports = accountController;