<template>
  <ion-app>
      <!-- Side Menu -->
      <ion-menu content-id="main-content" type="reveal">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-list-header>Save Farmer Menu</ion-list-header>

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
            <ion-buttons slot="primary">
            <div v-if = "!checkAuth()">
            <ion-button fill="outline" href="/Login">
              Login <ion-icon size="large" :icon="logInOutline"></ion-icon>
            </ion-button>
            <ion-button fill="outline" href="/SignUp">
              Sign Up <ion-icon size="large" :icon="personAddOutline"></ion-icon>
            </ion-button>
          </div>
          <div v-else-if="whatUser()">
            <ion-button fill="outline" @click="openModal"> 
              Create Post <ion-icon size="large" :icon="addOutline"></ion-icon>
            </ion-button>
            <ion-button shape="round" slot="end" @click="checkUser">
              <ion-icon size="large" :icon="personCircleOutline"></ion-icon>
            </ion-button>
            <ion-button shape="round" slot="end" @click="logOut">
              <ion-icon size="large" :icon="logOutOutline"></ion-icon>
            </ion-button>
          </div>
          <div v-else>
            <ion-button shape="round" slot="end" @click="checkUser">
              <ion-icon size="large" :icon="personCircleOutline"></ion-icon>
            </ion-button>
            <ion-button shape="round" slot="end" @click="logOut">
              <ion-icon size="large" :icon="logOutOutline"></ion-icon>
            </ion-button>
          </div>

            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-router-outlet id="main-content"></ion-router-outlet>
      </ion-content>
      <CreatePostModal :isOpen="isModalOpen" @update:isOpen="isModalOpen = $event" />

    <ion-toast
      :is-open="showToast"
      message="You need to be logged in to create a post."
      duration="2000"
      color="danger"
      position="top"
      @did-dismiss="showToast = false"
    />


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
  IonToolbar,
  IonHeader,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonToast,
} from '@ionic/vue';
import { ref } from 'vue';
import {
  logInOutline,
  logInSharp,
  personCircleOutline,
  personCircleSharp,
  archiveOutline,
  archiveSharp,
  trashOutline,
  trashSharp,
  homeOutline,
  homeSharp,
  logOutOutline,
  addOutline,
  personAdd,
  personAddOutline,
} from 'ionicons/icons';

import CreatePostModal from '@/components/CreatePost.vue';

const checkAuth = () => {
  const token = sessionStorage.getItem('AccessToken');
  return token != null && token !== undefined;
};

const whatUser = () => {
  const roles = sessionStorage.getItem('Role');
  return roles != null && roles !== undefined && roles === 'Farmer' || roles === 'Admin';
};

const checkUser = () => {
  const id = sessionStorage.getItem('Id');
  if (id != null || id != undefined) {
    alert("Your user ID is: " + sessionStorage.getItem('Id'));
  } else {
    alert("No ID found");
  }
};

const logOut = () => {
  
  sessionStorage.clear();
  localStorage.clear();
  window.location.reload();
  window.location.href = '/Home';
};


  const isModalOpen = ref(false);
  const showToast = ref(false);

  const openModal = () => {
  const token = sessionStorage.getItem('AccessToken');
  if (token) {
    isModalOpen.value = true; 
  } else {
    showToast.value = true;
  }
};

const role = sessionStorage.getItem('Role');

const selectedIndex = ref(0);
// Temporary and can be moved later
const appPages = [
  ...(role ? [
    {
      title: 'Home',
      url: '/Home',
      iosIcon: homeOutline,
      mdIcon: homeSharp,
    },
    {
      title: 'Profile',
      url: '/Profile',
      iosIcon: personCircleOutline,
      mdIcon: personCircleSharp,
    },
    ...(role === 'Admin' ? [
      {
        title: 'Admin',
        url: '/AdminPage',
        iosIcon: trashOutline,
        mdIcon: trashSharp,
      }
    ] : []),
  ] : [
    // {
    //   title: 'Home',
    //   url: '/Home',
    //   iosIcon: homeOutline,
    //   mdIcon: homeSharp,
    // },
    {
      title: 'Login',
      url: '/Login',
      iosIcon: logInOutline,
      mdIcon: logInSharp,
    },
    {
      title: 'Sign Up',
      url: '/SignUp',
      iosIcon: personAdd,
      mdIcon: personAddOutline,
    }
  ]),
  {
    title: 'About',
    url: '/About',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
  },
];


const path = window.location.pathname.split('/')[1];
if (path !== undefined) {
  selectedIndex.value = appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
}
</script>

<style scoped>

.PostButton {
  background: antiquewhite;
  color: red;
}

ion-list-header {
  font-size: 1.1rem;
  font-weight: lighter;
  color: #777e85;
}

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
