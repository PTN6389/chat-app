import { useState, useEffect } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";

const Chat = ({db, route, navigation}) => {
    const { userID, name, color } = route.params;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        navigation.setOptions({ title: name });
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
            let newMessages = [];
            documentsSnapshot.forEach(doc => {
                newMessages.push({ 
                    id: doc.id, 
                    ...doc.data(), 
                    createdAt: new Date(doc.data().createdAt.toMillis())
                })
            });
            setMessages(newMessages);  
        });

        //clean up code
        return() => {
            if (unsubMessages) unsubMessages();
        }
    }, []);

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

    return(
        <View style={[styles.container,{backgroundColor: color}]}>
            <GiftedChat 
                messages={messages}
                renderBubble={renderBubble}
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