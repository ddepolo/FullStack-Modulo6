var express = require('express');
var router = express.Router();
var empleados = require('../models/empleados');


router.get('/', async function(req, res, next) {
  var data = await empleados.getEmpleados();
  res.render('index', { resu:data, postUrl:'/add' });
});



router.post('/add', async (req, res, next) => {
  try {
    await empleados.sendEmpleados(req.body);
    res.redirect('/');
  }catch (error){
    console.log(error);
  }
})

router.get('/borrar/:id', async (req, res, next) => {
  var id = req.params.id;
  await empleados.delEmpleados(id);
  res.redirect('/');
  
})

router.get('/editar/:id', async (req, res, next) => {
  var id = req.params.id;
  var empl = await empleados.editEmpleadosGetInfo(id);
  var data = await empleados.getEmpleados();
  res.render('index', {empl, resu:data, postUrl:'/editar'});
})

router.post('/editar', async (req, res, next) => {
  try{
    obj = {
      nombre: req.body.nombre,
      telefono: req.body.telefono,
      dir: req.body.dir
    }

    await empleados.editEmpleados(obj, req.body.id);
    res.redirect('/');
  }catch(err){
    console.log(err)
  }
});





module.exports = router;
