CREATE TABLE review_users (
    user_id SERIAL PRIMARY KEY,
    user_email VARCHAR(100),
    user_password VARCHAR(250)
);