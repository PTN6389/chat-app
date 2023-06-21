import { useState, useEffect } from "react";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({db, route, navigation, isConnected}) => {
    const { userID, name, color } = route.params;
    const [messages, setMessages] = useState([]);

    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem("messages") || [];
        setMessages(JSON.parse(cachedMessages));
    }

    let unsubMessages;
    useEffect(() => {
        navigation.setOptions({ title: name });
        
        if (isConnected === true) {
            if(unsubMessages) unsubMessages();
            unsubMessages = null;

        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        unsubMessages = onSnapshot(q, (documentsSnapshot) => {
            let newMessages = [];
            documentsSnapshot.forEach(doc => {
                newMessages.push({ 
                    id: doc.id, 
                    ...doc.data(), 
                    createdAt: new Date(doc.data().createdAt.toMillis())
                })
            });
            cacheMessages(newMessages)
            setMessages(newMessages);  
        });
        } else loadCachedMessages();

        //clean up code
        return() => {
            if (unsubMessages) unsubMessages();
        }
    }, [isConnected]);

    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache)); 
        } catch (error) {
            console.log(error.message);
        }
    }

    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0])
    }

    {/* Change the color of the bubbles */}
    const renderBubble = (props) => {
        return <Bubble
        {...props}
        wrapperStyle={{
            right: {
                backgroundColor: "#000"
            },
            left: {
                backgroundColor: "#fff"
            }
        }}
        />
    }

    const renderInputToolbar = (props) => {
        if(isConnected) return <InputToolbar
            {...props} />;
        else return null;
    }

    return(
        <View style={[styles.container,{backgroundColor: color}]}>
            <GiftedChat 
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                onSend={(messages) => onSend(messages)}   
                user={{
                    _id: userID,
                    name
                }}
                         
            />
            {/* Fixes issue with keyboard overlapping chat input text box for older android */}
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Chat;