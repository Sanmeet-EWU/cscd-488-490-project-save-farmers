<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>User Analytics</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="goBack">Back</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
  
      <ion-content>
        <div v-if="userData">
          <h3>{{ userData.firstName }} {{ userData.lastName }}</h3>
          <p>Email: {{ userData.email }}</p>
          <p>Role: {{ userData.role }}</p>
          <p>Joined: {{ formatDate(userData.createAt) }}</p>
  
          <ion-list>
            <ion-item-divider>Posts</ion-item-divider>
            <ion-item v-for="post in userData.posts" :key="post.id">
              <ion-label>
                <h2>{{ post.title }}</h2>
                <p>{{ post.content }}</p>
              </ion-label>
            </ion-item>
  
            <ion-item-divider>Transaction History</ion-item-divider>
            <ion-item v-for="transaction in userData.transactions" :key="transaction.id">
              <ion-label>
                <h2>{{ transaction.amount }} USD</h2>
                <p>{{ transaction.date }}</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts" setup>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonList, IonItem, IonItemDivider, IonLabel } from '@ionic/vue';
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  interface Post {
    id: string;
    title: string;
    content: string;
  }
  
  interface Transaction {
    id: string;
    amount: number;
    date: string;
  }
  
  interface UserAnalytics {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createAt: string;
    posts: Post[];
    transactions: Transaction[];
  }
  
  // Reactive variable for user data
  const userData = ref<UserAnalytics | null>(null);
  
  // Router instance
  const router = useRouter();
  
  // Function to fetch user analytics
  async function getUserAnalytics(userId: string): Promise<void> {
    try {
      const token = sessionStorage.getItem('AccessToken') || localStorage.getItem('AccessToken');
      if (!token) {
        alert("No AccessToken found");
        return;
      }
  
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get<UserAnalytics>(`https://farmerapi20250306133102-b8ejbnf8c4a0hve5.westus-01.azurewebsites.net/api/posts/analytic`);
      userData.value = response.data;
    } catch (error: any) {
      console.error('Error fetching user analytics:', error.message);
    }
  }
  
  // Format date function
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };
  
  // Function to navigate back
  function goBack() {
    router.push('/AdminPage');  // Or wherever you want to go back to
  }
  
  // Fetch user analytics when component is mounted
  onMounted(() => {
    const userId = router.currentRoute.value.params.id;
    if (userId) {
      getUserAnalytics(userId as string);
    }
  });
  </script>
  
  <style scoped>
  ion-content {
    padding: 20px;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  
  ion-item-divider {
    font-weight: bold;
    color: #888;
  }
  </style>
  