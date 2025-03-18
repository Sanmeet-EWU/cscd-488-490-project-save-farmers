# Getting Started

## Tools Used
- Visual Studio Code
- Ionic
- Vue
- TypeScript
- Visual Studio
- Azure
- Android Studio
- Xcode

## Development Installation Instructions
1. Install Node.js [Download here](https://nodejs.org/en)
2. Install Android Studio [Download here](https://developer.android.com/studio) (Optional, for running an Android emulator)
3. Install XCode [Download here](https://developer.apple.com/xcode/) (Optional, for running iOS emulator. Requires a Mac)

## Command Line Setup
1. Open the command prompt and run the following commands:
   ```sh
   npm install --global yarn
   yarn global add @vue/cli
   yarn global add -g @ionic/cli @capacitor/assets
   ```
2. Navigate to the desired directory and clone the repository:
   ```sh
   git clone https://github.com/Sanmeet-EWU/cscd-488-490-project-save-farmers/
   cd savefarmer && yarn install && ionic serve
   ```

## Code Editing
Open the entire folder in Visual Studio Code. Ensure you have the Vue, TypeScript, and Ionic extensions installed to edit the code within the `src` folder.

## Third-Party Plugins
The following plugins are required to run the app:
```sh
npm install chart.js
npm install chartjs-plugin-datalabels
```
or
```sh
yarn add chartjs-plugin-datalabels
```

## Emulator Instructions
### Android
Ensure Android Studio is installed and open during the first run to build properly.
```sh
ionic cap add android
ionic cap build android
ionic cap run
```

### iOS
Ensure you are using a Mac and have Xcode installed.
```sh
ionic cap add ios
ionic cap build ios
```
Open Xcode:
```sh
open .cscd-488-490-project-save-farmers/Source/savefarmer/ios/App
```
Build the app by selecting a device and clicking the play button.

## Frontend Structure
- **router folder**: Configures app routing.
- **script folder**: Handles post functionality and user settings.
- **App.vue**: Root file containing navigation elements.
- **main.ts**: Entry point and configurations.
- **page folder**: Contains website pages.
- **component folder**: Modular components for reusability.

## Database Setup
Navigate to the backend directory:
```sh
cd Source/FarmerAPI
```
Open the `FarmerAPI.sln` file in Visual Studio. Run the following commands to generate the database locally:
```sh
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## API Endpoints
### AuthController
- `POST /api/register` - Register a new user (Anonymous)
- `POST /api/login` - Login (Anonymous)
- `GET /api/user/{id}` - Get user by ID (Authorized)
- `POST /api/refresh-token` - Refresh token (Anonymous)
- `POST /api/revoke-refresh-token` - Revoke refresh token (Authorized)
- `GET /api/current-user` - Get current user details (Authorized)
- `DELETE /api/user/{id}` - Delete a user (Authorized)
- `GET /api/GetAllUsers` - Retrieve all users (Authorized)
- `POST /api/change-password` - Change user password (Authorized)

### PostController
- `POST /api/posts` - Create a post (Authorized)
- `GET /api/posts` - Get all posts (Anonymous)
- `GET /api/posts/analytic` - Get post analytics (Authorized)
- `GET /api/posts/user/{userId}` - Get posts by user ID (Authorized)
- `PUT /api/posts/{postId}` - Update a post (Authorized)
- `DELETE /api/posts/{postId}` - Delete a post (Authorized)

## Backend Structure
- **Controller folder**: API controllers for frontend interactions.
- **Domain/Entities folder**: Database entity definitions.
- **Domain/Contracts folder**: Request and response models.
- **Extensions folder**: JWT settings and error handling.
- **Infrastructure/Context folder**: Database setup.
- **Infrastructure/Mapping folder**: Maps response models to database entities.
- **Service folder**: Contains core database logic.
- **appsettings.json**: Stores settings for deployment and database.
- **Program.cs**: Configures API build settings.

## Deployment
### Frontend Deployment (Azure)
1. Fork the project on GitHub.
2. Create a Static Web App resource in Azure.
3. Select GitHub as the deployment source.
4. Link the project repository.
5. Select Vue.js as the build preset.
6. Set the app location to `./Source/savefarmer`.
7. Click **Create** to deploy.

### Backend Deployment (API on Azure)
1. Open the API project in Visual Studio.
2. Right-click and select **Publish**.
3. Choose **Azure App Service (Windows)**.
4. Create a new App Service and click **Finish**.
5. Configure the database connection:
   ```sh
   CREATE USER [YourAppServiceName] FROM EXTERNAL PROVIDER;
   ALTER ROLE db_owner ADD MEMBER [YourAppServiceName];
   ```
6. Set environment variables in Azure:
   - **Name**: `JwtSetting__Key`
   - **Value**: `ThisIsA32CharactersLongSecretKeyEXL`

## Known Issues and Future Enhancements
### Known Bugs
- User deletion does not remove associated posts.
- Cypress is deprecated due to frontend conflicts.

### Future Enhancements
- Implement a secure transaction system.
- Develop a real-time chat feature.
- Add a loading page between API requests.
- Introduce automated backend testing.

---
For more inforamtion: [SaveFarmers_Developer_Documentation.pdf](SaveFarmers_Developer_Documentation.pdf)
---
[GitHub Repository](https://github.com/Sanmeet-EWU/cscd-488-490-project-save-farmers/)
