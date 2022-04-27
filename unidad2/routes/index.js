var express = require('express');
var router = express.Router();
var empleados = require('../models/empleados');


router.get('/', async function(req, res, next) {
  var data = await empleados.getEmpleados();
  //console.log('res:'+data[1].nombre)

  res.render('index', { resu: data });
});


/*
router.post('/', async (req, res, next) => {
  try {
    var usr = req.body.usr;
    var psw = req.body.psw;

    var data = await empleados.getEmpleados();

    if(data != undefined){
      req.session.user_id = data.id;
      req.session.user_nom = data.nombre;

      res.redirect('page2');

      console.log('login OK');
    }else{
      res.render('index', {
        mensajeErr: "Usuario o contraseña incorrectos."
      });

      console.log('ERROR login');
    }
  }catch{
    console.log(err);
  }
})*/





module.exports = router;
