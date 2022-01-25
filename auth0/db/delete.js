function remove(id, callback) {
  const mysql = require("mysql");

  const connection = mysql.createConnection({
    host: configuration.DB_HOST,
    user: configuration.DB_USER,
    password: configuration.DB_PASSWORD,
    database: configuration.DB_DATABASE,
  });

  connection.connect();

  const query = "DELETE FROM users WHERE id = ?";

  connection.query(query, [id], (err) => {
    if (err) return callback(err);
    callback(null);
  });
}
