import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image ,Alert} from "react-native";

export default class CartItem extends Component {
  render() {
    return (
      <View>
        <View>
          <View style={stylesheet.Item}>
            <Text>{this.props.item.Item_name}</Text>
            <Text>
              Price:{" "}
              {this.props.item.Item_Price * this.props.item.Item_quantity}
            </Text>
            <Text>Amount: {this.props.item.Item_quantity}</Text>
            <TouchableOpacity
              onPress={() => {
                this.props.ChangeItemQuantity(
                  this.props.index,
                  this.props.item.Item_quantity + 1
                );
              }}
            >
              <Text> + </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.ChangeItemQuantity(
                  this.props.index,
                  this.props.item.Item_quantity - 1
                );
              }}
            >
              <Text> - </Text>
            </TouchableOpacity>
            <View style={{ right: 0 }}>
          <Image
            source={{
              uri: `http://ruppinmobile.tempdomain.co.il/site16/Images/${
                this.props.item.Item_Pic
              }`
            }}
            style={{ width: 50, height: 50,  }}
          />
        </View>
          </View>
        </View>
      
      </View>
    );
  }
}

const stylesheet = StyleSheet.create({
  Item: {
    borderWidth: 2,
    borderColor: "black"
  }
});
