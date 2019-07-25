const Q = require('q');

class User {
	getUser_all(){
		const def = Q.defer();
		const query = `
			SELECT *
			FROM users
			ORDER BY
				admin DESC,
				last_name,
				first_name,
				username
		`;

		const req = db.query(query, (err, data) => {
			if(err){
				def.reject(err);
			} else {
				def.resolve(JSON.parse(JSON.stringify(data)));
			}
		});

		return def.promise;
	}

	getUser_username(username){
		const def = Q.defer();
		const query = `
			SELECT *
			FROM users
			WHERE
				username = ?
		`;

		const req = db.query(query, [username], (err, data) => {
			if(err){
				def.reject(err);
			} else {
				def.resolve(JSON.parse(JSON.stringify(data))[0]);
			}
		});

		return def.promise;
	}

	addUser(username, firstName, lastName, email, password){
		const def = Q.defer();
		const query = `
			INSERT INTO
				users (
					username,
					first_name,
					last_name,
					email,
					password
				)
			VALUES
				(
					?,
					?,
					?,
					?,
					?	
				)
		`;

		const req = db.query(query, [username, firstName, lastName, email, password], (err, data) => {
			if(err){
				def.reject(err);
			}
			
			def.resolve(data.insertId);
		});

		return def.promise;
	}
}

module.exports = User;