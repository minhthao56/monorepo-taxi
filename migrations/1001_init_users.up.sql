--- Add table users ---
CREATE TABLE IF NOT EXISTS public.users(
    user_id SERIAL PRIMARY KEY,
    last_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    user_group VARCHAR(255) NOT NULL,
    phone_number VARCHAR(80) NOT NULl UNIQUE,
    firebase_uid VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP
);


-- Drop the existing constraint if it exists
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS constant_user_group;

-- Add the new CHECK constraint
ALTER TABLE public.users
ADD CONSTRAINT constant_user_group CHECK (user_group IN ('ADMIN_GROUP', 'CUSTOMER_GROUP', 'DRIVER_GROUP'));


INSERT INTO public.users (last_name, first_name, email, user_group, firebase_uid, phone_number)
VALUES 
('Minh', 'Thao', 'minhthao5648+admin@gmail.com', 'ADMIN_GROUP', 'U5UKh9gdFSXPbB7aEyUjCFve9wf1', '12345678900'),
('Minh', 'Thao client', 'minhthao5648+client@gmail.com', 'CUSTOMER_GROUP','Gy9hZbkbHfUPK60zo9vsNAdXbYh1', '12345678901'),
('Minh', 'Thao driver', 'minhthao5648+driver@gmail.com', 'DRIVER_GROUP', 'x1jbkFz8UmcTa0sXRuPMtzkb5Nb2', '+84364570908');

INSERT INTO "public"."users" ("user_id", "last_name", "first_name", "email", "user_group", "phone_number", "firebase_uid") VALUES (5, 'Driver 2', 'Taxi', 'minhthao5648+driver2@gmail.com', 'DRIVER_GROUP', '+843645709081', 'Z96SvHOPs5dyM9wPClcwNqBYk152');
INSERT INTO "public"."users" ("user_id", "last_name", "first_name", "email", "user_group", "phone_number", "firebase_uid") VALUES (7, 'Driver 4', 'Taxi', 'minhthao5648+driver4@gmail.com', 'DRIVER_GROUP', '036457090813', 'XRyPP3xlwQQBC8KB8IebdJVE2IS2');
INSERT INTO "public"."users" ("user_id", "last_name", "first_name", "email", "user_group", "phone_number", "firebase_uid") VALUES (8, 'Driver 5', 'Taxi', 'minhthao5648+driver5@gmail.com', 'DRIVER_GROUP', '036457090815', 'V0bS5Nb4f6YJTMD0PjBfPYvvXP13');
INSERT INTO "public"."users" ("user_id", "last_name", "first_name", "email", "user_group", "phone_number", "firebase_uid") VALUES (9, 'Driver 6', 'Taxi', 'minhthao5648+driver6@gmail.com', 'DRIVER_GROUP', '843645709086', 'PLEKShUUojYo2jCLucno8MTsQ7X2');
