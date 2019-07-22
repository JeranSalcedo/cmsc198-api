const Q = require('q');
const Subject = require('../models/Subject');

const subjectModel = new Subject();

class subjectController {
	getSubjects_all(){
		const def = Q.defer();

		const request = subjectModel.getSubjects_all();
		request.then(data => {
			def.resolve(data);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	addSubject(code, title){
		const def = Q.defer();

		const request = subjectModel.addSubject(code, title);
		request.then(id => {
			def.resolve(id);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	editSubject_id(id, code, title){
		const def = Q.defer();

		const set = {};
		if(code){
			set.code = code;
		}
		if(title){
			set.title = title;
		}

		const request = subjectModel.editSubject_id(id, set);
		request.then(id => {
			def.resolve(id);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	deleteSubject_id(id){
		const def = Q.defer();

		const request = subjectModel.deleteSubject_id(id);
		request.then(() => {
			def.resolve();
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}
}

module.exports = subjectController;