const User = require('../models/user');
const Shortfilm = require('../models/shortfilm');

const path = require('path');

//INTRO

exports.getIntroPage = (req, res, next) => {
    res.render('intro', { 
        pageTitle: 'Intro Page',
    })
  };




// ------------------ TODO PARA EL /INDEX

//-GET-  BUSCAR Y AGREGAR PELICULA HABILITADA (ENABLE=1)A LA PAGINA PRINCIPAL


exports.getShortfilmEnabled = (req, res, next) => {
    Shortfilm.findEnabled()
      .then(([shortfilms]) => {
        res.render('indexAll', {       // en el ejs hacer un for loop que recorra los elementos de los videos para ponerlos en pantalla
            shortfilms: shortfilms,
            user: false
        });
      })
      .catch(err => console.log(err));
  };




//-GET- CHECK LOGIN Y REDIRECCIONAR A /LOGIN
/*
exports.getLogin = (req, res, next) => {
    
    const username = req.body.user; // attr Name = "user" en la view 
    const password = req.body.password;
    User.login(username, password)
    .then(([row]) => {
       if (row[0]){ // Si recibo algo es que el user existe
            res.render('/login', { // RUTA PLANTILLA Home
                pageTitle: 'login',
                user: row[0] // Variable que puedo usar en la plantilla que tiene la info del usuario
            });
       } else { // Si no hay usuario con esos datos:
            res.render('/', { // RUTA PLANTILLA Pagina incial
                pageTitle: 'main_page',
                error: 'try again',
                message: false
            });
       }
    })
    .catch(err => console.log(err));

};

*/

// ------------- TODO PARA EL /LOGIN

// -POST- SUBIR PELICULA Y RECIBIR MENSAJE DE PENDIENTE
exports.getLoginRegister = (req, res, next) => {
    res.render('register', {
      pageTitle: 'Register Area',
      userflag: false
    });
  };

  exports.getAddFilm = (req, res, next) => {
    const userId = req.params.user_id
    res.render('register', {
      pageTitle: 'Register Area',
      userflag: true,
      participantData: userId
    });
    //console.log(participantData)
};


  exports.postRegister = (req, res, next) => {
    const username = req.body.user_name; // attr Name = "user" en la view , el user name será el correo electronico
    const password = req.body.user_pass;
    const userid = req.params.user_id;
    const user = new User (null, username, password);
    console.log(user);
    user
    .register()
    .then(() => {
     return User.lastSign()
    })
    .then(([row]) => {
        res.redirect(`/register/upload/${row[0].user_id}`);
    })
    .catch(err => console.log(err));
};


exports.postAddFilm = (req, res, next) => {
    const title = req.body.title;
    const url = req.body.url;
    const sinopsis = req.body.sinopsis;
    const year_release = req.body.year_release;
    const gen_id = req.body.gen_id;
    const user_id = req.params.user_id;
    const thumbnail = req.body.thumbnail
    const shortfilm = new Shortfilm(null, title, url, sinopsis, year_release, null, user_id, gen_id, null, thumbnail); //user_id vas el user id que esta activo
    console.log(shortfilm);
    shortfilm
      .save()
      .then(() => {
        res.render('register', {
            userflag: true,
            message: 'video subido correctamente',
            participantData: user_id
        });
      })
      .catch(err => console.log(err));
  };
 


// ------------------ TODO PARA EL /REGISTER

// -GET- CHECK LOGIN ANTES DE INSERTAR
// -POST- DARSE DE ALTA EMAIL Y CONTRASEÑA  // REDIRECT A /LOGIN

// (/upload)




// (/)
exports.postLogin = (req, res, next) => {
    const username = req.body.user_name; // attr Name = "user" en la view 
    const password = req.body.user_pass;
    User.login(username, password)
    .then(([row]) => {
       if (row[0]){ // Si recibo algo es que el user existe
        console.log(row[0]);
            if(row[0].user_id !== 5){
                res.render('register', {
                    userflag: true,
                    participantData: row[0].user_id
                });
            };
            } else {
                res.redirect('/register/post');
            }
        })
    .catch(err => console.log(err));
};

// ------------------- TODO PARA EL /ADMIN


// -GET- CHECK ADMIN LOGIN ---> LUEGO DE COMPROBAR, RENDER DE LA PAGINA

exports.getLoginAdmin = (req, res, next) => {
    res.render('indexFilm', {
      pageTitle: 'Admin Area',
      path: '/admin',
      admin: false
    });
  };

// postLoginAdmin

exports.postLoginAdmin = (req, res, next) => {
    
    const username = req.body.user_name; // attr Name = "user" en la view 
    const password = req.body.user_pass;
    User.loginAdmin(username, password)
    .then(([row]) => {
       if (row[0]){ // Si recibo algo es que el user existe
        console.log(row[0]);
            if(row[0].user_id === 5/*"Admin" && row[0].user_pass === "123456"*/){
                Shortfilm.fetchAll()
                .then(([shortfilms]) => {
                    console.log(shortfilms);
                    res.render('indexFilm', {       // en el ejs hacer un for loop que recorra los elementos de los videos para ponerlos en pantalla
                        shortfilms: shortfilms,
                        admin: true
                    });
                })
                .catch(err => console.log(err));
                    };
            } else { // Si no hay usuario con esos datos:
            res.render('indexFilm', { // RUTA PLANTILLA Pagina incial
                pageTitle: 'main_page',
                error: 'try again',
                message: false,
                admin: false
            });
        }
    })
    .catch(err => console.log(err));

};


// -GET- BUSCAR Y AGREGAR TODAS LAS PELICULAS CON DOS BOTONES, DELETE Y ENABLE

exports.postDeleteFilm = (req, res, next) => {
    const filmid = req.params.id;
    Shortfilm.deleteById(filmid)
    //res.redirect('/admin/film');
    .then(() => {
        return Shortfilm.fetchAll()
        .then(([shortfilms]) => {
            console.log(shortfilms);
            res.render('indexFilm', {       // en el ejs hacer un for loop que recorra los elementos de los videos para ponerlos en pantalla
                shortfilms: shortfilms,
                admin: true
            });
        });
    });
};




// -POST- HABILITAR LAS PELICULAS ---> ENABLE=1 ON CLICK Y MARCAR LAS YA HABILITADAS



  exports.postDisableFilm = (req, res, next) => {
    const filmid = req.params.id;
    console.log(filmid);
    Shortfilm.disableFilm(filmid)
    .then(() => {
        return Shortfilm.fetchAll()
        .then(([shortfilms]) => {
            console.log(shortfilms);
            res.render('indexFilm', {       // en el ejs hacer un for loop que recorra los elementos de los videos para ponerlos en pantalla
                shortfilms: shortfilms,
                admin: true
            });
        });
    });
  };

  exports.postEnableFilm = (req, res, next) => {
    const filmid = req.params.id;
    console.log(filmid);
    Shortfilm.enableFilm(filmid)
    .then(() => {
        return Shortfilm.fetchAll()
        .then(([shortfilms]) => {
            console.log(shortfilms);
            res.render('indexFilm', {       // en el ejs hacer un for loop que recorra los elementos de los videos para ponerlos en pantalla
                shortfilms: shortfilms,
                admin: true
            });
        });
    });
  };
  


