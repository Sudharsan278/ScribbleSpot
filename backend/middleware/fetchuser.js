const jwt = require('jsonwebtoken');
const JWT_SECRET = 'myNoteBookjs';  

const fetchuser = (req,res,next) => {

    //Get the user id from the jwt token and send it to the request body
    const token = req.header('authentication-token');
    if(!token){
        res.status(401).json({error : 'Authentication must be done using a valid token!'});
    }

    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({error : 'Authentication must be done using a valid token1!'});
    }

}

module.exports = fetchuser;