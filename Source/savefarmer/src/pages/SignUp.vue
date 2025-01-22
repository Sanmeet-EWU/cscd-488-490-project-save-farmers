<template>
    <ion-page>
      <div class="login-container">
        <ion-card>
          <ion-card-header>
            <ion-card-title class="centered-title">Create your account</ion-card-title>
          </ion-card-header>
  
          <ion-card-content>
            <ion-item>
              <ion-label position="floating" class="field-title"
                >Full name</ion-label
              >
              <ion-input type="text" placeholder="Email or Username"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating" class="field-title"
                >Username</ion-label
              >
              <ion-input type="text" placeholder="Email or Username"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating" class="field-title"
                >Email</ion-label
              >
              <ion-input type="text" placeholder="Email or Username"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating" class="field-title"
                >Password</ion-label
              >
              <ion-input
                type="password"
                placeholder="Enter your password"
              ></ion-input>
            </ion-item>
  
            <ion-button href="/Login" expand="block" class="login-button">Create Account <ion-icon color="white" icon="arrow-forward-outline"></ion-icon></ion-button>
            <div class="misc">
              <p>
                Already have an account? <a href="/Login" class="link">Log in</a>
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
    IonIcon,
  } from "@ionic/vue";  
  
  import {arrowForwardOutline} from 'ionicons/icons';
  import { addIcons } from "ionicons";

  addIcons({
    "arrow-forward-outline": arrowForwardOutline,
  });

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
  