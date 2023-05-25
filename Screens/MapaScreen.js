import { StatusBar } from 'react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native';
import mapa from './img/mapa.png';

export default function App() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const minZoom = 2;
  const maxZoom = 10;
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const imageWidth = windowWidth * zoomLevel;
  const imageHeight = windowHeight * zoomLevel;

  const handleZoomIn = () => {
    if (zoomLevel < maxZoom) {
      setZoomLevel(zoomLevel + 0.7);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > minZoom) {
      setZoomLevel(zoomLevel - 0.7);
    }
  };

  const imageStyle = {
    width: imageWidth,
    height: imageHeight,
    transform: [{ translateX: x }, { translateY: y }],
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        maximumZoomScale={maxZoom}
        minimumZoomScale={minZoom}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <View style={styles.imageContainer}>
          <Image
            source={mapa}
            style={imageStyle}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleZoomIn}>
          <Text style={styles.button}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleZoomOut}>
          <Text style={styles.button}>-</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'relative',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#ddd',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    fontSize: 20,
    height: 40,
    width: 40,
    textAlign: 'center',
  },
});