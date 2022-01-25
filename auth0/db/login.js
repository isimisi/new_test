function login(email, password, callback) {
  const mysql = require("mysql");
  const bcrypt = require("bcrypt");

  const connection = mysql.createConnection({
    host: configuration.DB_HOST,
    user: configuration.DB_USER,
    password: configuration.DB_PASSWORD,
    database: configuration.DB_DATABASE,
  });

  connection.connect();

  const query = "SELECT id, email, password FROM users WHERE email = ?";

  connection.query(query, [email], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0)
      return callback(new WrongUsernameOrPasswordError(email));
    const user = results[0];

    bcrypt.compare(password, user.password, (err, isValid) => {
      if (err || !isValid)
        return callback(err || new WrongUsernameOrPasswordError(email));

      callback(null, {
        user_id: user.id.toString(),
        email: user.email,
      });
    });
  });
}
