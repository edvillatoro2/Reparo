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
          <option value="20">25 miles</option>
          <option value="50">50 miles</option>
        </select>
        <button class="search-btn">
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
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
