const models = require('../models');

const findAll = async () => {
    proyectos = await models.Proyectos.findAll();
    return proyectos;
}

const findByRFC = async (rfc) => {
    proyectos = await models.Proyectos.findAll({
        where: {
            id: rfc
        }
    });
    return proyectos;
}

exports.findAll = findAll;
exports.findByRFC = findByRFC;