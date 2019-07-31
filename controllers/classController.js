const Q = require('q');
const Class = require('../models/Class');

const classModel = new Class();

class classController {
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
			data.percentage_quiz_score = Math.round(data.quiz_total * data.percentage_quiz / 100);
			data.percentage_assignment_score = Math.round(data.assignment_total * data.percentage_assignment / 100);
			data.percentage_exam_score = Math.round(data.exam_total * data.percentage_exam / 100);

			def.resolve(data);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	getClassWork_id(id){
		const def = Q.defer()

		const request_quizzes = classModel.getQuizzes_section(id);
		const request_assignments = classModel.getAssignments_section(id);
		const request_exams = classModel.getExams_section(id);

		Promise.all([
			request_quizzes,
			request_assignments,
			request_exams
		]).then(data => {
			def.resolve(data);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	getQuiz_id(id){
		const def = Q.defer()

		const request = classModel.getQuizzes_section(id);
		request.then(data => {
			def.resolve(data);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	getAssignment_id(id){
		const def = Q.defer()

		const request = classModel.getAssignments_section(id);
		request.then(data => {
			def.resolve(data);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	getExam_id(id){
		const def = Q.defer()

		const request = classModel.getExams_section(id);
		request.then(data => {
			def.resolve(data);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

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
						set.push(body.percentageFinals);
						if(!body.required){
							set.push(body.exemption);
							set.push(0);
						}
					}
					set.push(body.passing);
					set.push(0);
					set.push(0);
					set.push(body.percentageLecture);
					set.push(body.percentageSmall);
					set.push(1);
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
					set.push(body.percentageFinals);
					if(!body.required){
						set.push(body.exemption);
						set.push(0);
					}
				}
				set.push(body.passing);
				set.push(0);
				set.push(0);
				set.push(body.percentageLecture);
				set.push(body.percentageSmall);
				set.push(1);
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

	addQuiz_section(data){
		const def = Q.defer()

		const request = classModel.addQuiz_section(data.section, data.title, data.score, data.total);
		request.then(id => {
			classModel.updateClassSectionQuiz_id(data.section, 'add', data.score, data.total, data.count);

			def.resolve(id);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	addAssignment_section(data){
		const def = Q.defer()

		const request = classModel.addAssignment_section(data.section, data.title, data.score, data.total);
		request.then(id => {
			classModel.updateClassSectionAssignment_id(data.section, 'add', data.score, data.total, data.count);

			def.resolve(id);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	addExam_section(data){
		const def = Q.defer()

		const request = classModel.addExam_section(data.section, data.title, data.score, data.total);
		request.then(id => {
			classModel.updateClassSectionExam_id(data.section, 'add', data.score, data.total, data.count);

			def.resolve(id);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	updateClassStanding_id(type, classId){
		const def = Q.defer();

		const request_ClasSectionId = classModel.getClassSections_id(classId);
		request_ClasSectionId.then(id => {
			const promises = [];

			promises.push(classModel.getClassSectionStanding_id(id.lecture));
			if(id.recit_lab === null){
				promises.push({
					standing: 0
				});
			} else {
				promises.push(classModel.getClassSectionStanding_id(id.recit_lab));
			}

			Promise.all(promises).then(data => {
				const request = classModel.updateClassStanding_id(classId, data[0].standing, data[1].standing);
				request.then(id => {
					def.resolve(id);
				}, err => {
					def.reject(err);
				});
			}, err => {
				def.reject(err);
			});
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	updateClassSectionStanding_id(id){
		const def = Q.defer();

		const request_update = classModel.updateClassSectionStanding_id(id);
		request_update.then(() => {
			const request_standing = classModel.getClassSectionStanding_id(id);
			request_standing.then(data => {
				def.resolve(data);
			}, err => {
				def.reject(err);
			});
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	updateAbsences_id(op, id){
		const def = Q.defer();

		const request = classModel.updateAbsences_id(op, id);
		request.then(data => {
			def.resolve(data);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	updatePercentages_id(body){
		const def = Q.defer()

		const request = classModel.updatePercentages_id(body.section, body.quiz, body.assignment, body.exam);
		request.then(id => {
			def.resolve(id);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	deleteClass_id(id){
		const def = Q.defer()

		const request_class = classModel.getClassSections_id(id);
		request_class.then(data => {
			const promises = [];

			const request_lecture = classModel.deleteClassSection_id(data.lecture);
			promises.push(request_lecture);
			if(data.recit_lab){
				const request_small = classModel.deleteClassSection_id(data.recit_lab);
				promises.push(request_small);
			}

			Promise.all(promises).then(() => {
				def.resolve();
			}, err => {
				def.reject(err);
			});
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	deleteClassWork_section_id(type, id, count){
		const def = Q.defer()

		const request_update = classModel.updateClassSectionWork_type(type, id, count);
		request_update.then(() => {
			const request = classModel.getNewPercentageScore_workId(type, id);
			request.then(data => {
				const newValue = Math.round(data.total * data.percentage / 100);
				classModel.deleteClassWork_id(type, id);
				
				def.resolve({
					total: data.total,
					newValue
				});
			}, err => {
				def.reject(err);
			});

		}, err => {
			def.reject(err);
		});

		return def.promise;
	}
}

module.exports = classController;