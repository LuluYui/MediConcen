import React, { Component, Fragment, memo } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AddAppointment } from "./AddAppointment";
import { theme } from '../core/theme';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: {},
    };
  }

  componentDidMount() {
    this.getRecord();
  }

  

  getRecord = () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://192.168.1.82:5000/consultation_record")
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          const newItems = {};
          data.forEach((element) => {
            const key = this.timeToString(element.date);
            if (!this.state.items[key]) {
              newItems[key] = [];
              newItems[key].push({
                id: element.id,
                diagnosis: element.diagnosis,
                medication: element.medication,
                consultation_fee: element.consultation_fee,
                date: element.date,
                followup: element.followup,
                remarks: element.remarks,
                doctorname: element.doctorname,
                patientname: element.patientname,
              });
            }
          
          });

          this.setState({
            items: newItems,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  render() {
    const { error, isLoaded, items } = this.state;
    const isFocused = useIsFocused();
    
    {
      isFocused ? this.getRecord() :  ''
    }

    return (
      <Fragment>
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
        />

        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="New Appointment"
            onPress={() => this.props.navigation.navigate("AddAppointment")}
          >
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </Fragment>
    );
  }

  loadItems(day) {
    setTimeout(() => {

      
    }, 1000);

  }

  renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.item, { height: item.height }]}
        onPress={() => Alert.alert('Remember to attend!')}
      >
        <Text style={styles.time}>{ this.timeToStringClock(item.date)} </Text>
        
        <Text style={styles.names}>Doctor: {item.doctorname} Patient: {item.patientname} </Text>
        <Text style={styles.body}>Diagnosis: {item.diagnosis}  Medication: {item.medication}</Text>
        <Text style={styles.body}>Fee: ${item.consultation_fee}</Text>
        <Text style={styles.body}>Followup: {item.followup}   Remarks: {item.remarks}</Text>

      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>Empty Date</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);

    return date.toISOString().split("T")[0];
  }

  timeToStringClock(time) {
    const date = new Date(time);
    const startTime = date.toISOString().split('T')[1];
    var result = startTime.slice(0, 5);
    var temp = startTime.slice(3, 5);
    
    var endTime = parseInt(temp, 10) + 30; 
    var endHour = parseInt(startTime.slice(0, 2));
    
    if (endTime > 59) {
      endTime = endTime - 60;
      endHour++;
    }

    return  result + ' - ' + endHour + ':' + endTime;

  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    opacity: 0.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 17,
    marginRight: 10,
    backgroundColor: "white",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
  names: {
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 40,
    color: 'grey',
  },
  time: {
    fontSize: 25,
    fontStyle: 'italic',
    lineHeight: 30,
    color: 'grey',
  },
  body: {
    lineHeight: 15,
    color: theme.primary,
  }
});
