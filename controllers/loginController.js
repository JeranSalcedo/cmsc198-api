const Q = require('q');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const userModel = new User();

class loginController {
	login(username, password){
		const def = Q.defer();

		const request = userModel.getUser_username(username);
		request.then(data => {
			if(data === undefined || data.length == 0){
				def.reject('User does not exist.');
			}

			bcrypt.compare(password, data.password, (err, res) => {
				if(err){
					throw err;
				}

				if(res){
					def.resolve({
						id: data.id,
						username: data.username,
						firstName: data.first_name,
						lastName: data.last_name,
						email: data.email,
						admin: data.admin === 1
					});
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

module.exports = loginController;