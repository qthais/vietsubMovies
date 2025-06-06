
const Settings = require('../models/setting.model');
const { generateMovieInfo, generateMovieOphim } = require('../services/movie.service');
const axios = require('axios')
const movieList = [
  { name: 'House of Dead', videoKey: 'rGsXo6cjKyE' },
  { name: 'The Child Remains', videoKey: 'ATi3GdospAo' },
  { name: 'The Mist', videoKey: 'L2g0-wKhVkM' },
  { name: 'Death Whisperer', videoKey: 'iR933CLpVtE' },
  { name: 'The Conjuring 2', videoKey: 'WILGy6gTDMs' },
  { name: 'The Exorcist', videoKey: '7vBL364GH1E' },
  { name: 'A quiet place day one', videoKey: '1M1t6Nr_p7s' },
  { name: 'snowpiercer', videoKey: 'mq6AQnYZ0-g' },
  { name: 'Interstellar', videoKey: 'xkxnYxfrz4M' },
  { name: 'Age of tomorrow', videoKey: 'hhEqJONv7vE' },
  { name: 'The Terminator', videoKey: 'x4cf_BDnXtY' },
  { name: 'Inception', videoKey: 'r5X-hFf6Bwo' },
  { name: 'Mr Right', videoKey: 'V6ZrmUKH4Pk' },
  { name: 'After The Storm', videoKey: 'Zvh_z8oHL98' },
  { name: 'Cinderella in the Caribbean', videoKey: 'Rc6WrbiJwUM' },
  { name: 'Retreat to Paradise', videoKey: 'PqWch8qwI_0' },
  { name: 'Love in Tahiti', videoKey: '0C67NvYVgpA' },
  { name: 'Prescription for Love', videoKey: '72gTHNo9b5E' },
  { name: 'John Wick', videoKey: 'SB7omlBLDH4' },
  { name: 'Hitman: Agent 47', videoKey: 'EEcDtb1wzjo' },
  { name: 'Kingsman: The Secret Service', videoKey: 'JhvsyNfN8wo' },
  { name: "Deadpool & Wolverine", videoKey: "Y_j-BXgoUSA" },
  { name: "Harry Potter and the Philosopher's Stone", videoKey: "tffPzvefIMU" },
  { name: "The November Man", videoKey: "Tekt9INDcuQ" },
  { name: "The Gangster, The Cop, The Devil", videoKey: "msoXTAkDQjs" },
  { name: "Constantine", videoKey: "N2zDRzNN_xg" },
  { name: "Area 51 Incident", videoKey: "O679pqyuWVA" },
  { name: "Jurassic Island", videoKey: "xU8DhlyglzY" },
  { name: "After the Pandemic", videoKey: "LZzeO4hHEA0" },
  { name: "Vamps", videoKey: "x5z0WVazjD4" },
  { name: "Edge of Extinction", videoKey: "SmYghFzbnv8" },
  { name: "Kids In America", videoKey: "2CpwzO-tJ7s" },
  { name: "Cleaver Family Reunion", videoKey: "r7urvqC_aVl" },
  { name: "The Dark Knight", videoKey: "aZby0Dsu4bs&t" },
  { name: "Aliens", videoKey: "bzFv1xIYryw" },
  { name: "Gladiator", videoKey: "Ad-E1SzYQ_o" },
  { name: "Drive", videoKey: "Ci_TNoEUVJE" },
  { name: "The Ice Road", videoKey: "xrecPpzGW8w" },
  { name: "Terror Squad", videoKey: "a4BmwQyJAeM" },
  { name: "Léon: The Professional", videoKey: "d6OZj-7JJDY" },
  { name: "Live Free or Die Hard", videoKey: "6hGOXipXh0Y" },
  { name: "Oldboy", videoKey: "Phb_gmWBD8g" },
  { name: "Killing Poe", videoKey: "J9vnfx1Lor8" },
  { name: "Beauty And The Billionaire", videoKey: "qBczncM0ntk" },
  { name: "Not Cinderella's Type", videoKey: "6jvqXxt3WNo" },
  { name: 'Dark Meridian', videoKey: 'xZsDd7MbF0O' },
  { name: 'THE ASSASSINATOR', videoKey: 'aZcBWKOVFwg' },
  { name: 'Blood Empires', videoKey: '4HWniGoIAns' },
  { name: 'SOS Survive or Sacrifice', videoKey: 'jwErAY9QjMA' },
  { name: 'Soldier Boy', videoKey: 'DQ6Ncovb8vc' },
  { name: 'ETERNAL HERO', videoKey: 'Q7vMtOTA1-k' },
  { name: 'Ronal The Barbarian', videoKey: 'aX6WTAYSz-s' },
  { name: 'KungFood', videoKey: 'NsD3_njh7D0' },
  { name: 'Totally Spies! The Movie', videoKey: '_zrgbA3FMVE' },
  { name: 'Winx Club - The Secret of the Lost Kingdom', videoKey: 'DM8T7zqNsNE' },
  { name: 'The Shawshank Redemption', videoKey: '9gnbUKk621A' },
  { name: 'The King of Kong: A Fistful of Quarters', videoKey: 'IXLQqcHcJDQ' },
  { name: 'A Fighting Man', videoKey: '-Fndxicnok' },
  { name: 'The Heritage of Love', videoKey: 'vwA4gcdjX1E' },
  { name: 'Fury', videoKey: 'C7Q4Ej7JOXY' },
  { name: 'Hyena Road', videoKey: 'AWuxeDm1SGA' },
  { name: 'A Bridge Too Far', videoKey: 'r6O8rLXB7Qg' },
  { name: 'Street', videoKey: 'iOkYqj3Oj7Q' },
  { name: 'Ratatouille', videoKey: 'uhTEGVFK3qI' },
  { name: 'Where is My Home', videoKey: 'moHa5xlOZ18' },
];

async function initMovies(movieList) {
  const initialized = await Settings.findOne({ key: 'moviesInitialized' });
  if (initialized && initialized.value === 'true') {
    console.log('Movies have already been initialized.');
    return;
  }

  for (const movie of movieList) {
    try {
      const result = await generateMovieInfo(movie.name, movie.videoKey);

      if (result.success) {
        console.log(`Movie "${movie.name}" initialized successfully:`, result.message);
      } else {
        console.error(`Failed to initialize movie "${movie.name}":`, result.message);
      }
    } catch (error) {
      console.error(`Error initializing movie "${movie.name}":`, error.message);
      return
    }
  }
  await Settings.updateOne({ key: 'moviesInitialized' }, { value: 'true' }, { upsert: true });
}

async function loadOphimMovies(numberofPages) {
  for (let page = 1; page < numberofPages; page++) {
    const data = (await axios.get(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${page}`)).data
    const movies = data.items.filter(movie => movie.tmdb.type === "movie")
    try {
      for (let i = 0; i < movies.length; i++) {
        let { origin_name, slug } = movies[i]
        const movieDataDetail = (await axios.get(`https://ophim1.com/phim/${slug}`)).data
        const videoUrl = movieDataDetail.episodes[0].server_data[0].link_embed
        const year=movieDataDetail.movie.year
        const result = await generateMovieOphim(origin_name, videoUrl,year)
        if (result.success) {
          console.log(`Movie "${origin_name}" initialized successfully:`, result.message);
        } else {
          console.error(`Failed to initialize movie "${origin_name}, page ${page}":`, result.message);
        }
      }
    } catch (err) {
      console.error(`Error initializing movie :`, err);
      return
    }
  }
  console.log('All movies have been loaded!')
}


module.exports = { initMovies, movieList, loadOphimMovies }

