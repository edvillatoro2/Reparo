export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const placeId = query.placeId as string;

  if (!placeId) {
    throw createError({
      statusCode: 400,
      statusMessage: "placeId is required",
    });
  }
  const config = useRuntimeConfig();

  //build google places API URL
  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/details/json",
  );
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("key", config.googlePlacesApiKey);
  url.searchParams.set(
    "fields",
    "website,formatted_address,formatted_phone_number,photos,opening_hours,url",
  );

  const response = await fetch(url.toString());
  const data = await response.json();

  if (data.status !== "OK") {
    throw createError({
      statusCode: 502,
      statusMessage: `Place Details error: ${data.status}`,
    });
  }

  const result = data.result;

  return {
    website: result.website ?? null,
    phone: result.formatted_phone_number ?? null,
    fullAddress: result.formatted_address ?? null,
    googleUrl: result.url ?? null,
    openNow: result.opening_hours?.open_now ?? null,
    photoUrl: result.photos?.[0]?.photo_reference
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photo_reference=${result.photos[0].photo_reference}&key=${config.googlePlacesApiKey}`
      : null,
  };
});
