import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import DropDownPicke from 'react-native-dropdown-picker';
import COLORS from '../utils/colors/Colors';
import RNPickerSelect from 'react-native-picker-select';
const DropDownPicker = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Akkar عكار', value: 'Akkar'},
    {label: 'Al-Batroun', value: 'Al-Batroun'},
    {label: 'Al-Chouf', value: 'Al-Chouf'},
    {label: 'Al-Daniya الضنية', value: 'Al-Daniya'},
    {label: 'Al-Hermil', value: 'Al-Hermil'},
    {label: 'Al-Koura', value: 'Al-Koura'},
    {label: 'Al-Matn', value: 'Al-Matn'},
    {label: 'Al-Menyas', value: 'Al-Menyas'},
    {label: 'Baabda', value: 'Baabda'},
    {label: 'Baalbak', value: 'Baalbak'},
    {label: 'Bchari', value: 'Bchari'},
    {label: 'Beirut', value: 'Beirut'},
    {label: 'Bent Jbeil', value: 'Bent Jbeil'},
    {label: 'Hasbaya', value: 'Hasbaya'},
    {label: 'Beil', value: 'Beil'},
    {label: 'Jezin', value: 'Jezin'},
    {label: 'Kesrwan', value: 'Kesrwan'},
    {label: 'Marjeyoun', value: 'Marjeyoun'},
    {label: 'Rachaya', value: 'Rachaya'},
    {label: 'Sayda', value: 'Sayda'},
    {label: 'Tripoli', value: 'Tripoli'},
  ]);
  return (
    <View style={{borderBottomColor: 'gray', borderBottomWidth: 0.3}}>
      <RNPickerSelect
        placeholder={{label: 'Select your Address', value: null}}
        onValueChange={value => setValue(value)}
        // items={[
        //     { label: '2020', value: 2020 },
        //     { label: '2021', value: 2021},
        // ]}
        //   useNativeAndroidPickerStyle={false}
        style={{inputAndroid: {color: 'black'}}}
        items={items}
        value={value}
        // placeholder={placeholder}
      />
    </View>

    // <DropDownPicke
    //   style={{
    //     height: 50,
    //     borderRadius: 1,
    //     position: 'relative',
    //     borderColor: COLORS.light,
    //     borderWidth: 0,
    //     borderBottomWidth: 1,
    //   }}
    //   dropDownContainerStyle={{}}
    //   placeholder="select city"
    //   open={open}
    //   value={value}
    //   items={items}
    //   setOpen={setOpen}
    //   setValue={setValue}
    //   setItems={setItems}
    // />
  );
};

export default DropDownPicker;

const styles = StyleSheet.create({});
