import React from "react";
import { View, Text, StyleSheet, Image, FlatList, Button,Linking,TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Rating, AirbnbRating } from 'react-native-elements';
import firebase from "firebase";
import moment from "moment";
import Fire from "../Fire";

export default class ReviewsScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    // ratingCompleted(rating) {
    //     console.log("Rating is: " + rating)
    //   }
    state = { reviews: []}
    
    componentDidMount() {
        this.getAddReviews();
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
    getAddReviews(){
        firebase.firestore().collection("reviews")
        .get()
        .then((querySnapshot) => {
             
            querySnapshot.forEach((doc) => {
                this.setState({ //the error happens here
                    // posts: [doc.data()]
                    reviews: [...this.state.reviews, doc.data() ]
                });
                console.log(this.state.reviews);
            });
            
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    } 
    renderReview = review => {
        return (
            // <View style={styles.feedItem}>
            //     {/* <Image source={{ uri: post.image }} style={styles.avatar} /> */}
            //     <View style={{ flex: 1 }}>
            //         <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            //             <View>
            //                 <Text style={styles.name}>{review.reviewerName}</Text>
            //                 <Rating style={{marginTop: -2 }}
            //                 startingValue={review.rating}
            //                 //ratingCount={review.rating}
            //                 readonly
            //                 imageSize={18}/>
            //                 <Text style={styles.post}>{review.comment}</Text>
            //                 {/* <Text style={styles.name}>{post.rentPrice}</Text>
            //                 <Text style={styles.name}>{post.rentBasis}</Text>
            //                 <Text style={styles.name}>{post.description}</Text> */}
            //                 {/* <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text> */}
                       
            //             </View>

            //             {/* <Ionicons name="ios-more" size={24} color="#73788B" /> */}
            //         </View>
            //         {/* <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="cover" /> */}
            //         {/* <Text style={styles.ItemName}>{review.rating}</Text> */}
                    
            //         {/* <Text style={styles.detail}>PKR : <Text style={styles.detail}>{post.rentPrice}</Text>
            //         <Text style={styles.detail}> / {post.rentBasis}</Text>
            //         </Text> */}
            //         <View>
                    
            //         </View>
            //         <View style={{ flexDirection: "row" , marginLeft: 170, marginTop: -25 }}>
            //             {/* <Ionicons name="ios-heart-empty" size={24} color="#73788B" style={{ marginRight: 16 }} />
            //             <Ionicons name="ios-chatboxes" size={24} color="#73788B" /> */}
            //             {/* <Button>Contact</Button> */}
            //             {/* <Button  color="#ff6c70"  
            //             title="Contact" onPress={()=> Linking.openURL(`tel:${post.contactNum}`)}/>  */}
            //              {/* <Text style={styles.ItemName}>{review.reviewerName}</Text>
            //             <Text style={styles.post}>{review.comment}</Text> */}
            //         </View>
            //     </View>
            // </View>
            <View style={styles.feedItem}>
                {/* <Image source={{ uri: post.image }} style={styles.avatar} /> */}
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <Text style={styles.name}>{review.reviewerName}</Text>
                            <Rating style={{marginTop: -2, alignItems: "center", justifyContent: "center"}}
                             startingValue={review.rating}
                             //ratingCount={review.rating}
                             readonly
                             imageSize={18}/>
                             <Text style={styles.nameCom}>{review.comment}</Text>
                            
                            <View style={{ flexDirection:"row", justifyContent: "space-between"}}>
                                
                            </View> 
                        </View>

                    </View>
                </View>
            </View>
            
        );
    };

    render() {
        return (
            <View style={styles.container}>
                 <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.navigate("Profile")}>
                    <Ionicons name="ios-arrow-round-back" size={32} color="#FFF"></Ionicons>
                    </TouchableOpacity>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Reviews</Text>
                </View>
                {console.log(this.state.reviews)}
                <FlatList
                    style={styles.feed}
                    data={this.state.reviews}
                    renderItem={({ item }) => this.renderReview(item)}
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
        backgroundColor: "#EBECF4",
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
        marginHorizontal: 16,
        height: 25
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
    nameCom: {
        fontSize: 15,
        fontWeight: "100",
        color: "#838899"
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
        marginTop: 5,
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
    back: {
        position: "absolute",
        top: 30,
        left: 32,
        width: 32,
        height: 32,
        borderRadius: 16,
        //backgroundColor: "rgba(21, 22, 48, 0.1)",
        zIndex: 999,
        color: "#FFF"
  
    },
    // button: {
    //     marginHorizontal: 25,
    // }
});