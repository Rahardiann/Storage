const userModel = require(`../models/index`).user

exports.login = async (request, response) => {
    userModel.findAll({
        where: {
            username: request.body.username,
            password: request.body.password
        }
    })
    .then(result => {
        response.json({
            status: true,
            data: result,
            message: "Login berhasil!"
        })
    })
    .catch(error => {
        response.json ({
            status: false,
            message: error.message
        })
    })
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