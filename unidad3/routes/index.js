var express = require('express');
var router = express.Router();
var empleados = require('../models/empleados');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);

router.get('/', async function(req, res, next) {
  var data = await empleados.getEmpleados();
  res.render('index', { resu:data, postUrl:'/add' });
});



router.post('/add', async (req, res, next) => {
  try {
    console.log(req.body);
    //cargamos y verificamos si se sube la imagen
    var id_img = '';
    if(req.files && Object.keys(req.files).length>0){
      imagen = req.files.imagen;
      id_img = (await uploader(imagen.tempFilePath)).public_id;
    }

    await empleados.sendEmpleados({
      ...req.body,
      id_img
    });
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
