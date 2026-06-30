import type { Handyman, SearchResponse } from "~/types";

export default defineEventHandler(async (event) => {
  //get search params from url query
  const query = getQuery(event);

  const lat = parseFloat(query.lat as string);
  const lng = parseFloat(query.lng as string);
  const radius = parseInt((query.radius as string) ?? "10");
  const keyword = (query.keyword as string) ?? "handyman";

  //if no request was sent, reject the request
  if (isNaN(lat) || isNaN(lng)) {
    throw createError({
      statusCode: 400,
      statusMessage: "latitude and longitude are required",
    });
  }

  //convert miles to meter (google places uses meters)
  const radiusMeters = radius * 1609.34;

  const config = useRuntimeConfig();

  //build google places API URL
  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
  );
  url.searchParams.set("location", `${lat}, ${lng}`);
  url.searchParams.set("radius", String(radiusMeters));
  url.searchParams.set("keyword", `${keyword} contratista latino`);
  url.searchParams.set("type", "general_contractor");
  url.searchParams.set("key", config.googlePlacesApiKey);

  //call google places
  const response = await fetch(url.toString());
  const data = await response.json();

  if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    throw createError({
      statusCode: 502,
      statusMessage: `Google Places error: ${data.status}`,
    });
  }
});
