

INSERT INTO users (username, fullname, address, email, password, phone, is_admin, is_disabled, created_at) VALUES
('fervitto', 'Fernando Vittorello', 'Calle Falsa 123', 'fvittorello@gmail.com', 'admin', '1555555555', true, false, '2020-07-11 20:04:00'),
('test', 'test testing', 'Av Luro 1233', 'test@test.com', '123', '1555555554', false, false, '2020-07-11 20:04:00');

INSERT INTO products (image_url, title, price, prod_description, is_disabled, created_at) VALUES
('https://via.placeholder.com/500', 'Hamburguesa con bacon', 300, 'Hamburguesa con panceta, carne de 200g, queso chedar y cebolla caramelizada', false, '2020-07-11 20:04:00');