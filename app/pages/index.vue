<template>
  <div>
    <!-- hero section -->
    <section class="hero">
      <div class="hero-inner">
        <h1 class="hero-title">
          Find the best handymen in your area that speak your language and are
          available when you need them.
        </h1>
        <p class="hero-sub">
          Trusted, verified, and highly rated professionals ready to help you
          with your home improvement needs
        </p>
        <p>* Hablamos Español! *</p>
      </div>

      <!-- search bar -->
      <div class="search-bar">
        <input
          v-model="keyword"
          class="search-input"
          placeholder="Search for handyman services..."
          @keydown.enter="handleSearch"
        />
        <select v-model="radius" class="search-select">
          <option value="5">5 miles</option>
          <option value="10">10 miles</option>
          <option value="25">25 miles</option>
          <option value="50">50 miles</option>
        </select>
        <button class="search-btn" @click="handleSearch">
          {{
            geoLoading
              ? "Detecting Location..."
              : loading
              ? "Searching..."
              : "Find Near Me"
          }}
        </button>
      </div>
      <!-- Geolocation error message -->
      <p v-if="geoError" class="error-msg">{{ geoError }}</p>
    </section>

    <!-- results section -->
    <section class="results">
      <div class="results-inner">
        <!-- loading message -->
        <div v-if="loading" class="status-msg">
          Searching for handyman services...
        </div>
        <!-- error from API -->
        <div v-else-if="error" class="error-msg">
          {{ error }}
        </div>
        <!-- no results message -->
        <div
          v-else-if="hasSearched && handymen.length === 0"
          class="status-msg"
        >
          No handyman services found in your area. Try increasing your search
          radius.
        </div>
        <!-- results list -->
        <template v-else-if="hasSearched">
          <div class="results-count">
            Found {{ totalResults }} handyman services within
            {{ radius }} miles.
          </div>
          <div class="result-grid">
            <HandymanCard
              v-for="handyman in handymen"
              :key="handyman.id"
              :handyman="handyman"
            />
          </div>
        </template>
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
