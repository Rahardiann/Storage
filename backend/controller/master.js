const master = require(`../models/index`)
const kategoriModel = master.dat_kategori
const bjadiModel = master.dat_bjadi
const bmentahModel = master.dat_bmentah
const Op = require(`sequelize`).Op;

exports.kategoriMaster = async (request, response) => {
    let data = {
        kategori: request.body.kategori,
        kode: request.body.kode
    }

    kategoriModel.create(data)
    .then(result => {
        response.json({
            message: "Data berhasil ditambah",
            data: result
        })
    })
    .catch(error => {
        response.json({
            message: error.message
        })
    })
}

exports.bjadiMaster = async (request, response) => {
    let data = {
        kategori: request.body.kategori,
        nm_bjadi: request.body.nm_bjadi,
    }

    bjadiModel.create(data)
    .then(result => {
        response.json({
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

exports.bmentahMaster = async (request, response) => {
    let data = {
        kategori: request.body.kategori,
        nm_bmentah: request.body.nm_bmentah,
    }

    bmentahModel.create(data)
    .then(result => {
        response.json({
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