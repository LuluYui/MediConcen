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
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AddAppointment } from "./AddAppointment";



export default class AgendaScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: {},
      error: null,
      isLoaded: false,
    };
  }

  componentDidMount() {
    //this.setState({ loading: 'component mount' });
    //this.getRecord();
    fetch("https://api.example.com/items")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.items
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
    console.log(this.state.isLoaded);
  }

  getRecord = () => {

   
    console.log(JSON.stringify(this.state.loading));
    

console.log(JSON.stringify(this.state.loading));

  }

render() {

  return (
    const { error, isLoaded, items } = this.state;

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
      
      
      if (!this.state.items[strTime]) {
        this.state.items[strTime] = [];
        const numItems = Math.floor(Math.random() * 3 + 1);

        for (let j = 0; j < numItems; j++) {
          this.state.items[strTime].push({
            name: 'Item for ' + strTime + ' #' + j,
            height: Math.max(50, Math.floor(Math.random() * 150))
          });

        }
      }
    }

    const newItems = {};
    Object.keys(this.state.items).forEach((key) => {
      //const strTime = this.jsonTimeToString(time);

      newItems[key] = this.state.items[key];
      //console.log("this.state.tiems : ");
    });

    this.setState({
      items: newItems,
    });

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


