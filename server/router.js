const express = require('express');
// require('./db/db_connections')();
const db_connections = require('./db/db_connections');

const routes = (app, Park) => {
  db_connections();
  //GET ALL PARKS
  app.get('/api/parks', (req, res) => {
    Park.find((err, Parks) => {
      if (err) return res.status(500).send({ error: 'database failure' });
      res.json(Parks);
    });
  });
  //GET PARK BY ID
  app.get('/api/parks/:park_id', (req, res) => {
    Park.findById(req.params.park_id, (err, Park) => {
      if (err) return res.status(500).json({ error: err });
      if (!Park) return res.status(404).json({ error: 'Park not found' });
      res.json(Park);
    });
  });
  //GET PARK BY PARKNAME
  app.get('/api/parks/parkName/:parkName', (req, res) => {
    Park.find({ parkName: req.params.parkName }, (err, Park) => {
      if (err) return res.status(500).json({ error: err });
      if (!Park) return res.status(404).json({ error: 'Park not found' });
      res.json(Park);
    });
  });
  //GET PARK BY CITY
  app.get('/api/parks/city/:city', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    Park.find({ city: req.params.city }, (err, Park) => {
      if (err) return res.status(500).json({ error: err });
      if (!Park) return res.status(404).json({ error: 'Park not found' });
      res.json(Park);
    });
  });
  //CREATE PARK
  app.post('/api/parks', (req, res) => {
    const park = new Park();
    park.parkName = req.body.parkName;
    park.parkDesc = req.body.parkDesc;
    park.parkCoordinates = {
      lat: req.body.parkCoordinates.lat,
      long: req.body.parkCoordinates.long
    };
    park.rating = req.body.rating;
    park.views = req.body.views;
    park.city = req.body.city;
    park.tags = req.body.tags;
    park.picturesUrl = {
      small: [req.body.picturesUrl.small[0], req.body.picturesUrl.small[1]],
      big: req.body.picturesUrl.big
    };

    park.save(err => {
      if (err) {
        console.log('this is error!', err);
        res.status(500).json({ result: 0 });
        return;
      }
      res.json({ result: 1 });
    });
  });
  //UPDATE THE PARK
  app.put('/api/parks/:park_id', (req, res) => {
    Park.update(
      { _id: req.params.park_id },
      { $set: req.body },
      (err, output) => {
        if (err) res.status(500).json({ error: 'database failure' });
        console.log(output);
        if (!output.n) return res.status(404).json({ error: 'park not found' });
        res.json({ message: 'park updated' });
      }
    );
  });
  //DELETE PARK
  app.delete('/api/parks/:park_id', (req, res) => {
    Park.remove({ _id: req.params.park_id }, (err, output) => {
      if (err) return res.status(500).json({ error: 'database failure' });
      res.status(204).end();
    });
  });

  let router = express.Router();

  router.route('/allParks').get((req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.json([
      {
        parkId: 1,
        parkName: 'Nazareth',
        parkDesc: 'a big park',
        parkCoordinates: {
          lat: 32.6991,
          lng: 35.3035
        },
        rating: 1,
        wazeLink: 'fake Waze link',
        tags: ['waterfall', 'BBQ', 'tag3'],
        picturesUrl: { small: ['fakeUrl', 'fakeUrl'], big: 'fakeUrl' },
        views: 5
      },
      {
        parkId: 2,
        parkName: 'Haifa',
        parkDesc: 'a big park',
        parkCoordinates: { lat: 32.794044, lng: 34.989571 },
        rating: 2,
        wazeLink: 'fake Waze link',
        tags: ['tag1', 'campsite', 'tag3'],
        picturesUrl: { small: ['fakeUrl', 'fakeUrl'], big: 'fakeUrl' },
        views: 4
      },
      {
        parkId: 3,
        parkName: 'Tel Aviv',
        parkDesc: 'a big park',
        parkCoordinates: { lat: 32.109333, lng: 34.855499 },
        rating: 3,
        wazeLink: 'fake Waze link',
        tags: ['bike trail', 'tag2', 'tag3'],
        picturesUrl: { small: ['fakeUrl', 'fakeUrl'], big: 'fakeUrl' },
        views: 3
      },
      {
        parkId: 4,
        parkName: 'shahne4',
        parkDesc: 'a big park',
        parkCoordinates: { lat: 32.9331, lng: 35.0827 },
        rating: 4,
        wazeLink: 'fake Waze link',
        tags: ['elderly-friendly', 'free entrance', 'tag3'],
        picturesUrl: { small: ['fakeUrl', 'fakeUrl'], big: 'fakeUrl' },
        views: 2
      },
      {
        parkId: 5,
        parkName: 'Jerusalem',
        parkDesc: 'a big park',
        parkCoordinates: { lat: 31.7683, lng: 35.2137 },
        rating: 5,
        wazeLink: 'fake Waze link',
        tags: ['tag1', 'playground', 'tag3'],
        picturesUrl: { small: ['fakeUrl', 'fakeUrl'], big: 'fakeUrl' },
        views: 1
      }
    ]);
  });

  router.route('/singlePark').get((req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.json({
      parkId: 1,
      parkName: 'shahne',
      parkDesc: 'a big park',
      parkCoordinates: { lat: 100, long: 100 },
      rating: 3,
      wazeLink: 'fake Waze link',
      tags: ['tag1', 'tag2', 'tag3'],
      picturesUrl: {
        small: [
          'https://thumb7.shutterstock.com/display_pic_with_logo/138841/138841,1328518865,1/stock-photo-green-city-park-94456312.jpg',
          'https://yakimaparks.com//assets/Gilbert-Open-Space_2.jpg'
        ],
        big: 'https://media.timeout.com/images/100694153/image.jpg'
      }
    });
  });

  return router;
};

module.exports = routes;
