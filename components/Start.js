import { useState } from "react";
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Alert } from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";
import { Platform } from "react-native";



const Start = ({navigation}) => {
    const auth = getAuth();
    const [name, setName] = useState('')
    const [color, setColor] = useState('')

    const signInUser = () => {
        signInAnonymously(auth)
        .then((result) => {
            navigation.navigate("Chat", 
            {userID: result.user.uid, name: name, color: color 
            });
            Alert.alert("Signed in successfully!");
        })
        .catch((error) => {
            Alert.alert("Unable to sign in, please try again later.");
        });
    };

    return(
        
            <ImageBackground 
                style={styles.backgroundImage}
                source={require('../assets/BackgroundImage.png')}>
                
                <Text style={styles.title}>Chat App</Text>

                {/* Body Container */}
                <View style={styles.bodyContainer}>
                    {/*  Text Box Section */}
                    <View style={styles.textInputContainer}>
                        <Image 
                            style={styles.textInputImage}
                            source={require('../assets/TextInputIcon.png')} 
                        />
                        <TextInput
                        style={[styles.text, styles.textInput]} 
                        value={name}
                        onChangeText={setName}
                        placeholder="Your Name"/>
                    </View>

                    {/* Choose Background Color section*/}
                    <View> 
                        <Text style={styles.text}>Choose Background Color:</Text>
                        <View style={styles.backgroundColorContainer}>
                            <TouchableOpacity 
                                style={[styles.circle, styles.black]}
                                
                                onPress={() => setColor("#090C08")} />
                            <TouchableOpacity 
                                style={[styles.circle, {backgroundColor: "#474056"}]}
                                onPress={() => setColor("#474056")}
                                 />
                            <TouchableOpacity 
                                
                                onPress={() => setColor("#8A95A5")}
                                style={[styles.circle, styles.gray]} />
                            <TouchableOpacity 
                               
                                onPress={() => setColor("#B9C6AE")}
                                style={[styles.circle, styles.green]} />
                        </View>
                    </View>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={signInUser}>
                        <Text style={styles.buttonText}>Start Chatting</Text>
                    </TouchableOpacity>
                </View>
                {/* End Body Container */}
             {/* Fixes issue on iOS where keyboard overalaps background color picker */}
            {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null} 
            </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 45,
        fontWeight: "600",
        color: "#FFFFFF",
        marginTop: 50,
        marginBottom: 200
    },
    bodyContainer: {
        backgroundColor: "#FFFFFF",
        height: "44%",
        width: "88%"
    },
    text: {
        fontSize: 16,
        fontWeight: '300',
        color: "#757083",
        marginLeft: 20
    },
    textInputContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        width: "88%",
        height: 50,
        padding: 10,
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 20
    },
    textInputImage: {
        width: 20,
        height: 20
    },
    textInput: {
        flex: 1,
        marginLeft: 10,  
        fontSize: 16,
        fontWeight: '300',
        color: "#757083"
    },
    button: {
        width: "88%",
        height: 50,
        backgroundColor: "#757083",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 20
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: '600'
    },
    backgroundColorContainer: {
        flexDirection: "row",
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 20
    },
    
    circle: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25
    },
    black: {
        backgroundColor: "#090C08"
    },
    purple: {
        backgroundColor: "#474056"
    },
    gray: {
        backgroundColor: "#8A95A5"
    },
    green: {
        backgroundColor: "#B9C6AE"
    }
});

export default Start;