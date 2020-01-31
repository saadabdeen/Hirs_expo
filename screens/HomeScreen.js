import React from "react";
import { View, Text, StyleSheet, Image, FlatList, Button,Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
import moment from "moment";
import Fire from "../Fire";

// temporary data until we pull from Firebase
// posts = [
//     {
//         id: "ReMIJ1qOFkUJvom4nDbWZcorp552",
//         name: "Joe McKay",
//         text:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         timestamp: 1569109273726,
//         avatar: require("../assets/tempAvatar.jpg"),
//         image: require("../assets/tempImage1.jpg")
//     },
//     {
//         id: "2",
//         name: "Karyn Kim",
//         text:
//             "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         timestamp: 1569109273726,
//         avatar: require("../assets/tempAvatar.jpg"),
//         image: require("../assets/tempImage2.jpg")
//     },
//     {
//         id: "3",
//         name: "Emerson Parsons",
//         text:
//             "Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant.",
//         timestamp: 1569109273726,
//         avatar: require("../assets/tempAvatar.jpg"),
//         image: require("../assets/tempImage3.jpg")
//     },
//     {
//         id: "4",
//         name: "Kathie Malone",
//         text:
//             "At varius vel pharetra vel turpis nunc eget lorem. Lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor. Adipiscing tristique risus nec feugiat in fermentum.",
//         timestamp: 1569109273726,
//         avatar: require("../assets/tempAvatar.jpg"),
//         image: require("../assets/tempImage4.jpg")
//     }
// ];
export default class HomeScreen extends React.Component {
    state = { posts: [], user:{}}
    
    componentDidMount() {
       // const user = this.props.uid || Fire.shared.uid;
      //  this.myUsers(user);
        this.getAddLists();
       // this.myUsers();
        //this.getUserList();        
         
    }
    // getUserList() {
    //     const user = this.props.uid || Fire.shared.uid;

    //     this.unsubscribe = Fire.shared.firestore
    //         .collection("users")
    //         .doc(user)
    //         .onSnapshot(doc => {
    //             this.setState({ user: doc.data() });
    //         });

    // }
    // myUsers(){
    //     firebase.firestore().collection("users")
    //         .doc(user)
    //         .onSnapshot(doc => {
    //             this.setState({ user: doc.data() });
    //         });
    // }

    getAddLists(){
        firebase.firestore().collection("posts")
        .get()
        .then((querySnapshot) => {
             
            querySnapshot.forEach((doc) => {
                this.setState({ //the error happens here
                    // posts: [doc.data()]
                    posts: [...this.state.posts, doc.data() ]
                });
                console.log(doc.data());
            });
            
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    } 
    renderPost = post => {
        return (
            <View style={styles.feedItem}>
                <Image source={{ uri: post.image}} style={styles.avatar} />
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <Text style={styles.name}>{post.itemName}</Text>
                            {/* <Text style={styles.name}>{post.rentPrice}</Text>
                            <Text style={styles.name}>{post.rentBasis}</Text>
                            <Text style={styles.name}>{post.description}</Text> */}
                            {/* <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text> */}
                        </View>

                        {/* <Ionicons name="ios-more" size={24} color="#73788B" /> */}
                    </View>
                    <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="cover" />
                    <Text style={styles.ItemName}>{post.itemName}</Text>
                    <Text style={styles.post}>{post.description}</Text>
                    <Text style={styles.detail}>PKR : <Text style={styles.detail}>{post.rentPrice}</Text>
                    <Text style={styles.detail}> / {post.rentBasis}</Text>
                    </Text>
                    
                    <View style={{ flexDirection: "row" , marginLeft: 170, marginTop: -25 }}>
                        {/* <Ionicons name="ios-heart-empty" size={24} color="#73788B" style={{ marginRight: 16 }} />
                        <Ionicons name="ios-chatboxes" size={24} color="#73788B" /> */}
                        {/* <Button>Contact</Button> */}
                        <Button  color="#ff6c70"  
                        title="Contact" onPress={()=> Linking.openURL(`tel:${post.contactNum}`)}/> 
                        
                    </View>
                </View>
            </View>
            
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Home</Text>
                </View>
                {console.log(this.state.posts)}
                <FlatList
                    style={styles.feed}
                    data={this.state.posts}
                    renderItem={({ item }) => this.renderPost(item)}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                ></FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBECF4"
    },
    header: {
        paddingTop: 30,
        paddingBottom: 16,
        backgroundColor: "#ff6c70",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF4",
        shadowColor: "#454D65",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "500",
        color: "#FFF",
    },
    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 15,
        fontWeight: "500",
        color: "#454D65"
    },
    ItemName: {
        fontSize: 25,
        color: "#E9446A",
    },
    timestamp: {
        fontSize: 11,
        color: "#C4C6CE",
        marginTop: 4
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: "#838899"
    },
    detail: {
        marginTop: 15,
        color: "#00009e",
    },
    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16
    },
    // button: {
    //     marginHorizontal: 25,
    // }
});