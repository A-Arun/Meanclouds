var express = require('express');
var router = express.Router();


/* GET home page. */
/*
router.get('/', function(req, res) {
  res.render('index', { title: 'Express JS' });
});
*/

// Get HTML Pages
router.get('/', function(req, res) {
  res.render('tab.html', { title: 'Express JS' });
});
router.get('/set7', function(req, res) {
  res.render('Navbar.html', { title: 'Express' });
});

router.get('/f1', function(req, res) {
  res.render('Form_submission.html', { title: 'Express' });
});

router.get('/emp', function(req, res) {
  res.render('employees.html', { title: 'Express' });
});

router.get('/Form', function(req, res) {
  res.render('Form.html', { title: 'Express' });
});

router.get('/ang', function(req, res) {
  res.render('ang.html', { title: 'Express' });
});

router.get('/nic', function(req, res) {
  res.render('Nichio.html', { title: 'Nichio' });
});

router.get('/p', function(req, res) {
  res.render('getJson.html', { title: 'JSON' });
});

module.exports = router;