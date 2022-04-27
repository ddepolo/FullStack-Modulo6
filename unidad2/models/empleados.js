var pool = require('./db');

async function getEmpleados(){
    try {
        var sql = "SELECT * FROM empleados ORDER BY nombre DESC LIMIT 50";
        var row = await pool.query(sql);
        return row;
        
    } catch(err) {
        console.log(err)
        
    }
    
}

module.exports = {getEmpleados}