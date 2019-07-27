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

	getClasses_semester(id){
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

	addClassSection(section, teacher, maxAbsences){
		const def = Q.defer();
		const query = `
			INSERT INTO
				classes_sections (
					section,
					teacher,
					absences,
					allowable_absences
				)
			VALUES (
				?,
				?,
				?,
				?
			)
		`;

		const req = db.query(query, [section, teacher, 0, maxAbsences], (err, data) => {
			if(err){
				def.reject(err);
			} else {
				def.resolve(data.insertId);
			}
		});

		return def.promise;
	}

	addClass(finals, required, smallClass, set){
		const def = Q.defer();
		const query = `INSERT INTO classes (course, finals, ${finals? required? `required,` : `required, exemption, exempted,`: ``}passing, passed, lecture, ${smallClass? `recit_lab,` : ''}semester, user) VALUES (${finals? required? `?,` : `?, ?, ?,` : ``}${smallClass? `?,` : ``}?, ?, ?, ?, ?, ?, ?)`;

		const req = db.query(query, set, (err, data) => {
			if(err){
				def.reject(err);
			} else {
				def.resolve(data.insertId);
			}
		});

		return def.promise;
	}

	getClass_user_semester(userId, semesterId){
		const def = Q.defer();
		const query = `
			SELECT
				classes.id,
				subjects.code,
				subjects.title AS 'fullName',
				courses.number,
				courses.title,
				classes.finals,
				classes.required,
				classes.exemption,
				classes.exempted,
				classes.passing,
				classes.passed,
				classes.lecture,
				classes.recit_lab
			FROM classes
			INNER JOIN
				courses ON
					classes.course = courses.id
			INNER JOIN
				subjects ON
					courses.subject = subjects.id
			WHERE
				user = ? AND
				semester = ?
		`;

		const req = db.query(query, [userId, semesterId], (err, data) => {
			if(err){
				def.reject(err);
			} else {
				def.resolve(JSON.parse(JSON.stringify(data)));
			}
		});

		return def.promise;
	}

	getClassSection_id(id){
		const def = Q.defer();
		const query = `
			SELECT
				*
			FROM classes_sections
			WHERE
				id = ?
		`;

		const req = db.query(query, [id], (err, data) => {
			if(err){
				def.reject(err);
			} else {
				def.resolve(JSON.parse(JSON.stringify(data))[0]);
			}
		});

		return def.promise;
	}

	updateAbsences_id(op, id){
		const def = Q.defer();
		const query = `
			UPDATE
				classes_sections
			SET
				absences = absences ${op === 'add'? `+` : `-`} 1
			WHERE
				id = ?
		`;

		const req = db.query(query, [id], (err, data) => {
			if(err){
				def.reject(err);
			} else {
				def.resolve(data.insertId);
			}
		});

		return def.promise;
	}

	deleteClass_id(id){
		const def = Q.defer();
		const query = `
			DELETE FROM
				classes
			WHERE
				id = ?
		`;

		const req = db.query(query, [id], (err, data) => {
			if(err){
				def.reject(err);
			} else {
				def.resolve();
			}
		});

		return def.promise;
	}
}

module.exports = Class;