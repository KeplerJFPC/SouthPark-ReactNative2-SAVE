import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

const DetailsScreen = ({ route }) => {
  const { user, imageUrl } = route.params;

  const [firstEpisode, setFirstEpisode] = useState([]);
  const [lastEpisode, setLastEpisode] = useState([]);

  useEffect(() => {
    if (user.episodes.length > 0) {
      obtenerEpisodios();
    }
  }, []);

  const obtenerEpisodios = async () => {
    try {
      // guardar el nombre del primer episodio en la variable firstEpisode
      const firstEpisodeUrl = user.episodes[0];
      const lastEpisodeUrl = user.episodes[user.episodes.length - 1];

      const [firstEpisodeResponse, lastEpisodeResponse] = await Promise.all([
        axios.get(firstEpisodeUrl),
        axios.get(lastEpisodeUrl)
      ]);

      setFirstEpisode(firstEpisodeResponse.data.data);
      setLastEpisode(lastEpisodeResponse.data.data);

    } catch (error) {
      console.log('Error:', error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={{ uri: imageUrl }} style={styles.img} />
        <Text style={styles.text}>Numero: {user.id}</Text>
        <Text style={styles.text}>Nombre: {user.name}</Text>
        <Text style={styles.text}>Edad: {user.age ?? 'Desconocido'}</Text>
        <Text style={styles.text}>Sexo: {user.sex ?? 'Desconocido'}</Text>
        <Text style={styles.text}>Ocupación: {user.occupation ?? 'Desconocido'}</Text>
        <Text style={styles.text}>Religion: {user.religion ?? 'Desconocida'}</Text>
        <Text style={styles.text}>Numero de Apariciones: {user.episodes.length}</Text>
        {
          user.episodes.length > 0 && (
            <>
              <Text style={styles.text}>Primer Episodio: {firstEpisode.name} [S{firstEpisode.season}: E{firstEpisode.episode}]</Text>
              <Image source={{ uri: firstEpisode.thumbnail_url }} style={styles.thumbnail} />
              <Text style={styles.text}>Ultimo Episodio: {lastEpisode.name} [S{lastEpisode.season}:E{lastEpisode.episode}]</Text>
              <Image source={{ uri: lastEpisode.thumbnail_url }} style={styles.thumbnail} />
            </>
          )
        }
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;

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
    height: 200,
    width: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
  thumbnail:{
    height: 100,
    width: 300,
    resizeMode: 'contain',
  },
});
