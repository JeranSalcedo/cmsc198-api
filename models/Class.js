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

	addClass(courseId, finals, required, exemption, passing, lectureId, recitLabId, userId){
		const def = Q.defer();
		const query = `
			INSERT INTO
				classes (
					course,
					finals,
					required,
					exemption,
					exempted,
					passing,
					passed,
					lecture,
					recit_lab,
					user
				)
			VALUES (
				?,
				?,
				?,
				?,
				?,
				?,
				?,
				?,
				?,
				?
			)
		`;

		const req = db.query(query, [courseId, finals, required, exemption, 0, passing, 0, lectureId, recitLabId, userId], (err, data) => {
			if(err){
				def.reject(err);
			} else {
				def.resolve(data.insertId);
			}
		});

		return def.promise;
	}
}

module.exports = Class;