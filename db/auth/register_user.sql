INSERT INTO review_users (
    user_email,
    user_password
) VALUES (
    ${email},
    ${hash}
)
returning user_id, user_email