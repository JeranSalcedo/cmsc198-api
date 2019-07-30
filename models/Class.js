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
				classes.standing,
				classes.percentage_lecture AS 'percentageLecture',
				classes.percentage_small AS 'percentageSmall',
				classes.active,
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

	getClassSections_id(id){
		const def = Q.defer();
		const query = `
			SELECT
				classes.lecture,
				classes.recit_lab
			FROM classes
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

	getClassSectionStanding_id(id){
		const def = Q.defer();
		const query = `
			SELECT
				standing
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

	getQuizzes_section(id){
		const def = Q.defer();
		const query = `
			SELECT
				*
			FROM quizzes
			WHERE
				section = ?
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

	getAssignments_section(id){
		const def = Q.defer();
		const query = `
			SELECT
				*
			FROM assignments
			WHERE
				section = ?
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

	getExams_section(id){
		const def = Q.defer();
		const query = `
			SELECT
				*
			FROM exams
			WHERE
				section = ?
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

	getNewPercentageScore_workId(type, id){
		const def = Q.defer();
		const query = `
			SELECT
				percentage_${type} AS 'percentage',
				${type}_score AS 'score',
				${type}_total AS 'total'
			FROM
				classes_sections
			WHERE
				id = (
					SELECT
						section
					FROM
						${type}${type === 'quiz'? 'zes' : 's'}
					WHERE
						id = ?
				)
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
		const query = `INSERT INTO classes (course, finals, ${finals? required? `required,` : `required, exemption, exempted, `: ``}passing, passed, standing, percentage_lecture, percentage_small, active, lecture, ${smallClass? `recit_lab,` : ''}semester, user) VALUES (${finals? required? `?, ` : `?, ?, ?, ` : ``}${smallClass? `?, ` : ``}?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

		const req = db.query(query, set, (err, data) => {
			if(err){
				def.reject(err);
			} else {
				def.resolve(data.insertId);
			}
		});

		return def.promise;
	}

	addQuiz_section(section, title, score, total){
		const def = Q.defer();
		const query = `
			INSERT INTO
				quizzes (
					title,
					score,
					total,
					absent,
					removed,
					section
				)
			VALUES (
				?,
				?,
				?,
				?,
				?,
				?
			)
		`;

		const req = db.query(query, [title, score, total, 0, 0, section], (err, data) => {
			if(err){
				def.reject(err);
			} else {
				def.resolve(data.insertId);
			}
		});

		return def.promise;
	}

	addAssignment_section(section, title, score, total){
		const def = Q.defer();
		const query = `
			INSERT INTO
				assignments (
					title,
					score,
					total,
					absent,
					removed,
					section
				)
			VALUES (
				?,
				?,
				?,
				?,
				?,
				?
			)
		`;

		const req = db.query(query, [title, score, total, 0, 0, section], (err, data) => {
			if(err){
				def.reject(err);
			} else {
				def.resolve(data.insertId);
			}
		});

		return def.promise;
	}

	addExam_section(section, title, score, total){
		const def = Q.defer();
		const query = `
			INSERT INTO
				exams (
					title,
					score,
					total,
					absent,
					removed,
					section
				)
			VALUES (
				?,
				?,
				?,
				?,
				?,
				?
			)
		`;

		const req = db.query(query, [title, score, total, 0, 0, section], (err, data) => {
			if(err){
				def.reject(err);
			} else {
				def.resolve(data.insertId);
			}
		});

		return def.promise;
	}

	updateClassSectionStanding_id(id){
		const def = Q.defer();
		const query = `
			UPDATE
				classes_sections
			SET
				standing = IF(quiz_total = 0, 0, percentage_quiz * quiz_score / quiz_total) + IF(assignment_total = 0, 0, percentage_assignment * assignment_score / assignment_total) + IF(exam_total = 0, 0, percentage_exam * exam_score / exam_total)
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

	updateStatus_semester(year, title){
		const def = Q.defer();
		const query = `
			UPDATE
				classes
			SET
				active = 0
			WHERE
				semester = (
					SELECT
						id
					FROM
						semesters
					WHERE
						year_end = ? AND
						title = ?
				);
		`;

		const req = db.query(query, [year, title], (err, data) => {
			if(err){
				def.reject(err);
			} else {
				def.resolve(data.insertId);
			}
		});

		return def.promise;
	}

	updateClassSectionQuiz_id(id, op, score, total){
		const def = Q.defer();
		const query = `
			UPDATE
				classes_sections
			SET
				quiz_score = quiz_score ${op === 'add'? `+` : `-`} ?,
				quiz_total = quiz_total ${op === 'add'? `+` : `-`} ?
			WHERE
				id = ?
		`;

		const req = db.query(query, [score, total, id], (err, data) => {
			if(err){
				def.reject(err);
			} else {
				def.resolve(data.insertId);
			}
		});

		return def.promise;
	}

	updateClassSectionAssignment_id(id, op, score, total){
		const def = Q.defer();
		const query = `
			UPDATE
				classes_sections
			SET
				assignment_score = assignment_score ${op === 'add'? `+` : `-`} ?,
				assignment_total = assignment_total ${op === 'add'? `+` : `-`} ?
			WHERE
				id = ?
		`;

		const req = db.query(query, [score, total, id], (err, data) => {
			if(err){
				def.reject(err);
			} else {
				def.resolve(data.insertId);
			}
		});

		return def.promise;
	}

	updateClassSectionExam_id(id, op, score, total){
		const def = Q.defer();
		const query = `
			UPDATE
				classes_sections
			SET
				exam_score = exam_score ${op === 'add'? `+` : `-`} ?,
				exam_total = exam_total ${op === 'add'? `+` : `-`} ?
			WHERE
				id = ?
		`;

		const req = db.query(query, [score, total, id], (err, data) => {
			if(err){
				def.reject(err);
			} else {
				def.resolve(data.insertId);
			}
		});

		return def.promise;
	}

	updateClassSectionWork_type(type, id){
		const def = Q.defer();
		const query = `
			UPDATE
				classes_sections
			SET
				${type}_score = ${type}_score - (
					SELECT
						score
					FROM
						${type}${type === 'quiz'? 'zes' : 's'}
					WHERE
						id = ?
				),
				${type}_total = ${type}_total - (
					SELECT
						total
					FROM
						${type}${type === 'quiz'? 'zes' : 's'}
					WHERE
						id = ?
				)
			WHERE
				id = (
					SELECT
						section
					FROM
						${type}${type === 'quiz'? 'zes' : 's'}
					WHERE
						id = ?
				)
		`;

		const req = db.query(query, [id, id, id], (err, data) => {
			if(err){
				def.reject(err);
			} else {
				def.resolve(data.insertId);
			}
		});

		return def.promise;
	}

	deleteClassSection_id(id){
		const def = Q.defer();
		const query = `
			DELETE FROM
				classes_sections
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

	deleteClassWork_id(type, id){
		const def = Q.defer();
		const query = `
			DELETE FROM
				${type}${type === 'quiz'? 'zes' : 's'}
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