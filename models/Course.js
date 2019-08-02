const Q = require('q');

class Course {
	getCourses_all(){
		const def = Q.defer();
		const query = `
			SELECT
				*
			FROM subjects
			ORDER BY
				number
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

	getCourses_id(id){
		const def = Q.defer();
		const query = `
			SELECT
				id AS 'key',
				number AS 'value',
				title AS 'text'
			FROM courses
			WHERE
				subject = ?
			ORDER BY
				number
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

	addCourse(subjectId, number, title){
		const def = Q.defer();
		const query = `
			INSERT INTO
				courses (
					subject,
					number,
					title
				)
			VALUES
				(
					?,
					?,
					?	
				)
		`;

		const req = db.query(query, [subjectId, number, title], (err, data) => {
			if(err){
				def.reject(err);
			}
			
			def.resolve(data.insertId);
		});

		return def.promise;
	}

	editCourse_id(id, set){
		const def = Q.defer();
		const query = `
			UPDATE
				courses
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

	deleteCourse_id(id){
		const def = Q.defer();
		const query = `
			DELETE FROM
				courses
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

module.exports = Course;