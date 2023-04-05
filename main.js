/* eslint-disable no-console */
import express from 'express';
import AWS from 'aws-sdk';

const app = express();
const s3 = new AWS.S3();

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

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
