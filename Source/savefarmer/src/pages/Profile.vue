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
            <h2 class="profile-username">{{firstname}} {{lastname}}</h2> 
              <p class="profile-bio">{{ role }}</p>
            </div>

            <!-- Additional Profile Information -->
            <ion-item>
              <ion-label>Email</ion-label>
              <ion-text>{{ email }}</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>User Since</ion-label>
              <ion-text>{{ created }}</ion-text>
            </ion-item>
          </ion-card-content>

          <!-- Edit button, Ideally this should open up a card with edit functionality -->
          <ion-button expand="block" class="edit-button"
            >Edit Profile</ion-button
          >
          <ion-button expand="block" class="edit-button" @click="openPostModal"
            >Create Post
            </ion-button>

            <div class="data-container"> <!-- need this to avoid weird inconsistent spacing with absolute -->
          <ion-card class="UserData">
            <ion-card-content>
            <ion-card-title style="justify-self: center;">Your weekly Data</ion-card-title>
            </ion-card-content>
            <ion-card class="chart-container-top-1">
              <canvas ref="chartCanvas"></canvas>
            </ion-card>
            <ion-card class="chart-container-bottom-1">
              <ion-text class="chartTitle">Earnings</ion-text>
              <ion-text class="chartSubtitle">$2000</ion-text>
            </ion-card>
            <ion-card class="chart-container-top-2">
              <ion-text>20</ion-text>
            </ion-card>
            <ion-card class="chart-container-bottom-2">
              <ion-text class="chartTitle">Active Posts</ion-text>
            </ion-card>
            <ion-card class="chart-container-top-3">
              <canvas ref="cropPieChart"></canvas>
            </ion-card>
            <ion-card class="chart-container-bottom-3">
              <ion-text class="chartTitle">Types sold</ion-text>
            </ion-card>
          </ion-card>

          <ion-card class="PostHistory">
            <ion-card-content>
              <ion-card-title>Post History</ion-card-title>
              <ion-card-subtitle>Recent Posts</ion-card-subtitle>
              <!-- posts is busted right now -->
              <!-- <ion-card v-for="(post, index) in PostList" :key="index" class="post-card">
                <ion-card-title class="post-text"><img :src="postSer.getCropIcon(post.crop_type)" alt="Crop Icon" class="crop-icon" /> {{post.title}}</ion-card-title>
                <div class="post-text">
                <ion-text>Amount: {{ post.amount}}</ion-text>
                <ion-text>Price: {{ post.price }}</ion-text>
                <ion-text>Location: {{ post.location }}</ion-text>
                </div>
              </ion-card> -->
            </ion-card-content>
          </ion-card>
        </div>
        </ion-card>
      </div>
      <CreatePostModal
        :isOpen="isModalOpen"
        @update:isOpen="isModalOpen = $event"
      />
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
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
  IonContent,
  IonCardSubtitle,
  IonList,
} from "@ionic/vue";
import { ref, onMounted, computed } from "vue";
import CreatePostModal from "@/components/CreatePost.vue";
import { Chart, registerables } from "chart.js";
import { postSer } from '../scripts/PostService';

const PostList = computed(() => postSer.posts.value);

Chart.register(...registerables);
const chartCanvas = ref<HTMLCanvasElement | null>(null);
const cropPieChart =  ref<HTMLCanvasElement | null>(null);

const isModalOpen = ref(false);

const openPostModal = () => {
  isModalOpen.value = true;
};

