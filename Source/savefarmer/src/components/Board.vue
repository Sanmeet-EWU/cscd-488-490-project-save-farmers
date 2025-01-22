<template>
  <ion-page>
    <ion-content>
    <div class="board">
      <ion-card v-for="(post, index) in posts" :key="index" class="board-card">
        <ion-card-header>
          <ion-card-title>
            <img :src="postSer.getCropIcon(post.crop_type)" alt="Crop Icon" class="crop-icon" />
            {{ post.title }}
          </ion-card-title>
        </ion-card-header>
        <div v-if="isMobileWidth">
        <ion-card-content>
          <div class="info-header">
            <span><strong>Price: ${{ post.price }}</strong></span>
            <span><strong>Produce: {{ post.crop_type }}</strong></span>
            <span><strong>Amount: {{ post.amount }}</strong></span>
            <span><strong>Vendor: {{ post.vendor_name }}</strong></span>
            <span><strong>Location: {{ post.location }}</strong></span>
            <span><strong>Contact: {{ postSer.formatContact(post.contact) }}</strong></span>
            <span><strong>Email: {{ post.email }}</strong></span>
            <span><strong>Date Listed: {{ post.date }}</strong></span>
          </div>
          <p class="expiry-date"><strong>Expires:</strong> {{ post.expiry_date }}</p>
        </ion-card-content>
      </div>
      <div v-else>
        <ion-card-content>
          <!-- first line -->
          <div class="info-header">
            <span><strong>Price:</strong></span>
            <span><strong>Produce:</strong></span>
            <span><strong>Location:</strong></span>
            <span><strong>Contact:</strong></span>
          </div>
          <!-- second line -->
          <div class="info-details">
            <span>${{ post.price }}</span>
            <span>{{ post.crop_type }}</span>
            <span>{{ post.vendor_name }}</span>
            <span>{{ postSer.formatContact(post.contact) }}</span>
          </div>
          <!-- third line -->
          <div class="info-2details">
            <span class="date-column">
              <div>Date Listed:</div>
              <div>{{ post.date }}</div>
            </span>
            <span>{{ post.amount }}</span>
            <span>{{ post.location }}</span>
            <span>{{ post.email }}</span>
          </div>
          <p class="expiry-date"><strong>Expires:</strong> {{ post.expiry_date }}</p>
        </ion-card-content>
      </div>
      </ion-card>
    </div>
  </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { IonCardTitle, IonCardHeader, IonCard, IonPage, IonCardContent, IonContent } from '@ionic/vue';
import { postSer} from '@/scripts/PostService';
const posts = computed(() => postSer.posts.value);

const isMobileWidth = ref(false);

const checkScreenWidth = () => {
  isMobileWidth.value = window.innerWidth < 500;
};

onMounted(() => {
  checkScreenWidth();
  window.addEventListener('resize', checkScreenWidth);
});

</script>


<style scoped>


.board {
  display: flex;
  flex-direction: column;
  gap: 0px; /* need remove top and bottom padding and use gap for distance between card*/
  padding: 15px;
}

.board-card {
  width: 100%;
  font-family:'Courier New', Courier, monospace;
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
  flex-direction: column; /* Stack "Date Listed" and date vertically */
  text-align: left; /* Align text to the left */
  line-height: 1; /* Reduce line height */
}

.date-column div:first-child {
  font-weight: bold; 
  font-size: 0.9rem;
}

.expiry-date {
  margin-top: auto; /* Push the expiration date to the bottom */
  text-align: right; /* Align the expiration date to the right */
  font-size: 0.8rem;
  font-weight: bold;
}

.crop-icon {
  width: 1.5rem; /* Adjust width to match text size */
  height: auto; /* Maintain aspect ratio */
  vertical-align: middle; /* Align with text vertically */
  margin-right: 8px; /* Space between image and text */
}

/* Add padding on top of ion-content to avoid content overlapping the header */
ion-content {
  --padding-top: 50px; /* Adjust based on the header height */
}


/* Mobile layout: Adjust for smaller screens */
@media (max-width: 768px) {
  .info-header, .info-details, .info-2details {
    flex-direction: column;
  }

  .info-header span, .info-2details span, .info-details span {
    flex: none; /* Allow elements to stack vertically */
    text-align: left; /* Align to the left */
  }

  .board-card {
    width: 100%; /* Full width on mobile */
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

  .date-column div:first-child {
    font-size: 0.8rem;
  }

  .expiry-date {
    font-size: 0.7rem;
  }

  .crop-icon {
    width: 1.2rem;
  }
}

@media (max-width: 480px) {
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
