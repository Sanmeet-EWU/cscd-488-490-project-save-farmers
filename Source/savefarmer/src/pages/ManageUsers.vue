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
              <ion-item 
                v-for="user in users" 
                :key="user.id" 
                class="user-item" 
                @click="selectUser(user)"
              >
                <ion-avatar slot="start">
                  <ion-icon :icon="personOutline" class="user-icon"></ion-icon>
                </ion-avatar>
                <ion-label>
                  <h2>{{ user.firstName }} {{ user.lastName }}</h2>
                  <p><ion-icon :icon="mail" class="icon"></ion-icon> {{ user.email }}</p>
                  <p><ion-icon :icon="briefcase" class="icon"></ion-icon> Role: {{ user.role }}</p>
                  <p><ion-icon :icon="calendar" class="icon"></ion-icon> Joined: {{ formatDate(user.createAt) }}</p>
                </ion-label>
                <ion-button @click.stop="deleteUser(user.id)" color="danger">Delete</ion-button>
              </ion-item>
            </ion-list>
          </ion-card-content>

          <ion-button expand="block" @click="AdminPage">Back to Admin</ion-button>
        </ion-card>

        <!-- Selected User Details -->
        <ion-card v-if="selectedUser" class="user-details-card">
          <ion-card-header>
            <ion-card-title>{{ selectedUser.firstName }}'s Profile</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="user-info">
              <ion-avatar class="large-avatar">
                <ion-icon :icon="personOutline"></ion-icon>
              </ion-avatar>
              <div class="user-text">
                <h2>{{ selectedUser.firstName }} {{ selectedUser.lastName }}</h2>
                <p><strong>Email:</strong> {{ selectedUser.email }}</p>
                <p><strong>ID:</strong> {{ selectedUser.id }}</p>
              </div>
            </div>

            <h3>User Post History:</h3>
            <ion-list v-if="userPosts.length">
              <ion-item v-for="post in userPosts" :key="post.postId">
                <ion-label>
                  <h2>{{ post.title }}</h2>
                  <ion-button fill="outline" color="secondary" @click="togglePostDetails(post.postId)">
                    {{ expandedPosts.has(post.postId) ? "Hide Details" : "Show Details" }}
                  </ion-button>

                  <div v-if="expandedPosts.has(post.postId)" class="post-details">
                    <p><strong>Price:</strong> ${{ post.price }}</p>
                    <p><strong>Crop Type:</strong> {{ post.cropType }}</p>
                    <p><strong>Amount:</strong> {{ post.amount }} units</p>
                    <p><strong>Location:</strong> {{ post.location }}</p>
                    <p><strong>Contact:</strong> {{ post.contact }}</p>
                    <p><strong>Description:</strong> {{ post.description }}</p>
                    <p><strong>Created On:</strong> {{ formatDate(post.createDate) }}</p>
                    <p><strong>Expires On:</strong> {{ formatDate(post.expireDate) }}</p>
                    <p><strong>Status:</strong> <span :class="post.status === 'Active' ? 'active-status' : 'inactive-status'">{{ post.status }}</span></p>
                  </div>
                </ion-label>
              </ion-item>
            </ion-list>
            <p v-else>No posts found for this user.</p>
          </ion-card-content>
        </ion-card>

      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { 
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, 
  IonPage, IonContent, IonList, IonItem, IonLabel, IonAvatar, IonIcon 
} from '@ionic/vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { personOutline, mail, briefcase, calendar } from 'ionicons/icons';

interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createAt: string;
}

interface PostType {
  postId: string;
  title: string;
  price: string;
  cropType: string;
  amount: string;
  location: string;
  contact: string;
  description: string;
  createDate: string;
  expireDate: string;
  status: string;
}

const users = ref<UserType[]>([]);
const selectedUser = ref<UserType | null>(null);
const userPosts = ref<PostType[]>([]);
const expandedPosts = ref<Set<string>>(new Set()); // Tracks expanded posts
const router = useRouter();

function AdminPage() {
  router.push('/AdminPage');
}

const checkUser = (): string | null => {
  return sessionStorage.getItem('AccessToken') || localStorage.getItem('AccessToken');
};

async function getData(): Promise<void> {
  try {
    const token = checkUser();
    if (!token) {
      alert("No AccessToken found");
      return;
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get<UserType[]>('https://farmerapi20250306133102-b8ejbnf8c4a0hve5.westus-01.azurewebsites.net/api/GetAllUsers');
    users.value = response.data;
  } catch (error: any) {
    console.error('Error fetching data:', error.message);
  }
}

async function selectUser(user: UserType) {
  selectedUser.value = user;
  await fetchUserPosts(user.id);
}

async function fetchUserPosts(userId: string) {
  try {
    const token = checkUser();
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const response = await axios.get<PostType[]>(`https://farmerapi20250306133102-b8ejbnf8c4a0hve5.westus-01.azurewebsites.net/api/posts/user/${userId}`);
    userPosts.value = response.data;
  } catch (error: any) {
    console.error('Error fetching user posts:', error.message);
    userPosts.value = [];
  }
}

function togglePostDetails(postId: string) {
  if (expandedPosts.value.has(postId)) {
    expandedPosts.value.delete(postId);
  } else {
    expandedPosts.value.add(postId);
  }
}

// Format date
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

async function deleteUser(userID: string) {
  try {
    const acTo = checkUser();
    axios.defaults.headers.common['Authorization'] = `Bearer ${acTo}`;

    await axios.delete(`https://farmerapi20250306133102-b8ejbnf8c4a0hve5.westus-01.azurewebsites.net/api/user/${userID}`);
    alert("User Deleted Successfully");

    users.value = users.value.filter(user => user.id !== userID);
    if (selectedUser.value?.id === userID) {
      selectedUser.value = null;
      userPosts.value = [];
    }
  } catch (error: any) {
    alert("An error occurred while deleting the user.");
  }
}

onMounted(getData);
</script>

<style scoped>
.manage-users-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 70px 20px 20px;
  background: linear-gradient(to bottom, #1e1e1e, #121212);
}

.user-details-card {
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.large-avatar {
  font-size: 4rem;
  color: #4caf50;
}

.post-details {
  margin-top: 10px;
  padding: 10px;
  border-left: 3px solid #4caf50;
}

.active-status {
  color: #4caf50;
  font-weight: bold;
}

.inactive-status {
  color: #ff5252;
  font-weight: bold;
}
</style>
