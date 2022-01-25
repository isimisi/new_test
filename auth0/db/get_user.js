function getByEmail(email, callback) {
  const mysql = require("mysql");

  const connection = mysql.createConnection({
    host: configuration.DB_HOST,
    user: configuration.DB_USER,
    password: configuration.DB_PASSWORD,
    database: configuration.DB_DATABASE,
  });

  connection.connect();

  const query = "SELECT id, email FROM users WHERE email = ?";

  connection.query(query, [email], (err, results) => {
    if (err || results.length === 0) return callback(err || null);

    const user = results[0];
    callback(null, {
      user_id: user.id.toString(),
      email: user.email,
    });
  });
}
