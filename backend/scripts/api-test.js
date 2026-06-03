#!/usr/bin/env node
'use strict';

require('../config/env');
const axios = require('axios');

const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
const command = process.argv[2];
const id = process.argv[3];

const run = async () => {
  let targetUrl = '';

  try {
    switch (command) {
      case 'api':
        targetUrl = `${BASE_URL}/api`;
        break;

      // === APARTMENTS ===
      case 'apartments':
        targetUrl = `${BASE_URL}/api/apartments/`;
        break;
      case 'apartment':
        if (!id) return missingIdError('apartment');
        targetUrl = `${BASE_URL}/api/apartments/${id}`;
        break;

      // === USERS ===
      case 'users':
        targetUrl = `${BASE_URL}/api/users/`;
        break;
      case 'user':
        if (!id) return missingIdError('user');
        targetUrl = `${BASE_URL}/api/users/${id}`;
        break;

      // === REVIEWS ===
      case 'reviews':
        targetUrl = `${BASE_URL}/api/reviews/`;
        break;
      case 'review':
        if (!id) return missingIdError('review');
        targetUrl = `${BASE_URL}/api/reviews/${id}`;
        break;

      // === RESERVATIONS ===
      case 'reservations':
        targetUrl = `${BASE_URL}/api/reservations/`;
        break;
      case 'reservation':
        if (!id) return missingIdError('reservation');
        targetUrl = `${BASE_URL}/api/reservations/${id}`;
        break;

      // === APARTMENT IMAGES ===
      case 'apartmentImages':
        targetUrl = `${BASE_URL}/api/apartment-images/`; // Διορθώθηκε βάσει schema
        break;
      case 'apartmentImage':
        if (!id) return missingIdError('apartmentImage');
        targetUrl = `${BASE_URL}/api/apartment-images/${id}`; // Διορθώθηκε βάσει schema
        break;

      // === HELP MENU ===
      default:
        showHelp();
        return;
    }

    // Εμφάνιση του Route που πρόκειται να καλέσουμε
    console.log(`🚀 Sending GET request to: ${targetUrl}`);
    
    const response = await axios.get(targetUrl);
    
    console.log('✅ Response Data:');
    console.log(JSON.stringify(response.data, null, 2));

  } catch (err) {
    console.error(`\n💥 Request Failed for Route: [${targetUrl}]`);
    if (err.response) {
      console.error(`🔴 HTTP Status: ${err.response.status} (${err.response.statusText})`);
      console.error('🔴 Server Response:', JSON.stringify(err.response.data, null, 2));
      process.exit(err.response.status || 1);
    } else {
      console.error('🔴 Error Message:', err.message);
      process.exit(1);
    }
  }
};

const missingIdError = (cmd) => {
  console.error(`❌ Error: Missing id. Usage: npm run test:api ${cmd} <id>`);
  process.exit(1);
};

const showHelp = () => {
  console.log('📖 Available Test Commands:');
  console.log('  npm run test:api api');
  console.log('  npm run test:api apartments');
  console.log('  npm run test:api apartment 1');
  console.log('  npm run test:api users');
  console.log('  npm run test:api user 1');
  console.log('  npm run test:api reviews');
  console.log('  npm run test:api review 1');
  console.log('  npm run test:api reservations');
  console.log('  npm run test:api reservation 1');
  console.log('  npm run test:api apartmentImages');
  console.log('  npm run test:api apartmentImage 1');
};

run();