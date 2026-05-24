require('../config/env')

const axios = require('axios')

const BASE_URL =
  process.env.BASE_URL ||
  `http://localhost:${process.env.PORT || 5000}`

const command = process.argv[2]
const id = process.argv[3]

const run = async () => {
  try {
    switch (command) {
      case 'api': {
        const response = await axios.get(`${BASE_URL}/api`)

        console.log(JSON.stringify(response.data, null, 2))
        break
      }

      case 'apartments': {
        const response = await axios.get(
          `${BASE_URL}/api/apartments/getAllApartments`
        )

        console.log(JSON.stringify(response.data, null, 2))
        break
      }

      case 'apartment': {
        if (!id) {
          console.error('Missing id')
          process.exit(1)
        }

        const response = await axios.get(
          `${BASE_URL}/api/apartments/getApartmentById/${id}`
        )

        console.log(JSON.stringify(response.data, null, 2))
        break
      }

      case 'users': {
        const response = await axios.get(
          `${BASE_URL}/api/users/getAllUsers`
        )

        console.log(JSON.stringify(response.data, null, 2))
        break
      }

      case 'user': {
        if (!id) {
          console.error('Missing id')
          process.exit(1)
        }

        const response = await axios.get(
          `${BASE_URL}/api/users/getUserById/${id}`
        )

        console.log(JSON.stringify(response.data, null, 2))
        break
      }

      case 'reviews': {
        const response = await axios.get(
          `${BASE_URL}/api/reviews/getAllReviews`
        )

        console.log(JSON.stringify(response.data, null, 2))
        break
      }

      case 'review': {
        if (!id) {
          console.error('Missing id')
          process.exit(1)
        }

        const response = await axios.get(
          `${BASE_URL}/api/reviews/getReviewById/${id}`
        )

        console.log(JSON.stringify(response.data, null, 2))
        break
      }

      case 'reservations': {
        const response = await axios.get(
          `${BASE_URL}/api/reservations/getAllReservations`
        )

        console.log(JSON.stringify(response.data, null, 2))
        break
      }

      case 'reservation': {
        if (!id) {
          console.error('Missing id')
          process.exit(1)
        }

        const response = await axios.get(
          `${BASE_URL}/api/reservations/getReservationById/${id}`
        )

        console.log(JSON.stringify(response.data, null, 2))
        break
      }

      default:
        console.log('Usage:')
        console.log('  npm run test:api api')
        console.log('  npm run test:api apartments')
        console.log('  npm run test:api apartment 1')
        console.log('  npm run test:api users')
        console.log('  npm run test:api user 1')
        console.log('  npm run test:api reviews')
        console.log('  npm run test:api review 1')
        console.log('  npm run test:api reservations')
        console.log('  npm run test:api reservation 1')
        break
    }
  } catch (err) {
    if (err.response) {
      console.error(
        JSON.stringify(err.response.data, null, 2)
      )

      process.exit(err.response.status || 1)
    }

    console.error(err.message)
    process.exit(1)
  }
}

run()
