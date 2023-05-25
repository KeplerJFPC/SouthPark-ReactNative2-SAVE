import React, { useState, useEffect } from 'react';
import { StyleSheet, Text,TouchableOpacity, View, FlatList, Image } from 'react-native'
import axios from 'axios';

export default function EpisodiosScreen({ navigation }) {
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        obtenerEpisodios();
    }, []);

    const obtenerEpisodios = async () => {
        try {
            for await (const page of [1, 2, 3, 4]) {
                const respuesta = await axios.get(`https://spapi.dev/api/episodes?page=${page}`);
                setEpisodes((episodes) => [...episodes, ...respuesta.data.data]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const renderEpisode = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('DetailsEpisodeScreen', { episodio: item })}
                style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems:'center',  }}>
                    <Image source={{ uri: item.thumbnail_url }} style={{ width: 100, height: 100, resizeMode: 'contain', marginRight:10 }} />
                    <Text style={{ fontSize:14 }}>{`S${item.season}:E${item.episode} : ${item.name}`}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={episodes}
                renderItem={renderEpisode}
                keyExtractor={(item,id) => id}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 40,
    },
    lista: {
        display: 'flex',
    }
});
