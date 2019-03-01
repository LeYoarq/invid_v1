const path = require('path');



// USER Login button clicked
exports.postLogin = (req, res, next) => {
    
    const username = req.body.user; // attr Name = "user" en la view 
    const password = req.body.password;
    User.login(username, password)
    .then(([row]) => {
       if (row[0].id.length > 0){ // Si recibo algo es que el user existe
            res.render('/index', { // RUTA PLANTILLA Home
                pageTitle: 'home',
                user: row[0] // Variable que puedo usar en la plantilla que tiene la info del usuario
            });
       }
       else { // Si no hay usuario con esos datos:
            res.render('/index', { // RUTA PLANTILLA Pagina incial
                pageTitle: 'main_page',
                error: 'No te has registrado', // Añadir pop-up con alerta jquery
                message: false
            });
       }
    })
    .catch(err => console.log(err));

};

// Register
exports.postRegister = (req, res, next) => {
    
    const username = req.body.user; // attr Name = "user" en la view , el user name será el correo electronico
    const password = req.body.password;
    
    const user = new User (null, username, password);

    user.register()
    .then(() => {
        res.render('/submit', { // RUTA PLANTILLA Pagina submit donde se registra el usuario y puede subir video si quiere
            pageTitle: 'submit_page',
            error: false,  
            message: 'Usuario registrado correctamente' // Crear alerta // se queda en esta pagina y se habilita un boton de "SUBIR VIDEO" y otro de "VER VIDEOS"
        });
    })
    .catch(err => console.log(err));

};


// JURY login button clicked
exports.postLoginJury = (req, res, next) => {
    
    const juryname = req.body.jury; // attr Name = "jury" en la view 
    const jpassword = req.body.jpassword;
    User.login(juryname, jpassword)
    .then(([row]) => {
       if (row[0].id.length > 0){ // Si recibo algo es que el user existe
            res.render('/index', { // RUTA PLANTILLA Home
                pageTitle: 'home',
                user: row[0] // Variable que puedo usar en la plantilla que tiene la info del usuario
            });
       }
       else { // Si no hay usuario con esos datos:
            res.render('/index', { // RUTA PLANTILLA Pagina incial
                pageTitle: 'home',
                error: 'Juez no registrado', // Añadir pop-up con alerta jquery
                message: false
            });
       }
    })
    .catch(err => console.log(err));

};


};






