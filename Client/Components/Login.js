import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  AsyncStorage,
  StatusBar
} from "react-native";
import { withNavigation } from "react-navigation";


let data2;
let urlAPI =
  "http://ruppinmobile.tempdomain.co.il/site16/Project.asmx/Login";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Pass: "",
      msg: "Welcome"
    };
  }

  async componentDidMount() {
    const user = await AsyncStorage.getItem("user");
    console.log(user);
    
    if(user !== null){
      this.props.navigation.navigate("Drawer");
    }
    
    StatusBar.setHidden(true);
  }

  Uname = text => {
    this.setState({ Username: text });
  };

  Pass = text => {
    this.setState({ Pass: text });
  };

  Login = () => {
    if (this.state.Username != "" && this.state.Pass != "") {
      fetch(urlAPI, {
        method: "POST",
        body: JSON.stringify({
          userName: this.state.Username,
          pass: this.state.Pass
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(data => data.json())
        .then(data => {
          data2 = JSON.parse(data.d);
          console.log(data2);
          
          if (data2 != null) {
            AsyncStorage.setItem("user", JSON.stringify(data2));
            this.props.navigation.navigate("Drawer");
          } else {
            this.setState({ msg: "שם משתמש ו/או סיסמא שגויים" });
          }
        });
    } else {
      this.setState({ msg: "אין להשאיר שדות ריקים" });
    }

    responseGoogle = (googleUser)=> {
      var id_token = googleUser.getAuthResponse().id_token;
      var googleId = googleUser.getId();
      
      console.log({ googleId });
      console.log({accessToken: id_token});
     
    }
  };

  render() {
    return (
      <View style={styles.container}>



        <Image
          source={require("../assets/food.jpg")}
          style={styles.background}
        />
        <Image
          source={require("../assets/Logo.png")}
          style={{
            position: "absolute",
            height: 50,
            opacity: 0.7,
            top: 250,
            left: 120
          }}
        />
        <View style={styles.UnameInput}>
          <Text style={{ fontWeight: "bold"}}>Username</Text>
          <TextInput placeholder="" onChangeText={this.Uname} />
        </View>
        <View style={styles.PassInput}>
          <Text style={{ fontWeight: "bold"}}>Password</Text>
          <TextInput
            keyboardType="numeric"
            placeholder=""
            onChangeText={this.Pass}
          />
        </View>
        <View
          style={{
            left: 150,
            top: 450,
            position: "absolute",
            alignContent: "center"
          }}
        >
          <Text style={{ backgroundColor: "lightblue", fontWeight: "bold" }}>
            {this.state.msg}
          </Text>
        </View>
        <View>
          <TouchableOpacity style={styles.login} onPress={this.Login}>
            <Text style={{ fontFamily: "notoserif", fontWeight: "bold" }}>
              Sign-in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Register}
            onPress={() => {
              this.props.navigation.navigate("Register");
            }}
          >
            <Text style={{ fontFamily: "notoserif", fontWeight: "bold" }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      
        <Text style={{ alignSelf: "center" }}>
          All Rights Reserved Kachok©{" "}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    borderColor: "#000000"
  },

  background: {
    flexGrow: 3,
    alignSelf: "stretch",
    width: null,
    height: null
  },

  login: {
    display: "flex",
    flex: 2,
    position: "absolute",
    bottom: 100,
    right: 100,
    borderColor: "#000000",
    borderRadius: 8,
    backgroundColor: "lightblue"
  },

  Register: {
    display: "flex",
    position: "absolute",
    bottom: 100,
    left: 100,
    borderColor: "#000000",
    borderRadius: 8,
    backgroundColor: "lightblue"
  },

  UnameInput: {
    flex: 1,
    width: 100,
    left: 130,
    top: 350,
    position: "absolute",
    backgroundColor: "#A9A9A9",
    opacity: 0.7,
    borderRadius: 10
  },

  PassInput: {
    flex: 3,
    width: 100,
    top: 400,
    left: 130,
    position: "absolute",
    backgroundColor: "#A9A9A9",
    opacity: 0.7,
    borderRadius: 10
  }
});

export default withNavigation(App);
