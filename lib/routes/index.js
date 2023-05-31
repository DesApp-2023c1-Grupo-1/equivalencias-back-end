import express from 'express';
import usuarios from './usuarios';
import equivalencias from './equivalencias';
import materias_aprobadas from './materias_aprobadas';
import universidades_origenes from './universidades_origenes';
import materias_solicitadas from './materias_solicitadas';
/*Agregado*/
import fileserver from './fileserver';
/****/
const router = express.Router();

router.use('/api/usuarios', usuarios);
router.use('/api/equivalencias', equivalencias);

router.use('/api/materias_aprobadas', materias_aprobadas);
router.use('/api/universidades_origenes', universidades_origenes);
router.use('/api/materias_solicitadas', materias_solicitadas);

/*Agregado*/
router.use('/api/archivos', fileserver);
/****/

export default router;
