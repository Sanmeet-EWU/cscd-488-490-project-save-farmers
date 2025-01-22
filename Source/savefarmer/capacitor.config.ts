import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ionic-app-base',
  webDir: 'dist'
};

export default config;

// _----------------------This is not part of the video toot but i still have it, now deleteed becuase of error avodence, never really needed.--------------------

// import { CapacitorConfig } from '@capacitor/cli';

// const config: CapacitorConfig = {
//   appId: 'com.jeep.app.ionic7.angular.sqlite',
//   appName: 'ionic7-angular-sqlite-starter',
//   webDir: "www",
//   server: {
//     androidScheme: 'https'
//   },
//   plugins: {
//     CapacitorSQLite: {
//       iosDatabaseLocation: 'Library/CapacitorDatabase',
//       iosIsEncryption: true,
//       iosKeychainPrefix: 'angular-sqlite-app-starter',
//       iosBiometric: {
//         biometricAuth: false,
//         biometricTitle : "Biometric login for capacitor sqlite"
//       },
//       androidIsEncryption: true,
//       androidBiometric: {
//         biometricAuth : false,
//         biometricTitle : "Biometric login for capacitor sqlite",
//         biometricSubTitle : "Log in using your biometric"
//       },
//       electronIsEncryption: true,
//       electronWindowsLocation: "C:\\ProgramData\\CapacitorDatabases",
//       electronMacLocation: "/Volumes/Development_Lacie/Development/Databases",
//       electronLinuxLocation: "Databases"
//     }
//   }
// };
// export default config;
