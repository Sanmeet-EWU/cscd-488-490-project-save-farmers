<template>
    <ion-modal :is-open="isOpen" @ionModalDidDismiss="handleClose">
      <ion-header>
        <ion-toolbar>
          <ion-title>Edit Post</ion-title>
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
            <ion-select interface="popover" v-model="newPost.cropType" required>
              <ion-select-option value="Corn">Corn</ion-select-option>
              <ion-select-option value="Tomato">Tomato</ion-select-option>
              <ion-select-option value="Wheat">Wheat</ion-select-option>
              <ion-select-option value="Carrot">Carrot</ion-select-option>
              <ion-select-option value="Potato">Potato</ion-select-option>
            </ion-select>
          </ion-item>
  
          <ion-item>
            <ion-label position="stacked">Amount</ion-label>
            <ion-input type="number" v-model="newPost.amount" required></ion-input>
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
            <p> This post will expired on {{formatDate(newPost.currentExpireDate)}}</p>
            <ion-label position="stacked">Add duration (Expire at 12AM GMT Time)</ion-label>
            <ion-select interface="popover" v-model="newPost.expireDate" required>
            <ion-select-option :value="0">None</ion-select-option>
              <ion-select-option :value="3">3 days</ion-select-option>
              <ion-select-option :value="7">7 days</ion-select-option>
              <ion-select-option :value="12">12 days</ion-select-option>
              <ion-select-option :value="30">30 days</ion-select-option>
            </ion-select>
          </ion-item>
  
          <ion-button expand="full" type="submit" class="ion-margin-top">Submit</ion-button>
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
  } from '@ionic/vue';
  import { ref, watch } from 'vue';
  import { usersPost } from '@/scripts/UserPost';
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
    },
    editPost: {
      type: Object,
      required: true,
    },
  });
  
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
};

  const emit = defineEmits(['update:isOpen']);
  
  const handleClose = () => {
    emit('update:isOpen', false);
  };
  
  const newPost = ref({
    title: '',
    price: '',
    cropType: '',
    amount: '',
    location: '',
    contact: '',
    description: '',
    expireDate: 7,
    name: '',
    status: 'Active',
    userId: '',
    currentExpireDate: '',
    postID: '',
  });

  
  // Watch for changes in the passed editPost data to update the modal's data
  watch(
  () => props.editPost,
  (newPostData) => {
    // When editPost is passed, update newPost
    if (newPostData) {
        newPost.value = {
          title: newPostData.title,
          price: newPostData.price,
          cropType: newPostData.cropType,
          amount: newPostData.amount,
          location: newPostData.location,
          contact: newPostData.contact,
          description: newPostData.description,
          expireDate: 0,
          name: newPostData.name,
          status: newPostData.status,
          userId: newPostData.userId,
          currentExpireDate: newPostData.expireDate,
          postID: newPostData.postId,
        };

    }
  },
  { immediate: true } // Ensure it's updated immediately after initial render
);
  
  const handleSubmit = async () => {
    await usersPost.EditCurrentPost(newPost.value);
    handleClose();
    window.location.reload(); // Submit the form and reload the page
  };
  </script>
  