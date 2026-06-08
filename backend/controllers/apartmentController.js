const { Apartment, ApartmentImage, Review, User, Reservation } = require('../models')

const getAllApartments = async (req, res) => {
  console.log("📡 [GET /apartments] Χτυπάω τη βάση δεδομένων με Apartment.findAll()...");

  try {
    const data = await Apartment.findAll({
      logging: console.log // Αυτό θα τυπώσει το SQL query στο terminal αν προλάβει
    });

    console.log(`✅ [DATABASE SUCCESS] Βρέθηκαν ${data.length} διαμερίσματα.`);
    res.json(data);
  } catch (err) {
    // 💥 ΕΔΩ ΕΙΝΑΙ ΤΟ ΚΛΕΙΔΙ: Θα γράψουμε το σφάλμα στο terminal του backend!
    console.error("❌💥 ΣΦΑΛΜΑ ΣΤΟ SEQUELIZE QUERY:", err);
    
    // Επιστρέφουμε το σφάλμα και στον browser για να το βλέπεις εκεί
    res.status(500).json({ 
      error: "Sequelize Error", 
      message: err.message, 
      details: err.original ? err.original.message : null 
    });
  }
}

const getApartmentById = async (req, res) => {
  try {
    const data = await Apartment.findByPk(req.params.id)

    if (!data) {
      return res.status(404).json({ error: 'Apartment not found' })
    }

    console.log(`📡 [GET /apartments/:id] Retrieved apartment with ID ${req.params.id}`)
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const createApartment = async (req, res) => {
  try {
    const payload = {
    title: req.body.title,
    description: req.body.description,
    pricePerNight: req.body.pricePerNight,
    location: req.body.location,
    urlCover: req.body.urlCover
  };
    const data = await Apartment.create(payload)
    console.log(`📡 [POST /apartments] Created apartment with ID ${data.id}`)
    res.status(201).json(data)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const updateApartment = async (req, res) => {
  try {
    const data = await Apartment.findByPk(req.params.id)

    if (!data) {
      return res.status(404).json({ error: 'Apartment not found' })
    }

    const payload = {
    title: req.body.title,
    description: req.body.description,
    pricePerNight: req.body.pricePerNight,
    location: req.body.location,
    urlCover: req.body.urlCover
  };
    await data.update(payload)
    console.log(`📡 [PUT /apartments/:id] Updated apartment with ID ${req.params.id}`)
    res.json(data)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const deleteApartment = async (req, res) => {
  try {
    const data = await Apartment.findByPk(req.params.id)

    if (!data) {
      return res.status(404).json({ error: 'Apartment not found' })
    }

    await data.destroy()
    console.log(`📡 [DELETE /apartments/:id] Deleted apartment with ID ${req.params.id}`)
    res.json({ deleted: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getApartmentImages = async (req, res) => {
  try {
    const data = await ApartmentImage.findAll({
      where: {
      apartmentId: req.params.apartmentId,
    },
      logging: console.log
    })

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getApartmentReviews = async (req, res) => {
  try {
    const data = await Review.findAll({
      where: {
      apartmentId: req.params.apartmentId,
    },
      include: [User],
    })

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getApartmentReservations = async (req, res) => {
  try {
    const data = await Reservation.findAll({
      where: {
      apartmentId: req.params.apartmentId,
    },
      include: [User],
    })

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getAllApartments,
  getApartmentById,
  createApartment,
  updateApartment,
  deleteApartment,
  getApartmentImages,
  getApartmentReviews,
  getApartmentReservations,
}
