import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acerca de</Text>
      <Text style={styles.content}>
        Esta app fue desarrollada por Cesar Abdiel Cortez Escalante y 
        Jonathan Fernando Puertos Colin como proyecto para la materia de 
        Aplicaciones Móviles.
      </Text>
      <Text style={styles.content}>
        La app consume la API de South Park (https://spapi.dev/) y utiliza 
        información del foro South Park Archives 
        (https://southpark.fandom.com/wiki/South_Park_Archives)
      </Text>
      <Text style={styles.content}>
        Agradecimiento especial para Eduardo Campili por ayudarnos a resolver 
        un error en la app.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    textAlign: 'center',
    marginVertical: 10
  }
});

export default AboutScreen;