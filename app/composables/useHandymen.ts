import type { Handyman, SearchParams, SearchResponse } from "~/types";

export const useHandymen = () => {
  //list of handyment returned from search
  const handymen = ref<Handyman[]>([]);

  //total results returned from search
  const totalResults = ref(0);
  //current page of results
  const currentPage = ref(1);
  //total pages of results
  const totalPages = ref(0);

  //state tracking
  const loading = ref(false);
  const error = ref<string | null>(null);
  const hasSearched = ref(false);

  //store tokens for each page
  const pageTokens = ref<(string | null)[]>([null]);
  const nextPageToken = ref<string | null>(null);

  //keep last search params to use for pagination
  const lastSearchParams = ref<SearchParams | null>(null);

  const fetchPage = async (
    params: SearchParams,
    pageToken: string | null = null,
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await $fetch<SearchResponse>("/api/handymen", {
        params: {
          lat: params.lat,
          lng: params.lng,
          radius: params.radius ?? 10,
          keyword: params.keyword,
          specialty: params.specialty,
          language: params.language,
          pageToken: pageToken ?? undefined,
        },
      });

      handymen.value = data.handymen;
      totalResults.value = data.totalResults;
      nextPageToken.value = data.nextPageToken;
      hasSearched.value = true;

      totalPages.value = nextPageToken.value
        ? currentPage.value + 1
        : currentPage.value;
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = "something went wrong. please try again";
      }
      handymen.value = [];
    } finally {
      loading.value = false;
    }
  };

  //called on first search
  const search = async (params: SearchParams) => {
    lastSearchParams.value = params;
    currentPage.value = 1;
    pageTokens.value = []; //reset page tokens
    await fetchPage(params, null);
  };

  // go to next page
  const nextPage = async () => {
    if (!nextPageToken.value || !lastSearchParams.value) return;

    //save token for next page
    pageTokens.value.push(nextPageToken.value);
    currentPage.value++;

    //google requires small delay between requests for next page, so we add a small delay here
    await new Promise((resolve) => setTimeout(resolve, 500));
    await fetchPage(lastSearchParams.value, nextPageToken.value);
  };

  const prevPage = async () => {
    if (currentPage.value <= 1 || !lastSearchParams.value) return;
    currentPage.value--;
    const token = pageTokens.value[currentPage.value - 1] ?? null;
    await fetchPage(lastSearchParams.value, token);
  };

  //reset everything back
  const clear = () => {
    handymen.value = [];
    totalResults.value = 0;
    currentPage.value = 1;
    totalPages.value = 0;
    hasSearched.value = false;
    nextPageToken.value = null;
    error.value = null;
  };

  return {
    handymen,
    totalResults,
    currentPage,
    totalPages,
    hasSearched,
    error,
    loading,
    search,
    clear,
    nextPageToken,
    nextPage,
    prevPage,
  };
};
