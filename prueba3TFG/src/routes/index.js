//urls de la aplicacion principal

const router = require('express').Router(); //facilita la creacion de routers.

router.get('/', (req,res) => {
    //res.send('Index');
    res.render('index');
});

router.get('/about', (req,res) => {
    //res.send('About');
    res.render('about');
});

router.get('/panel', (req,res) => {
    //res.send('About');
    res.render('panel');
});


module.exports = router;