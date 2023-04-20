const {Router} = require('express');
const router = Router();


router.get('/get-cookies', async (req, res) => {



});


router.get('/set-cookies', async (req, res) => {

    res.cookie('newUser', false);
    res.send('you got cookies!');
});








module.exports = router;