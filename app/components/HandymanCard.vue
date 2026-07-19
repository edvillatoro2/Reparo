<template>
  <div
    class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
  >
    <!-- photo -->
    <div class="relative h-48 bg-sand">
      <img
        v-if="details?.photoUrl ?? handyman.photoUrl"
        :src="details?.photoUrl ?? handyman.photoUrl"
        :alt="handyman.name"
        class="w-full h-full object-cover"
      />
      <div
        v-else
        class="w-full h-full flex items-center justify-center text-5xl"
      >
        <img
          src="https://placehold.co/800/black/white?text=No+Image+Provided&font=playfair-display"
          alt="placeholder"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- availability badge -->
      <span
        class="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full capitalize"
        :class="{
          'bg-green-100 text-green-700': handyman.availability === 'available',
          'bg-yellow-100 text-yellow-700': handyman.availability === 'busy',
          'bg-red-100 text-red-700': handyman.availability === 'unavailable',
        }"
      >
        {{ handyman.availability }}
      </span>
    </div>

    <!-- info -->
    <div class="p-5 flex flex-col gap-3 flex-1">
      <h3 class="font-bold text-dark text-base leading-tight">
        {{ handyman.name }}
      </h3>

      <!-- use full address if we have it -->
      <p class="text-dark/50 text-sm flex items-start gap-1">
        <span>📍</span>
        <span>{{ details?.fullAddress ?? handyman.address }}</span>
      </p>

      <!-- rating -->
      <div v-if="handyman.rating" class="flex items-center gap-2">
        <span class="text-caramel font-bold text-sm"
          >★ {{ handyman.rating.toFixed(1) }}</span
        >
        <span class="text-dark/40 text-xs"
          >({{ handyman.reviewCount }} reviews)</span
        >
      </div>

      <!-- open now indicator (only after details load) -->
      <p
        v-if="details?.openNow !== null && details?.openNow !== undefined"
        class="text-xs font-semibold"
        :class="details.openNow ? 'text-green-600' : 'text-red-500'"
      >
        {{ details.openNow ? "🟢 Open Now" : "🔴 Closed" }}
      </p>

      <!-- languages -->
      <div class="flex flex-wrap gap-2">
        <span
          v-for="lang in handyman.languages"
          :key="lang"
          class="text-xs px-3 py-1 rounded-full bg-sky/20 text-dark/70 font-medium"
        >
          {{ lang }}
        </span>
      </div>

      <div class="flex-1" />

      <!-- show details button -->
      <button
        class="mt-2 py-3 rounded-full border border-dark/20 text-dark text-sm font-semibold hover:bg-sand transition-colors duration-200"
        :class="{ 'opacity-50': loading }"
        @click="toggleDetails"
      >
        {{
          loading ? "Loading..." : expanded ? "Hide Details" : "Show Details"
        }}
      </button>

      <!-- expanded details -->
      <template v-if="expanded && details">
        <a
          v-if="details.phone"
          :href="`tel:${details.phone}`"
          class="block text-center py-3 rounded-full bg-dark text-sand text-sm font-semibold hover:bg-terra transition-colors duration-200"
        >
          📞 {{ details.phone }}
        </a>

        <a
          v-if="details.website"
          :href="details.website"
          target="_blank"
          class="block text-center py-3 rounded-full border border-dark/20 text-dark text-sm font-semibold hover:bg-sand transition-colors duration-200"
        >
          🌐 Visit Website
        </a>

        <a
          v-if="details.googleUrl"
          :href="details.googleUrl"
          target="_blank"
          class="block text-center py-3 rounded-full border border-caramel/40 text-caramel text-sm font-semibold hover:bg-sand transition-colors duration-200"
        >
          🗺 View on Google Maps
        </a>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Handyman } from "~/types";

const props = defineProps<{
  handyman: Handyman;
}>();

const { details, loading, fetch, clear } = usePlaceDetails();
const expanded = ref(false);

async function toggleDetails() {
  if (expanded.value) {
    expanded.value = false;
    clear();
    return;
  }
  expanded.value = true;
  await fetch(props.handyman.id);
}
</script>

<style scoped></style>
