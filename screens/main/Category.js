import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import {SearchBar} from 'react-native-elements';
import Dropdownp from '../../components/Dropdownp';
import Data from '../../utils/Data/Data';
import Items from '../../utils/Data/Items';
const Category = () => {
  const [newDATA, setnewDATA] = useState();
  const [showcat, setshowcat] = useState(false);
  const [Id, SetId] = useState('');
  const [itemid, setitemid] = useState('');
  let _renderItem1 = ({item}) => {
    //console.log('id:' + JSON.stringify(item));

    //console.log(item.title);
    //console.log(showcat);
    let x;
    {
      item.subsubcategory
        ? //console.log('items : ' + JSON.stringify(item.subsubcategory))
          (x = item.subsubcategory.items.map((item, index) => (
            <View
              key={index}
              style={{
                height: 50,
                width: 50,
                backgroundColor: 'orange',
                marginBottom: 10,
              }}>
              <Text style={{color: 'red'}}>{item.title}</Text>
            </View>
          )))
        : null;
    }
    return (
      <>
        <View
          style={{
            //backgroundColor: 'black',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Roboto-Bold',
                fontSize: 16,
                marginHorizontal: 5,
              }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        </View>
        {/* <Dropdownp /> */}
      </>
    );
    // });
    // return x;
  };
  let _renderItem = ({item}) => {
    //console.log('id:' + JSON.stringify(item));
    var color = 'black';
    var bcolor = '#DCDCDC';
    if (Id == item.id) {
      color = '#87CEFA';
      bcolor = 'white';
    }
    return (
      <View
        style={{
          backgroundColor: bcolor,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            SetId(item.id);
            setshowcat(true);
            setnewDATA(item.subcategory);
          }}>
          <Text
            style={{
              color: color,
              fontFamily: 'Roboto-Bold',
              fontSize: 15,
              marginHorizontal: 10,
              textAlign: 'center',
            }}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      {/* search bar */}
      <View
        style={{
          width: '100%',
          height: 50,
          borderColor: 'black',
          borderWidth: 1,
        }}>
        <Text>Search</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{height: '95%', flex: 1}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Data}
            renderItem={_renderItem}
            keyExtractor={item => item.id}
          />
        </View>
        <View
          style={{
            height: '95%',
            //backgroundColor: 'blue',
            flex: 2,
          }}>
          {showcat ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={newDATA}
              renderItem={_renderItem1}
              keyExtractor={item => item.title}
            />
          ) : (
            <>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../../utils/images/category.png')}
                  style={{
                    alignSelf: 'center',
                    width: 150,
                    height: 150,
                    marginTop: '50%',
                  }}
                />
                <Text style={{fontSize: 18}}> Select category</Text>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  item: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 65,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: 'gray',
  },
  title: {
    fontSize: 15,
    fontFamily: 'Roboto-Bold',
  },
});
