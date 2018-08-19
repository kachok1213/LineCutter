import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  AsyncStorage
} from "react-native";
import Item from "./FavItem";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Items: []
    };
    this.user;
    this.ShopingCart;
  }

  async componentDidMount() {
    
    StatusBar.setHidden(true);
    try {
      this.user = JSON.parse(await AsyncStorage.getItem("user") );
      this.ShopingCart = JSON.parse(await AsyncStorage.getItem("cart") );
      
      const res = await fetch(
        "http://ruppinmobile.tempdomain.co.il/site16/Project.asmx/GetCart",
        {
          method: "POST",
          body: JSON.stringify({
            userid: this.user.userID
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const data = await res.json();
      const Items = JSON.parse(data.d);
      AsyncStorage.setItem("cart", JSON.stringify(Items));
    } catch (error) {
      console.log(error);
    }

    const res = await fetch(
      "http://ruppinmobile.tempdomain.co.il/site16/Project.asmx/ISdiscount",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const data = await res.json();
    const Items = JSON.parse(data.d);
    this.setState({ Items: Items });

  }

  LogOut = () => {
    AsyncStorage.clear();
    this.props.navigation.navigate("Login");
  };

  AddToBill = async (itemID) => {

    
    for(let item of  this.ShopingCart) {
 
       if(item.Item_ID === itemID){
         return;
       }
     };
   console.log("shoppingcart",this.ShopingCart)
     console.log(itemID);
     await fetch("http://ruppinmobile.tempdomain.co.il/site16/Project.asmx/AddToCart", {
       method: "POST",
       body: JSON.stringify({
         userid: this.user.userID,
         itemID: itemID,
         quantity: 1
       }),
       headers: {
         "Content-Type": "application/json"
       }
     })
 
     const res = await fetch(
      "http://ruppinmobile.tempdomain.co.il/site16/Project.asmx/GetCart",
       {
         method: "POST",
         body: JSON.stringify({
           userid: this.user.userID
         }),
         headers: {
           "Content-Type": "application/json"
         }
       }
     );
     const data = await res.json();
     const Items = JSON.parse(data.d);
     AsyncStorage.setItem("cart", JSON.stringify(Items));
     this.ShopingCart = Items;
   }


  render() {
    return (
      <View>
        <View style={styles.Bar}>
          <View style={{ top: 20 }}>
            <View style={styles.signOut}>
              <Button title="Log out" onPress={this.LogOut} color="black"/>
            </View>
            <Text style={{ width: 50, left: 150 }}>Home</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.openDrawer()}
            style={{ position: "absolute", left: 20, top: 20 }}
          >
            <Image source={require("../assets/drawer.png")} />
          </TouchableOpacity>
        </View>
        <ScrollView>
            {this.state.Items.map((item, index) => {
              return <Item key={index} item={item} AddToBill={this.AddToBill}/>
            })}   
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Bar: {
    top: 0,
    width: 500,
    height: 60,
    backgroundColor: "#00BFFF"
  },

  signOut: {
    position: "absolute",
    width: 100,
    height: 30,
    left: 250,
    backgroundColor: "#ffffff",
    borderRadius: 10
  }
});

export default Home;
