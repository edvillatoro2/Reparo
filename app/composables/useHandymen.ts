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
};
