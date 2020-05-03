const sql = require("./db");

class Tax {  
  static get(result) {
    sql.query("SELECT id, rate FROM tax WHERE deleted = 0", (err, res) => {
      if (err) {
        console.log(`error: ${err}`);
        result(null, err);
        return;
      }
      result(null, res[0]);
    });
  }
}

module.exports = Tax;