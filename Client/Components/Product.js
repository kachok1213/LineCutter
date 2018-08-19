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

class Product extends React.Component {


Add = () =>{
  this.props.AddToBill(this.props.item.Item_ID);
}

  render() {
    return (

        <View style={styles.product}>
          <Text>שם המוצר: {this.props.item.product_name} </Text>
          <Text style={{ right: 0 }}>מחיר: {this.props.item.Price} שח</Text>
          <Image source={{uri: `http://ruppinmobile.tempdomain.co.il/site16/Images/${this.props.item.Item_Pic}`}}  style={{ height: 80, width: 80 }}/>
          <TouchableOpacity onPress={this.Add}>  
          <Text>לחץ כאן להוספה</Text>
          </TouchableOpacity>
        </View>

    );
  }
}

const styles = StyleSheet.create({
 
  product: {
    paddingBottom: 10,
    borderWidth: 1
  }
});

export default Product;
