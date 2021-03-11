//  Archivo controllers/mascotas.js
//  Simulando la respuesta de objetos Mascotas
 // en un futuro aquí se utilizarán los modelos
 //

// importamos el modelo de usuarios
const mongoose = require('mongoose')
const Mascota = require('../models/Mascota')


function crearMascota(req, res, next) {
  var mascota = new Mascota(req.body)
  mascota.anunciante = req.usuario.id
  mascota.estado = 'disponible'
  mascota.save().then(mascota => {
    res.status(201).send(mascota)
  }).catch(next)
}

function obtenerMascotas(req, res, next) {
  if(req.params.id){
    Mascota.findById(req.params.id)
			.populate('anunciante', 'username nombre apellido bio foto').then(mascotas => {
	      res.send(mascotas)
	    }).catch(next)
  } else {
    Mascota.find().then(mascotas=>{
      res.send(mascotas)
    }).catch(next)
  }
}

function modificarMascota(req, res) {
  // simulando una mascota previamente existente que el cliente modifica
  var mascota1 = new Mascota(req.params.id, 'Pelusa', 'Gato','pelusa.jpg','un gato muy peludo','stuart','USA')
  var modificaciones = req.body
  mascota1 = { ...mascota1, ...modificaciones }
  res.send(mascota1)
}

function eliminarMascota(req, res) {
  // se simula una eliminación de una mascota, regresando un 200
  res.status(200).send(`Mascota ${req.params.id} eliminado`);
}

// exportamos las funciones definidas
module.exports = {
  crearMascota,
  obtenerMascotas,
  modificarMascota,
  eliminarMascota
}
