const express = require('express');
const slugSchema = require("../schema/slugSchema");
const monk = require('monk');
const { nanoid } = require('nanoid');
require('dotenv').config();


const db = monk(process.env.MONGO_URI);
const urls = db.get('urls');
urls.createIndex({ slug: 1 }, { unique: true });
const router = express.Router();

router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const url = await urls.findOne({ slug });
    if(!url){
      // res.redirect('/?error404=slug not found');
      throw 'Slug not found' 
    }
    res.redirect(url.url)
  } catch (err) {
    console.error(err.message);
    res.redirect('/error.html');
  }
});


router.post('/url', async (req, res) => {
  try {
    let { slug, url } = req.body;
    await slugSchema.validate({
      slug,
      url
    });
    if (!slug) {
      slug = nanoid(5);
    }
    slug = slug.toLowerCase();
    const newUrl = { slug, url };
    await urls.insert(newUrl);
    res.send(newUrl)

  } catch (err) {
    if (err.message.startsWith('url is a required field')) {
      err.message = 'url is a required field🐌';
      res.status(400)
    }
    else if (err.message.startsWith('url must be ')) {
      err.message = 'url must be a valid URL🐌';
      res.status(400)
    }
    else if (err.message.startsWith('E11000')) {
      err.message = 'Duplicate key error collection E11000. Slug in use 🍔';
      res.status(400);
    }
    console.error(err.message);
    res.send(err.message);
  }
});


module.exports = router;



