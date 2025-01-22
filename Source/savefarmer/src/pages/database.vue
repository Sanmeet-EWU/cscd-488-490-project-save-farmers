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

    <ion-content :fullscreen="true" class="ion-padding">

    

      <ion-item>
        <ion-label >Product:</ion-label>
       <ion-input type="text" v-model="inputName"></ion-input>
       <ion-label >Quantity:</ion-label>
       <ion-input type="text" v-model="inputQuantity"></ion-input>
        <ion-label >Where:</ion-label>
        <ion-input type="text" v-model="inputLocation"></ion-input>
      <ion-button slot="end" @click="addItem">Save</ion-button>
    </ion-item>

    <h3>THE DATA</h3>
      <ion-item v-for="item in items" :key="item?.id" >
        <ion-label>
          <ion-label>ID: {{ item.id }}</ion-label>
            
          <ion-label>Product: {{ item.name }}</ion-label>
          
          <ion-label>Qty: {{ item.qty }}</ion-label>
          
          <ion-label>Where: {{ item.loc }}</ion-label>
          
        </ion-label>
        <ion-button slot="end" @click="() => deleteItem(item.id)">Delete</ion-button>

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
import { IonButtons, IonItem, IonButton, IonInput, IonLabel, onIonViewDidEnter, onIonViewWillLeave, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { ref } from 'vue';

const items = ref<any>();
const db = ref<SQLiteDBConnection>();
const sqlite = ref<SQLiteConnection>();

const inputName = ref<string>("");
const inputQuantity = ref<string>("");
const inputLocation = ref<string>("");


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

//do an insert on db
const addItem = async() => {
  try {

  //losad db
  await db.value?.open();
  //query db
  await db.value?.query(
    'INSERT INTO test7 (id,name,qty,loc) VALUES (?,?,?,?);',
    [Date.now(),inputName.value,inputQuantity.value,inputLocation.value]
    );
  
  // update ui
  const respSelect = await db.value?.query('SELECT * FROM test7;');
  items.value = respSelect?.values;

} catch (error) {
    alert((error as Error).message+"      ADD");
  }
  finally {
    //to make an epmty data set or missing data in it, need or dont need ??
    inputName.value = "";
    inputQuantity.value = "";
    inputLocation.value = "";
    await db.value?.close();

  }
};

//do an delete on db
const deleteItem = async (id: number) => {
  try {

  //losad db
  await db.value?.open();
  //query db
  await db.value?.query(
    'DELETE FROM test7 WHERE id=?;', [id]);

  // update ui
  const respSelect = await db.value?.query('SELECT * FROM test7;');
  items.value = respSelect?.values;

} catch (error) {
    alert((error as Error).message+"      ADD");
  }
  finally {
    //to make an epmty data set or missing data in it, need or dont need ??
    inputName.value = "";
    inputQuantity.value = "";
    inputLocation.value = "";
    await db.value?.close();

  }
};

// do a select on db
const loadData = async() => {
  try {
  //losad db
  await db.value?.open();
  //query db
  const respSelect = await db.value?.query('SELECT * FROM test7;');
        console.log(`res: ${JSON.stringify(respSelect)}`);
  
  await db.value?.close();
  items.value = respSelect?.values;
  
  } catch (error) {
    alert((error as Error).message+"     LOAD");
  }
  finally {
    await db.value?.close();

  }

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
