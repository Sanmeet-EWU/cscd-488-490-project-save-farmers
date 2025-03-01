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


          <!-- <div class="data-container">
            
            <ion-card class="PostHistory">
            <ion-card-content>
              <ion-card-title>Post History</ion-card-title>
              <ion-card-subtitle>Recent Posts</ion-card-subtitle>
              <ion-card v-for="(post, index) in PostList" :key="index" class="post-card">
                <ion-card-title class="post-text"><img :src="postSer.getCropIcon(post.cropType)" alt="Crop Icon" class="crop-icon" /> {{post.title}}</ion-card-title>
                <div class="post-text">
                <ion-text>Amount: {{ post.amount}}</ion-text>
                <ion-text>Price: {{ post.price }}</ion-text>
                <ion-text>Location: {{ post.location }}</ion-text>
                </div>
              </ion-card>
            </ion-card-content>
          </ion-card>

          
        
        </div> -->

        <div class="data-container">
            
          <ion-card 
              v-for="(post, index) in PostListUser" 
              :key="index" 
              class="post-card" 
              :class="{'active-post': post.status === 'Active', 'inactive-post': post.status === 'Inactive', 'expired-post': post.status === 'Expired'}">
              <ion-card-title class="post-text">
                  <img :src="usersPost.getCropIcon(post.cropType)" alt="Crop Icon" class="crop-icon" />
                  {{ post.title }}
              </ion-card-title>

              <div class="post-text">
                  <ion-text>Amount: {{ post.amount }}</ion-text>
                  <ion-text>Price: {{ post.price }}</ion-text>
                  <ion-text>Location: {{ post.location }}</ion-text>
                  <ion-text>Post ID: {{ post.postId }}</ion-text>
                  <ion-text>Activity: {{ post.status }}</ion-text>
                  <ion-card-title>
                      <ion-button>Edit</ion-button>
                      <ion-button @click="deletePost(post.postId)">Delete</ion-button>

                      <!-- Conditional Buttons for Activate/Deactivate -->
                      <ion-button 
                          v-if="post.status === 'Inactive'" 
                          @click="postActivity(post.title, post.price, post.cropType, post.amount, post.location, post.contact, post.description, post.expireDate, post.name, post.status, post.userId, post.postId)"
                          color="success">
                          Activate
                      </ion-button>

                      <ion-button 
                          v-else-if="post.status === 'Active'" 
                          @click="postActivity(post.title, post.price, post.cropType, post.amount, post.location, post.contact, post.description, post.expireDate, post.name, post.status, post.userId, post.postId)"
                          color="danger">
                          Deactivate
                      </ion-button>

                      <ion-button 
                          v-else-if="post.status === 'Expired'" 
                          @click="postActivity(post.title, post.price, post.cropType, post.amount, post.location, post.contact, post.description, post.expireDate, post.name, post.status, post.userId, post.postId)"
                          color="danger">
                          Reactivate
                      </ion-button>

                  </ion-card-title>
              </div>
          </ion-card>

        </div>

      

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
          <span></span>
        </div>
        </ion-card>
      </div>
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
  IonPage,
  IonContent,
  IonCardSubtitle,
  IonList,
} from "@ionic/vue";
import { ref, onMounted, computed } from "vue";
import { Chart, registerables } from "chart.js";

import { postSer } from '../scripts/PostService';
import { usersPost } from '../scripts/UserPost';





const PostList = computed(() => postSer.posts.value);
const PostListUser = computed(() => usersPost.posts.value);

onMounted(async () => {
  await postSer.fetchPosts();
  await usersPost.fetchPosts();
});


