const db = require('../util/database');

module.exports = class jury {
  constructor(jury_id, jury_name, jury_photo, jury_resume, jury_pass) {
    this.jury_id = jury_id;
    this.jury_name = jury_name;
    this.jury_photo = jury_photo;
    this.jury_resume = jury_resume;
    this.jury_pass = jury_pass;

  }

  static login(name, pass) {
      return db.execute(
          'SELECT jury_id from jury where jury_name = ? and jury_pass = ?',
          [name, pass]
      );
  }

  static findById(id) {
    return db.execute('SELECT * FROM jury WHERE jury.jury_id = ?', [id]);
  }
};