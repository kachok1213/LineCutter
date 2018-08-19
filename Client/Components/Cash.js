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
import CartItem from './CartItem';

const inventory = [];


class Cash extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      list:[]
    }
    this.user
    this.ShopingCart;
  }

  async componentDidMount() {
    StatusBar.setHidden(true);
    try {
      this.user = JSON.parse(await AsyncStorage.getItem("user"));
      this.ShopingCart = JSON.parse(await AsyncStorage.getItem("cart") );
      this.setState({list: this.ShopingCart});
      
      
    } catch (error) {
      console.log(error);
      
    }
  

  }

  ChangeItemQuantity = (index, quantity) => {
    let temp = this.state.list;
    temp[index].Item_quantity = quantity;
    this.setState({list: temp});
  }

  Buy = async () =>{

    try {  
      const res = await fetch(
        "http://ruppinmobile.tempdomain.co.il/site16/Project.asmx/CheckOut",
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
      this.setState({list:[]})
      console.log("success")
      ////צריך לשנות סטייט
    } catch (error) {
      console.log(error);
    }     
  }



  render() {
    return (
      <View>
        <View style={styles.Bar}>
          <View style={{ left: 160, top: 20 }}>
            <Text>Cash</Text>
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Image
              source={require("../assets/drawer.png")}
              style={{ position: "relative", left: 20 }}
            />
          </TouchableOpacity>
        </View>
     
        <ScrollView>
          {this.state.list.map((item, index) => {return <CartItem index={index} key = {index} item = {item} ChangeItemQuantity={this.ChangeItemQuantity}/> } )}
        </ScrollView>
        <View style={{width:100,left:130}}>
        <Button color="black" title="Check Out" onPress={this.Buy}  buttonstyle={{height:50,backgroundColor:"#00BFFF"}}></Button>
        </View>
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

export default Cash;
