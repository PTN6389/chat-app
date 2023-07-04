import { useEffect } from 'react';
import Start from './components/Start';
import Chat from './components/Chat';
import { useNetInfo } from '@react-native-community/netinfo';
import { Alert } from 'react-native';
import { getStorage } from 'firebase/storage';

//Import Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

//Initialize Firebase and Firestore
import { initializeApp } from 'firebase/app';
import { disableNetwork, enableNetwork, getFirestore } from 'firebase/firestore';

const App = () => {
  //Define new state that represents network connectivity status
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAi-a7V1hV7cj0MnDOIcUo5kqtCRoT3Wno",
    authDomain: "chatapp-463c1.firebaseapp.com",
    projectId: "chatapp-463c1",
    storageBucket: "chatapp-463c1.appspot.com",
    messagingSenderId: "455229879003",
    appId: "1:455229879003:web:97c2420ac057537a8712fe"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  const storage = getStorage(app);

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
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} storage={storage} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;