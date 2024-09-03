import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { StyleSheet, View, Text, TextInput, Image, ScrollView, TouchableOpacity } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Id } from "@/convex/_generated/dataModel";

const profileImages = [
    require('../assets/images/profile_pics/0.png'),
    require('../assets/images/profile_pics/1.png'),
    require('../assets/images/profile_pics/2.png'),
    require('../assets/images/profile_pics/3.png'),
    require('../assets/images/profile_pics/4.png'),
    require('../assets/images/profile_pics/5.png'),
    require('../assets/images/profile_pics/6.png'),
    require('../assets/images/profile_pics/7.png'),
    require('../assets/images/profile_pics/8.png'),
  ];


export default function FriendsPage({navigation}: any) {
    const [searchQuery, setSearchQuery] = useState('');
    const queriedUsers = useQuery(api.users.searchByUsername, {userNameQuery: searchQuery});
    const signedInUser = useQuery(api.users.signedInUser);
    const friends = signedInUser?.friends || [];
    const filteredUsers = queriedUsers?.filter(u => u._id !== signedInUser?._id).map(u => {
        const friendEntry = friends.find(f => f.user === u._id);
        const status = friendEntry ? friendEntry.status : "NONE"
        return {...u, status: status}
    });

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Friends</Text>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder={"Search"}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            
            <ScrollView>
                {filteredUsers?.map(user => <FriendRow key={user._id} status={user.status} userId={user._id} userName={user.name || ""} streak={Number(user.streak) || 0} profileId={Number(user.profilePicId) || 0}/>)}
            </ScrollView>
        </View>
    )
}

interface IFriendRowProps {
    userName: string,
    profileId: number,
    streak: number,
    userId: string,
    status: string
}

const FriendRow = (props: IFriendRowProps) => {
    const requestFriend = useMutation(api.users.requestFriend);
    const removeFriend = useMutation(api.users.removeFriend);
    const acceptFriend = useMutation(api.users.acceptFriend);

    return (
        <View style={{flexDirection: "row", width: "90%", borderColor: "#E8E8E8", borderWidth: 1, borderRadius: 10,
            alignSelf: "center", padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25, shadowRadius: 3.84, justifyContent: "space-between"}}>
               <View>
                   <Image
                       source={profileImages[props.profileId]}
                       style={{width: 60, height: 60}}
                       resizeMode="contain"
                   />
                   <Text style={{textAlign: "center", marginTop: 8}}>@{props.userName}</Text>
               </View>
       
               <View style={{justifyContent: "flex-end"}}>
                   <View style={{flexDirection: "row"}}>
                       <FontAwesome6 name="person-walking" size={24} color="black" />
                       <Text style={{marginTop: 8, marginLeft: 8}}>{props.streak} days</Text>
                   </View>
               </View>
       
               <View>
                   {
                       props.status === "NONE" &&
                       <TouchableOpacity style={{alignItems: "center"}} onPress={() => requestFriend({otherUserId: props.userId as Id<"users">})}>
                           <FontAwesome6 name="add" size={24} color="green"/>
                           <Text style={{textAlign: "center"}}>Add</Text>
                       </TouchableOpacity>
                   }
                   {
                       props.status === "CONFIRMED" &&
                       <TouchableOpacity style={{alignItems: "center"}} onPress={() => removeFriend({otherUserId: props.userId as Id<"users">})}>
                            <FontAwesome6 name="trash-can" size={24} color="red" />
                            <Text style={{textAlign: "center"}}>Delete</Text>
                       </TouchableOpacity>         
                   }
                   {
                       props.status === "REQUESTED" &&
                       <View style={{alignItems: "center"}}>
                            <FontAwesome6 name="clock-rotate-left" size={24} color="black" />
                            <Text style={{textAlign: "center"}}>Requested</Text>
                       </View>       
                   }
                   {
                       props.status === "PENDING" &&
                       <TouchableOpacity style={{alignItems: "center"}} onPress={() => acceptFriend({otherUserId: props.userId as Id<"users">})}>
                            <FontAwesome6 name="check-square" size={24} color="green" />
                            <Text style={{textAlign: "center"}}>Accept</Text>
                       </TouchableOpacity>    
                       
                   }
               </View>
           </View>
    ) 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    text: {
        paddingTop: 32,
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: "center"
    },
    searchContainer: {
        alignSelf: "center",
        width: "70%",
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#f1f1f1',
        padding: 8,
    },
    searchInput: {
        height: 30,
        paddingHorizontal: 10,
        fontSize: 16,
    },
});