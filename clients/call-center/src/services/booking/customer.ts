import { GetCustomersRequest } from "schema/booking/GetCustomersRequest";
import { GetCustomersResponse } from "schema/booking/GetCustomersResponse";
import { GetNearbyDriversRequest } from "schema/booking/GetNearbyDriversRequest";
import { GetNearbyDriversResponse } from "schema/booking/GetNearbyDriversResponse";
import { GetVPICustomersResponse } from "schema/booking/GetVPICustomersResponse";


import { bookingClient } from "./client";

export const getCustomers = async (params: GetCustomersRequest) => {
  return await bookingClient.get<GetCustomersResponse>("/customers", {
    params: params,
  });
};


export async function findNearByDriver(req: GetNearbyDriversRequest) {
  console.log("findNearByDriver", req);
  return await bookingClient.get<
    GetNearbyDriversResponse
  >("driver/nearby",{
    params:{
      ...req  
    },
  });
}

export const getVIPCustomers = async () => {
  return await bookingClient.get<GetVPICustomersResponse>("/customers/vip");
}