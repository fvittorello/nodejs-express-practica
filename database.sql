DROP TABLE IF EXISTS users;

CREATE TABLE users(
    user_id INT AUTO_INCREMENT,
    firstname VARCHAR(150) NOT NULL,
    lastname VARCHAR(150) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(30) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT false,
    is_disabled BOOLEAN NOT NULL DEFAULT false,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
    PRIMARY KEY (user_id)
);

-- INSERT INTO users (firstname, lastname, email, password, is_admin) VALUES
-- ('Fer', 'Vittorello', 'fvitto@gmail.com', 'somepassword', true);
