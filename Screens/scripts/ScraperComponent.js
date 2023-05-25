import React, { useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

const ScraperComponent = ({ palabra, onImageUrl }) => {
  console.log('Palabra a buscar:', palabra);

  useEffect(() => {
    const fetchData = async () => {
      const controller = new AbortController();

      const word = palabra.replace(/\s/g, "_");
      const word2 = palabra.replace(/\s/g, "");
      const word3 = palabra.replace(/\s/g, "-");
      const array = palabra.includes(' ') ? palabra.split(" ") : [palabra]; // Verificar si la palabra tiene un espacio
  
      const url = `https://southpark.fandom.com/wiki/${word}`;
      const keyword = word2;
  
      console.log('URL: ' + url);
  
      let encontrado = false;
  
      try {
        const controller = new AbortController();
        const response = await axios.get(url,{ signal: controller.signal });
        const html = response.data;
        controller.abort();
        console.log(controller.signal.aborted ? "aborted (SCRAPER)" : "not aborted");
        const $ = cheerio.load(html);
        const images = $('img');
  
        images.each((index, element) => {
          const src = $(element).attr('src');
  
          switch (true) {
            case src.includes(keyword) && src.includes('.png'):
              if (!encontrado) {
                console.log('URL de la imagen encontrada:', src);
                encontrado = true;
                controller.abort();
                onImageUrl(src); // Llamar a la función para guardar la URL en la pantalla
              }
              break;
  
            case src.includes(word) && src.includes('.png'):
              if (!encontrado) {
                console.log('URL de la imagen encontrada:', src);
                encontrado = true;
                controller.abort();
                onImageUrl(src); // Llamar a la función para guardar la URL en la pantalla
              }
              break;
  
            case src.includes('.png') && src.includes(array[0]):
              if (!encontrado) {
                console.log('URL de la imagen encontrada:', src);
                encontrado = true;
                controller.abort();
                onImageUrl(src); // Llamar a la función para guardar la URL en la pantalla
              }
              break;
  
            case src.includes('.png') && src.includes(array[0].toLowerCase()):
              if (!encontrado) {
                console.log('URL de la imagen encontrada:', src);
                encontrado = true;
                controller.abort();
                onImageUrl(src); // Llamar a la función para guardar la URL en la pantalla
              }
              break;
            
            case src.includes('.png') && array.length > 1 && src.includes(array[1].toLowerCase()):
              if (!encontrado) {
                console.log('URL de la imagen encontrada:', src);
                encontrado = true;
                controller.abort();
                onImageUrl(src); // Llamar a la función para guardar la URL en la pantalla
              }
              break;
            
            case src.includes('.png') && array.length > 1 && src.includes(array[1]):
              if (!encontrado) {
                console.log('URL de la imagen encontrada:', src);
                encontrado = true;
                controller.abort();
                onImageUrl(src); // Llamar a la función para guardar la URL en la pantalla
              }
              break;
  
            case src.includes(word3) && src.includes('.png'):
              if (!encontrado) {
                console.log('URL de la imagen encontrada:', src);
                encontrado = true;
                controller.abort();
                onImageUrl(src); // Llamar a la función para guardar la URL en la pantalla
              }
              break;
            
            case src.includes('.png'):
              if (!encontrado && !src.includes('Site-logo')) {
                console.log('URL de la imagen encontrada no encontrada:', src);
                encontrado = true;
                controller.abort();
                onImageUrl(src); // Llamar a la función para guardar la URL en la pantalla
              }
              break;
          }
        });
      } catch (error) {
        console.log('Ocurrió un error');
        console.log(error);
        controller.abort();
      }
    };
    if (palabra){
      fetchData();
    }else{
      console.log('No hay palabra');
    }
  }, [palabra, onImageUrl]);
  return null; // El componente no renderiza nada, solo realiza la lógica de scraping
};

export default ScraperComponent;
