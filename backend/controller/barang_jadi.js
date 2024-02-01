const bjadiModel = require(`../models/index`).bjadi;
const Op = require(`sequelize`).Op;

exports.getAllBjadi = async (request, response) => {
    bjadiModel.findAll()
    .then(result => {
        response.json({
            data: result
        })
    })
    .catch(error => {
        response.json({
            message: error.message
        })
    })
}

exports.createBjadi = async (request, response) => {
    let data = {
        nm_bjadi: request.body.nm_bjadi,
        jml_bjadi: request.body.jml_bjadi,
        gambar: request.body.gambar
    }
    bjadiModel.create(data)
    .then(result => {
        response.json ({
            message: "Data berhasil ditambahkan",
            data: result
        })
    })
    .catch(error => {
        response.json({
            message: error.message
        })
    })
}

exports.deleteBjadi = async (request, response) => {
    bjadiModel.destroy({where: {id: id_user}})
    .then(result => {
        response.json({
            message: "Data berhasil dihapus",
        })
    })
    .catch(error => {
        response.json({
            message: error.message
        })
    })
}

exports.updateBjadi = async (request, response) => {
    let data = {
        nm_bjadi: request.body.nm_bjadi,
        jml_bjadi: request.body.jml_bjadi
    }
    
    bjadiModel.update(data)
    .then(result => {
        response.json({
            message: "Data berhasil diganti",
            data: result
        })
    })
    .catch(error => {
        response.json({
            message: error.message
        })
    })
}
