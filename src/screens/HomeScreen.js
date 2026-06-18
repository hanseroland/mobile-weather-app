import React, { useState, useEffect, useRef } from 'react';
import {
  Text, View, StyleSheet, ImageBackground, ActivityIndicator,
  StatusBar, ScrollView, Animated, TouchableOpacity, RefreshControl,
  useWindowDimensions, SafeAreaView
} from 'react-native';

import SearchInput from '../components/SearchInput';
import getImage from '../utils/getImageForWeather';
import { fetchWeatherByCity } from '../api/weatherApi';
import { getFormattedDay } from '../utils/getDay';
import { Image } from 'react-native';



const HomeScreen = () => {

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("Miami");

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  
  const scrollX = useRef(new Animated.Value(0)).current;
  const selectorRef = useRef(null);

  const loadWeather = async (city) => {
    setLoading(true);
    const data = await fetchWeatherByCity(city);
    console.log(data)
    if (data) {
      setWeatherData(data);
      setLocation(data.location);
    }
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    loadWeather(location);
  }, []);

  

  if (!weatherData && loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView
        horizontal
        pagingEnabled
        ref={selectorRef}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => loadWeather(location)} tintColor="#fff" />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {weatherData?.forecast?.map((item, index) => (
          <View key={index} style={{ width: windowWidth, height: windowHeight }}>
            <ImageBackground
              source={getImage(item.day.condition.text)}
              style={styles.imageBackground}
            >
              <SafeAreaView style={styles.overlay}>
                <View style={styles.topInfoWrapper}>
                  <View>
                    <Text style={styles.city}>{weatherData.location}</Text>
                    <Text style={styles.time}>
                      {getFormattedDay(item.date)} {item.date}
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.temperature}>
                      {Math.round(item.day.avgtemp_c)}°c
                    </Text>
                    <View style={styles.tempRange}>
                      <Text style={styles.smallTemp}>Max {Math.round(item.day.maxtemp_c)}°c</Text>
                      <Text style={styles.smallTemp}>Min {Math.round(item.day.mintemp_c)}°c</Text>
                    </View>
                    <View style={styles.conditionWrapper}>
                     
                      <Text style={styles.weatherType}>{item.day.condition.text}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.bottomInfoWrapper}>
                  <InfoColumn label="Vent" value={Math.round(item.day.maxwind_kph)} unit="km/h" color="#69F0AE" />
                  <InfoColumn label="Humidité" value={item.day.avghumidity} unit="%" color="#F44336" />
                  <InfoColumn label="UV" value={item.day.uv} unit="index" color="#FFD700" />
                </View>
              </SafeAreaView>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>

      <View style={styles.appHeader}>
        <SearchInput
          initialValue="Rechercher une ville"
          initialColor="rgba(255, 255, 255, 0.7)"
          onSubmit={loadWeather}
        />
      </View>

      <View style={styles.indicatorWrapper}>
        {weatherData?.forecast?.map((_, index) => {
          const dotWidth = scrollX.interpolate({
            inputRange: [windowWidth * (index - 1), windowWidth * index, windowWidth * (index + 1)],
            outputRange: [5, 12, 5],
            extrapolate: 'clamp',
          });
          return <Animated.View key={index} style={[styles.normalDot, { width: dotWidth }]} />;
        })}
      </View>
    </View>
  );
};

const InfoColumn = ({ label, value, unit, color }) => (
  <View style={{ alignItems: 'center' }}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
    <Text style={styles.infoLabel}>{unit}</Text>
    <View style={styles.infoBarBackground}>
      <View style={[styles.infoBarInner, { width: Math.min(value, 45), backgroundColor: color }]} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { 
     flex: 1,
     backgroundColor: '#000',
    
    },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  imageBackground: { flex: 1 },
  overlay: {
     flex: 1, 
     backgroundColor: 'rgba(0,0,0,0.3)', 
     padding: 20,
     borderRadius: 20
    },
  appHeader: {
    position: 'absolute',
    top: 50,
    width: '100%',
    alignItems: 'center',
  },
  topInfoWrapper: { flex: 1,margin:5, marginTop: 120, justifyContent: 'space-between' },
  city: { color: '#fff', fontSize: 35, fontWeight: 'bold' },
  time: { color: '#fff', fontSize: 16, opacity: 0.8 },
  temperature: { color: '#fff', fontSize: 90, fontWeight: '200' },
  tempRange: { flexDirection: 'row', marginBottom: 10 },
  smallTemp: { color: '#fff', marginRight: 15, fontSize: 18, fontWeight: '500' },
  conditionWrapper: { flexDirection: 'row', alignItems: 'center' },
  weatherType: { color: '#fff', fontSize: 22, marginLeft: 10 },
  divider: { borderBottomColor: 'rgba(255,255,255,0.3)', borderBottomWidth: 1, marginVertical: 20 },
  bottomInfoWrapper: { flexDirection: 'row',margin:5, justifyContent: 'space-between', marginBottom: 30 },
  infoLabel: { color: '#fff', fontSize: 12, opacity: 0.7, fontWeight: 'bold' },
  infoValue: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginVertical: 4 },
  infoBarBackground: { width: 45, height: 4, backgroundColor: 'rgba(255,255,255,0.2)', marginTop: 5 },
  infoBarInner: { height: 4 },
  indicatorWrapper: { position: 'absolute', top: 160, left: 20, flexDirection: 'row', margin:5 },
  normalDot: { height: 5, borderRadius: 4, marginHorizontal: 4, backgroundColor: '#fff' },
});

export default HomeScreen;