#!/bin/bash

BASE_URL="http://localhost:3002"

case "$1" in
  api)
    curl -s "$BASE_URL/api" | jq
    ;;

  apartments)
    curl -s "$BASE_URL/api/apartments/getAllApartments" | jq
    ;;

  apartment)
    curl -s "$BASE_URL/api/apartments/getApartmentById/$2" | jq
    ;;

  users)
    curl -s "$BASE_URL/api/users/getAllUsers" | jq
    ;;

  user)
    curl -s "$BASE_URL/api/users/getUserById/$2" | jq
    ;;

  reviews)
    curl -s "$BASE_URL/api/reviews/getAllReviews" | jq
    ;;

  review)
    curl -s "$BASE_URL/api/reviews/getReviewById/$2" | jq
    ;;

  reservations)
    curl -s "$BASE_URL/api/reservations/getAllReservations" | jq
    ;;

  reservation)
    curl -s "$BASE_URL/api/reservations/getReservationById/$2" | jq
    ;;

  *)
    echo "Usage:"
    echo "  npm run test:api api"
    echo "  npm run test:api apartments"
    echo "  npm run test:api apartment 1"
    echo "  npm run test:api users"
    echo "  npm run test:api user 1"
    echo "  npm run test:api reviews"
    echo "  npm run test:api review 1"
    echo "  npm run test:api reservations"
    echo "  npm run test:api reservation 1"
    ;;
esac
