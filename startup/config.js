const config = require('config');

module.exports = function(){
    if(!config.get('jKey')){
        throw new Error('FATAL ERROR: jKey non definita');
    }
}