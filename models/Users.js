const Q = require('q');

class Users {
	addUser(studentId, firstName, lastName, email, password){
		const def = Q.defer();
		const query = `
			INSERT INTO
				users (
					student_id,
					first_name,
					last_name,
					email,
					password
				)
			VALUES
				(
					'${studentId}',
					'${firstName}',
					'${lastName}',
					'${email}',
					'${password}'	
				)
		`;

		const req = db.query(query, (err, data) => {
			if(err){
				def.reject(err);
			}
			
			def.resolve(data.insertId);
		});

		return def.promise;
	}

	getUser_studentId(studentId){
		const def = Q.defer();
		const query = `
			SELECT *
			FROM users
			WHERE
				student_id = ${studentId}
		`;

		const req = db.query(query, (err, data) => {
			if(err){
				def.reject(err);
			} else {
				def.resolve(JSON.parse(JSON.stringify(data))[0]);
			}
		});

		return def.promise;
	}
}

module.exports = Users;