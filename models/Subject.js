const Q = require('q');

class Subject {
	getSubjects_all(){
		const def = Q.defer();
		const query = `
			SELECT
				id AS 'key',
				code AS 'value',
				title AS 'text'
			FROM subjects
			ORDER BY
				value
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

	addSubject(code, title){
		const def = Q.defer();
		const query = `
			INSERT INTO
				subjects (
					code,
					title
				)
			VALUES
				(
					?,
					?	
				)
		`;

		const req = db.query(query, [code, title], (err, data) => {
			if(err){
				def.reject(err);
			}
			
			def.resolve(data.insertId);
		});

		return def.promise;
	}

	editSubject_id(id, set){
		const def = Q.defer();
		const query = `
			UPDATE
				subjects
			SET
				?
			WHERE
				id = ?
		`;

		const req = db.query(query, [set, id], (err, data) => {
			if(err){
				def.reject(err);
			}
			
			def.resolve(data.insertId);
		});

		return def.promise;
	}

	deleteSubject_id(id){
		const def = Q.defer();
		const query = `
			DELETE FROM
				subjects
			WHERE
				id = ?
		`;

		const req = db.query(query, [id], (err, data) => {
			if(err){
				def.reject(err);
			}
			
			def.resolve();
		});

		return def.promise;
	}
}

module.exports = Subject;