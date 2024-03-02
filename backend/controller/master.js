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



exports.statistikTransaksi = (request, response) => {
    const menuTotals = new Map();
  
    detailModel
      .findAll()
      .then((details) => {
        // Fetch menu details
        menuModel.findAll().then((menus) => {
          // Iterate over each detail
          details.forEach((detail) => {
            const menuId = detail.id_menu;
  
            // Find the corresponding menu for the current detail
            const menu = menus.find((m) => m.id === menuId);
  
            if (menu) {
              const menuName = menu.nama_menu;
              const total = detail.qty;
  
              // Update or initialize total for the menu item in the hash map
              if (menuTotals.has(menuName)) {
                menuTotals.set(menuName, menuTotals.get(menuName) + total);
              } else {
                menuTotals.set(menuName, total);
              }
            }
          });
  
          // Convert hash map to array of objects
          const result = Array.from(menuTotals, ([menuName, total]) => ({
            nama_menu: menuName,
            total_pembelian: total,
          }));
  
          return response.json({
            data: result,
          });
        });
      })
      .catch((error) => {
        response.json({
          message: error.message,
        });
      });
  };