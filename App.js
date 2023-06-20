import Start from './components/Start';
import Chat from './components/Chat';

//Import Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

//Initialize Firebase and Firestore
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const App = () => {

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBPtl-fnDh1dddVgiNXymoTjq09HEYPonY",
    authDomain: "chat-app-c181a.firebaseapp.com",
    projectId: "chat-app-c181a",
    storageBucket: "chat-app-c181a.appspot.com",
    messagingSenderId: "127041336851",
    appId: "1:127041336851:web:e307e224a29d82ccd7b1e6"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Start">
        <Stack.Screen 
          name="Start"
          component={Start}
        />
        <Stack.Screen 
          name="Chat">
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;