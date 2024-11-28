<template>
  <ion-content>
    <!-- The Board Container -->
    <div class="board">
      <ion-card v-for="(post, index) in posts" :key="index" class="board-card">
        <ion-card-header>
          <ion-card-title>{{ post.title }}</ion-card-title>
          <ion-card-subtitle>
            Price: {{ (post.price) }} $ per 1000 {{ post.crop_type }} by {{ post.date }}
            <span v-if="post.expiry_date"> (Expires: {{ post.expiry_date }})</span>
          </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <p><strong>Location:</strong> {{ post.location }}</p>
          <p><strong>Contact:</strong> {{ post.contact }}</p>
          <p><strong>Crop Type:</strong> {{ post.crop_type }}</p>
          <p><strong>Amount:</strong> {{ post.amount }}</p>
          <p><strong>Extra Info:</strong> {{ post.extra_info }}</p>
        </ion-card-content>
      </ion-card>
    </div>
  </ion-content>
</template>

  

<script setup lang="ts">
import { ref } from 'vue';

// Define a post type for better structure
interface Post {
  title: string;
  price: number;
  crop_type: string;
  amount: number;
  location: string;
  contact : string;
  extra_info: string;
  date: string;
  expiry_date: string;
}

// Define a list of posts
const posts = ref<Post[]>([
  {
    title: 'Post Title',
    price: 100,
    crop_type: 'Potatoes',
    amount: 100,
    location: 'Location',
    contact: 'Contact',
    extra_info: 'Extra Info',
    date: '2021-09-01',
    expiry_date: '2021-09-30',
  },
  {
    title: 'Post Title 2',
    price: 200,
    crop_type: 'Carrots',
    amount: 200,
    location: 'Location 2',
    contact: 'Contact 2',
    extra_info: 'Extra Info 2',
    date: '2021-09-02',
    expiry_date: '2021-09-29',
  },
  {
    title: 'Post Title 2',
    price: 200,
    crop_type: 'Carrots',
    amount: 200,
    location: 'Location 2',
    contact: 'Contact 2',
    extra_info: 'Extra Info 2',
    date: '2021-09-02',
    expiry_date: '2021-09-29',
  },
  {
    title: 'Post Title 2',
    price: 200,
    crop_type: 'Carrots',
    amount: 200,
    location: 'Location 2',
    contact: 'Contact 2',
    extra_info: 'Extra Info 2',
    date: '2021-09-02',
    expiry_date: '2021-09-29',
  },
  {
    title: 'Post Title 2',
    price: 200,
    crop_type: 'Carrots',
    amount: 200,
    location: 'Location 2',
    contact: 'Contact 2',
    extra_info: 'Extra Info 2',
    date: '2021-09-02',
    expiry_date: '2021-09-29',
  },
  {
    title: 'Post Title 2',
    price: 200,
    crop_type: 'Carrots',
    amount: 200,
    location: 'Location 2',
    contact: 'Contact 2',
    extra_info: 'Extra Info 2',
    date: '2021-09-02',
    expiry_date: '2021-09-29',
  },
  {
    title: 'Post Title 2',
    price: 200,
    crop_type: 'Carrots',
    amount: 200,
    location: 'Location 2',
    contact: 'Contact 2',
    extra_info: 'Extra Info 2',
    date: '2021-09-02',
    expiry_date: '2021-09-29',
  },
  {
    title: 'Post Title 2',
    price: 200,
    crop_type: 'Carrots',
    amount: 200,
    location: 'Location 2',
    contact: 'Contact 2',
    extra_info: 'Extra Info 2',
    date: '2021-09-02',
    expiry_date: '2021-09-29',
  },

  // Add more posts here
]);
</script>



<style scoped>
.board {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

.board-card {
  width: 100%;
}
</style>
