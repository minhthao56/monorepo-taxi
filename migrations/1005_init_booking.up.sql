--- Add table booking ---
CREATE TABLE IF NOT EXISTS public.booking(
    booking_id SERIAL NOT NULL PRIMARY KEY,
    start_long DOUBLE PRECISION,
    start_lat DOUBLE PRECISION,
    end_lat DOUBLE PRECISION,
    end_long DOUBLE PRECISION,
    status VARCHAR(255),
    customer_id INTEGER,
    driver_id INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP
);

-- Add FOREIGN KEY

ALTER TABLE public.booking DROP CONSTRAINT IF EXISTS fk_drivers_booking;
ALTER TABLE public.booking DROP CONSTRAINT IF EXISTS fk_customers_booking;
ALTER TABLE public.booking DROP CONSTRAINT IF EXISTS constant_status_booking;

ALTER TABLE public.booking
    ADD CONSTRAINT constant_status_booking CHECK (status IN ('PENDING', 'ACCEPTED', 'STARTING', 'CANCELED', 'COMPLETED', 'REJECTED'));

ALTER TABLE public.booking
    ADD CONSTRAINT fk_drivers_booking FOREIGN KEY (driver_id) REFERENCES public.drivers (driver_id);
ALTER TABLE public.booking
    ADD CONSTRAINT fk_customers_booking FOREIGN KEY (customer_id) REFERENCES public.customers (customer_id);

INSERT INTO public.booking (start_long, start_lat, end_lat, end_long, driver_id, status, customer_id)
VALUES (106.629662, 10.823099, 106.629662, 10.823099, 1, 'PENDING', 1);