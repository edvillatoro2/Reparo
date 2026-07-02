<template>
  <div class="card">

    <!-- Photo or placeholder -->
    <div class="card-photo">
      <img
        v-if="handyman.photoUrl"
        :src="handyman.photoUrl"
        :alt="handyman.name"
      />
      <div v-else class="card-photo-placeholder">🔨</div>
    </div>

    <!-- Info -->
    <div class="card-body">

      <h3 class="card-name">{{ handyman.name }}</h3>
      <p class="card-address">📍 {{ handyman.address }}</p>

      <!-- Rating -->
      <div v-if="handyman.rating" class="card-rating">
        <span class="stars">★ {{ handyman.rating.toFixed(1) }}</span>
        <span class="review-count">({{ handyman.reviewCount }} reviews)</span>
      </div>

      <!-- Languages -->
      <div class="card-tags">
        <span
          v-for="lang in handyman.languages"
          :key="lang"
          class="tag tag-lang"
        >
          {{ lang }}
        </span>
        <span class="tag tag-available">{{ handyman.availability }}</span>
      </div>

      <!-- Phone -->
      
        v-if="handyman.phone"
        :href="`tel:${handyman.phone}`"
        class="card-call"
      >
        📞 {{ handyman.phone }}
      </a>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { Handyman } from "~/types";
defineProps<{
    handyman: Handyman
}>()

</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e8e8e8;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}
.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.card-photo img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
.card-photo-placeholder {
  width: 100%;
  height: 180px;
  background: #fef3e2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
}

.card-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card-name {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
}
.card-address {
  font-size: 0.85rem;
  color: #666;
}

.card-rating {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.stars {
  color: #f4a261;
  font-weight: 700;
}
.review-count {
  font-size: 0.8rem;
  color: #999;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.tag {
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}
.tag-lang {
  background: #e8f4f8;
  color: #2a6496;
}
.tag-available {
  background: #d4edda;
  color: #155724;
  text-transform: capitalize;
}

.card-call {
  display: inline-block;
  margin-top: 0.25rem;
  padding: 0.5rem 1rem;
  background: #c1392b;
  color: #fff;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  transition: background 0.15s;
}
.card-call:hover {
  background: #a93226;
}
</style>