async function deletePost(postID: string) {
  try {
      const acTo = await checkUser();
      console.log(acTo);
      axios.defaults.headers.common['Authorization'] = `Bearer ${acTo}`;


      
      console.log(postID);
      const postIDurl = `https://localhost:7170/api/posts/${postID}`;

      const response = await axios.delete(postIDurl);
        alert("Post Deleted Successfully");
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

  
async function postActivity(title: string, price: number, cropType: string, amount: number, location: string, contact: string, description: string, expireDate: string, name: string, status: string, userId: string, postID: string) {
  console.log(status);  
  if (status === "Active") {
      try {
        const acTo = await checkUser();
        console.log(acTo);
        axios.defaults.headers.common['Authorization'] = `Bearer ${acTo}`;


        
        console.log(postID);
        const postIDurl = `https://localhost:7170/api/posts/${postID}`;

        await axios.put(postIDurl, {
          title: title,
          price: price,
          cropType: cropType,
          amount: amount,
          location: location,
          contact: contact,
          description: description,
          expireDate: expireDate,
          name: name,
          status: "Inactive",
          userId: userId
        }
        );
          alert("Post Deactivated Successfully"
      );
          
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
    
    } else if (status === "Inactive") {
      try {
        const acTo = await checkUser();
        console.log(acTo);
        axios.defaults.headers.common['Authorization'] = `Bearer ${acTo}`;


        
        console.log(postID);
        const postIDurl = `https://localhost:7170/api/posts/${postID}`;

        await axios.put(postIDurl, {
          title: title,
          price: price,
          cropType: cropType,
          amount: amount,
          location: location,
          contact: contact,
          description: description,
          expireDate: expireDate,
          name: name,
          status: "Active",
          userId: userId
        }
        );
          alert("Post Deactivated Successfully"
      );
          
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
      
    } else {
      alert("Post Expired");
      //make later to repost after edit is figured out
    }

  }



Chart.register(...registerables);
const chartCanvas = ref<HTMLCanvasElement | null>(null);
const cropPieChart =  ref<HTMLCanvasElement | null>(null);

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
    console.log(acTo);
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

// interface Post {
//   title: string;
//   price: number;
//   cropType: string;
//   amount: number;
//   location: string;
//   contact: string;
//   description: string;
//   createDate: string;
//   expireDate: string;
//   name: string;
//   status: string;
//   userId: string;
// }

// const title = ref("");
// const price = ref(0);
// const cropType = ref("");
// const amount = ref(0);
// const location = ref("");
// const contact = ref("");
// const description = ref("");
// const createDate = ref("");   
// const expireDate = ref("");
// const name = ref("");
// const status = ref("");
// const userId = ref("");

// async function getUsersPosts(): Promise<Post> {
//   try {

//     // getting the access token from the session storage
//     const acTo = await checkUser();
//     console.log(acTo);
//     axios.defaults.headers.common['Authorization'] = `Bearer ${acTo}`;


//     const uIds = await getUser();
//     console.log(uIds);
//     const uIdurl = `https://localhost:7170/api/posts/user/${uIds}`;
//     console.log(uIdurl);

//     const response = await axios.get<Post>(uIdurl); 
//     // Axios automatically parses the JSON response
//     return response.data;
//   } catch (error: any) {
//     // Handle errors appropriately
//     console.error('Error fetching data:', error.message);
//     throw error; // Re-throw to allow handling by the caller if necessary
//   }
// }



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
    
    // const postData = await getUsersPosts();
    // console.log('Data from API:', postData);
    // title.value = postData.title;
    // price.value = postData.price;
    // cropType.value = postData.cropType;
    // amount.value = postData.amount;
    // location.value = postData.location;
    // contact.value = postData.contact;
    // description.value = postData.description;
    // createDate.value = postData.createDate;
    // expireDate.value = postData.expireDate;
    // name.value = postData.name;
    // status.value = postData.status;
    // userId.value = postData.userId;


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

const getUser = () => {
  const uId = sessionStorage.getItem('Id');
  if (uId != null || uId != undefined) {
    return sessionStorage.getItem('Id');
  } else {
    alert("No uId found in session storage");
  }
};

main();


</script>

<style scoped>

.post-card.active-post {
    background-color: #1f3a25; /* Dark green */
    border-left: 5px solid #28a745; /* Green border */
}

.post-card.inactive-post {
    background-color: #3f2124; /* Dark red */
    border-left: 5px solid #dc3545; /* Red border */
}

.post-card.expired-post {
    background-color: #3c351f; /* Dark yellow */
    border-left: 5px solid #ffc107; /* Yellow border */
}

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
  text-align: center;
}

.chartSubtitle {
  color: rgba(75, 192, 192, 1);
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: -6%;
}


.PostHistory {
  font-family:'Courier New', Courier, monospace;
  background-color: rgba(34, 34, 37, 0.959);
  width: 100%;
  height: 250%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.UserData {
  font-family:'Courier New', Courier, monospace;
  background-color: rgba(34, 34, 37, 0.959);
  width: 100%;
  height: 350%;
  display: flex;}

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
