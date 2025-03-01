<template>
    <ion-page>
      <ion-content class="scrollable-content">
        <div class="settings-container">
          <ion-card class="settings-card">
            <ion-card-header>
              <ion-card-title>App Settings</ion-card-title>
            </ion-card-header>
  
            <ion-card-content>
              <ion-item>
                <ion-label>Enable Notifications</ion-label>
                <ion-toggle v-model="enableNotifications"></ion-toggle>
              </ion-item>
  
              <ion-item>
                <ion-label>Dark Mode</ion-label>
                <ion-toggle v-model="darkMode"></ion-toggle>
              </ion-item>
  
              <ion-button expand="block" @click="saveSettings">Save Settings</ion-button>
              <ion-button expand="block" @click="goBack">Back to Admin</ion-button>
            </ion-card-content>
          </ion-card>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts" setup>
  import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonPage, IonContent, IonItem, IonLabel, IonToggle } from '@ionic/vue';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const enableNotifications = ref(true);
  const darkMode = ref(false);
  
  const saveSettings = () => {
    console.log("Settings Saved", { enableNotifications: enableNotifications.value, darkMode: darkMode.value });
  };
  
  const goBack = () => {
    router.push('/AdminPage');
  };
  </script>
  
  <style scoped>
  .settings-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 70px 20px 20px;
    background: linear-gradient(to bottom, #1e1e1e, #121212);
    box-sizing: border-box;
  }
  
  .settings-card {
    width: 100%;
    max-width: 400px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.8);
    border-radius: 12px;
    overflow: hidden;
    background: #2a2a2a;
    color: #e0e0e0;
  }
  
  ion-content {
    --background: #121212;
  }
  </style>
  