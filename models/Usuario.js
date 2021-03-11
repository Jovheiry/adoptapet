// Usuario.js
//Clase que representa a un usuario de la plataforma//
//
//class Usuario {
 // constructor(id, username, nombre, apellido, email, password, ub/icacion, telefono, bio, fotos, tipo) {
//    this.id = id;
//    this.username = username;
//    this.nombre = nombre;
//    this.apellido = apellido;
//    this.email = email;
//    this.password = password;
//    this.ubicacion = ubicacion;
    //this.telefono = telefono;
//    this.bio = bio;
//    this.fotos = fotos;
  //  t//his.tipo = tipo; // tipo normal o anunciante
  //}//
//}//
/*
//module.exports = Usuario;
// Usuario.js
const crypto = require('crypto');                             //Importando módulo crypto, pendiente de instalar.
const jwt = require('jsonwebtoken');                          //Importando módulo jsonwebtoken, pendiente de instalar.
const secret = require('../config').secret;                   // ????
const mongoose = require('mongoose');            //Importando mongoose.
//Definiendo el objeto UsuarioSchema con el constructor Schema.
//Definiendo cada campo con su respectivo tipo de dato.
const uniqueValidator = require("mongoose-unique-validator"); //Importando módulo mongoose-unique-validator, pendiente de instalar.

//Definiendo cada campo con sus tipo sde datos y las validaciones sobre este.
const UsuarioSchema = new mongoose.Schema({                   
username: {                                                  
  type: String,
  unique: true, //este campo no se puede repetir
  lowercase: true,
  required: [true, "no puede estar vacío"],
  match: [/^[a-zA-Z0-9]+$/, "es inválido"],
  index: true,
},                                           
nombre: { type: String, required: true },
apellido: { type: String, required: true },
email: {
  type: String,
  unique: true, //este campo no se puede repetir
  lowercase: true,
  required: [true, "no puede estar vacío"],
  match: [/\S+@\S+\.\S+/, "es inválido"],
  index: true,
},
ubicacion: String,
telefono: String,
bio: String,
foto: String,
tipo: { type: String, enum: ['normal', 'anunciante'] },
hash: String, //este campo se utilizará para la sesión
salt: String, //este campo se utilizará para la sesión
},
{ timestamps: true }
);

// usando plugin de validación para que no se repitan correos ni usernames
UsuarioSchema.plugin(uniqueValidator, { message: "Ya existe" });

UsuarioSchema.methods.crearPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex"); // generando una "sal" random para cada usuario
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex"); // generando un hash utilizando la sal
};

/**
 * Recibe el password, genera y compara el has con el de la base de datos
 *//*
UsuarioSchema.methods.validarPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

UsuarioSchema.methods.generarJWT = function() {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60); // 60 días antes de expirar

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

/**
 * Devuelve la representación de un usuario después de autenticar
 *//*
UsuarioSchema.methods.toAuthJSON = function(){
  return {
    username: this.username,
    email: this.email,
    token: this.generarJWT()
  };
};

/**
* Devuelve la representación de un usuario, sólo datos públicos
*//*
UsuarioSchema.methods.publicData = function(){
  return {
    id: this.id,
    username: this.username,
    email: this.email,
    nombre: this.nombre,
    apellido: this.apellido,
    bio: this.bio,
    foto: this.foto,
    tipo: this.tipo,
    ubicacion: this.ubicacion,
    telefono: this.telefono,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

mongoose.model("Usuario", UsuarioSchema);  
// usando plugin de validación para que no se repitan correos ni usernames
UsuarioSchema.plugin(uniqueValidator, { message: "Ya existe" }); 
  //Define el modelo Usuario, utilizando el esquema UsuarioSchema.*/
  // importamos por separado los métodos de Sequelize y los tipos de dato.
const { Sequelize, DataTypes } = require('sequelize');
// importamos sequelize con la opción de memory para forzar al gestor a almacenarla en la memoria.
const sequelize = new Sequelize('mysql::memory:');

//creamos el modelo para usuario
const Usuario = sequelize.define('Usuario', {
  id: {
    // se indica el tipo de dato de la columna.
    type: DataTypes.INTEGER,
    // indicamos que este campo es llave primaria
    primaryKey : true
  },
  username: {
    type: DataTypes.STRING,
    // indicamos que el campo no admite valores null
    allowNull: false
  },
  nombre: DataTypes.STRING,
  apellido: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  ubicacion: DataTypes.STRING,
  telefono: DataTypes.STRING,
  bio: DataTypes.STRING,
  fotos: DataTypes.STRING,
  tipo : DataTypes.INTEGER
  // le decimos a que tabla de nuestra base de datos corresponde.
},{ tableName: 'usuario'});

// exportamos el modelo.
module.exports = Usuario;
