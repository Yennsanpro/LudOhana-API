const MaterialModel = require('../models/material.model.js')

async function getAllMaterials(req, res) {
	try {
		const materials = await MaterialModel.findAll()

		if (materials) {
			return res.status(200).json(materials)
		} else {
			return res.status(404).send('No materials found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneMaterial(req, res) {
	try {
		const material = await MaterialModel.findByPk(req.params.materialId)
		if (material) {
			return res.status(200).json(material)
		} else {
			return res.status(404).send('Material not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createMaterial(req, res) {
	try {
		const material = await MaterialModel.create(req.body)
		return res.status(200).json({ message: 'Material created', material: material })
	} catch (error) {
		res.status(500).json({messageError: error.message})
	}
}

async function updateMaterial(req, res) {
	try {
		const [materialExist] = await MaterialModel.update(req.body, {
			returning: true,
			where: {
				id: req.params.materialId,
			},
		})
        if (materialExist !== 0) {
			return res.status(200).json({message: 'Material updated'})
		} else {
			return res.status(404).json({messageError: 'Material not found or not have changes'})
		}
	} catch (error) {
		return res.status(500).json({messageError: error.message})
	}
}

async function deleteMaterial(req, res) {
	try {
		const material = await MaterialModel.destroy({
			where: {
				id: req.params.materialId,
			},
		})
		if (material) {
			return res.status(200).json('Material deleted')
		} else {
			return res.status(404).send('Material not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	getAllMaterials,
	getOneMaterial,
	createMaterial,
	updateMaterial,
	deleteMaterial,
}
