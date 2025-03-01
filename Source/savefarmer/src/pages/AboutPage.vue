<template>
  <ion-page>
    <ion-content class="scrollable-content">
      <div class="about-container">
        <ion-card class="about-card">
          <ion-card-header>
            <ion-card-title>About Us</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <ion-avatar class="company-avatar">
              <img src="../images/farmer-stock.jpg" alt="Save Farmers Logo" />
            </ion-avatar>

            <div class="company-details">
              <h2 class="company-name">Save Farmers</h2>
              <p class="company-description">
                Save Farmers is dedicated to simplifying the lives of farmers by providing an efficient, intuitive marketplace to connect them with buyers. 
                Our mission is to reduce the challenges farmers face in crop sales, minimizing spoilage, and ensuring farmers get the best value for their hard work. 
              </p>
              <p class="partnership-message">
                We are proud to collaborate with <strong>LTI MindTree</strong>, whose expertise and support have been instrumental in making this project a reality. 
              </p>
            </div>

            <ion-item>
              <ion-label>Founded:</ion-label>
              <ion-text>Fall Quarter 2024</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>Where:</ion-label>
              <ion-text>Eastern Washington University</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>Contact:</ion-label>
              <ion-text>support@savefarmers.com</ion-text>
            </ion-item>

            <div class="progress-chart">
              <h3>App Progress</h3>
              <canvas id="progressChart"></canvas>
            </div>
          </ion-card-content>

          <ion-button expand="block" class="learn-more-button" @click="openModal" href="https://docs.google.com/document/d/1Nq_o75PIsTQNEsXNpeAQcGflzKKeDZB6-WZpnCMvH3k/edit?tab=t.0">Learn More</ion-button>
        </ion-card>

        <AboutUsModal :isOpen="isModalOpen" @update:isOpen="isModalOpen = $event" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonText, IonButton, IonAvatar, IonPage, IonContent } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

//there is no modal component yet for this to open
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

onMounted(() => {
  const ctx = document.getElementById('progressChart') as HTMLCanvasElement;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Design', 'Development'],
      datasets: [
        {
          label: 'App Progress',
          data: [0, 50], // The progress is at 50% for now
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            color: '#444',
          },
          ticks: {
            color: '#e0e0e0',
          },
        },
        y: {
          grid: {
            color: '#444',
          },
          ticks: {
            color: '#e0e0e0',
          },
          beginAtZero: true,
          max: 100,
        },
      },
    },
  });
});


</script>

<style scoped>
.about-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 70px 20px 20px;
  background: linear-gradient(to bottom, #1e1e1e, #121212);
  box-sizing: border-box;
}

.scrollable-content {
  height: 100%;
  overflow-y: auto;
}

.about-card {
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.8);
  border-radius: 12px;
  overflow: hidden;
  background: #2a2a2a;
  color: #e0e0e0;
}

.company-avatar {
  width: 120px;
  height: 120px;
  margin: 20px auto;
}

.company-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid #4caf50;
}

.company-details {
  text-align: center;
  margin: 20px 0;
}

.company-name {
  font-size: 1.8rem;
  font-weight: bold;
  color: #4caf50;
  margin: 0;
}

.company-description {
  font-size: 1rem;
  color: #b0b0b0;
  line-height: 1.6;
  margin: 10px 0;
}

.partnership-message {
  font-size: 1rem;
  color: #b0b0b0;
  margin: 15px 0 0;
  line-height: 1.6;
}

.progress-chart {
  margin-top: 20px;
  text-align: center;
}

.progress-chart h3 {
  color: #4caf50;
  margin-bottom: 10px;
}

.learn-more-button {
  background-color: #4caf50;
  color: #121212;
  font-weight: bold;
  margin-top: 20px;
  transition: transform 0.2s;
}

.learn-more-button:hover {
  transform: scale(1.05);
}

ion-content {
  --background: #121212;
}
</style>
