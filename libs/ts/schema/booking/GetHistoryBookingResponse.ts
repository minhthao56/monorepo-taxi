export interface GetHistoryBookingResponse {
    booking: SchemaBookingWithAddress[] | null;
    total:   number;
    [property: string]: any;
}

export interface SchemaBookingWithAddress {
    booking_id?:    string;
    created_at?:    string;
    customer?:      SchemaCustomer;
    customer_id?:   string;
    distance?:      number;
    driver?:        SchemaDriver;
    driver_id?:     string;
    end_address?:   SchemaAddress;
    end_lat?:       number;
    end_long?:      number;
    start_address?: SchemaAddress;
    start_lat?:     number;
    start_long?:    number;
    status?:        string;
    [property: string]: any;
}

export interface SchemaCustomer {
    address?:     SchemaAddress;
    created_at:   string;
    customer_id:  string;
    email?:       string;
    first_name:   string;
    is_vip?:      boolean;
    last_name:    string;
    lat?:         number;
    long?:        number;
    phone_number: string;
    user_id:      string;
    [property: string]: any;
}

export interface SchemaAddress {
    display_name?:      string;
    formatted_address?: string;
    lat?:               number;
    long?:              number;
    [property: string]: any;
}

export interface SchemaDriver {
    created_at:      string;
    current_lat?:    number;
    current_long?:   number;
    driver_id:       string;
    email?:          string;
    first_name:      string;
    last_name:       string;
    phone_number:    string;
    status:          string;
    user_id:         string;
    vehicle_name:    string;
    vehicle_type_id: string;
    [property: string]: any;
}
