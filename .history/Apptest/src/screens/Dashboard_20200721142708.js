import React, { Component, Fragment, memo} from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AddAppointment } from "./AddAppointment";



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

    alert('mounting');
    fetch("https://localhost:5000/test")
    .then( response => {
      alert(response);
    }
      
    );
    
    
   this.getRecord();
  }

  getRecord = () => {

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    
  }

render() {
  const { error, isLoaded, items } = this.state;

    
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
          title="New Task"
          onPress={() => this.props.navigation.navigate("AddAppointment")}
        >
          <Icon name="md-create" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Notifications"
          onPress={() => { }}
        >
          <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#1abc9c"
          title="All Tasks"
          onPress={() => { }}
        >
          <Icon name="md-done-all" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>

    </Fragment>
  );
}


loadItems(day) {


  setTimeout(() => {

    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);
      
      
     
    }

    

  }, 1000);

}

renderItem(item) {
  return (
    <TouchableOpacity

      style={[styles.item, { height: item.height }]}
      onPress={() => Alert.alert(item.name)}
    >
      <Text>{item.name}</Text>
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

jsonTimeToString(time) {
  const date = new Date(time);

  return date.toISOString().split(" ")[0];
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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 17,
    marginRight: 10,
    backgroundColor: "white"
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});


