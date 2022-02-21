import React, {useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
const Map = () => {
  const [location, setLocation] = useState({
    latitude: 34.2963,
    longitude: 35.8075,
  });
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        //  showsMyLocationButton={true}
        onRegionChange={region => {
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}
        onPress={coordinate => {
          setLocation({
            latitude: coordinate.nativeEvent.coordinate.latitude,
            longitude: coordinate.nativeEvent.coordinate.longitude,
          });
          console.log(coordinate.nativeEvent.coordinate);
        }}
        onRegionChangeComplete={region => {
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}>
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="this is my place"
          description="this is a marker example"
        />
      </MapView>
      <Button
        title="get my current location"
        onPress={() => {
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position.coords;
              setLocation({
                latitude: latitude,
                longitude: longitude,
              });
              console.log('location  : ', latitude, longitude);
            },
            error => {
              console.log(error.code, error.message);
            },
            //  {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '90%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
