const images = {
  'Clear': require('../../assets/sunny.jpg'),
  'Sunny': require('../../assets/sunny.jpg'),
  'Partly cloudy': require('../../assets/light-cloud.png'),
  'Cloudy': require('../../assets/cloudy.jpg'),
  'Overcast': require('../../assets/cloudy.jpg'),
  'Patchy rain possible': require('../../assets/rain.jpg'),
  'Light rain': require('../../assets/rain.jpg'),
  'Heavy rain': require('../../assets/heavy-rain.png'),
  'Thundery outbreaks possible': require('../../assets/thunder.png'),
  
  // Fallback par défaut
  'default': require('../../assets/sunny.jpg'),
};

const getImage = (conditionText) => {

    return images[conditionText] || images['default'];
};

export default getImage;