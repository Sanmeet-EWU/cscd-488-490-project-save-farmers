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


          <ion-card-content v-if="isFarmer">
            <ion-grid>
              <ion-row>
                <ion-col size="6" size-md="3">
                  <ion-card>
                    <ion-card-header>
                      <ion-card-title>Posts</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                      <h2>{{ postAmount }}</h2>
                    </ion-card-content>
                  </ion-card>
                </ion-col>
                <ion-col size="6" size-md="3">
                  <ion-card>
                    <ion-card-header>
                      <ion-card-title>Active</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                      <h2>{{ activeAmount }}</h2>
                    </ion-card-content>
                  </ion-card>
                </ion-col>
                <ion-col size="6" size-md="3">
                  <ion-card>
                    <ion-card-header>
                      <ion-card-title>Inactive</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                      <h2>{{ inactiveAmount }}</h2>
                    </ion-card-content>
                  </ion-card>
                </ion-col>
                <ion-col size="6" size-md="3">
                  <ion-card>
                    <ion-card-header>
                      <ion-card-title>Expired</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                      <h2>{{ expiredAmount }}</h2>
                    </ion-card-content>
                  </ion-card>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-card-content>

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
                      <ion-button @click="openEditModal(post)">Edit</ion-button>
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





        </ion-card>
      </div>



      
    </ion-content>

      


    <OpenEditModal :isOpen="isModalOpen" :editPost="selectedPost" @update:isOpen="isModalOpen = $event" />
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
import OpenEditModal from '../components/EditPost.vue';


const API_URL = "https://farmerapi20250306133102-b8ejbnf8c4a0hve5.westus-01.azurewebsites.net";

// https://farmerapi20250306133102-b8ejbnf8c4a0hve5.westus-01.azurewebsites.net

const PostList = computed(() => postSer.posts.value);
const PostListUser = computed(() => usersPost.posts.value);

const isFarmer = ref(false);

onMounted(async () => {
  isFarmer.value = await farmerUser();
  await postSer.fetchPosts();
  await usersPost.fetchPosts();
});

const isModalOpen = ref(false); 
const selectedPost = ref({});

const openEditModal = (post: any) => {
  selectedPost.value = { ...post };  // Clone the post data to prevent mutating original data
  isModalOpen.value = true; // Open the modal
};

async function farmerUser() {
  const acTo = await checkUser();
  console.log(acTo);
  axios.defaults.headers.common['Authorization'] = `Bearer ${acTo}`;

  
  const userData = await axios.get("https://farmerapi20250306133102-b8ejbnf8c4a0hve5.westus-01.azurewebsites.net/api/current-user");
  console.log(userData.data.role);
  if (userData.data.role === "Farmer") {
    return true;
  } else {
    return false;
  }

  
}


