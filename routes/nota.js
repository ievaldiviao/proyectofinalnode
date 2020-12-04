import express, { Router } from 'express';
const router = express.Router();

//Importar mi Modelo
import Nota from '../models/nota';

//Agregar una Nota
router.post('/nueva-nota', async(req, res) => {
    const body = req.body;
    try {
        const notaDB = await Nota.create(body);
        res.status(200).json(notaDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un Error',
            error
        })
    }
});

//Obtener nota (GET) con el _id
router.get('/nota/:id', async (req, res)=>{
    const _id = req.params.id;

    try {
        const notaDB = await Nota.findOne({_id});
        res.json(notaDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un Error',
            error
        })
    }
});

//Obtener todas las notas
router.get('/nota/', async (req, res)=>{
    try {
        const notaDB = await Nota.find();
        res.json(notaDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un Error',
            error
        })
    }
});

//Borrar nota mediante el _id
router.delete('/nota/:id', async (req, res)=>{
    const _id = req.params.id;

    try {
        const notaDB = await Nota.findByIdAndDelete({_id});
        if(!notaDB){
            return res.status(400).json({
                mensaje: 'No se encontró la nota',
                error
            })
        }
        res.json(notaDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un Error',
            error
        })
    }
});

//Actualizar una nota mediante el PUT
router.put('nota/:id', async(req, res)=>{
    const _id = req.params.id;
    const body = req.body;

    try {
        const notaDB = await Nota.findByIdAndUpdate(_id,body,{new: true});
        res.json(notaDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un Error',
            error
        })
    }
});

//Exportamos la configuración
module.exports = router;