const router = require('express').Router()

const { getAllMaterials, getOneMaterial, createMaterial, updateMaterial, deleteMaterial } = require('../controllers/material.controller')

router.get('', getAllMaterials)
router.get('/:materialId', getOneMaterial)
router.post('', createMaterial)
router.put('/:materialId', updateMaterial)
router.delete('/:materialId', deleteMaterial)

module.exports = router
