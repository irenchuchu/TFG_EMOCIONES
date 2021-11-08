const express = require('express');
const path = require ('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

// INICIALIZACIONES
const app = express();
require('./database');
require('./config/passport');

// SETTINGS -> Configuraciones
app.set('port', process.env.PORT || 3000); //definimos el puerto, si existe uno que lo tome y sino que use el 3000
app.set('views', path.join(__dirname, 'views')); // join -> concatena carpetas. Localizamos carpeta views, que es donde irán los HTMLs
app.engine('.hbs', exphbs({ //.hbs para que sean archivos handlebars
    //propiedades para saber usar las vistas:
     defaultLayout: 'main', //navegación que se repetirá en todas las vistas
     layoutsDir: path.join(app.get('views'), 'layouts'), 
     partialsDir: path.join(app.get('views'), 'partials') ,
     extname:'.hbs' //extension de los archivos
 }));
 app.set('view engine', '.hbs'); //utilizar la configuración / motor de las vistas 


// MIDDLEWARES -> Funciones ejecutadas antes de llegar al servidor
app.use(express.urlencoded({extended: false})); //para recibir datos del usuario (email,contraseña)
app.use(methodOverride('_method')); //para que los formularios pueden usar otros metodos ademas de GET y POST 
app.use(session({ //para autenticar el usuario
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// VARIABLES GLOBALES -> Colocar ciertos datos accesibles por toda la aplicacion
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// RUTAS -> urls
app.use(require('./routes/index'));
app.use(require('./routes/users'));

// ARCHIVOS ESTATICOS
app.use(express.static(path.join(__dirname, 'public')));


// INICIAR SERVIDOR 

app.listen(app.get('port'), () => {
    console.log('El servidor esta escuchando en el puerto', app.get('port')) //LEYENDO PUERTO
});