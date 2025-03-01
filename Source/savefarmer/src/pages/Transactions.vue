<template>
    <ion-page>
      <ion-content class="scrollable-content">
        <div class="transactions-container">
          <ion-card class="transactions-card">
            <ion-card-header>
              <ion-card-title>Transaction History</ion-card-title>
            </ion-card-header>
  
            <ion-card-content>
              <ion-list>
                <ion-item v-for="transaction in transactions" :key="transaction.id">
                  <ion-label>
                    <h2>Order #{{ transaction.id }}</h2>
                    <p>Amount: ${{ transaction.amount }}</p>
                  </ion-label>
                  <ion-badge :color="getStatusColor(transaction.status)">
                    {{ transaction.status }}
                  </ion-badge>
                </ion-item>
              </ion-list>
            </ion-card-content>
  
            <ion-button expand="block" @click="goBack">Back to Admin</ion-button>
          </ion-card>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts" setup>
  import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonPage, IonContent, IonList, IonItem, IonLabel, IonBadge } from '@ionic/vue';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const transactions = ref([
    { id: 101, amount: 250.50, status: "Completed" },
    { id: 102, amount: 99.99, status: "Pending" },
    { id: 103, amount: 135.75, status: "Failed" },
  ]);
  
  const getStatusColor = (status: string) => {
    return status === "Completed" ? "success" : status === "Pending" ? "warning" : "danger";
  };
  
  const goBack = () => {
    router.push('/AdminPage');
  };
  </script>
  
  <style scoped>
  .transactions-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 70px 20px 20px;
    background: linear-gradient(to bottom, #1e1e1e, #121212);
    box-sizing: border-box;
  }
  
  .transactions-card {
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
  