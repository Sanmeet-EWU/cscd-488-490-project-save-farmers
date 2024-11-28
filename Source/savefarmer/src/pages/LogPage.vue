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
              >Username</ion-label
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

          <ion-button expand="block" class="login-button">Login</ion-button>
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

<script lang="ts">
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
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonPage,
    IonItem,
    IonLabel,
    IonInput,
  },
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
