<template>
  <ion-page>
    <div class="login-container">
      <ion-card>
        <ion-card-header>
          <ion-card-title class="centered-title">Login</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-item>
            <ion-label position="floating" class="field-title"
              >Email</ion-label
            >
            <ion-input
              v-model="email"
              type="text"
              placeholder="Enter your Email"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating" class="field-title"
              >Password</ion-label
            >
            <ion-input
              v-model="password"
              type="password"
              placeholder="Enter your Password"
            ></ion-input>
          </ion-item>
          <ion-item lines="none">
            <ion-checkbox slot="start" v-model="rememberMe"></ion-checkbox>
            <ion-label>Remember me?</ion-label>
          </ion-item>

          <ion-button expand="block" class="login-button" @click="handleLogin">Login</ion-button>
          <div class="misc">
            <a href="/reset-password" class="link">Forgot your password?</a>
            <p>
              Don't have an account? <a href="/SignUp" class="link">Sign Up</a>
            </p>
          </div>
        </ion-card-content>
      </ion-card>
    </div>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonCheckbox,
} from "@ionic/vue";
import { ref } from "vue";
import axios from "axios";

const email = ref("");
const password = ref("");
const rememberMe = ref(false);

const handleLogin = async () => {
  try {
    const response = await axios.post('https://farmerapi20250306133102-b8ejbnf8c4a0hve5.westus-01.azurewebsites.net/api/login', {
      email: email.value,
      password: password.value
    });
    if (response.status === 200) {
      if (rememberMe.value) {
        localStorage.setItem('RefreshToken', response.data.refreshToken);
      }
      sessionStorage.setItem('AccessToken', response.data.accessToken);
      sessionStorage.setItem('Id', response.data.id);
      sessionStorage.setItem('FirstName', response.data.firstName);
      sessionStorage.setItem('LastName', response.data.lastName);
      sessionStorage.setItem('Email', response.data.email);
      sessionStorage.setItem('Role', response.data.role);

      // set the authorization header for all axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;

      window.location.href = '/Profile';
    }
  } catch (error : any) {
      if (error.response) {
        alert(error.response.data.title);
      } else if (error.request) {
        alert('No response from server. Please try again.');
      } else {
        alert('An unexpected error occurred.');
      }
    }
};


</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}

.centered-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.login-button,
.signup-button {
  margin-top: 16px;
}

.field-title {
  margin-bottom: 12px;
}

.misc {
  margin-top: 16px;
  text-align: center;
}
.link {
  text-decoration: none;
}
</style>
