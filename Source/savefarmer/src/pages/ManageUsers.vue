<template>
  <ion-page>
    <ion-content class="scrollable-content">
      <div class="manage-users-container">
        <ion-card class="manage-users-card">
          <ion-card-header>
            <ion-card-title>Current Users</ion-card-title>
          </ion-card-header>

          <ion-card-content v-if="users.length">
            <ion-list>
              <ion-item v-for="user in users" :key="user.id" class="user-item">
                <ion-avatar slot="start">
                  <ion-icon :icon="personOutline" class="user-icon"></ion-icon>
                </ion-avatar>
                <ion-label>
                  <h2>{{ user.firstName }} {{ user.lastName }}</h2>
                  <p><ion-icon :icon="mail" class="icon"></ion-icon> {{ user.email }}</p>
                  <p><ion-icon :icon="briefcase" class="icon"></ion-icon> Role: {{ user.role }}</p>
                  <p><ion-icon :icon="calendar" class="icon"></ion-icon> Joined: {{ formatDate(user.createAt) }}</p>
                </ion-label>
                <ion-button @click="deleteUser(user.id)">Delete</ion-button>
              </ion-item>
            </ion-list>
          </ion-card-content>

          <ion-button expand="block" @click="AdminPage">Back to Admin</ion-button>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonPage, IonContent, IonList, IonItem, IonLabel, IonAvatar, IonIcon } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { personOutline, mail, briefcase, calendar } from 'ionicons/icons';

interface DataType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createAt: string;
}

// Reactive users list
const users = ref<DataType[]>([]);

// Router instance
const router = useRouter();

// Function to navigate to AdminPage
function AdminPage() {
  router.push('/AdminPage');
}

// Function to retrieve access token
const checkUser = (): string | null => {
  return sessionStorage.getItem('AccessToken') || localStorage.getItem('AccessToken');
};

// Function to fetch user data
async function getData(): Promise<void> {
  try {
    const token = checkUser();
    if (!token) {
      alert("No AccessToken found");
      return;
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get<DataType[]>('https://localhost:7170/api/GetAllUsers');
    users.value = response.data;
  } catch (error: any) {
    console.error('Error fetching data:', error.message);
  }
}

// Format date function
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

async function deleteUser(userID: string) {
  try {
      const acTo = await checkUser();
      console.log(acTo);
      axios.defaults.headers.common['Authorization'] = `Bearer ${acTo}`;


      
      console.log(userID);
      const userIDurl = `https://localhost:7170/api/user/${userID}`;

      await axios.delete(userIDurl);
      
      alert("User Deleted Successfully");
      window.location.reload();

      
    } catch (error: any) {
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        alert("No response from server. Please check your connection.");
      } else {
        alert("An unexpected error occurred.");
      }
    }

  }





// Fetch user data when component is mounted
onMounted(getData);
</script>

<style scoped>
.manage-users-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 70px 20px 20px;
  background: linear-gradient(to bottom, #1e1e1e, #121212);
  box-sizing: border-box;
}

.manage-users-card {
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.8);
  border-radius: 12px;
  overflow: hidden;
  background: #2a2a2a;
  color: #e0e0e0;
}

.user-item {
  border-bottom: 1px solid #444;
  padding: 10px 0;
}

.user-icon {
  font-size: 2rem;
  color: #4caf50;
}

.icon {
  color: #bbb;
  margin-right: 5px;
}

ion-content {
  --background: #121212;
}
</style>
