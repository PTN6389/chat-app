import { TouchableOpacity, Text, View, StyleSheet, Alert } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView from "react-native-maps";

const CustomActions = ({wrapperStyle, iconTextStyle, onSend }) => {
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState(null);
    const actionSheet = useActionSheet();

    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permisions?.granted) {
            let result = await ImagePicker.launchImageLibraryAsync();

            if (!result.canceled) setImage(result.assets[0]);
            else setImage(null)
        }
    }

    const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();

        if(permissions?.granted) {
            let result = await ImagePicker.launchCameraAsync();

            if(!result.canceled) setImage(result.assets[0]);
            else setImage(null)
        }
    }

    const getLocation = async () => {
        let permissions = await Location.requestForegroundPermissionsAsync();

        if (permissions?.granted) {
            const location = await Location.getCurrentPositionAsync({});
            if (location) {
                onSend({
                    location: {
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude
                    },
                });
            } else Alert.alert("Error occurred while fetching location");
        } else Alert.alert("Permissions to read location aren't granted");
    }

    const onActionPress = () => {
        const options =["Choose From Library", "Take Picture", "Send Location", "Cancel"];
        const cancelButtonIndex = options.length -1;
        actionSheet.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        pickImage();
                        return;
                    case 1:
                        takePhoto();
                        return;
                    case 2:
                        getLocation();
                    default:
                }
            },
        );
    };

    return (
        <TouchableOpacity style={styles.container}>
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text style={[styles.iconText, iconTextStyle]}>+</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10
    },
    wrapper: {
        borderRadius: 13,
        borderColor: "#b2b2b2",
        borderWidth: 2,
        flex: 1
    },  
    iconText: {
        color: "#b2b2b2",
        fontWeight: "bold",
        fontSize: 10,
        backgroundColor: "transparent",
        textAlign: "center"
    }
})

export default CustomActions;