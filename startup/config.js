const config = require('config');

//verifica se la jKey è stata settata, nel caso in cui non fosse settata leggere il readme (me lo dimentico sempre di settarla)
module.exports = function(){
    if(!config.get('jKey')){
        throw new Error('FATAL ERROR: jKey non definita');
    }
}