const CropPieChart = () => {
  if (cropPieChart.value) {
    const ctx = cropPieChart.value.getContext("2d");
    if (ctx) {
      new Chart(ctx, {
        type: "pie", // Pie chart
        data: {
          labels: ["Potato", "Carrot", "Wheat", "Tomato", "Corn", "Mixes"], // Labels for the crops
          datasets: [
            {
              data: [27, 10, 17, 24, 17, 5], // Values for each crop
              backgroundColor: ["#D2B48C", "#FFA500", "#F5DEB3", "#FF6347", "#FFD700", "#8A2BE2"], // Background colors
              borderColor: ["#D2B48C", "#FFA500", "#F5DEB3", "#FF6347", "#FFD700", "#8A2BE2"], // Border colors
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}%`; // Show value with % symbol
                },
              },
            },
            legend: {
              display: false, // Hide the legend to remove outside labels
            },
          },
        },
      });
    }
  }
};

const EarningChart = () => {
  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext("2d");
    if (ctx) {
      new Chart(ctx, {
        type: "line", // Line chart
        data: {
          labels: [
            "Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7" // Labels for the past week
          ],
          datasets: [
            {
              data: [1200, 1500, 1300, 1700, 1600, 1800, 2000], // Example profit data for the past week
              borderColor: "rgba(75, 192, 192, 1)", // Line color
              borderWidth: 2, // Line thickness
              tension: 0.4, // Softens the line to make it smoother
              fill: false, // No fill under the line
              pointRadius: 0, // Hide the dots
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              display: false, // Hide y-axis
              beginAtZero: true,
            },
            x: {
              display: false, // Hide x-axis
            },
          },
          plugins: {
            legend: {
              display: false, // Hide the legend
            },
            tooltip: {
              enabled: false, // Disable tooltips
            },
          },
          elements: {
            line: {
              backgroundColor: "transparent", // Ensure no background color
            },
          },
        },
      });
    }
  }
}


const initializeChart = () => {
  EarningChart();
  CropPieChart();

};

onMounted(() => {
  initializeChart();
});

//-------------------------fetching data from the server----------------------------

import axios from 'axios';
import { c } from "vite/dist/node/types.d-aGj9QkWt";
import { data } from "cypress/types/jquery";

interface DataType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  accessToken: string;
  createAt: string;
  updateA: string;
}

const firstname = ref("");
const lastname = ref("");
const email = ref("");
const role = ref("");
const created = ref("");


async function getData(): Promise<DataType> {
  try {

    // getting the access token from the session storage
    const acTo = await checkUser();
    // console.log(acTo);
    axios.defaults.headers.common['Authorization'] = `Bearer ${acTo}`;


    const response = await axios.get<DataType>('https://localhost:7170/api/current-user'); 
    // Axios automatically parses the JSON response
    return response.data;
  } catch (error: any) {
    // Handle errors appropriately
    console.error('Error fetching data:', error.message);
    throw error; // Re-throw to allow handling by the caller if necessary
  }
}

// Example usage
async function main() {
  try {
    const data = await getData();
    // console.log('Data from API:', data);
    firstname.value = data.firstName;
    lastname.value = data.lastName;
    email.value = data.email;
    role.value = data.role;
    created.value = data.createAt;

  } catch (error) {
     console.error('An error occurred:', error);
  }
}

// get access token from session storage (NOT CORRECT NEED FIX) should be refresh token.
const checkUser = () => {
  const aT = sessionStorage.getItem('AccessToken');
  if (aT != null || aT != undefined) {
    return sessionStorage.getItem('AccessToken');
  } else {
    alert("No AccessToken found in session storage");
    const rT = localStorage.getItem('AccessToken');
    if (rT != null || rT != undefined) {
    return localStorage.getItem('AccessToken');
  } else {
    alert("No AccessToken found in local storage");
    
  }
  }
};

main();


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
  margin: 0px;
  overflow-y: auto;
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

.chart-container-top-1 {
  position: absolute;
  top: 14%;
  left: 1%;
  width: 30%; 
  height: 40%; 
  background-color: transparent;
  box-shadow: none;
}
.chart-container-top-2 {
  position: absolute;
  top: 14%;
  left: 32.6%;
  width: 30%; 
  height: 40%; 
  background-color: transparent;
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center;
  font-size: 3.5rem;
  background-color: rgb(56, 142, 212);
  color: rgb(254, 255, 255); 
  box-shadow: none; 
}
.chart-container-top-3 {
  position: absolute;
  top: 14%;
  right: 1%;
  width: 30%; 
  height: 40%; 
  background-color: transparent;
  box-shadow: none;
}

.chart-container-bottom-1 {
  font-family:'Courier New', Courier, monospace;
  position: absolute;
  top: 54%;
  left: 1%;
  width: 30%;
  height: 20%; 
  background-color: transparent; 
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  box-shadow: none;
}
.chart-container-bottom-2 {
  font-family:'Courier New', Courier, monospace;
  position: absolute;
  top: 54%;
  left: 32.6%;
  width: 30%;
  height: 20%; 
  background-color: transparent; 
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  box-shadow: none;
}
.chart-container-bottom-3 {
  font-family:'Courier New', Courier, monospace;
  position: absolute;
  top: 54%;
  right: 1%;
  width: 30%;
  height: 20%; 
  background-color: transparent; 
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  box-shadow: none;
}

.chartTitle {
  color: rgba(75, 192, 192, 1);
  font-size: 1rem;
  font-weight: bold;
}

.chartSubtitle {
  color: rgba(75, 192, 192, 1);
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: -6%;
}
.data-container {
  display: flex;
  justify-content: space-between; 
  width: 100%;
}

.PostHistory {
  font-family:'Courier New', Courier, monospace;
  position: absolute;
  background-color: rgba(34, 34, 37, 0.959);
  bottom: 8%;
  right: 1%;
  width: 40%;
  height: 35%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.UserData {
  position: absolute;
  font-family:'Courier New', Courier, monospace;
  background-color: rgba(34, 34, 37, 0.959);
  bottom: 8%;
  left: 1%;
  width: 40%;
  height: 35%;
  z-index: 1;
}

.crop-icon {
  width: 1.5rem; 
  height: auto; 
  vertical-align: middle; 
  margin-right: 8px; 
}
.post-text {
  font-family:'Courier New', Courier, monospace;
  flex-direction: column;
  text-align: left;
}
.post-text ion-text {
  display: block;
}
.post-card {
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 8px;
}

/* Add padding on top of ion-content to avoid content overlapping the header */
ion-content {
  --padding-top: 50px; /* Adjust based on the header height */
}
</style>
