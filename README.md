# React Native Expo 
# Client Registration System App

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

***
MediConcen is an app built for clinic patients to manage their appointments, review their past records and remind them for the next appointment. This app is developed with react native and using mySQL as a backend server for the registration system as well as serving the database for the patient's data, such as appointments and personal details .etc.  

The app is powered by expo to allow for usage in Andriod/IOS. 

# Requirements 


React Native apps may target iOS 10.0 and Android 4.1 (API 16) or newer. You may use Windows, macOS, or Linux as your development operating system, though building and running iOS apps is limited to macOS. Tools like Expo can be used to work around this.

# Compiling the project 

### Setup mySQL Server and Expo
In the end, you should setup the backend mySQL server for this project. If not, go into this website and it has a simple guideline assisting you to create your first mySQL database. 
https://ladvien.com/data-analytics-mysql-localhost-setup/
For more reference, mySQL official website provided a more detailed guideline
https://dev.mysql.com/doc/mysql-getting-started/en/

### Install Expo
Let's setup the backend. Navigate to the cloned ```Mediconcen/``` file. 
```
npm install -g expo-cli
```

## Backend

Stay in the ```Mediconcen/``` and type the following command inside the root file to load the Backend/config.js file.
```
cd Backend/
open ./config.js
```
The backend of the system need to use mySQL database as local host to initiate the server. Please go to the config.js to fill in a few parameters.

Inside the file, you would see the following command. 
```
let config = {
    host: "localhost",
    port: "3306",
    user: "root", # update the user if you are using a different server
    password: "1234", # update the password of your own server
  };
  
  module.exports = config;
```
Save and close the file. Type the following command to end the local IP address of your machine (if you are using localhost). 
```
open ../Frontend/src/IPAddress.js
```
Inside the IPAddress.js, enter your local IP address in the string value. 
``` 
module.exports = {
    ipAddress: '192.168.1.82' //Amend this address accounting to your machine
  };
```
A useful page in lifehacker shows how to find local ipaddress by typing simple terminal commands.
https://lifehacker.com/how-to-find-your-local-and-external-ip-address-5833108#:~:text=Open%20up%20the%20Command%20Prompt,is%20your%20local%20IP%20address.

Install all the dependencies and compile the project. Then, return to the ```Mediconcen``` file. 
```
npm install
node App.js
cd ..
```

## Frontend

After we finished the backend, launch a terminal navigate to the frontend folder of the app. Install all the dependencies and launch expo

```
cd Frontend/
npm install
npm start
```

You could choice either Android/IOS for the simulators to launch expo. 
# **Enjoy!!!**

# Initial Demo 
There is a initial demo of the app using freeSQL as a backend to demostrate the app function. 





  
