import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Image,StatusBar,ScrollView,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Rating, AirbnbRating } from 'react-native-elements';
import Fire from "../Fire";
import * as ImagePicker from "expo-image-picker";
import UserPermissions from "../utilities/UserPermissions";
let ratting = 0;
export default class PostReview extends React.Component {
    static navigationOptions = {
        header: null
    }
    state = {
       
        rating:null,  // For Review
        reviewerName: "",
        comment: "",
    };
    ratingCompleted(rating) {
        // console.log('ratting completed'+ rating)
        // this.setState({
        //     rating:rating
        // })
        ratting=rating;
      }
    
    
    componentDidMount() {
        UserPermissions.getCameraPermission;
    }

    handleReview = () => {
         
        Fire.shared
            .addReview({ rating: ratting, reviewerName: this.state.reviewerName, comment: this.state.comment, 
                  })
            .then(ref => {
                this.setState({ rating: null, reviewerName: "", comment: ""});
                this.props.navigation.navigate('ShowReview');
                console.log(this.state);
            })
            .catch(error => {
                alert(error);
            });
    };

    // pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [4, 3]
    //     });

    //     if (!result.cancelled) {
    //         this.setState({ image: result.uri });
    //     }
    // };

//     render() {
//         return (
//             <SafeAreaView style={styles.container}>
//                 <View style={styles.header}>
//                     <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
//                         <Ionicons name="md-arrow-back" size={24} color="#D8D9DB"></Ionicons>
//                     </TouchableOpacity>
//                 </View>

//                 <View style={styles.inputContainer}>
//                     <Text style={styles.MainText}>Choose Picture from Camera Roll</Text>
//                     <Image source={require("../assets/tempAvatar.jpg")} style={styles.avatar}></Image>
//                      <TextInput
//                         autoFocus={true}
//                         multiline={true}
//                         numberOfLines={4}
//                         style={{ flex: 1 }}
//                         placeholder="Want to share something?"
//                         onChangeText={text => this.setState({ text })}
//                         value={this.state.text}
//                     ></TextInput> 

//                     <Text placeholder="Item Name" onChangeText={text => this.setState({ text })}
//                         value={this.state.text} ></Text>
//                 </View>

//                 <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
//                     <Ionicons name="md-camera" size={32} color="#D8D9DB"></Ionicons>
//                 </TouchableOpacity>

//                 <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
//                     <Image source={{ uri: this.state.image }} style={{ width: "100%", height: "100%" }}></Image>
//                 </View>

//                 <TouchableOpacity onPress={this.handlePost}>
//                         <Text style={{ fontWeight: "500" }}>Post</Text>
//                     </TouchableOpacity>
//             </SafeAreaView>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },

//     MainText: {
//         textAlign: "center",
//     },
//     header: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         paddingHorizontal: 32,
//         paddingVertical: 12,
//         borderBottomWidth: 1,
//         borderBottomColor: "#D8D9DB"
//     },
//     inputContainer: {
//         margin: 32,
//         flexDirection: "row"
//     },
//     avatar: {
//         width: 48,
//         height: 48,
//         borderRadius: 24,
//         marginRight: 16
//     },
//     photo: {
//         alignItems: "flex-end",
//         marginHorizontal: 32
//     }
// });


render() {
        return (
            <View>
                    <View style={{ alignItems: "center", marginTop: -5}}>
                    <Text style={styles.greeting}>{`POST A REVIEW`}</Text>
                    <TouchableOpacity style={styles.avatarPlaceholder} >
                        <Image style={styles.avatar}  />
                        <Ionicons
                            name="today"
                            size={40}
                            color="#FFF"
                            style={{ marginTop: 18, marginLeft: 30 }}
                        ></Ionicons>
                    </TouchableOpacity>
                    </View>
                
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>
                <ScrollView>
                <View style={styles.form} >
                <Rating style={{marginTop: 20 }}
                showRating = {false}
                onFinishRating={this.ratingCompleted} 
                imageSize={18}/>
                    <View>
                        {/* <Text style={styles.inputTitle}>Full Name</Text> */}
                        <TextInput
                            placeholder="Name"
                            style={styles.input}
                            onChangeText={reviewerName => this.setState({ reviewerName })}
                            value={this.state.reviewerName}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 15}}>
                        {/* <Text style={styles.inputTitle}>Email Address</Text> */}
                        <TextInput
                            placeholder="Comment"
                            style={styles.input}
                            onChangeText={comment => this.setState({ comment })}
                            value={this.state.rentPrice}
                            autoCapitalize="none"
                        ></TextInput>
                    </View>
                </View>
                </ScrollView>
                <View >
                <TouchableOpacity style={styles.button}  onPress={this.handleReview}>
                    <Text style={{ color: "#FFF", fontWeight: "200" }}>Post</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ alignSelf: "center", marginTop: 35 }}
                    onPress={() => this.props.navigation.navigate('Profile')}>
                    <Text style={{ color: "#E9446A", fontSize: 13, bottom: 10}}>
                        Skip
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
        marginTop: 25,
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
        marginTop: 15,
        borderColor: "#000",
    },
    avatar: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50
    }
});
