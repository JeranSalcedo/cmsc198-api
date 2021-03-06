const Q = require('q');
const Semester = require('../models/Semester');
const Class = require('../models/Class');

const semesterModel = new Semester();
const classModel = new Class();

class semesterController {
	getSemesters_all(){
		const def = Q.defer()

		const request = semesterModel.getSemesters_all();
		request.then(data => {
			const res = {}
			const array = data.forEach(item => {
				if(!(item.year_end in res)){
					res[item.year_end] = {};
					res[item.year_end].data = [];
					res[item.year_end].active = false;
				}
				res[item.year_end].data.unshift({
					id: item.id,
					title: item.title,
					active: item.active === 1
				});
				res[item.year_end].active = res[item.year_end].active || item.active === 1;
			});
			def.resolve(res);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	getSemesters_count(count){
		const def = Q.defer()

		const request = semesterModel.getSemesters_count(count);
		request.then(data => {
			def.resolve(data);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	getClasses_semester(id){
		const def = Q.defer()

		const request = classModel.getClasses_semester(id);
		request.then(data => {
			def.resolve(data);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}

	addSemester_year(year, length){
		const def = Q.defer()

		const title = length == 1? '2nd Semester' : 'Mid Year';
		const title_2 = length == 1? '1st Semester' : '2nd Semester';

		const request = semesterModel.addSemester_year(year, title);
		request.then(id => {
			semesterModel.updateStatus_id(id);
			classModel.updateStatus_semester(year, title_2);

			def.resolve(id);
		}, err => {
			def.reject(err);
		});

		return def.promise;
	}
}

module.exports = semesterController;