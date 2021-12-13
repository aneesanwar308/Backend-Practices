// json web token library used to create unique token for authentication
const jwt = require("jsonwebtoken");


// creating token
//jwt.sign used for creating token
const token = jwt.sign({
    id: "61977d9818b543082aaffa60"
}, "secret", {
    expiresIn: "1h"
})
console.log(token)


//exporting function to verify token
module.exports = (req, res, next) => {

    // getting token from header and spliting
    let token = req.headers.authorization.split(' ')[1];

    // jwt.verify used to verify the token 
    jwt.verify(token, "secret", {

        // expiresIn defines the time when to expire the token
        expiresIn: "1h"
    });
    return next();
}