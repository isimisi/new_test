function verify(email, callback) {
  const mysql = require("mysql");

  const connection = mysql.createConnection({
    host: configuration.DB_HOST,
    user: configuration.DB_USER,
    password: configuration.DB_PASSWORD,
    database: configuration.DB_DATABASE,
  });

  connection.connect();

  const query = 'UPDATE users SET status = "active" WHERE email = ?';

  connection.query(query, [email], (err, results) => {
    if (err) return callback(err);

    callback(null, results.length > 0);
  });
}
