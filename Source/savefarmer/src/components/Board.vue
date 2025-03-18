<template>
  <ion-page>
    <ion-content>
      <div class="board">
        
        <!-- Search Bar -->
        <ion-searchbar v-model="searchQuery" @ionInput="updateSearchQuery" placeholder="Search posts..."></ion-searchbar>

        <!-- Filter Bar -->
        <div class="filter-bar">
          <!-- Price Filter (Range) -->
          <ion-range
            v-model="priceRange"
            :min="0"
            :max="1000"
            :step="1"
            :snaps="true"
            :pin="true"
            @ionChange="filterPosts"
          >
            <ion-label slot="start">Min Price: 0$</ion-label>
            <ion-label slot="end">Max Price: 1000$</ion-label>
          </ion-range>

          <!-- Location Filter -->
          <ion-select v-model="selectedLocation" @ionChange="filterPosts" placeholder="Filter by Location">
            <ion-select-option value="">Filter By Location</ion-select-option>
            <ion-select-option v-for="location in locations" :key="location" :value="location">
              {{ location }}
            </ion-select-option>
          </ion-select>

          <!-- Crop Type Filter -->
          <ion-select v-model="selectedCropTypes" @ionChange="filterPosts" multiple placeholder="Filter by Crop Type">
            <ion-select-option value="">All Crop Types</ion-select-option>
            <ion-select-option v-for="crop in cropTypes" :key="crop" :value="crop">
              {{ crop }}
            </ion-select-option>
          </ion-select>

          <!-- Sort by Expiry Date -->
          <ion-select v-model="sortExpiry" @ionChange="filterPosts" placeholder="Sort by Expiry Date">
            <ion-select-option value="">Filter By Expiration</ion-select-option>
            <ion-select-option value="asc">Expires Soon</ion-select-option>
            <ion-select-option value="desc">Expires Last</ion-select-option>
          </ion-select>
        </div>

        <!-- Display Filtered Posts -->
        <ion-card v-for="(post, index) in filteredPosts" :key="index" class="board-card">
          <ion-card-header>
            <ion-card-title>
              <img :src="postSer.getCropIcon(post.cropType)" alt="Crop Icon" class="crop-icon" />
              {{ post.title }}
            </ion-card-title>
          </ion-card-header>

          <div v-if="isMobileWidth">
            <ion-card-content>
              <div class="info-header">
                <span><strong>Produce: {{ post.cropType }}</strong></span>
                <span><strong>Price: ${{ post.price }}</strong></span>
                <span><strong>Amount: {{ post.amount }}</strong></span>
                <span><strong>Vendor: {{ post.userId }}</strong></span>
                <span><strong>Location: {{ post.location }}</strong></span>
                <span><strong>Contact: {{ postSer.formatContact(post.contact) }}</strong></span>
                <span><strong>Email: {{ post.name }}</strong></span>
                <span><strong>Date Listed: {{ formatDate(post.createDate) }}</strong></span>
              </div>
              <p class="expiry-date"><strong>Expires:</strong> {{ formatDate(post.expireDate) }}</p>
            </ion-card-content>
          </div>
          <div v-else>
            <ion-card-content>
              <div class="info-header">
                <span><strong>Produce:</strong></span>
                <span><strong>Price:</strong></span>
                <span><strong>Location:</strong></span>
                <span><strong>Contact:</strong></span>
              </div>
              <div class="info-details">
                <span>{{ post.cropType }}</span>
                <span>${{ post.price }}</span>
                <span>{{ post.location }}</span>
                <span>{{ postSer.formatContact(post.contact) }}</span>
              </div>
              <div class="info-2details">
                <span>{{ post.amount }}</span>
                <span class="date-column">
                  <div>Date Listed:</div>
                  <div>{{ formatDate(post.createDate) }}</div>
                </span>
                <span></span>
                <span>{{ post.name }}</span>
              </div>
              <p class="expiry-date"><strong>Expires:</strong> {{ formatDate(post.expireDate) }}</p>
            </ion-card-content>
          </div>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { IonCardTitle, IonCardHeader, IonCard, IonPage, IonCardContent, IonContent, IonSearchbar, IonRange, IonSelect, IonSelectOption, IonLabel } from '@ionic/vue';
import { postSer } from '@/scripts/PostService';

const posts = computed(() => postSer.posts.value);

// Filter logic
const searchQuery = ref('');
const priceRange = ref(1000); // Max price
const selectedLocation = ref('');
const selectedCropTypes = ref<string[]>([]);
const sortExpiry = ref<string>(''); 
const filteredPosts = ref(posts.value);

