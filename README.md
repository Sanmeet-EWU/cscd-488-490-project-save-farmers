# Getting Started
## Tools Using
1. Visual Studio Code
2. Ionic
3. Vue
4. TypeScript
---

## Dev Install Instructions

1. Install Node.js [Here](https://nodejs.org/en)  
2. Install Android Studio [Here](https://developer.android.com/studio?gad_source=1&gbraid=0AAAAAC-IOZlMfeQAjLmqKrspCVlYU7fr4&gclid=Cj0KCQiA88a5BhDPARIsAFj595jUz8aGqI65fDdK3ZpqDA1pz140tnzHJ69qZ4B3gZL4gsL5vVhV9B0aAnkaEALw_wcB&gclsrc=aw.ds)   (Optional, this for running an Android emulator)

### Command Line Setup

1. Open the command prompt and enter the following commands:
   - **Install Vue**  
     ```bash
     npm install -g @vue/cli
     ```

   - **Install Ionic and Capacitor**  
     ```bash
     npm install -g @ionic/cli @capacitor/assets
     ```

2. Navigate to the desired directory:
   - **Clone the repository**  
     ```bash
     git clone https://github.com/Sanmeet-EWU/cscd-488-490-project-save-farmers/tree/main/Source/savefarmer.git savefarmer
     ```

   - **Change to the project directory and run the app**  
     ```bash
     cd savefarmer && npm install && ionic serve
     ```

   *(This command should open the app in your browser. If it doesn't, ensure Vue and Ionic are installed correctly.)*

### Code Editing

You can now open the **entire folder** with a code editor such as VS Code (make sure to have the Vue, TypeScript, and Ionic extensions installed) to edit the code within the `src` folder.

---

# Emulator Instructions

1. In the project terminal, run the following commands:  
   *Ensure Android Studio is installed and open during the first run to build properly.*
   - **Add Capacitor Android files**  
     ```bash
     ionic cap add android
     ```

   - **Build Android**  
     ```bash
     ionic cap build android
     ```
     *(This should open Android Studio and build the emulator)*

   - **Run the Emulator**  
     ```bash
     ionic cap run
     ```
     *(This should launch the emulator. Note: It may take some time.)*

--- 

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ixLrLXsm)

[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=16315825)
