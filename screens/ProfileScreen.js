import React from "react";
import { View, StyleSheet, TouchableOpacity,Text,Image,Button } from "react-native";
import Communications from 'react-native-communications';
import { Ionicons } from "@expo/vector-icons";
import Fire from "../Fire";


export default class ProfileScreen extends React.Component {
    state = {
        user: {}
    };

    unsubscribe = null;

  componentDidMount() {

        const user = this.props.uid || Fire.shared.uid;

        this.unsubscribe = Fire.shared.firestore
            .collection("users")
            .doc(user)
            .onSnapshot(doc => {
                this.setState({ user: doc.data() });
            });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{ marginTop: 64, alignItems: "center" }}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={this.state.user.avatar ? { uri: this.state.user.avatar }
                            : require("../assets/tempAvatar.jpg")}style={styles.avatar}/>
                    </View>
                    <Text style={styles.name}>{this.state.user.name}</Text>
                  </View>
                  <View style={{padding: 12}}> 
                  <Button title="Tap to Call" onPress={()=> Communications.phoneCall('03022007680', true)} style={{paddingTop: 12}}/>
                  <Button onPress={() => {Fire.shared.signOut();}}title="Log out"/>
                  </View>
                <View>
                
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profile: {
        marginTop: 64,
        alignItems: "center"
    },
    button: {
        padding: 120,
        color : 'red'
    },
    avatarContainer: {
        shadowColor: "#151734",
        shadowRadius: 30,
        shadowOpacity: 0.4
    },
    avatar: {
        width: 136,
        height: 136,
        borderRadius: 68
    },
    name: {
        marginTop: 24,
        padding: 10,
        fontSize: 16,
        fontWeight: "600"
    },
    statsContainer: {
        flexDirection: "row",
        textAlign: "center",
        justifyContent: "space-between",
        margin: 32
    },
    stat: {
        alignItems: "center",
        flex: 1
    },
    statAmount: {
        color: "#4F566D",
        fontSize: 18,
        fontWeight: "300"
    },
    statTitle: {
        color: "#C3C5CD",
        fontSize: 12,
        fontWeight: "500",
        marginTop: 4
    }
});


