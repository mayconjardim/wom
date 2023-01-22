INSERT INTO work_order (start_date, expect_date, delivery_date, order_status, order_priority, general_contractor, job_site, address, city, description ) VALUES (NOW(), NOW(), null, 0, 0, 'LeBron James', 'Vancouver Center', '1111 S Figueroa St', 'Los Angeles', 'Help Plis!');
INSERT INTO work_order (start_date, expect_date, delivery_date, order_status, order_priority, general_contractor, job_site, address, city, description ) VALUES (NOW(), NOW(), null, 1, 1, 'Luka Doncic', 'Hagerstown Airlines Center', '2500 Victory Ave', 'Dallas', 'Im the king now!');
INSERT INTO work_order (start_date, expect_date, delivery_date, order_status, order_priority, general_contractor, job_site, address, city, description ) VALUES (NOW(), NOW(), '2022-01-20', 2, 2, 'Luke Brown', 'Fallon Center', '620 Atlantic Ave', 'Brooklyn', 'Trade Kyrie now!');
INSERT INTO work_order (start_date, expect_date, delivery_date, order_status, order_priority, general_contractor, job_site, address, city, description ) VALUES (NOW(), NOW(), null, 0, 0, 'Rebecca King', 'Washington Center', '1111 S Figueroa St', 'Los Angeles', 'Help Plis!');
INSERT INTO work_order (start_date, expect_date, delivery_date, order_status, order_priority, general_contractor, job_site, address, city, description ) VALUES (NOW(), NOW(), null, 1, 1, 'Joshua Thompson', 'Overland  Airlines Center', '2500 Victory Ave', 'Dallas', 'Im the king now!');
INSERT INTO work_order (start_date, expect_date, delivery_date, order_status, order_priority, general_contractor, job_site, address, city, description ) VALUES (NOW(), NOW(), '2022-01-20', 2, 2, 'Jack Thomas, 'Decatur Center', '620 Atlantic Ave', 'Brooklyn', 'Trade Kyrie now!');
INSERT INTO work_order (start_date, expect_date, delivery_date, order_status, order_priority, general_contractor, job_site, address, city, description ) VALUES (NOW(), NOW(), null, 0, 0, 'Daniel Ramirez', 'Arbor Center', '1111 S Figueroa St', 'Los Angeles', 'Help Plis!');
INSERT INTO work_order (start_date, expect_date, delivery_date, order_status, order_priority, general_contractor, job_site, address, city, description ) VALUES (NOW(), NOW(), null, 1, 1, 'Heather James', 'Casper', '2500 Victory Ave', 'Dallas', 'Im the king now!');
INSERT INTO work_order (start_date, expect_date, delivery_date, order_status, order_priority, general_contractor, job_site, address, city, description ) VALUES (NOW(), NOW(), '2022-01-20', 2, 2, 'Jacob Stone', 'Cedar Rapids Center', '620 Atlantic Ave', 'Brooklyn', 'Trade Kyrie now!');
INSERT INTO work_order (start_date, expect_date, delivery_date, order_status, order_priority, general_contractor, job_site, address, city, description ) VALUES (NOW(), NOW(), null, 0, 0, 'Jessica Bush', 'Bloomington Center', '1111 S Figueroa St', 'Los Angeles', 'Help Plis!');
INSERT INTO work_order (start_date, expect_date, delivery_date, order_status, order_priority, general_contractor, job_site, address, city, description ) VALUES (NOW(), NOW(), null, 1, 1, 'David Schmidt', 'Fort Smith Airlines Center', '2500 Victory Ave', 'Dallas', 'Im the king now!');
INSERT INTO work_order (start_date, expect_date, delivery_date, order_status, order_priority, general_contractor, job_site, address, city, description ) VALUES (NOW(), NOW(), '2022-01-20', 2, 2, 'Stephen Mckenzie', 'Mobile Center', '620 Atlantic Ave', 'Brooklyn', 'Trade Kyrie now!');
INSERT INTO work_order (start_date, expect_date, delivery_date, order_status, order_priority, general_contractor, job_site, address, city, description ) VALUES (NOW(), NOW(), null, 0, 0, 'Todd Lopez', 'Grand Junction Center', '1111 S Figueroa St', 'Los Angeles', 'Help Plis!');
INSERT INTO work_order (start_date, expect_date, delivery_date, order_status, order_priority, general_contractor, job_site, address, city, description ) VALUES (NOW(), NOW(), null, 1, 1, 'Timothy Berry', 'Naperville Airlines Center', '2500 Victory Ave', 'Dallas', 'Im the king now!');
INSERT INTO work_order (start_date, expect_date, delivery_date, order_status, order_priority, general_contractor, job_site, address, city, description ) VALUES (NOW(), NOW(), '2022-01-20', 2, 2, 'Amanda Warner', 'Jackson Center', '620 Atlantic Ave', 'Brooklyn', 'Trade Kyrie now!');

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
