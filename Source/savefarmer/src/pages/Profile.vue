<template>
    <ion-page>
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
          <ion-button expand="block" class="edit-button">Edit Profile</ion-button>
        </ion-card>
      </div>
    </ion-page>
  </template>
  
  
  <script lang="ts">
  import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonText, IonButton, IonAvatar, IonPage } from '@ionic/vue';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    components: {
      IonCard,
      IonCardHeader,
      IonCardTitle,
      IonCardContent,
      IonItem,
      IonLabel,
      IonText,
      IonButton,
      IonAvatar,
      IonPage,
    },
  });
  </script>
  
  <style scoped>
  /* Make the card fill the entire page */
  .profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Full viewport height */
    padding: 16px;
    box-sizing: border-box;
  }
  
  .profile-card {
    width: 100%;
    height: 100%; /* Card fills entire height */
    display: flex;
    flex-direction: column;
  }

  
  .profile-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }
  
  .profile-avatar {
  width: 100px;
  height: 100px;
  margin-bottom: 16px; /* Space below avatar */
  margin-left: auto;
  margin-right: auto;
}
  
  .profile-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  
  .profile-details {
  text-align: center; /* Center-align the text */
  margin-bottom: 16px; /* Add space below the name and bio */
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
  bottom: 16px; /* 16px from the bottom of the card */
  left: 50%;
  transform: translateX(-50%); /* Center the button horizontally */
}
  </style>
  