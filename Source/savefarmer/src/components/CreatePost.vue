<template>
  <ion-modal :is-open="isOpen" @ionModalDidDismiss="handleClose">
    <ion-header>
      <ion-toolbar>
        <ion-title>New Post</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="handleClose">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <form @submit.prevent="handleSubmit">
        <ion-item>
          <ion-label position="stacked">Title</ion-label>
          <ion-input v-model="newPost.title" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Price</ion-label>
          <ion-input type="number" v-model="newPost.price" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Crop Type</ion-label>
          <ion-select value="Corn" interface="popover" v-model="newPost.cropType" required>
            <ion-select-option value="Corn">Corn</ion-select-option>
            <ion-select-option value="Tomato">Tomato</ion-select-option>
            <ion-select-option value="Wheat">Wheat</ion-select-option>
            <ion-select-option value="Carrot">Carrot</ion-select-option>
            <ion-select-option value="Potato">Potato</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Amount</ion-label>
          <ion-input
            type="number"
            v-model="newPost.amount"
            required
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Location</ion-label>
          <ion-input v-model="newPost.location" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Contact</ion-label>
          <ion-input v-model="newPost.contact" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Extra Info</ion-label>
          <ion-input v-model="newPost.description"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Post duration (Expire at 12AM GMT Time)</ion-label>
          <ion-datetime
            display-format="YYYY-MM-DD"
            v-model="newPost.expireDate"
            :min="minDate"
            :max="maxDate"
            required
          ></ion-datetime>
        </ion-item>

        <ion-button expand="full" type="submit" class="ion-margin-top"
          >Submit</ion-button
        >
      </form>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts" setup>
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonInput,
  IonLabel,
  IonItem,
  IonSelectOption,
  IonSelect,
  IonDatetime,
} from "@ionic/vue";
import { ref } from "vue";
import { postSer } from "@/scripts/PostService";
import { time } from "ionicons/icons";

// Props to control modal open state from parent component
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

// Emit event to the parent component to close the modal
const emit = defineEmits(["update:isOpen"]);

const handleClose = () => {
  emit("update:isOpen", false);
};

const getCurrentDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
};

const minDate = getCurrentDate();
const maxDate = new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split("T")[0];

const newPost : any = ref({
  //placeholder so i dont have to retype everything a million times
  title: "Placeholder",
  price: "1000",
  cropType: "Corn",
  amount: "3424",
  location: "My House",
  contact: "0000000000",
  description: "qwe",
  expireDate: minDate,
  name: sessionStorage.getItem('Email'), //should be autofill from database or not? idk
  status: "Active",
  userId: sessionStorage.getItem('Id'), //this should be replace by database info but cant leave blank for now
});

const handleSubmit = async () => {
  await postSer.createPost(newPost.value);
  handleClose();
  window.location.reload();
};
</script>
