import React, { Component } from 'react';
import {  View, TouchableOpacity,Image } from 'react-native';

export default class Item extends Component {
  componentDidMount(){
    console.log("item",this.props.item)
  }

  
  render() {
    return (
      <View>
        <TouchableOpacity onPress={()=>{this.props.AddToBill(this.props.item.Item_ID)}}>
            <Image source={{uri: `http://ruppinmobile.tempdomain.co.il/site16/Images/${this.props.item.Item_Pic}`}}  style={{ height: 220,position:"relative" }}/>
         </TouchableOpacity>
         <View style={{height:5,width:null,backgroundColor: "#00BFFF"}}/>
      </View>
    );
  }
}
