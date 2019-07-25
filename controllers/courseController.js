const Q = require('q');
const Course = require('../models/Course');

const courseModel = new Course();

class courseController {
	getCourses_all(){
		const def = Q.defer();

		const request = courseModel.getCourses_all();
		request.then(data => {
			def.resolve(data);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	addCourse(subjectId, number, title){
		const def = Q.defer();

		const request = courseModel.addCourse(subjectId, number, title);
		request.then(id => {
			def.resolve(id);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	editCourse_id(id, number, title){
		const def = Q.defer();

		const set = {};
		if(number){
			set.number = number;
		}
		if(title){
			set.title = title;
		}

		const request = courseModel.editCourse_id(id, set);
		request.then(id => {
			def.resolve(id);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	deleteCourse_id(id){
		const def = Q.defer();

		const request = courseModel.deleteCourse_id(id);
		request.then(() => {
			def.resolve();
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}
}

module.exports = courseController;