import { createApp, ref } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import "@ionic/vue/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

// databse stuff
import { Capacitor } from "@capacitor/core";
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite";
import Axios from "axios";
import { reload } from "ionicons/icons";

customElements.define("jeep-sqlite", JeepSqlite);
console.log(`after customElements.define`);

//this will connect to local server when visual studio is running the server
if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  Axios.defaults.baseURL = "http://localhost:5209/";
}
const token = localStorage.getItem("RefreshToken");

const refreshAccessToken = async () => {
  if (token) {
    try {
      const response = await Axios.post(
        "https://farmerapi20250306133102-b8ejbnf8c4a0hve5.westus-01.azurewebsites.net/api/refresh-token",
        {
          refreshToken: token,
        }
      );
      if (response.status === 200) {
        sessionStorage.setItem("AccessToken", response.data.accessToken);
        sessionStorage.setItem("Id", response.data.id);
        sessionStorage.setItem("FirstName", response.data.firstName);
        sessionStorage.setItem("LastName", response.data.lastName);
        sessionStorage.setItem("Email", response.data.email);
        sessionStorage.setItem("Role", response.data.role);

        Axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
      }
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.title);
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
      } else if (error.request) {
        alert("No response from server. Please try again.");
      } else {
        alert("An unexpected error occurred.");
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
      }
    }
  }
};

// fixed login or signup buttons on there pages for going backl tot he other
// if (token) {
//   refreshAccessToken();
// } else {
//   router.push("/signup");
// }

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const platform = Capacitor.getPlatform();
    const sqlite = new SQLiteConnection(CapacitorSQLite);

    console.log(`platform: ${platform}`);
    console.log(`sqlite: ${sqlite}`);

    //web spsecific functionalitynode
    if (platform === "web") {
      // Create the 'jeep-sqlite' Stencil component
      const jeepSqliteEl = document.createElement("jeep-sqlite");
      document.body.appendChild(jeepSqliteEl);
      await customElements.whenDefined("jeep-sqlite");
      console.log(`after customElements.whenDefined`);

      // Initialize the Web store
      await sqlite.initWebStore();
      console.log(`after initWebStore`);
    }
    // here you can initialize some database schema if required

    // example: database creation with standard SQLite statements
    const ret = await sqlite.checkConnectionsConsistency();
    const isConn = (await sqlite.isConnection("db_vite", false)).result;
    let db = null;
    if (ret.result && isConn) {
      db = await sqlite.retrieveConnection("db_vite", false);
    } else {
      db = await sqlite.createConnection(
        "db_vite",
        false,
        "no-encryption",
        1,
        false
      );
    }
    // minipulate the database
    await db.open();
    console.log(`db: db_vite opened`);
    const queryCreateTable = `
          CREATE TABLE IF NOT EXISTS test7 (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          qty TEXT NOT NULL,
          loc TEXT NOT NULL
         );
        `;

    const respCT = await db.execute(queryCreateTable);
    console.log(`res: ${JSON.stringify(respCT)}`);
    // if(res.changes && res.changes.changes && res.changes.changes < 0) {
    // throw new Error(`Error: execute failed`);
    // }

    // //adding test record to db
    // const respInsert = await db.query(
    //   'INSERT INTO test (id,name) VALUES (?,?)',
    //   [Date.now(),'NAME' + Date.now()]
    // );
    // console.log(`res: ${JSON.stringify(respInsert)}`);

    // //query db
    // const respSelect = await db.query(
    //   'SELECT * FROM test'
    // );
    // console.log(`res: ${JSON.stringify(respSelect)}`);

    //close db
    await sqlite.closeConnection("db_vite", false);

    // ionic app inish
    const app = createApp(App).use(IonicVue).use(router);

    router.isReady().then(() => {
      app.mount("#app");
    });
  } catch (e) {
    console.log((e as any).message);
  }
});
