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
import Product from './Product'


let urlAPI =
  "http://ruppinmobile.tempdomain.co.il/site16/Project.asmx";


class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      list2:[],
      
    }
    this.user;
    this.ShopingCart;
  }

  
  AddToBill = async (itemID) => {

    
   for(let item of  this.ShopingCart) {

      if(item.Item_ID === itemID){
        return;
      }
    };
    
    console.log(itemID);
    await fetch(urlAPI+"/AddToCart", {
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
      urlAPI+"/GetCart",
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
  


  async componentDidMount() {

    StatusBar.setHidden(true);
    fetch(urlAPI+"/Inventory", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => data.json())
      .then(data => {
        data2 = JSON.parse(data.d);

        
       let list = data2.map((item2 ,index) =>{
          return <Product key={index} item={item2} AddToBill={this.AddToBill} />
         })
        this.setState({list2:list});
          

      });
    
    this.user = JSON.parse(await AsyncStorage.getItem("user") );
    this.ShopingCart = JSON.parse(await AsyncStorage.getItem("cart") );
    
  }


  render() {
    return (
      <View style={{marginBottom: 60}}>
        <View style={styles.Bar}>
          <View style={{ left: 160, top: 20 }}>
            <Text>Menu</Text>
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Image
              source={require("../assets/drawer.png")}
              style={{ position: "relative", left: 20 }}
            />
          </TouchableOpacity>
        </View>

        <ScrollView>
        {this.state.list2}
      
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

export default Inventory;
