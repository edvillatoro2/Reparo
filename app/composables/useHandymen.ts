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

  const search = async (params: SearchParams) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<SearchResponse>("api/handymen", {
        params: {
          lat: params.lat,
          lng: params.lng,
          radius: params.radius ?? 10,
          keyword: params.keyword,
          specialty: params.specialty,
          language: params.language,
        },
      });

      handymen.value = response.handymen;
      totalResults.value = response.totalResults;
      currentPage.value = response.page;
      totalPages.value = response.totalPages;
      hasSearched.value = true;
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

  //reset everything back
  const clear = () => {
    handymen.value = [];
    totalResults.value = 0;
    currentPage.value = 1;
    totalPages.value = 0;
    hasSearched.value = false;
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
  };
};
