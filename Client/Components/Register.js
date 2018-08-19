import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar
} from "react-native";


let data2;
let urlAPI =
  "http://ruppinmobile.tempdomain.co.il/site16/Project.asmx/Register";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Lname: "",
      Username: "",
      Email: "",
      Pass: "",
      DateOfBirth: "",
      Age: "",
      Adress: "",
      msg: ""
    };
  }

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  Name = text => {
    this.setState({
      Name: text
    });
  };
  Lname = text => {
    this.setState({ Lname: text });
  };

  Uname = text => {
    this.setState({ Username: text });
  };

  Email = text => {
    this.setState({ Email: text });
  };

  Pass = text => {
    this.setState({ Pass: text });
  };

  Dob = text => {
    this.setState({ DateOfBirth: text });
  };

  Age = text => {
    this.setState({ Age: text });
  };

  Adress = text => {
    this.setState({ Adress: text });
  };

  async  logInFB() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('204552226915103', {
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`);



       userInfo=await response.json();
      }
    }
  

  submit = () => {

    let paramsObj = {
      name: this.state.Name,
      lastName: this.state.Lname,
      userName: this.state.Username,
      email: this.state.Email,
      pass: parseInt(this.state.Pass),
      dateOfBirth: this.state.DateOfBirth,
      age: parseInt(this.state.Age),
      adress: this.state.Adress
    };
 
    fetchData(urlAPI, paramsObj)
      .then(data => {
        //console.log(data);
        const info = JSON.parse(data);
        console.log(info);
        if (info.isOk) {
          this.props.navigation.navigate("Login");
        } else {
          alert("בעיה");
        }
      })
      .catch(e => {
        alert("בעיה לא ידועה");
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/food.jpg")}
          style={styles.background}
        />
        <View style={styles.title}>
          <Text style={{ fontSize: 40 }}>Sign Up</Text>
        </View>
        <View style={styles.nameInput}>
          <Text style={{ fontWeight: "bold" }}>Name</Text>
          <TextInput onChangeText={this.Name} />
        </View>
        <View style={styles.LnameInput}>
          <Text style={{ fontWeight: "bold" }}>Last Name</Text>
          <TextInput onChangeText={this.Lname} />
        </View>
        <View style={styles.UnameInput}>
          <Text style={{ fontWeight: "bold" }}>User Name</Text>
          <TextInput onChangeText={this.Uname} />
        </View>
        <View style={styles.emailInput}>
          <Text style={{ fontWeight: "bold" }}>Email</Text>
          <TextInput keyboardType="email-address" onChangeText={this.Email} />
        </View>
        <View style={styles.passInput}>
          <Text style={{ fontWeight: "bold" }}>Pass</Text>
          <TextInput keyboardType="numeric" onChangeText={this.Pass} />
        </View>

        <View style={styles.dobInput}>
          <Text style={{ fontWeight: "bold" }}>Date Of Birth</Text>
          <TextInput onChangeText={this.Dob} />
        </View>
        <View style={styles.ageInput}>
          <Text style={{ fontWeight: "bold" }}>Age</Text>
          <TextInput keyboardType="numeric" onChangeText={this.Age} />
        </View>
        <View style={styles.adressInput}>
          <Text style={{ fontWeight: "bold" }}>Adress</Text>
          <TextInput onChangeText={this.Adress} />
        </View>
        <TouchableOpacity onPress={this.submit} style={styles.submit}>
          <View>
            <Text style={{ fontFamily: "notoserif", fontWeight: "bold" }}>
              Submit
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Login");
          }}
          style={styles.Back}
        >
          <View>
            <Text style={{ fontFamily: "notoserif", fontWeight: "bold" }}>
              Back
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.logInFB}
          style={{bottom:100,backgroundColor:'#0040ff',borderRadius:5}}
        >
        <Text style={{ fontFamily: "notoserif", fontWeight: "bold" }}>Register with Facebook</Text>
        </TouchableOpacity>
        <Text>All Rights Reserved Kachok© </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000000"
  },

  title: {
    flex: 1,
    position: "absolute",
    top: 70
  },

  background: {
    flexGrow: 3,
    alignSelf: "stretch",
    width: null,
    height: null
  },

  nameInput: {
    flex: 2,
    width: 100,
    left: 70,
    top: 160,
    position: "absolute",
    backgroundColor: "#A9A9A9",
    opacity: 0.7,
    borderRadius: 10
  },

  LnameInput: {
    flex: 2,
    width: 100,
    left: 180,
    top: 160,
    position: "absolute",
    backgroundColor: "#A9A9A9",
    opacity: 0.7,
    borderRadius: 10
  },

  UnameInput: {
    flex: 2,
    width: 100,
    left: 70,
    top: 210,
    position: "absolute",
    backgroundColor: "#A9A9A9",
    opacity: 0.7,
    borderRadius: 10
  },

  emailInput: {
    flex: 2,
    width: 100,
    left: 180,
    top: 210,
    position: "absolute",
    backgroundColor: "#A9A9A9",
    opacity: 0.7,
    borderRadius: 10
  },

  passInput: {
    flex: 2,
    width: 100,
    left: 70,
    top: 260,
    position: "absolute",
    backgroundColor: "#A9A9A9",
    opacity: 0.7,
    borderRadius: 10
  },

  dobInput: {
    flex: 2,
    width: 100,
    left: 180,
    top: 260,
    position: "absolute",
    backgroundColor: "#A9A9A9",
    opacity: 0.7,
    borderRadius: 10
  },

  ageInput: {
    flex: 2,
    width: 100,
    left: 70,
    top: 310,
    position: "absolute",
    backgroundColor: "#A9A9A9",
    opacity: 0.7,
    borderRadius: 10
  },

  adressInput: {
    width: 100,
    left: 180,
    top: 310,
    position: "absolute",
    backgroundColor: "#A9A9A9",
    opacity: 0.7,
    borderRadius: 10
  },

  submit: {
    flex: 2,
    position: "absolute",
    bottom: 200,
    right: 100,
    borderColor: "#000000",
    borderRadius: 8,
    backgroundColor: "lightblue"
  },

  Back: {
    flex: 2,
    position: "absolute",
    bottom: 200,
    right: 240,
    borderColor: "#000000",
    borderRadius: 8,
    backgroundColor: "lightblue"
  }
});

function fetchData(url, paramsObj) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(paramsObj),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then(response => response.json())
    .then(response => response.d);
}
