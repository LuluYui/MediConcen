import React, { memo, useState, useEffect, Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Link,
  ScrollView
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
      date: new Date(),
      followup: null,
      remarks: null,
      mode:'date',
      datePickerText:"Pick Time",
    };
  }

addAppoint= async() => {
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
        date: this.state.date.toISOString().slice(0, 19).replace('T', ' '),
        followup: this.state.followup,
        remarks: this.state.remarks,
      }),
    };
  
      const response = await fetch(
        "http://192.168.1.82:5000/addAppointment",
        options
      );
      const res = await response.json();
      if (res.success === true) {
        alert(res.message);
        
      } else {
        alert(res.message);
      }
    

};


onChange = (event, date) => {
  this.setState({ date: date });
};

switchPicker = () => {
    
    if (this.state.mode === 'date'){
        this.setState({ mode: 'time', datePickerText: "Pick Time",});
    } else if (this.state.mode === 'time'){
        this.setState({ mode: 'date', datePickerText:"Pick Date" });
    }
    
};

  render() {
    
    var patientName= null;
    var diagnosis = null;
    var medication = null;
    var consultation_fee = null;
    var date = null;
    var followup = null;
    var remarks = null;
    var show = false;

    return (
      <Background>
        {/*<BackButton goBack={() => navigation.navigate('HomeScreen')} />*/}

        <SafeAreaView style={styles.container}>
            <ScrollView>
          <Header style={styles.header}>Add Appointment</Header>
          <View style={styles.textview}>
            <TextInput
              label="Patient Name"
              returnKeyType="next"
              onChangeText={(text) => {
                this.setState({patientName: text});
              }}
              style={styles.textinput}
            />

            <TextInput
              label="Doctor Name"
              returnKeyType="next"
              onChangeText={(text) => {
                this.setState({doctorName: text});
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
                this.setState({diagnosis: text});
              }}
              style={styles.textinput}
            />

            <TextInput
              label="Medication"
              onChangeText={(text) => {
                this.setState({medication: text});
              }}
              returnKeyType="done"
              style={styles.textinput}
            />

            <TextInput
              label="Fee"
              onChangeText={(text) => {
                this.setState({consultation_fee: text});
              }}
              returnKeyType="done"
              style={styles.textinput}
            />
    <View>
        <Button style={styles.datepicker} onPress={this.switchPicker} 
        title={this.state.datePickerText}>
            {this.state.datePickerText}
            </Button>
      </View>
             <DateTimePicker
              testID="dateTimePicker"
              value={this.state.date}
              mode={this.state.mode}
              display="default"
              onChange={this.onChange}
            />

            <TextInput
              label="Follow Up"
              returnKeyType="done"
              onChangeText={(text) => {
                this.setState({followup: text});
              }}
              style={styles.textinput}
            />
            <TextInput
              label="Remarks"
              onChangeText={(text) => {
                this.setState({remarks: text});
              }}
              returnKeyType="done"
              style={styles.textinput}
            />
          </View>

          <View style={styles.row}>
            <Button
              mode="contained"
              onPress={this.addAppoint}
              style={styles.button}
            >
              Add Appointment
            </Button>
          </View>
          </ScrollView>
        </SafeAreaView>
      </Background>
    );
  }
}

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
  datepicker: {
    margin: 0,
  }
});
