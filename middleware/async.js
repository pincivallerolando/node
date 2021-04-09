
//middleware per async
module.exports = function(){
    return async (req, res, next) =>{
        try {
            await handler (req, res);
        } catch (ex) {
            next(ex);
        }
    }
}