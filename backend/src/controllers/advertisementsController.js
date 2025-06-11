import Advertisement from "../models/Advertisements.js";

const advertisementsController = {};


advertisementsController.getdAvertisements  = async (req, res) => {
  try {
    const advertisements = await Advertisement.find()
    res.json(advertisements);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener anuncios", error });
  }
};


advertisementsController.createAdvertisement  = async (req, res) => {
  try {
    const { description, status, tittle } = req.body;
    const newAdvertisement = new Advertisement({ description, status, tittle });
    await newAdvertisement.save();
    res.json({ message: "Anuncio creada exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al crear el anuncio", error });
  }
};


advertisementsController.updateAdvertisements  = async (req, res) => {
  try {
    const { description, status, tittle } = req.body;
    await Advertisement.findByIdAndUpdate(
      req.params.id,
      { description, status, tittle },
      { new: true }
    );
    res.json({ message: "Anuncio actualizada correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el anuncio", error });
  }
};


advertisementsController.deleteAdvertisements = async (req, res) => {
  try {
    await Advertisement.findByIdAndDelete(req.params.id);
    res.json({ message: "Anuncio eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar el anuncio", error });
  }
};

export default advertisementsController;
