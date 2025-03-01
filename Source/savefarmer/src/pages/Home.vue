<template>
    <ion-page>
    <board/>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
  import board from '../components/Board.vue';
  </script>
  
  <style scoped>
  .board-top-pad {
    --padding-top: 50px;
  }
  </style>
  