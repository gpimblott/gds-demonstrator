const debug = require('debug')('demo:router');
const express = require('express');
const router = express.Router();

var HashMap = require('hashmap');

const payments = require('./payments');

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// This is obviously not production ready !!
var map = new HashMap();

/**
 * Default routes
 */
router.get('/', (req, res, next) => {
    res.render("index", { layout: 'main' });
});

/**
 * GOV.UK Notify routes
 */
router.get('/notify', (req, res, next) => {
    res.render("notify", { layout: 'main' });
});

/**
 * GOV.UK Pay routes
 */
router.get('/pay', (req, res, next) => {
    res.render("pay", { layout: 'main' });
});

router.get('/pay/transaction/:reference', (req, res, next) => {
    const reference = req.params[ "reference" ];

    const id = map.get( reference );
    map.remove(reference);

    debug("Lookup id %s=%s", reference , id);

    payments.checkPaymentStatus( id , (result)=>{
        debug(result);

        res.render("transaction", {
            transaction: JSON.stringify(result),
            layout: 'main' });
    });
});

router.post('/pay', urlencodedParser, (req, res, next) => {

    if (!req.body) return res.sendStatus(400)

    debug(req.body);

    payments.sendRequstForPayment( req.body.amount, req.body.reference , req.body.description  , (result)=> {
        debug("Initial request completed");

        debug("State : %s" , result.state.status);
        debug("Payment id: %s" , result.payment_id);
        debug("Reference: %s", result.reference);
        debug("URL: %s", result._links.next_url.href)

        map.set( result.reference , result.payment_id);

        res.redirect(result._links.next_url.href);
    });

});

module.exports = router;
