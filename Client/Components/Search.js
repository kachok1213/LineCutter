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
import Product from "./Product";
import AutoSuggest from "react-native-autosuggest";

let urlAPI =
  "http://ruppinmobile.tempdomain.co.il/site16/Project.asmx/Inventory";

let inventoryList = [];

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list2: [],
      output: []
    };
    this.user;
    this.ShopingCart;
  }
  async componentDidMount() {
    StatusBar.setHidden(true);
    this.user = JSON.parse(await AsyncStorage.getItem("user"));
    this.ShopingCart = JSON.parse(await AsyncStorage.getItem("cart") );
    fetch(urlAPI, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => data.json())
      .then(data => {
        data2 = JSON.parse(data.d);
        console.log(data2);
        // let list = data2.map(function(item2, index) {
        //   <Product key={index} item={item2} />;
        // });
        this.setState({ list2: data2 });
      });
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

  Search = text => {
    let i;
    data2.forEach(item => {
      if (text[i] == this.item.product_name[i]) {
        return <Product />;
      }
    });
  };

  p = selection => {
    let output = [];
    this.state.list2.map((item, index) => {
      if (item.product_name.startsWith(selection)) {
        output.push(
          <View key={index} style={{height:40,borderWidth:1,borderColor:'#00BFFF'}}>
          <TouchableOpacity onPress={()=>this.AddToBill(item.Item_ID)}>
            <Text style={{fontSize:20,}}>{item.product_name}</Text>
            </TouchableOpacity>
          </View>
          
        );
      }
    });
    this.setState({ output: output });
  };

  render() {
    return (
      <View>
        <View style={Styles.Bar}>
          <View style={{ left: 160, top: 20 }}>
            <Text>search</Text>
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Image
              source={require("../assets/drawer.png")}
              style={{ position: "relative", left: 20 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor:'white',position:'absolute',top:60,right:0}} >
        <AutoSuggest
        
          otherTextInputProps={{ editable: true }}
          textInputStyles={{
            width: null,
            fontSize: 20,
            backgroundColor: "white",
            height: 40,
            right:0,
          }}
          onChangeText={selection => this.p(selection)}
          clearBtn={null /* myOptionalCustomClearBtn */}
          placeholder="חפש בתפריט.."
          placeholderTextColor="darkgrey"
        />
        {this.state.output}
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  TextInput: {
    width: 300,
    paddingLeft: 10,
    fontSize: 12,
    backgroundColor: "lightgrey",
    height: 40
  },

  Bar: {
    top: 0,
    width: 500,
    height: 60,
    backgroundColor: "#00BFFF"
  },

  AutoSuggest: {
    width: 300,
    paddingLeft: 10,
    fontSize: 12,
    backgroundColor: "lightgrey",
    height: 40
  }
});
