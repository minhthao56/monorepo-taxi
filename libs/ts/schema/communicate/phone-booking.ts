export interface PhoneBooking {
    phone_booking_id: number,
    start_recording_url: string,
    end_recording_url: string,
    call_sid: string,
    status: string,
    customer_id: number,
    last_name: string,
    first_name: string,
    phone_number: string,
    created_at: string,
    email: string,
}


export interface GetManyPhoneBookingRequest {
    offset: number,
    limit: number,
    search: string,
}

export interface GetManyPhoneBookingResponse {
    phone_booking: PhoneBooking[],
    total: number,
}

export interface UpdatePhoneBookingStatusRequest {
    status: string,
}