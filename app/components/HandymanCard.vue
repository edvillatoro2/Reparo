<template>
  <div
    class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
  >
    <!-- Photo or placeholder -->
    <div class="relative h-48 bg-sand">
      <img
        v-if="handyman.photoUrl"
        :src="handyman.photoUrl"
        :alt="handyman.name"
        class="w-full h-full object-cover"
      />
      <div
        v-else
        class="w-full h-full flex items-center justify-center text-5xl"
      >
        🔨
      </div>
    </div>

    <!-- Info -->
    <div class="p-5 flex flex-col gap-3 flex-1">
      <h3 class="font-bold text-dark text-base leading-tight">
        {{ handyman.name }}
      </h3>
      <p class="text-dark/50 text-sm flex items-start gap-1">
        <span>📍</span>
        <span>{{ handyman.address }}</span>
      </p>

      <!-- Rating -->
      <div v-if="handyman.rating" class="flex items-center gap-2">
        <span class="text-caramel font-bold text-sm"
          >★ {{ handyman.rating.toFixed(1) }}</span
        >
        <span class="text-dark/40 text-xs"
          >({{ handyman.reviewCount }} reviews)</span
        >
      </div>

      <!-- Languages -->
      <div class="flex flex-wrap gap-2">
        <span
          v-for="lang in handyman.languages"
          :key="lang"
          class="text-xs px-3 py-1 rounded-full bg-sky/20 text-dark/70 font-medium"
        >
          {{ lang }}
        </span>
      </div>

      <!-- spacer -->
      <div class="flex-1" />

      <!-- call button -->
      <a
        v-if="handyman.phone"
        :href="`tel:${handyman.phone}`"
        class="mt-2 block text-center py-3 rounded-full bg-dark text-sand text-sm font-semibold hover:bg-terra transition-colors duration-200"
      >
        📞 {{ handyman.phone }}
      </a>
      <div
        v-else
        class="mt-2 py-3 rounded-full bg-sand text-dark/40 text-sm text-center"
      >
        No phone listed
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Handyman } from "~/types";

defineProps<{
  handyman: Handyman;
}>();
</script>

<style scoped></style>
