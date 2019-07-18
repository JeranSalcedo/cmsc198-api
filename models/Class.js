const Q = require('q');

class Class {
	getClasses_user(id){
		const def = Q.defer();
		const query = `
			SELECT
				*
			FROM user_classes
			WHERE
				user = ?
		`;

		const req = db.query(query, [id], (err, data) => {
			if(err){
				def.reject(err);
			} else {
				def.resolve(JSON.parse(JSON.stringify(data)));
			}
		});

		return def.promise;
	}
}

module.exports = Class;