import React, { useEffect, useState, useCallback } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import axios from "axios";
import ScraperComponent from "./scripts/ScraperComponent";

const Personaje = ({ navigation }) => {
    const [data, setData] = useState({});
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [numero, setNumero] = useState(1);

    const obtenerDatos = useCallback(async () => {
        try {
            const response = await axios.get(`https://spapi.dev/api/characters/${numero}`);
            setData(response.data.data);
            setLoading(false);
        } catch (error) {
            console.log("Error fetching data:", error);
            setLoading(false);
        }
    }, [numero]);

    useEffect(() => {
        obtenerDatos();
    }, [obtenerDatos]);

    const handlePressDetails = () => {
        navigation.navigate("DetailsScreen", { user: data, imageUrl: imageUrl });
    };

    const handlePreviousCharacter = () => {
        if (numero > 1) {
            setImageUrl("");
            setNumero(numero - 1);
        }
    };

    const handleNextCharacter = () => {
        setImageUrl("");
        setNumero(numero + 1);
    };

    return (        
        <View style={styles.container}>
            <ScraperComponent palabra={data.name} onImageUrl={setImageUrl} />
            {loading ? (
                <ActivityIndicator size="large" color="#FFFFFF" />
            ) : (
                <>
                    <View style={styles.contImage}>
                        {imageUrl ? (
                            <Image source={{ uri: imageUrl }} style={styles.img} />
                        ) : (
                            <ActivityIndicator size="large" color="#FFFFFF" />
                        )}
                    </View>
                    <Text style={styles.title}>{data.name}</Text>
                    <TouchableOpacity style={styles.btn} onPress={handlePressDetails}>
                        <Text style={styles.text}>Detalles</Text>
                    </TouchableOpacity>
                    <View style={styles.arrowButtons}>
                        <TouchableOpacity style={styles.arrowButton} onPress={handlePreviousCharacter}>
                            <Text style={styles.arrowButtonText}>{"<"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.arrowButton} onPress={handleNextCharacter}>
                            <Text style={styles.arrowButtonText}>{">"}</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
};

export default Personaje;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    contImage: {
        flex: 0.4,
        alignItems: "center",
        justifyContent: "center",
    },
    img: {
        height: 200,
        width: 200,
        resizeMode: "contain",
        marginBottom: 20,
    },
    title: {
        color: "black",
        fontSize: 30,
        marginBottom: 20,
    },
    placeholderText: {
        color: "#FFF",
        fontSize: 18,
        marginBottom: 20,
    },
    btn: {
        backgroundColor: "#E2443B",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
    },
    text: {
        fontSize: 20,
        color: "#FFF",
    },
    arrowButtons: {
        flexDirection: "row",
        marginTop: 20,
    },
    arrowButton: {
        backgroundColor: "#E2443B",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 30,
        marginHorizontal: 10,
    },
    arrowButtonText: {
        fontSize: 20,
        color: "#FFF",
    },
});
