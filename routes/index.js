var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const data = {
        data: {
            msg: "Välkommen till min me-sida, gjord med hjälp av JavaScript-ramverket. Jag heter Anton Johansson och går sista året på programmet Webbprogg. På min fritid så gymmar jag, lagar mat, lär mig guitarr och målar med acrylfärg."
        }
    };

    res.json(data);
});

module.exports = router;