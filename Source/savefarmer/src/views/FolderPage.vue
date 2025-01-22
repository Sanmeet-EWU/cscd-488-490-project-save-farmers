<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ $route.params.id }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <ion-item v-for="item in items" :key="item?.id">
        <ion-label>
          {{ item.name }}
        </ion-label>
      </ion-item>



      <!-- <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <strong class="capitalize">{{ $route.params.id }}</strong>
        <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      </div> -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { SQLiteConnection, CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { IonButtons, IonItem, IonLabel, onIonViewDidEnter, onIonViewWillLeave, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { ref } from 'vue';

const items = ref<any>();
const db = ref<SQLiteDBConnection>();
  const sqlite = ref<SQLiteConnection>();

onIonViewDidEnter(async () => {
  // validate the connection
  sqlite.value = new SQLiteConnection(CapacitorSQLite)
  const ret = await sqlite.value.checkConnectionsConsistency();
        const isConn = (await sqlite.value.isConnection("db_vite", false)).result;
        // let db = null;
        if (ret.result && isConn) {
            db.value = await sqlite.value.retrieveConnection("db_vite",false);
        } else {
            db.value  = await sqlite.value.createConnection("db_vite", false, "no-encryption", 1, false);
        }
        
    loadData();
});

// closing connection
onIonViewWillLeave(async() => {
  await sqlite.value?.closeConnection("db_vite",false);

});

const loadData = async() => {
  //losad db
  await db.value?.open();
  //query db
  const respSelect = await db.value?.query('SELECT * FROM test');
        console.log(`res: ${JSON.stringify(respSelect)}`);
  
    await db.value?.close();
    items.value = respSelect?.values

};


</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
