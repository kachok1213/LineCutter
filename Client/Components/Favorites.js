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
import Item from './FavItem';

class Favorites extends React.Component {
constructor(props){
  super(props)
  this.state = {
    Items: []
  };
  this.user
  this.ShopingCart;
}




  async componentDidMount() {
    try {
       this.user = JSON.parse(await AsyncStorage.getItem("user"));
       this.ShopingCart = JSON.parse(await AsyncStorage.getItem("cart") );
      const res = await fetch(
        "http://ruppinmobile.tempdomain.co.il/site16/Project.asmx/Favorites",
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
      this.setState({Items: Items});

    } catch (error) {
      console.error(error);
    }
    StatusBar.setHidden(true);
  }

  AddToBill = async (itemID) => {

    for(let item of this.ShopingCart) {
       if(item.Item_ID === itemID){
         return;
       }
     };
  
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
          <View style={{ left: 160, top: 20 }}>
            <Text>Favorites</Text>
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Image
              source={require("../assets/drawer.png")}
              style={{ position: "relative", left: 20 }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
            <View>
              {this.state.Items.map((item , index) => {
                return <Item key={index} item = {item} AddToBill={this.AddToBill}/>
              })}
            </View>
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
    width: 51,
    height: 20,
    top: 25,
    right: 150,
    backgroundColor: "#ffffff",
    borderRadius: 8
  },

});

export default Favorites;
