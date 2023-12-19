const express = require("express");
const listarCategorias = require("../controllers/categoria/listarCategorias");
const rotas = express();

rotas.get("/categoria", listarCategorias);

module.exports = rotas;
