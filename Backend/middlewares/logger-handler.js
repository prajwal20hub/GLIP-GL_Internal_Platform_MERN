const loggerHandler = (req,res,next)=> {
    (req.url.includes("/api") && console.log(req.url));
    next();
}

module.exports = loggerHandler;