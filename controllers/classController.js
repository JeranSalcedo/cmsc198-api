const Q = require('q');
const Class = require('../models/Class');

const classModel = new Class();

class classController {
	addClass_user_semester(body){
		const def = Q.defer();

		const sectionLecture = body.sectionLecture;
		const lecturer = body.lecturer;
		const maxAbsencesLecture = body.maxAbsencesLecture;

		const request = classModel.addClassSection(sectionLecture, lecturer, maxAbsencesLecture);
		request.then(lectureId => {
			if(body.smallClass){
				const sectionSmall = body.sectionSmall;
				const instructor = body.instructor;
				const maxAbsencesSmall = body.maxAbsencesSmall;

				const request_2 = classModel.addClassSection(sectionSmall, instructor, maxAbsencesSmall);
				request_2.then(smallId => {
					const set = [];

					set.push(body.courseId);
					set.push(body.finals? 1 : 0);
					if(body.finals){
						set.push(body.required? 1 : 0);
						if(body.required){
							set.push(body.exemption);
						}
					}
					set.push(body.passing);
					set.push(0);
					set.push(lectureId);
					set.push(smallId);
					set.push(body.semesterId);
					set.push(body.userId);

					const request_3 = classModel.addClass(body.finals, body.required, true, set);
					request_3.then(id => {
						def.resolve(id);
					}, err => {
						def.reject(err);
					});
				}, err => {
					def.reject(err);
				});
			} else {
				const set = [];
				
				set.push(body.courseId);
				set.push(body.finals? 1 : 0);
				if(body.finals){
					set.push(body.required? 1 : 0);
					if(body.required){
						set.push(body.exemption);
					}
				}
				set.push(body.passing);
				set.push(0);
				set.push(lectureId);
				set.push(body.semesterId);
				set.push(body.userId);

				const request_2 = classModel.addClass(body.finals, body.required, false, set);
				request_2.then(id => {
					def.resolve(id);
				}, err => {
					def.reject(err);
				});
			}
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	getClass_user_semester(userId, semesterId){
		const def = Q.defer()

		const request = classModel.getClass_user_semester(userId, semesterId);
		request.then(data => {
			def.resolve(data);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	getClassSection_id(id){
		const def = Q.defer()

		const request = classModel.getClassSection_id(id);
		request.then(data => {
			def.resolve(data);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	updateAbsences_id(op, id){
		const def = Q.defer()

		const request = classModel.updateAbsences_id(op, id);
		request.then(data => {
			def.resolve(data);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	deleteClass_id(id){
		const def = Q.defer()

		const request = classModel.deleteClass_id(id);
		request.then(() => {
			def.resolve();
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}
}

module.exports = classController;