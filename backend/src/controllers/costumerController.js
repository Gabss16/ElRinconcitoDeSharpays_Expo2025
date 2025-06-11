import Costumer from '../models/costumer.js';

// Crear un nuevo cliente
export const createCostumer = async (req, res) => {
  try {
    const costumer = new Costumer(req.body);
    await costumer.save();
    res.status(201).json(costumer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los clientes
export const getCostumers = async (req, res) => {
  try {
    const costumers = await Costumer.find();
    res.status(200).json(costumers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un cliente 
export const getCostumerById = async (req, res) => {
  try {
    const costumer = await Costumer.findById(req.params.id);
    if (!costumer) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.status(200).json(costumer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar 
export const updateCostumer = async (req, res) => {
  try {
    const costumer = await Costumer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!costumer) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.status(200).json(costumer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//Eliminar
export const deleteCostumer = async (req, res) => {
  try {
    const costumer = await Costumer.findByIdAndDelete(req.params.id);
    if (!costumer) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.status(200).json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export default model("Costumer", CostumerSchema);
