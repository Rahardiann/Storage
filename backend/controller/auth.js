const { response } = require("../routes/barang_jadi");

const userModel = require(`../models/index`).user

exports.login = async (request, response) => {
    let result = await userModel.findOne({
        where: {
            username: request.body.username,
            password: request.body.password
        }
    })

    if (result) {
        response.status(200).json({
            status: true,
            data: result,
            message: "Login Berhasil tol"
        })
    } else {
        response.status(400).json({
            status: false,
            message: "Login Gagal"
        });
    }
}

exports.createUser = async (request, response) => {
    let data = {
        username: request.body.username,
        password: request.body.password
    }
    
    userModel.create(data)
    .then(result => {
        response.json ({
            data: result,
            message: "Data berhasil ditambahkan!"
        })
    })
    .catch(result => {
        response.json ({
            message: error.message
        })
    })
}

exports.updateUser = async (request, response) => {
    let data = {
        username: request.body.username,
        password: request.body.password
    }

    let idUser = request.params.id;

    userModel.update(data, {where: {id: idUser}})
    .then(result => {
        response.status(200).json({
            status: true,
            message: "Data updated"
        })
    })
    .catch(error => {
        response.status(400).json({
            status: false,
            message: error.message
        })
    })
}

exports.deleteUser = async (request, response) => {
    let idUser = request.params.id;

    userModel.destroy({where: {id: idUser}})
    .then(result => {
        response.status(200).json({
            status: true,
            message: "Data deleted"
        })
    })
    .catch(error => {
        response.status(400).json({
            status: false,
            message: error.message
        })
    })
}