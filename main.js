/* eslint-disable no-console */
import express from 'express';
import AWS from 'aws-sdk';
import cors from 'cors';

const app = express();
const s3 = new AWS.S3();

app.use(cors());

app.get('/data', (req, res) => {
  const params = {
    Bucket: 'phone-webshop',
    Key: 'api/phones.json',
  };
  s3.getObject(params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      const jsonFile = JSON.parse(data.Body.toString());
      res.send(jsonFile);
    }
  });
});

app.get('/data/:phoneId', (req, res) => {
  const { phoneId } = req.params;
  const params = {
    Bucket: 'phone-webshop',
    Key: `api/phones/${phoneId}.json`,
  };
  s3.getObject(params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      const jsonFile = JSON.parse(data.Body.toString());
      res.send(jsonFile);
    }
  });
});

app.listen(3001, () => {
  console.log('Server listening on port 3000');
});
