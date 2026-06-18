const images = {
  'Dégagé': require('../../assets/sunny.jpg'),
  'Ensoleillé': require('../../assets/sunny.jpg'),
  'Partiellement nuageux': require('../../assets/light-cloud.png'),
  'Nuageux': require('../../assets/cloudy.jpg'),
  'Overcast': require('../../assets/cloudy.jpg'),
  'Pluies éparses à proximité': require('../../assets/rain.jpg'),
  'Pluie modérée': require('../../assets/rain.jpg'),
  'Heavy rain': require('../../assets/heavy-rain.png'),
  'Thundery outbreaks possible': require('../../assets/thunder.png'),
  
  // Fallback par défaut
  'default': require('../../assets/sunny.jpg'),
};

const getImage = (conditionText) => {

    return images[conditionText] || images['default'];
};

export default getImage;