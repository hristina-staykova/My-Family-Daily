USE family_db;

INSERT INTO users (email, user_password, is_admin) VALUES ("test1@gmail.com", "passwordtest123", false);
INSERT INTO users (email, user_password, is_admin) VALUES ("test2@gmail.com", "passwordtest456", true);
INSERT INTO users (email, user_password, is_admin) VALUES ("test3@gmail.com", "passwordtest789", true);

INSERT INTO news (content, user_id) VALUES ("Hello dear family", 1);
INSERT INTO news (content, user_id) VALUES ("Hello mom", 2);
INSERT INTO news (content, user_id) VALUES ("Hello dad", 3);

INSERT INTO comments (content, user_id, news_id) VALUES ("Hello my love", 1, 1);
INSERT INTO comments (content, user_id, news_id) VALUES ("Yellow", 2, 2);
INSERT INTO comments (content, user_id, news_id) VALUES ("Today is an awesome day", 3, 3);