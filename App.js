import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'

//navegaciones
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';

//pantallas
import PersonajesScreen from './Screens/PersonajesScreen';
import DetailsScreen from './Screens/DetailsScreen';
import HomeScreen from './Screens/HomeScreen';
import EpisodiosScreen from './Screens/EpisodiosScreen';
import DetailsEpisodeScreen from './Screens/DetailsEpisodeScreen';
import MapaScreen from './Screens/MapaScreen';
import AboutScreen from './Screens/AboutScreen';

const Tab = createBottomTabNavigator();
const PersonajeStack = createStackNavigator();
const EpisodiosStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function EpisodiosStacksScreen() {
  return (
    <EpisodiosStack.Navigator>
      <EpisodiosStack.Screen name="EpisodiosStack" component={EpisodiosScreen}
        options={{headerShown: false}}
      />
      <EpisodiosStack.Screen name="DetailsEpisodeScreen" component={DetailsEpisodeScreen}
        options={({ route }) => ({ headerShown: true, title: `${route.params.episodio.name}`})}
      />
    </EpisodiosStack.Navigator>
  );
}

function PersonajeStacksScreen() {
  return (
    <PersonajeStack.Navigator>
      <PersonajeStack.Screen name="PersonajeStack" component={PersonajesScreen}
        options={{headerShown: false}}
      />
      <PersonajeStack.Screen name="DetailsScreen" component={DetailsScreen}
        options={({ route }) => ({ headerShown: true, title: route.params.user.name })}
      />
    </PersonajeStack.Navigator>
  );
}

function TabsScreen() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color }) => (
            <Ionicons name={"ios-home"} size={20} color={color} />
          )
        }} />
        <Tab.Screen name="Personajes" component={PersonajeStacksScreen} options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name={"ios-people"} size={20} color={color} />
          )
        }} />
        <Tab.Screen name="Episodios" component={EpisodiosStacksScreen} options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name={"list"} size={20} color={color} />
          )
        }} />
      </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Tabs">
        <Drawer.Screen name="SouthPark-API" component={TabsScreen} />
        <Drawer.Screen name="Mapa" component={MapaScreen} />
        <Drawer.Screen name="About" component={AboutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

