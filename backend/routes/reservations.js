const express = require('express')
const pool = require('../db')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM reservations ORDER BY created_at DESC'
    )

    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reservations' })
  }
})

router.post('/', async (req, res) => {
  const {
    apartmentId,
    guestName,
    guestEmail,
    checkIn,
    checkOut,
    guests,
  } = req.body

  try {
    const overlap = await pool.query(
      `
      SELECT *
      FROM reservations
      WHERE apartment_id = $1
        AND check_in < $3
        AND check_out > $2
      `,
      [apartmentId, checkIn, checkOut]
    )

    if (overlap.rows.length > 0) {
      return res.status(409).json({
        error: 'Dates are not available',
      })
    }

    const result = await pool.query(
      `
      INSERT INTO reservations
        (apartment_id, guest_name, guest_email, check_in, check_out, guests)
      VALUES
        ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [apartmentId, guestName, guestEmail, checkIn, checkOut, guests]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Failed to create reservation' })
  }
})

module.exports = router
