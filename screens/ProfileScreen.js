import React from "react";
import { View, StyleSheet, TouchableOpacity,Text,Image,Button,Linking,TextInput,ScrollView,FlatList } from "react-native";
import Communications from 'react-native-communications';
import { Ionicons } from "@expo/vector-icons";
import Fire from "../Fire";


export default class ProfileScreen extends React.Component {
  
    state = {
        user: {},
       
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

    // renderReview = review => {
    //     return (
    //         <View style={styles.feedItem}>
    //             <View style={{ flex: 1 }}>
    //                 <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
    //                 <Rating style={{marginTop: -1 }}
    //             showRating = {false}
    //             onFinishRating={rating => this.setState({ratingCompleted})}
    //             value={this.state.ratingCompleted}
    //             imageSize={18}/>
    //             <TextInput placeholder="Name" 
    //             style={{border:15}}
    //             onChangeText={reviewerName => this.setState({ reviewerName })}
    //             value={this.state.reviewerName} 
    //             style={styles.input}>
    //             </TextInput>

    //             <TextInput placeholder="Comments" multiline={true} 
    //             style={{paddingTop: 200}} style={styles.input}
    //             onChangeText={comment => this.setState({ comment })}
    //             value={this.state.comment} 
    //             style={styles.input}>
    //             </TextInput>
    //             <Button  color="#ff6c70" style={{paddingTop: 200}}  
    //             title="post"  onPress={this.handleReview}/>
    //                 </View>
    //                 </View>
    //             </View>
        
            
    //     );
    // };


    render() {
        return (
            <ScrollView>
            <View style={styles.container}>
                    <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={32} color="#000"></Ionicons>
                    </TouchableOpacity>
                <View style={{ marginTop: 64, alignItems: "center" }}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={this.state.user.avatar ? { uri: this.state.user.avatar }
                            : require("../assets/tempAvatar.jpg")}style={styles.avatar}/>
                    </View>
                    <Text style={styles.name}>{this.state.user.name}</Text>
                    <Text style={styles.address}>{this.state.user.address}</Text>
                  </View>
                  <View style={{padding: 12}}> 
                  <Button title="Tap to Call" color="#ff6c70" onPress={()=> Linking.openURL(`tel:${this.state.user.mobile}`)} style={{paddingTop: 12}}/>
                  <Button color="#ff6c70" onPress={() => {Fire.shared.signOut();}}title="Log out"/>
                  <Button color="#56bd42" onPress={() => this.props.navigation.navigate("ShowReview")}title="CHECK REVIEWS"/>
                  <Button color="#349beb" onPress={() => this.props.navigation.navigate("Review")}title="POST REVIEW"/>
                  <View style={{padding: 12}}>
                    {/* <Text style={{fontWeight: "500", fontSize:25}}>Reviews</Text> */}
                <ScrollView>
                {/* <FlatList
                    style={styles.feed}
                    data={this.state.reviews}
                    renderItem={({ item }) => this.renderReview(item)}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                ></FlatList> */}
               
                </ScrollView>
                </View>
                  </View>
                <View>
                
                </View>
               
            </View>
            </ScrollView>
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
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D",
        
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
        marginTop: 5,
        //padding: 10,
        fontSize: 16,
        fontWeight: "600"
    },

    address: {
        marginTop: 2,
        padding: 10,
        fontSize: 16,
        fontWeight: "200"
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
    },
    back: {
        position: "absolute",
        top: 25,
        left: 32,
        width: 32,
        height: 32,
        borderRadius: 16,
        //backgroundColor: "rgba(21, 22, 48, 0.1)",
        alignItems: "center",
        justifyContent: "center"
    },
});


