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
              <h3>User Types</h3>
              <canvas id="userTypes"></canvas>
            </div>

            <div class="admin-stats">
              <h3>Total Posts</h3>
              <canvas id="totalPostsChart"></canvas>
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
        <p>Only users with the Admin role can access the Admin Dashboard.</p>
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

// Function to check user access
async function checkUserAccess() {
  try {
    const userData = await getData();
    console.log("User Data:", userData);

    // Only allow users with the Admin role
    if (userData.role === "Admin") {
      isAuthorized.value = true;
    } else {
      isAuthorized.value = false;
    }
  } catch (error) {
    console.error("Error checking user access:", error);
    isAuthorized.value = false;
  }
}

// Function to fetch user data
async function getData() {
  try {
    const acTo = checkUser();
    axios.defaults.headers.common["Authorization"] = `Bearer ${acTo}`;

    const response = await axios.get("https://farmerapi20250306133102-b8ejbnf8c4a0hve5.westus-01.azurewebsites.net/api/current-user");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

// Function to check stored user token
const checkUser = () => {
  return sessionStorage.getItem("AccessToken") || localStorage.getItem("AccessToken") || "";
};

// Navigation functions
function ManageUsers() {
  router.push("/ManageUsers");
}

function viewTransactions() {
  router.push("/Transactions");
}

function viewAppSettings() {
  router.push("/AppSettings");
}

// Fetch data and restrict access when component is mounted
onMounted(async () => {
  await checkUserAccess();
  
  if (!isAuthorized.value) return;

  const acTo = checkUser();
  axios.defaults.headers.common["Authorization"] = `Bearer ${acTo}`;

  const userResponse = await axios.get("https://farmerapi20250306133102-b8ejbnf8c4a0hve5.westus-01.azurewebsites.net/api/GetAllUsers");
  console.log("User Data:", userResponse.data);
  const userAmount = userResponse.data.length;

  const farmers = userResponse.data.filter((user: any) => user.role === "Farmer").length;
  const buyers = userResponse.data.filter((user: any) => user.role === "Buyer").length;

  const postResponse = await axios.get("https://farmerapi20250306133102-b8ejbnf8c4a0hve5.westus-01.azurewebsites.net/api/posts/analytic");
  console.log("Post Data:", postResponse.data);
  const postAmount = postResponse.data.length;

  const activeAmount = postResponse.data.filter((post: any) => post.status === "Active").length;
  const inactiveAmount = postResponse.data.filter((post: any) => post.status === "Inactive").length;
  const expiredAmount = postResponse.data.filter((post: any) => post.status === "Expired").length;

  // Render charts
  const usersCtx = document.getElementById("usersChart") as HTMLCanvasElement;
  new Chart(usersCtx, {
    type: "bar",
    data: {
      labels: ["Active Users"],
      datasets: [{ label: "Users Data", data: [userAmount], backgroundColor: ["#4caf50"] }],
    },
    options: { responsive: true, plugins: { legend: { display: false } } },
  });

  const userTypes = document.getElementById("userTypes") as HTMLCanvasElement;
  new Chart(userTypes, {
    type: "pie",
    data: {
      labels: ["Farmer", "Buyer"],
      datasets: [{ label: "User", data: [farmers, buyers], backgroundColor: ["#ff9800", "#f44336"] }],
    },
    options: { responsive: true, plugins: { legend: { display: true } } },
  });

  const postsChart = document.getElementById("totalPostsChart") as HTMLCanvasElement;
  new Chart(postsChart, {
    type: "bar",
    data: {
      labels: ["Total Posts"],
      datasets: [{ label: "All Posts", data: [postAmount], backgroundColor: ["#4c96af"] }],
    },
    options: { responsive: true, plugins: { legend: { display: false } } },
  });

  const transactionsCtx = document.getElementById("transactionsChart") as HTMLCanvasElement;
  new Chart(transactionsCtx, {
    type: "pie",
    data: {
      labels: ["Active", "Inactive", "Expired"],
      datasets: [{ label: "Post Data", data: [activeAmount, inactiveAmount, expiredAmount], backgroundColor: ["#4caf50", "#f44336", "#ff9800"] }],
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
