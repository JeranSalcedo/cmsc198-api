const Q = require('q');

class Semester {
	getSemesters_all(){
		const def = Q.defer();
		const query = `
			SELECT
				*
			FROM semesters
			ORDER BY
				id DESC
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

	getSemesters_count(count){
		const def = Q.defer();
		const query = `
			SELECT
				*
			FROM semesters
			ORDER BY
				id DESC
			LIMIT
				?
		`;

		const req = db.query(query, [count], (err, data) => {
			if(err){
				def.reject(err);
			} else {
				def.resolve(JSON.parse(JSON.stringify(data)));
			}
		});

		return def.promise;
	}

	addSemester_year(year, title){
		const def = Q.defer();
		const query = `
			INSERT INTO
				semesters (
					title,
					year_start,
					year_end,
					active
				)
			VALUES
				(
					?,
					?,
					?,
					1	
				)
		`;

		const req = db.query(query, [title, year - 1, year], (err, data) => {
			if(err){
				def.reject(err);
			} else {
				def.resolve(data.insertId);
			}
		});

		return def.promise;
	}

	updateStatus_id(id){
		const def = Q.defer();
		const query = `
			UPDATE
				semesters
			SET
				active = 0
			WHERE
				id != ?
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
}

module.exports = Semester;