const locations = computed(() => [...new Set(posts.value.map(post => post.location))]);
const cropTypes = computed(() => [...new Set(posts.value.map(post => post.cropType))]);

// Update search query function
const updateSearchQuery = (event: CustomEvent) => {
  searchQuery.value = event.detail.value;
};

// Watcher to trigger filtering when search query changes
watch(searchQuery, () => {
  filterPosts();
});

// Date formatting function
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

// Filtering function
const filterPosts = () => {
  let filtered = posts.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();

    filtered = filtered.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.cropType.toLowerCase().includes(query) ||
      post.userId.toLowerCase().includes(query) ||
      post.location.toLowerCase().includes(query) ||
      postSer.formatContact(post.contact).toLowerCase().includes(query) ||
      post.price.toString().includes(query) ||
      post.amount.toString().includes(query)
    );
  }

  if (priceRange.value) {
    filtered = filtered.filter(post => post.price <= priceRange.value);
  }

  if (selectedLocation.value) {
    filtered = filtered.filter(post => post.location === selectedLocation.value);
  }

  if (selectedCropTypes.value.length > 0 && !selectedCropTypes.value.includes("")) {
    filtered = filtered.filter(post => selectedCropTypes.value.includes(post.cropType));
  }

  if (sortExpiry.value) {
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.expireDate).getTime();
      const dateB = new Date(b.expireDate).getTime();
      return sortExpiry.value === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  filteredPosts.value = filtered;
};

// Screen size detection logic
const isMobileWidth = ref(false);
const checkScreenWidth = () => {
  isMobileWidth.value = window.innerWidth < 850;
};

// Initialize on component mount
onMounted(async () => {
  checkScreenWidth();
  window.addEventListener('resize', checkScreenWidth);
  await postSer.fetchPosts();
  filteredPosts.value = posts.value; // Initialize with all posts
});
</script>



<style scoped>
.board {
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding: 15px;
}

.board-card {
  width: 100%;
  font-family: 'Courier New', Courier, monospace;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
}

.filter-bar {
  display: flex;
  flex-direction: column;
  gap: 5px;  /* Increased gap to improve spacing between filters */
  padding: 5px;
  margin-top: -30px; /* Ensures spacing from the search bar */
}

.filter-bar ion-range ion-label {
  font-size: 1rem; /* Increase font size */
}

.filter-bar ion-range,
.filter-bar ion-select {
  width: 100%;
}

.info-header {
  display: flex;
  font-weight: bold;
  font-size: 1.5rem;
}

.info-details {
  display: flex;
  font-size: 1.3rem;
}

.info-2details {
  display: flex;
  font-size: 1rem;
}

.info-header span,
.info-2details span,
.info-details span {
  flex: 1;
  flex-direction: column;
  text-align: left; 
}

.date-column {
  display: flex;
  flex-direction: column;
  text-align: left;
  line-height: 1;
}

.date-column div:first-child {
  font-weight: bold; 
  font-size: 0.9rem;
}

.expiry-date {
  margin-top: auto;
  text-align: right;
  font-size: 0.8rem;
  font-weight: bold;
}

.crop-icon {
  width: 1.5rem;
  height: auto;
  vertical-align: middle;
  margin-right: 8px;
}

ion-content {
  --padding-top: 50px;
}

ion-searchbar {
  position: relative;
  z-index: 10;  /* Ensure it's on top */
  margin-bottom: 10px; /* Add some space below */
}

@media (max-width: 850px) {
  .info-header, .info-details, .info-2details {
    flex-direction: column;
  }

  .info-header span, .info-2details span, .info-details span {
    flex: none;
    text-align: left;
  }

  .board-card {
    width: 100%;
  }

  .info-header {
    font-size: 1.2rem;
  }

  .info-details {
    font-size: 1.1rem;
  }

  .info-2details {
    font-size: 0.9rem;
  }

  .expiry-date {
    font-size: 0.7rem;
  }

  .crop-icon {
    width: 1.2rem;
  }
}

@media (max-width: 500px) {
  .info-header {
    font-size: 1rem;
  }

  .info-details {
    font-size: 1rem;
  }

  .info-2details {
    font-size: 0.9rem;
  }

  .date-column div:first-child {
    font-size: 0.7rem;
  }

  .expiry-date {
    font-size: 0.6rem;
  }

  .crop-icon {
    width: 1rem;
  }
}
</style>

