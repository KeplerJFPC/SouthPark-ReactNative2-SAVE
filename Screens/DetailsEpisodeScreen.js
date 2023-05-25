import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';

const DetailsEpisodeScreen = ({ route }) => {
  const { episodio} = route.params;

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const obtenerLocations = async () => {
      try {
        // crear un foreach que lea todos los locations que se encuentran en episodio.locations y los guarde en un array
        for (let i = 0; i < episodio.locations.length; i++) {
          const response = await fetch(episodio.locations[i]);
          const json = await response.json();
          setLocations((locations) => [...locations, json.data]);
        }
        
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    obtenerLocations();
  }, []);


  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={{ uri: episodio.thumbnail_url }} style={styles.img} />
        <Text style={styles.text}>Nombre: {episodio.name}</Text>
        <Text style={styles.text}>Temporada: {episodio.season}</Text>
        <Text style={styles.text}>Episodio: {episodio.episode}</Text>
        <Text style={styles.text}>Fecha de Emisión: {episodio.air_date}</Text>
        <Text style={styles.text}>Descripcion: {episodio.description}</Text>
        <Text style={styles.text}>Lugares:</Text>
        <View>
        {locations.map((location, id) => (
          <Text key={id} style={{ fontSize: 16}}>○ {location.name}</Text>
        ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailsEpisodeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  img: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
});
