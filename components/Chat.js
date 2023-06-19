import { useState, useEffect } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";

const Chat = ({route, navigation}) => {
    const { name } = route.params;
    const { color } = route.params;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        navigation.setOptions({ title: name });
        {/* Set static messages */}
        setMessages([
            {
                _id: 1,
                text: "Hello developer",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "React Native",
                    avatar: "https://placeimg.com/140/140/any"
                },
            },
            {
                _id: 2,
                text: `${name} has entered the chat.`,
                createdAt: new Date(),
                system: true
            },
        ]);
    }, []);

    const onSend = (newMessages) => {
        setMessages(previousMessage => GiftedChat.append(previousMessage, newMessages))
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
                onSend={messages => onSend(messages)}   
                user={{
                    _id: 1
                }}         
            />
            {/* Fixes issue with keyboard overlapping chat input text box for older android 
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Chat;