INSERT INTO work_order (start_date, expect_date, delivery_date, order_status, order_priority, general_contractor, job_site, address, city, description ) VALUES (NOW(), NOW(), null, 0, 0, 'LeBron James', 'Staples Center', '1111 S Figueroa St', 'Los Angeles', 'Help Plis!');
INSERT INTO work_order (start_date, expect_date, delivery_date, order_status, order_priority, general_contractor, job_site, address, city, description ) VALUES (NOW(), NOW(), null, 1, 1, 'Luka Doncic', 'American Airlines Center', '2500 Victory Ave', 'Dallas', 'Im the king now!');
INSERT INTO work_order (start_date, expect_date, delivery_date, order_status, order_priority, general_contractor, job_site, address, city, description ) VALUES (NOW(), NOW(), '2022-01-20', 2, 2, 'Kevin Durant', 'Barclays Center', '620 Atlantic Ave', 'Brooklyn', 'Trade Kyrie now!');

INSERT INTO role (authority) VALUES ('ROLE_ADMIN');
INSERT INTO role (authority) VALUES ('ROLE_MANAGER');
INSERT INTO role (authority) VALUES ('ROLE_YARD');

INSERT INTO users (first_name, last_name, email, phone_number, password) VALUES ('Magic', 'Jhonson', 'magic@lakers.com', '552197552211', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');
INSERT INTO users (first_name, last_name, email, phone_number, password) VALUES ('Michael', 'Jordan', 'jordan@bulls.com', '55975185244', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');
INSERT INTO users (first_name, last_name, email, phone_number, password) VALUES ('Larry', 'Bird', 'bird@celtics.com', '5595447123', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');

INSERT INTO user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO user_role (user_id, role_id) VALUES (1, 2);
INSERT INTO user_role (user_id, role_id) VALUES (2, 2);
INSERT INTO user_role (user_id, role_id) VALUES (3, 3);

INSERT INTO order_user (order_id, user_id) VALUES (1, 2);
INSERT INTO order_user (order_id, user_id) VALUES (1, 3);
