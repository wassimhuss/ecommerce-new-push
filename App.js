import 'react-native-gesture-handler';
import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import SplashScreen from './screens/splashScreen';
import {DarkModeProvider} from 'react-native-dark-mode';
import EProductDetail from './screens/mazi/EProductDetail';
import EProduct from './screens/mazi/EProduct';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {persistor, store} from './store';
import {PersistGate} from 'redux-persist/integration/react';
import Entypo from 'react-native-vector-icons/Entypo';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import EAddress from './screens/mazi/EAddress';
import SignIn from './screens/authScreens/SignIn';
import SignUp from './screens/authScreens/SignUp';
import Home from './screens/mazi/Ehome';
import ProfileEdit from './screens/mazi/ProfileEdit';
import Category from './screens/main/Category';
import EBank from './screens/mazi/EBank';
import EBankDetail from './screens/mazi/EBankDetail';
//import Profile from './screens/main/Profile';
import Cart from './screens/main/Cart';
import CheckPhone from './screens/authScreens/CheckPhone';
import Map from './components/Map';
import ESearchHistory from './screens/mazi/ESearchHistory';
import ENotification from './screens/mazi/ENotification';
import EMessages from './screens/mazi/EMessages';
import AboutUs from './screens/mazi/AboutUs';
import EProductStoreProfile from './screens/mazi/EProductStoreProfile';
import ECategory from './screens/mazi/ECategory';
import {Provider} from 'react-redux';
import EFilter from './screens/mazi/EFilter';
import ECart from './screens/mazi/ECart';
import EShipping from './screens/mazi/EShipping';
import EPayment from './screens/mazi/EPayment';
import EConfirmed from './screens/mazi/EConfirmed';
import EMyOrder from './screens/mazi/EMyOrder';
import Mcategory from './screens/mazi/Mcategory';
import Profile from './screens/mazi/Profile';
import Setting from './screens/mazi/Setting';
import SelectDarkOption from './screens/mazi/SelectDarkOption';
import ChangeLanguage from './screens/mazi/ChangeLanguage';
import ContactUs from './screens/mazi/ContactUs';
import PreviewImage from './screens/mazi/PreviewImage';
import ChangePassword from './screens/mazi/ChangePassword';
const App = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  fontSize: 10,
                  marginBottom: 3,
                  color: focused ? 'blue' : 'black',
                }}>
                Home
              </Text>
            ),
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="home-outline"
                color={color}
                size={29}
              />
            ),
          }}
        />
       
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  fontSize: 10,
                  marginBottom: 3,
                  color: focused ? 'blue' : 'black',
                }}>
                Cart
              </Text>
            ),
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="cart" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: ({focused}) => (
              <Text
                style={{
                  fontSize: 10,
                  marginBottom: 3,
                  color: focused ? 'blue' : 'black',
                }}>
                Profile
              </Text>
            ),
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DarkModeProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="splash"
                component={SplashScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="CheckPhone"
                component={CheckPhone}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="MyTabs"
                component={MyTabs}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EProductDetail"
                component={EProductDetail}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EProduct"
                component={EProduct}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ESearchHistory"
                component={ESearchHistory}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ENotification"
                component={ENotification}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EMessages"
                component={EMessages}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ECategory"
                component={ECategory}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EFilter"
                component={EFilter}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AboutUs"
                component={AboutUs}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ContactUs"
                component={ContactUs}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="ECart"
                component={ECart}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EShipping"
                component={EShipping}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ChangeLanguage"
                component={ChangeLanguage}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="EProductStoreProfile"
                component={EProductStoreProfile}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EPayment"
                component={EPayment}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EConfirmed"
                component={EConfirmed}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EMyOrder"
                component={EMyOrder}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Setting"
                component={Setting}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="SelectDarkOption"
                component={SelectDarkOption}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ProfileEdit"
                component={ProfileEdit}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EAddress"
                component={EAddress}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Map"
                component={Map}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EBankDetail"
                component={EBankDetail}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="EBank"
                component={EBank}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PreviewImage"
                component={PreviewImage}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </DarkModeProvider>
      </PersistGate>
    </Provider>
    // <SplashScreen/>
  );
};

const styles = StyleSheet.create({});

export default App;
