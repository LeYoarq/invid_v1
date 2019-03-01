const db = require('../util/database');

module.exports = class Shortfilm {
  constructor(id, title, url, sinopsis, year_release, upload_date, user_id, gen_id, enable_film, thumbnail) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.sinopsis = sinopsis;
    this.year_release = year_release;
    this.upload_date = upload_date;
    this.user_id = user_id; //obtener de user
    this.gen_id = gen_id; 
    this.enable_film = enable_film;
    this.thumbnail = thumbnail;
  }

  save() {
    return db.execute(
      'INSERT INTO shortfilms (title, url, sinopsis, year_release, user_id, gen_id, thumbnail) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [this.title, this.url, this.sinopsis, this.year_release, this.user_id, this.gen_id, this.thumbnail]
    );
  }

  static enableFilm(id) {
    return db.execute(
      'update shortfilms set enable_film = 1 where id = ?',
      [id]
    );
  }

  static disableFilm(id) {
    return db.execute(
      'update shortfilms set enable_film = 0 where id = ?',
      [id]
    );
  }

  static deleteById(id) {
      return db.execute('DELETE FROM shortfilms WHERE id = ? and enable_film = 0;',
      [id])
  }

  static fetchAll() {
    return db.execute('SELECT * FROM shortfilms');
  }

  static findById(id) {
    return db.execute('SELECT * FROM shortfilms WHERE shortfilms.id = ?', 
    [id]);
  }

  static findEnabled() {
    return db.execute('SELECT * FROM shortfilms WHERE enable_film = 1');
  }
  
};