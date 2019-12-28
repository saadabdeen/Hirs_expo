import React from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, StatusBar,ScrollView, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import UserPermissions from "../utilities/UserPermissions";
import * as ImagePicker from "expo-image-picker";
import Fire from "../Fire";

export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        user: {
            name: "",
            email: "",
            mobile: "",
            password: "",
            avatar: null
        },
        errorMessage: null
    };

    handleSignUp = () => {
        Fire.shared.createUser(this.state.user);
    };

    handlePickAvatar = async () => {
        UserPermissions.getCameraPermission();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (!result.cancelled) {
            this.setState({ user: { ...this.state.user, avatar: result.uri } });
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <Image
                    source={require("../assets/bg1.png")}
                    style={{ marginTop: -116, marginLeft: -50 }}
                ></Image>
                <Image
                    source={require("../assets/footer.png")}
                    style={{ position: "absolute", bottom: -325, right: -225 }}
                ></Image>
                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={32} color="#FFF"></Ionicons>
                </TouchableOpacity>
                <View style={{ position: "absolute", top: 24, alignItems: "center", width: "100%" }}>
                    <Text style={styles.greeting}>{`Welcome!\nSign up to Get Started!`}</Text>
                    <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                        <Image source={{ uri: this.state.user.avatar }} style={styles.avatar} />
                        <Ionicons
                            name="ios-add"
                            size={40}
                            color="#FFF"
                            style={{ marginTop: 6, marginLeft: 2 }}
                        ></Ionicons>
                    </TouchableOpacity>
                </View>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>
                <ScrollView>
                <View style={styles.form} styles={{marginTop: 17}}>
                    <View>
                        {/* <Text style={styles.inputTitle}>Full Name</Text> */}
                        <TextInput
                            placeholder="Full Name"
                            style={styles.input}
                            onChangeText={name => this.setState({ user: { ...this.state.user, name } })}
                            value={this.state.user.name} 
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        {/* <Text style={styles.inputTitle}>Email Address</Text> */}
                        <TextInput
                            placeholder="Email"
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({ user: { ...this.state.user, email } })}
                            value={this.state.user.email}
                        ></TextInput>
                    </View>

                     <View style={{ marginTop: 32 }}>
                        {/* <Text style={styles.inputTitle}>Mobile Number</Text> */}
                        <TextInput
                            placeholder="Mobile Number"
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({ user: { ...this.state.user, email } })}
                            value={this.state.user.email}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        {/* <Text style={styles.inputTitle}>Password</Text> */}
                        <TextInput
                        placeholder="Enter password"
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({ user: { ...this.state.user, password } })}
                            value={this.state.user.password}
                        ></TextInput>
                    </View>
                </View>
                </ScrollView>
                <View >
                <TouchableOpacity style={styles.button}  onPress={this.handleSignUp}>
                    <Text style={{ color: "#FFF", fontWeight: "200" }}>Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ alignSelf: "center", marginTop: 35 }}
                    onPress={() => this.props.navigation.navigate("Login")}
                >
                    <Text style={{ color: "#414959", fontSize: 13, bottom: 10}}>
                        Already member of HIRS? <Text style={{ fontWeight: "200", color: "#E9446A" }}>Login</Text>
                    </Text>
                    
                </TouchableOpacity>
                
                </View>
            </View>
            
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greeting: {
        marginTop: 32,
        fontSize: 20,
        fontWeight: "200",
        textAlign: "center",
        color: "#000"
    },
    form: {
        marginTop: -10,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 25,
        backgroundColor: "#ff6c70",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    errorMessage: {
        height: 0,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 0
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    back: {
        position: "absolute",
        top: 48,
        left: 32,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(21, 22, 48, 0.1)",
        alignItems: "center",
        justifyContent: "center"
    },
    avatarPlaceholder: {
        width: 80,
        height: 80,
        backgroundColor: "#E1E2E6",
        borderRadius: 50,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50
    }
});
