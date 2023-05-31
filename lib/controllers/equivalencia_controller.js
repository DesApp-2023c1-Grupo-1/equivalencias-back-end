import { pick } from 'lodash';
import Equivalencia from '../models/equivalencia';
//import Usuario from "../models/usuario";
const { validationResult } = require('express-validator');

//const db = require('../models');
//var models = require("../models/equivalencia");
//Get de todas las realciones entre Equivalencia y materias solicitadas

export const getEquivalenciasSolicitadas = async (req, res) => {
  const equival = await Equivalencia.findAll({
    include: ['Materias_solicitadas'],
  });

  if (equival.length > 0) {
    res.json(equival.map((equival) => equival.toJSON()));
  } else {
    res.status(404).json({ message: `No hay equivalencias` });
  }
};

//Get de la realacion entre equivalencia y materias aprobadas
export const getEquivalenciaAprobadaID = async (req, res) => {
  const equivalenciaid = req.params.id;
  const equi = await Equivalencia.findByPk(equivalenciaid, {
    include: 'Materias_aprobadas',
  });
  if (equi) {
    res.json(equi.toJSON());
  } else {
    res
      .status(404)
      .json({ message: `Materia ${equivalenciaid} no encontrada` });
  }
};

export const getEquivalenciaSolicitadaID = async (req, res) => {
  const estado = req.params.id;
  const equi = await Equivalencia.findByPk(estado, {
    include: 'Materias_solicitadas',
  });
  if (equi) {
    res.json(equi.toJSON());
  } else {
    res
      .status(404)
      .json({ message: `materia solicitada ${estado} no encontrada` });
  }
};

export const getEquivalenciaMatAprobadas = async (req, res) => {
  const equival = await Equivalencia.findAll({ include: 'Materias_aprobadas' });
  if (equival.length > 0) {
    res.json(equival.map((equival) => equival.toJSON()));
  } else {
    res.status(404).json({ message: `No hay materias aprobadas` });
  }
};

export const index = async (req, res) => {
  const equivalencia = await Equivalencia.findAll({});
  res.json({ data: equivalencia.map((equivalencia) => equivalencia.toJSON()) });
};

export const show = async (req, res) => {
  const equivalencia = await Equivalencia.findByPk(req.params.id);
  if (equivalencia) {
    res.json({ data: equivalencia.toJSON() });
  } else {
    res.status(404).json({
      message: `No se encontró un Equivalencia con id ${req.params.id}`,
    });
  }
};

export const getEquivalenciasGeneral = async (req, res) => {
  const equival = await Equivalencia.findAll({
    include: ['Materias_solicitadas', 'Materias_aprobadas', 'Usuario'],
  });

  if (equival.length > 0) {
    res.json(equival.map((equival) => equival.toJSON()));
  } else {
    res.status(404).json({ message: `No hay equivalencias` });
  }
};

export const getEquivalenciasGeneralID = async (req, res) => {
  const equivalenciaid = req.params.id;
  const equi = await Equivalencia.findByPk(equivalenciaid, {
    include: ['Materias_solicitadas', 'Materias_aprobadas', 'Usuario'],
  });

  if (equi) {
    res.json(equi.toJSON());
  } else {
    res
      .status(404)
      .json({ message: `Materia ${equivalenciaid} no encontrada` });
  }
};

export const addEquivalencia = async (req, res) => {
  const createEquivalencia = req.body;
  const datoscreateEquivalencia = pick(createEquivalencia, [
    'id',
    'instituto',
    'estado',
    'observaciones',
  ]);

  const EquivalenciaParaCreate = { ...datoscreateEquivalencia };

  const dbResponse = await Equivalencia.create(EquivalenciaParaCreate);

  res.json(dbResponse);
};

export const updateEquivalencia = async (req, res) => {
  try {
    let id = req.params.id;
    let { instituto, estado, observaciones } = req.body;
    await Equivalencia.update(
      { instituto, estado, observaciones },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).send('Equivalencia actualizada');
  } catch (error) {
    console.log(error);
    res.status(500).send('No se pudieron actualizar los datos');
  }
};

export const deleteEquivalencia = async (req, res) => {
  try {
    let id = req.params.id;
    await Equivalencia.destroy({
      where: {
        id,
      },
    });
    res.status(200).send('Equivalencia eliminada');
  } catch (error) {
    console.log(error);
    res.status(500).send('No se pudieron borrar los datos');
  }
};

export const createEquivalencia = async (req, res) => {
  const EquivalenciaData = req.body;
  const datosEquivalencia = pick(EquivalenciaData, [
    'id',
    'instituto',
    'estado',
    'observaciones',
    'UsuarioId',
  ]);
  //const datosMateriaSolicitada = pick(EquivalenciaData, ["id", "nombre", "carrera"]);
  const datosMateriaAprobada = pick(EquivalenciaData, [
    'id',
    'nota',
    'carga_horaria',
    'año_aprobacion',
    'nombre_materia',
    'certificado',
    /*Agregado*/
    'archivo',
    'EquivalenciumId',
    'UniversidadOrigenId',
  ]);

  const EquivalenciaConTablas = {
    ...datosEquivalencia,
    Materias_aprobadas: [datosMateriaAprobada],
  };
  const dbResponse = await Equivalencia.create(EquivalenciaConTablas, {
    include: ['Materias_aprobadas'],
  });

  res.json(dbResponse);
};

//////////////////////////////////////////////////////////////////

export const createEquivalenciax3 = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  const EquivalenciaData = req.body;
  console.log(EquivalenciaData);
  const datosEquivalencia = pick(EquivalenciaData, [
    'id',
    'instituto',
    'estado',
    'observaciones',
    'UsuarioId',
  ]);
  const datosMateriaSolicitada = pick(EquivalenciaData, [
    'id',
    'nombre',
    'carrera',
  ]);

  //const datosMateriaAprobada = pick(EquivalenciaData, ["id", "nota", "carga_horaria", "año_aprobacion","nombre_materia","certificado","EquivalenciumId","UniversidadOrigenId"]);
  const EquivalenciaConTablas = {
    ...datosEquivalencia,
    Materias_solicitadas: datosMateriaSolicitada,
    Materias_aprobadas: EquivalenciaData.array,
  };
  const dbResponse = await Equivalencia.create(EquivalenciaConTablas, {
    include: ['Materias_aprobadas', 'Materias_solicitadas'],
  });
  res.json(dbResponse);
};

export const getEquivalenciasGeneralUsuario = async (req, res) => {
  const usuarioId = req.params.id;
  const equival = await Equivalencia.findAll({
    where: {
      UsuarioId: usuarioId,
    },
    include: ['Materias_solicitadas', 'Materias_aprobadas', 'Usuario'],
  });

  if (equival.length > 0) {
    res.json(equival.map((equival) => equival.toJSON()));
  } else {
    res.status(404).json({ message: `No hay equivalencias` });
  }
};
