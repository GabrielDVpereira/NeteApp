# NeteApp

NeteApp is a React project in TypeScript for Ivanete's car scheduling. This app connects with Firebase for authentication and storing data.
## How to run

### Configure Firebase

The app connects with Firebase, for this it is necessary to create a Firebase project at [firebase.google.com](https://firebase.google.com/). Configure the project to use Google Authentication and Firestore.

The project created will have key's and identifications that should be added into a `.env` file at the project's root. This environment file will also need a admin Whatsapp number, for sending confirmation messages for the car's bookings.

The `.env` file should follow the example:
```
# Firebase
REACT_APP_FIREBASE_API_KEY=XXXX # Firebase project's API Key
REACT_APP_FIREBASE_AUTH_DOMAIN=XXXX.firebaseapp.com # Firebase project's auth domain
REACT_APP_FIREBASE_PROJECT_ID=XXXX # Firebase project's ID
REACT_APP_FIREBASE_STORAGE_BUCKET=XXXX.appspot.com # Firebase project's storage bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=XXXX # Firebase project's messaging sender ID
REACT_APP_FIREBASE_MESSAGING_APP_ID=1:XXXX:web:XXXX # Firebase project's messaging app ID
REACT_APP_FIREBASE_MEASUREMENT_ID=G-XXXX # Firebase project's  measurement ID

# Admin's Whatsapp number
REACT_APP_ZAP_NUMBER=5561999999999 # Whatsapp number with DDD and DDI
```

### Install dependencies

With this configuration ready it is necessary to install the dependencies. using the following command:
```sh
npm install
```

### Run in Development mode

After the install is completed you can run it with the command:
```sh
npm start
```

This runs the app in the `3000` port. It can be accessed at: [http://localhost:3000](http://localhost:3000)

### Build the app for Production

To deploy the app it is necessary to build it, using the command bellow:
```sh
npm run build
```

This command will create a `build/` folder which is what should be deployed.
