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
  res.render('Navbar.html', { title: 'Express JS' });
});

router.get('/f1', function(req, res) {
  res.render('Form_submission.html', { title: 'Express' });
});

router.get('/emp', function(req, res) {
  res.render('emp.html', { title: 'Express' });
});


router.get('/list', function(req, res) {
  res.render('listemp.html', { title: 'Express' });
});

router.get('/Form', function(req, res) {
  res.render('Form.html', { title: 'Express' });
});

module.exports = router;