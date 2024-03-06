const router = require('express').Router()

const { getAllMaterials, getOneMaterial, createMaterial, updateMaterial, deleteMaterial } = require('../controllers/material.controller')

router.get('', getAllMaterials)
router.get('/:id', getOneMaterial)
router.post('', createMaterial)
router.put('/:id', updateMaterial)
router.delete('/:id', deleteMaterial)

module.exports = router
