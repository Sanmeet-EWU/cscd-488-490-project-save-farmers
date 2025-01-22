  <template>
    <ion-page>
      <!-- Main content area wrapped inside ion-content -->
      <ion-content>
        <div class="profile-container">
          <ion-card class="profile-card">
            <ion-card-header>
              <ion-card-title>User Profile</ion-card-title>
            </ion-card-header>

            <ion-card-content>
              <!-- Profile image (avatar) -->
              <ion-avatar class="profile-avatar">
                <img src="../images/farmer-stock.jpg" alt="Profile Image" />
              </ion-avatar>

              <!-- Username and Bio -->
              <div class="profile-details">
                <h2 class="profile-username">John Doe</h2>
                <p class="profile-bio">sdqwefhhejfqefqhfbqwfqkfqwfb</p>
              </div>

              <!-- Additional Profile Information -->
              <ion-item>
                <ion-label>Email</ion-label>
                <ion-text>johndoe@example.com</ion-text>
              </ion-item>
              <ion-item>
                <ion-label>Location</ion-label>
                <ion-text>New York, USA</ion-text>
              </ion-item>
            </ion-card-content>

            <!-- Edit button, Ideally this should open up a card with edit functionality -->
            <ion-button expand="block" class="edit-button" >Edit Profile</ion-button>
            <ion-button expand="block" class="edit-button" @click="openModal">Create Post</ion-button>
          </ion-card>
        </div>
        <CreatePostModal :isOpen="isModalOpen" @update:isOpen="isModalOpen = $event" />
      </ion-content>
    </ion-page>
  </template>

  <script lang="ts" setup>
  import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonText, IonButton, IonAvatar, IonPage, IonContent } from '@ionic/vue';
  import { ref } from 'vue';
  ////placeholder
  import CreatePostModal from '@/components/CreatePost.vue';
  ////

  const isModalOpen = ref(false);

  const openModal = () => {
  isModalOpen.value = true;
};


  </script>

  <style scoped>
  /* Profile container should take full height minus the header */
  .profile-container {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%; /* Full viewport height */
    flex-direction: column;
    padding: 16px;
    box-sizing: border-box;
  }

  /* Card should grow to take up available space */
  .profile-card {
    width: 100%;
    height: 100%; /* Card fills remaining space */
    display: flex;
    flex-direction: column;
    padding-bottom: 80px; /* Ensure there's space for the edit button */
  }

  /* Ensure the avatar is centered */
  .profile-avatar {
    width: 100px;
    height: 100px;
    margin-bottom: 16px;
    margin-left: auto;
    margin-right: auto;
  }

  .profile-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .profile-details {
    text-align: center;
    margin-bottom: 16px;
  }

  .profile-username {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
  }

  .profile-bio {
    font-size: 1rem;
    color: #666;
    margin: 4px 0 0;
  }

  .edit-button {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%); /* Center the button horizontally */
  }

  /* Add padding on top of ion-content to avoid content overlapping the header */
  ion-content {
    --padding-top: 50px; /* Adjust based on the header height */
  }
  </style>
