<template>
  <ion-page v-if="isAuthorized">
    <ion-content class="scrollable-content">
      <div class="admin-container">
        <ion-card class="admin-card">
          <ion-card-header>
            <ion-card-title>Admin Dashboard</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <div class="admin-actions">
              <ion-button expand="block" @click="ManageUsers">Manage Users</ion-button>
              <ion-button expand="block" @click="viewTransactions">View Transactions</ion-button>
              <ion-button expand="block" @click="viewAppSettings">App Settings</ion-button>
            </div>

            <div class="admin-stats">
              <h3>Users</h3>
              <canvas id="usersChart"></canvas>
            </div>

            <div class="admin-stats">
              <h3>Posts</h3>
              <canvas id="transactionsChart"></canvas>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
  
  <ion-page v-else>
    <ion-content class="scrollable-content">
      <div class="unauthorized-container">
        <h2>Access Denied</h2>
        <p>You must be a Farmer or Admin to access the Admin Dashboard.</p>
        <p>Non-Farmer users are not authorized to view or manage the admin features.</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonPage, IonContent } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useRouter } from 'vue-router';
import axios from 'axios';

Chart.register(...registerables, ChartDataLabels);

const router = useRouter();
const isAuthorized = ref(false);

async function checkUserAccess() {
  try {
    const userData = await getData();
    console.log("User Data:", userData);

    if (userData.role === "Farmer" || userData.role === "Admin") {
      isAuthorized.value = true;
    } else {
      isAuthorized.value = false;
    }
  } catch (error) {
    console.error("Error checking user access:", error);
    isAuthorized.value = false;
  }
}

async function getData() {
  try {
    const acTo = checkUser();
    axios.defaults.headers.common["Authorization"] = `Bearer ${acTo}`;

    const response = await axios.get("https://localhost:7170/api/current-user");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

const checkUser = () => {
  return sessionStorage.getItem("AccessToken") || localStorage.getItem("AccessToken") || "";
};

function ManageUsers() {
  router.push("/ManageUsers");
}

function viewTransactions() {
  router.push("/Transactions");
}

function viewAppSettings() {
  router.push("/AppSettings");
}

onMounted(async () => {
  await checkUserAccess();

  if (!isAuthorized.value) return;

  const acTo = checkUser();
  axios.defaults.headers.common["Authorization"] = `Bearer ${acTo}`;

  const userResponse = await axios.get("https://localhost:7170/api/GetAllUsers");
  const userAmount = userResponse.data.length;

  const postResponse = await axios.get("https://localhost:7170/api/posts/analytic");
  const postAmount = postResponse.data.length;

  const usersCtx = document.getElementById("usersChart") as HTMLCanvasElement;
  new Chart(usersCtx, {
    type: "bar",
    data: {
      labels: ["Active Users"],
      datasets: [{ label: "Users Data", data: [userAmount], backgroundColor: ["#4caf50"] }],
    },
    options: { responsive: true, plugins: { legend: { display: false } } },
  });

  const transactionsCtx = document.getElementById("transactionsChart") as HTMLCanvasElement;
  new Chart(transactionsCtx, {
    type: "pie",
    data: {
      labels: ["All", "Active", "Inactive", "Expired"],
      datasets: [{ label: "Post Data", data: [postAmount, 0, 0, 0], backgroundColor: ["#4caf50", "#2196f3", "#f44336", "#ff9800"] }],
    },
    options: { responsive: true, plugins: { legend: { display: true } } },
  });
});
</script>

<style scoped>
.admin-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 70px 20px 20px;
  background: linear-gradient(to bottom, #1e1e1e, #121212);
}

.scrollable-content {
  height: 100%;
  overflow-y: auto;
}

.admin-card {
  width: 100%;
  max-width: 400px;
  background: #2a2a2a;
  color: #e0e0e0;
}

.admin-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.admin-stats {
  margin-top: 20px;
  text-align: center;
}

.admin-stats h3 {
  color: #4caf50;
}

.unauthorized-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  text-align: center;
  color: white;
}

.unauthorized-container h2 {
  color: #f44336;
}

.unauthorized-container p {
  color: #e0e0e0;
}
</style>
