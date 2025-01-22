<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <!-- Side Menu -->
      <ion-menu content-id="main-content" type="reveal">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-list-header>Button list</ion-list-header>

            <ion-menu-toggle aria-hidden="true" :auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" :detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>

      <!-- Main Content -->
      <ion-content id="main-content">
        <ion-header :translucent="true">
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-title>My Farmer</ion-title>
            <ion-buttons shape="round" slot="end" @click="openModal"> 
              <ion-icon size="large" :icon="addCircleOutline"></ion-icon>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-router-outlet id="main-content"></ion-router-outlet>
      </ion-content>
    </ion-split-pane>
    <CreatePostModal :isOpen="isModalOpen" @update:isOpen="isModalOpen = $event" />
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonButtons,
  IonMenuButton,
} from '@ionic/vue';
import { ref } from 'vue';
import {
  logInOutline,
  logInSharp,
  personCircleOutline,
  personCircleSharp,
  heartOutline,
  heartSharp,
  archiveOutline,
  archiveSharp,
  trashOutline,
  trashSharp,
  homeOutline,
  homeSharp,
  addCircleOutline,
} from 'ionicons/icons';

import CreatePostModal from '@/components/CreatePost.vue';
  
  

  const isModalOpen = ref(false);

  const openModal = () => {
  isModalOpen.value = true;
};

const selectedIndex = ref(0);
// Temporary and can be moved later
const appPages = [
  {
    title: 'Login',
    url: '/Login',
    iosIcon: logInOutline,
    mdIcon: logInSharp,
  },
  {
    title: 'Profile',
    url: '/Profile',
    iosIcon: personCircleOutline,
    mdIcon: personCircleSharp,
  },
  {
    title: 'database',
    url: '/database',
    iosIcon: personCircleOutline,
    mdIcon: personCircleSharp,
  },
  {
    title: 'Sign Up',
    url: '/SignUp',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
  {
    title: 'About',
    url: '/About',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
  },
  {
    title: 'Trash',
    url: '/Trash',
    iosIcon: trashOutline,
    mdIcon: trashSharp,
  },
  {
    title: 'Home',
    url: '/Home',
    iosIcon: homeOutline,
    mdIcon: homeSharp,
  },
];

const path = window.location.pathname.split('/')[1];
if (path !== undefined) {
  selectedIndex.value = appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
}
</script>

<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-split-pane {
  --max-width: 100vw;
  --max-height: 100vh;
}

ion-header {
  z-index: 10;
  position: relative;
}

ion-menu {
  --width: 250px;
}

ion-menu-button {
  display: block; /* Show the button by default */
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}
</style>
