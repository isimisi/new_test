function changePassword(email, newPassword, callback) {
  const mysql = require("mysql");
  const bcrypt = require("bcrypt");

  const connection = mysql.createConnection({
    host: configuration.DB_HOST,
    user: configuration.DB_USER,
    password: configuration.DB_PASSWORD,
    database: configuration.DB_DATABASE,
  });

  connection.connect();

  const query = "UPDATE users SET password = ? WHERE email = ?";

  bcrypt.hash(newPassword, 10, (err, hash) => {
    if (err) return callback(err);

    connection.query(query, [hash, email], (err, results) => {
      if (err) return callback(err);
      callback(null, results.length > 0);
    });
  });
}
