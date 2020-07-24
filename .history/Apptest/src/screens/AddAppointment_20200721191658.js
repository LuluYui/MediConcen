import React, { memo, useState, useEffect, Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import Background from "../components/Background";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";

export default class AddAppointment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      doctorName: null,
      patientName: null,
      diagnosis: null,
      medication: null,
      consultation_fee: null,
      date: null,
      followup: null,
      remarks: null,
    };
  }

  render() {
    var patientName,
      diagnosis,
      medication,
      consultation_fee,
      date,
      followup,
      remarks;

    return (
      <Background>
        {/*<BackButton goBack={() => navigation.navigate('HomeScreen')} />*/}

        <SafeAreaView style={styles.container}>
          <Header style={styles.header}>Add Appointment</Header>
          <View style={styles.textview}>
            <TextInput
              label="Patient Name"
              returnKeyType="next"
              onChangeText={(text) => {
                patientName = text;
                console.log(patientName);
              }}
              style={styles.textinput}
            />

            <TextInput
              label="Doctor Name"
              returnKeyType="next"
              onChangeText={(text) => {
                doctorName = text;
              }}
              style={styles.textinput}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
            />

            <TextInput
              label="Diagnosis"
              returnKeyType="done"
              onChangeText={(text) => {
                diagnosis = text;
              }}
              style={styles.textinput}
            />

            <TextInput
              label="Medication"
              onChangeText={(text) => {
                Medication = text;
              }}
              returnKeyType="done"
              style={styles.textinput}
            />

            <TextInput
              label="Fee"
              onChangeText={(text) => {
                consultation_fee = text;
              }}
              returnKeyType="done"
              style={styles.textinput}
            />

            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={this.onChange}
            />

            <TextInput
              label="Follow Up"
              returnKeyType="done"
              onChangeText={(text) => {
                followup = text;
              }}
              style={styles.textinput}
            />
            <TextInput
              label="Remarks"
              onChangeText={(text) => {
                remarks = text;
              }}
              returnKeyType="done"
              style={styles.textinput}
            />
          </View>

          <View style={styles.row}>
            <Button
              mode="contained"
              onPress={}
              style={styles.button}
            >
              Add Appointment
            </Button>
          </View>
        </SafeAreaView>
      </Background>
    );

  }

}

onChange = (event, date) => {
  setShow(Platform.OS === "ios");
  setShow(Platform.OS === "android");
  setDate(date);
  setState({ date: date });
  console.log(this.state.date);
};



addAppoint = async () => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: this.state.id,
      doctorName: this.state.doctorName,
      patientName: this.state.patientName,
      diagnosis: this.state.diagnosis,
      medication: this.state.medication,
      consultation_fee: this.state.consultation_fee,
      date: this.state.date,
      followup: this.state.followup,
      remarks: this.state.remarks,
    }),
  };

  try {
    const response = await fetch(
      "http://192.168.1.82:5000/addAppointment",
      options
    );
    const res = await response.json();
    if (res.success === true) {
      alert(res.message);
      navigation.navigate("Dashboard");
    } else {
      alert(res.message);
    }
  } catch {
    console.error();
  }
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
  },
  container: {
    flex: 1,
    flexDirection: "column",

    width: "100%",
  },
  textview: {
    flex: 1,
  },
  textinput: {
    marginTop: -26,
    height: 30,
  },
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    marginTop: 1,
    alignContent: "flex-start",
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
