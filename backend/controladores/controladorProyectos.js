const proyectos = require('../persistencia/proyectos');

const getAll = async function(req, res) {
    let p = await proyectos.findAll();
    await res.json(p);
    console.log(p);
};

const getByRFC = async function(req, res) {
    let p = await proyectos.findByRFC(1);
    await res.json(p);
    console.log(p);
}

exports.getAll = getAll;
exports.getByRFC = getByRFC;