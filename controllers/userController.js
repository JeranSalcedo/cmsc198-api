const Q = require('q');
// const bcrypt = require('bcrypt');
const User = require('../models/User');
const Class = require('../models/Class');

const saltRounds = 15;
const userModel = new User();
const classModel = new Class();

class userController {
	getUser_all(){
		const def = Q.defer()

		const request = userModel.getUser_all();
		request.then(data => {
			def.resolve(data);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	getClasses_user(id){
		const def = Q.defer()

		const request = classModel.getClasses_user(id);
		request.then(data => {
			def.resolve(data);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	addClass_user(body){
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
					const courseId = body.courseId;
					const finals = body.finals? 1 : 0;
					const required = body.finals? body.required? 1 : 0 : null;
					const exemption = body.finals && !body.required? body.exemption : null;
					const passing = body.passing;
					const userId = body.userId

					const request_3 = classModel.addClass(courseId, finals, required, exemption, passing, lectureId, smallId, userId);
					request_3.then(id => {
						def.resolve(id);
					}, err => {
						def.reject(err);
					});
				}, err => {
					def.reject(err);
				});
			} else {
				const courseId = body.courseId;
				const finals = body.finals? 1 : 0;
				const required = body.finals && body.required? 1 : null;
				const exemption = body.finals && !body.required? body.exemption : null;
				const passing = body.passing;
				const userId = body.userId

				const request_2 = classModel.addClass(courseId, finals, required, exemption, passing, lectureId, null, userId);
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
	
	// addUser(studentId, firstName, lastName, email, password){
	// 	const def = Q.defer()

	// 	bcrypt.hash(password, saltRounds, (err, hash) => {
	// 		if(err){
	// 			throw err;
	// 		}

	// 		const request = userModel.addUser(studentId, firstName, lastName, email, hash);
	// 		request.then(id => {
	// 			def.resolve(id);
	// 		}, err => {
	// 			def.reject(err);
	// 		});
	// 	});

	// 	return def.promise;
	// }
}

module.exports = userController;