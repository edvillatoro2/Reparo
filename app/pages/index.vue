<template>
  <div>
    <!-- hero section -->
    <section
      class="h-full bg-sand flex flex-col justify-center px-8 md:px-16 lg:px-24"
    >
      <div class="max-w-4xl">
        <!-- label -->
        <p
          class="text-caramel uppercase tracking-widest text-sm font-semibold mb-4"
        >
          / Hablamos Español /
        </p>

        <!-- main heading -->
        <h1 class="text-6xl md:text-8xl font-bold text-dark leading-none mb-6">
          FIND THE<br />
          BEST<br />
          HANDYMAN<sup class="text-3xl">®</sup>
        </h1>

        <!-- subheading -->
        <p class="text-dark/60 text-lg max-w-md mb-10">
          Trusted, verified Latino professionals ready to help with your home —
          available when you need them.
        </p>

        <!-- search bar -->
        <div class="flex flex-col sm:flex-row gap-3 max-w-xl">
          <input
            v-model="keyword"
            class="flex-1 px-5 py-4 rounded-full bg-white/70 text-dark placeholder-dark/40 outline-none focus:ring-2 focus:ring-caramel text-sm"
            placeholder="plumbing, painting, electrical..."
            @keydown.enter="handleSearch"
          />
          <select
            v-model="radius"
            class="px-5 py-4 rounded-full bg-white/70 text-dark outline-none focus:ring-2 focus:ring-caramel text-sm cursor-pointer"
          >
            <option value="5">5 miles</option>
            <option value="10">10 miles</option>
            <option value="25">25 miles</option>
            <option value="50">50 miles</option>
          </select>
          <button
            class="px-8 py-4 rounded-full bg-dark text-sand font-semibold text-sm hover:bg-terra transition-colors duration-200 whitespace-nowrap disabled:opacity-50"
            :disabled="geoLoading || loading"
            @click="handleSearch"
          >
            {{
              geoLoading
                ? "Detecting..."
                : loading
                ? "Searching..."
                : "Find Near Me"
            }}
          </button>
        </div>

        <!-- geo error -->
        <p v-if="geoError" class="text-red-500 text-sm mt-3">{{ geoError }}</p>
      </div>
    </section>

    <!-- results section -->
    <section class="bg-sand/50 px-8 md:px-16 lg:px-24 py-16">
      <div class="max-w-7xl mx-auto">
        <!-- loading message -->
        <div v-if="loading" class="flex items-center justify-center py-24">
          <p class="text-dark/50 text-lg animate-pulse">
            Searching for handymen near you...
          </p>
        </div>
        <!-- error from API -->
        <div v-else-if="error" class="flex items-center justify-center py-24">
          <p class="text-red-500">{{ error }}</p>
        </div>
        <!-- no results message -->
        <div
          v-else-if="hasSearched && handymen.length === 0"
          class="text-center py-24"
        >
          <p class="text-dark/50 text-lg">
            No handyman services found in your area. Try increasing your search
            radius.
          </p>
        </div>
        <!-- results list -->
        <template v-else-if="hasSearched">
          <p class="text-dark/50 text-sm uppercase tracking-widest mb-8">
            {{ totalResults }} professionals found near you
          </p>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <HandymanCard
              v-for="handyman in handymen"
              :key="handyman.id"
              :handyman="handyman"
            />
          </div>
        </template>
        <!-- initial state -->
        <div v-else class="text-center py-24">
          <p class="text-dark/40 text-lg">
            Enter a service above and click Find Near Me
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { SearchParams } from "~/types";

const {
  location,
  loading: geoLoading,
  error: geoError,
  detect,
} = useGeolocation();
const { handymen, loading, error, hasSearched, totalResults, search } =
  useHandymen();

// search filter state
const keyword = ref("");
const radius = ref("10"); // default radius in miles

async function handleSearch() {
  try {
    //get user location
    const loc = await detect();

    //search for handymen using the keyword, radius, and user location
    const params: SearchParams = {
      keyword: keyword.value,
      radius: parseInt(radius.value),
      lat: loc.lat,
      lng: loc.lng,
    };
    await search(params);
  } catch {
    console.error("Error during search");
  }
}
</script>

<style scoped></style>