async function deletePost(postID: string) {
  try {
      const acTo = await checkUser();
      console.log(acTo);
      axios.defaults.headers.common['Authorization'] = `Bearer ${acTo}`;


      
      console.log(postID);
      const postIDurl = `https://farmerapi20250306133102-b8ejbnf8c4a0hve5.westus-01.azurewebsites.net/api/posts/${postID}`;

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
        const postIDurl = `https://farmerapi20250306133102-b8ejbnf8c4a0hve5.westus-01.azurewebsites.net/api/posts/${postID}`;

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
        const postIDurl = `https://farmerapi20250306133102-b8ejbnf8c4a0hve5.westus-01.azurewebsites.net/api/posts/${postID}`;

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
          alert("Post Activated Successfully"
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


  const CUforANALYISIS = () => {
  return sessionStorage.getItem("AccessToken") || localStorage.getItem("AccessToken") || "";
};


Chart.register(...registerables);
const chartCanvas = ref<HTMLCanvasElement | null>(null);
const cropPieChart =  ref<HTMLCanvasElement | null>(null);

async function postAnalysis() {

    // amount of all the users posts
  const acTo = CUforANALYISIS();
    axios.defaults.headers.common["Authorization"] = `Bearer ${acTo}`;

    const thisUsersID = sessionStorage.getItem('Id');
    console.log(thisUsersID);

    const postResponse = await axios.get("https://farmerapi20250306133102-b8ejbnf8c4a0hve5.westus-01.azurewebsites.net/api/posts/user/" + thisUsersID);
    console.log("Post Data:", postResponse.data);
     postAmount = postResponse.data.length;
    
    console.log("Post Amount:", postAmount);

    // all posts that are active
    const activePosts = postResponse.data.filter((post: any) => post.status === "Active");
     activeAmount = activePosts.length;
    console.log("Active Posts:", activeAmount);

    // all posts that are inactive
    const inactivePosts = postResponse.data.filter((post: any) => post.status === "Inactive");
     inactiveAmount = inactivePosts.length;
    console.log("Inactive Posts:", inactiveAmount);

    // all posts that are expired
    const expiredPosts = postResponse.data.filter((post: any) => post.status === "Expired");
     expiredAmount = expiredPosts.length;
    console.log("Expired Posts:", expiredAmount);

}

let postAmount = 0
let activeAmount =  0
let inactiveAmount = 0
let expiredAmount = 0

const CropPieChart = async () => {

  // amount of all the users posts
  const acTo = CUforANALYISIS();
    axios.defaults.headers.common["Authorization"] = `Bearer ${acTo}`;

    const thisUsersID = sessionStorage.getItem('Id');
    console.log(thisUsersID);

    const postResponse = await axios.get("https://farmerapi20250306133102-b8ejbnf8c4a0hve5.westus-01.azurewebsites.net/api/posts/user/" + thisUsersID);
    console.log("Post Data:", postResponse.data);
     postAmount = postResponse.data.length;
    
    console.log("Post Amount:", postAmount);

    // all posts that are active
    const activePosts = postResponse.data.filter((post: any) => post.status === "Active");
     activeAmount = activePosts.length;
    console.log("Active Posts:", activeAmount);

    // all posts that are inactive
    const inactivePosts = postResponse.data.filter((post: any) => post.status === "Inactive");
     inactiveAmount = inactivePosts.length;
    console.log("Inactive Posts:", inactiveAmount);

    // all posts that are expired
    const expiredPosts = postResponse.data.filter((post: any) => post.status === "Expired");
     expiredAmount = expiredPosts.length;
    console.log("Expired Posts:", expiredAmount);

  if (cropPieChart.value) {
    const ctx = cropPieChart.value.getContext("2d");
    if (ctx) {
      new Chart(ctx, {
        type: "pie", // Pie chart
        data: {
          labels: ["All Posts", "Active", "Inactive", "Expired"], // Labels for the crops
          datasets: [
            {
              data: [postAmount, activeAmount, inactiveAmount, expiredAmount], // Values for each crop
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



// <!-- DELETE Later NOT REALLY NEEDED -->
//           <div class="data-container" v-if="isFarmer" > <!-- need this to avoid weird inconsistent spacing with absolute -->
          
//           <ion-card class="UserData">
//             <ion-card-content>
//             <ion-card-title style="justify-self: center;">Post Data</ion-card-title>
//             </ion-card-content>
//             <ion-card class="chart-container-bottom-2">
//               <ion-text class="chartTitle">Types of Posts</ion-text>
//             </ion-card>
//             <ion-card class="chart-container-top-2">
//               <canvas ref="cropPieChart"></canvas>
//             </ion-card>
//           </ion-card>
//           <span></span>
//         </div>

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
  // EarningChart();
  // CropPieChart();
  postAnalysis();

};

onMounted(() => {
  initializeChart();
});

//-------------------------fetching data from the server----------------------------

import axios from 'axios';
import { c } from "vite/dist/node/types.d-aGj9QkWt";
// import { data } from "cypress/types/jquery";

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


    const response = await axios.get<DataType>('https://farmerapi20250306133102-b8ejbnf8c4a0hve5.westus-01.azurewebsites.net/api/current-user'); 
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
//     const uIdurl = `https://farmerapi20250306133102-b8ejbnf8c4a0hve5.westus-01.azurewebsites.net/api/posts/user/${uIds}`;
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
  color: rgb(254, 255, 255); 
  box-shadow: none; 
  background-color: transparent;

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
  margin: 0px;
}

.UserData {
  font-family:'Courier New', Courier, monospace;
  background-color: rgba(34, 34, 37, 0.959);
  width: 100%;
  height: 350%;
  display: flex;
  margin: 0px;
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
