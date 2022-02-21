import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Platform,
  UIManager,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Accordion from 'react-native-collapsible/Accordion';
import {set} from 'react-native-reanimated';
// import {Colors} from './Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Dropdownp = () => {
  let [activeSections, setActiveSections] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [dataArray, setData] = useState([]);
  const [content, setContent] = useState([]);
  useEffect(() => {
    changeArray();

    return () => {};
  }, []);

  //   changeArray();
  //   let _renderHeader = section => {
  //     return (
  //       <View
  //         style={
  //           (styles.container, {borderWidth: 1, width: '100%', height: 100})
  //         }>
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //             padding: 10,
  //             borderTopWidth: 0.4,
  //           }}>
  //           {/* <Image
  //             style={{width: 35, height: 35, marginLeft: 5, marginTop: 5}}
  //             source={require('../utils/images/profile.png')}
  //           /> */}
  //           <View style={{flexDirection: 'column'}}>
  //             <Text
  //               style={{
  //                 color: 'black',
  //                 fontFamily: 'Roboto-Bold',
  //                 fontSize: 16,
  //                 marginHorizontal: 5,
  //               }}>
  //               {section.title}
  //             </Text>
  //           </View>
  //           <View style={{marginLeft: 'auto', marginRight: 10}}>
  //             <View style={{flexDirection: 'row'}}>
  //               <AntDesign name="down" size={23} />
  //             </View>
  //           </View>
  //         </View>
  //       </View>
  //     );
  //   };

  let onClick = index => {
    const temp = dataArray.slice();
    temp[index].value = !temp[index].value;
    setData(temp);
    toggleExpand();
  };

  let toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    // if (dataArray[index] === index) {
    setExpanded(!expanded);
    // }

    // console.log(expanded);
  };

  let changeArray = () => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    const SECTIONS = [
      {
        title: 'First',
        content: [{section: 'bla'}, {section: 'blabla'}, {section: 'balba'}],
        value: false,
      },
      {
        title: 'Second',
        content: [{section: 'bla'}],
        value: false,
      },
    ];
    setData(SECTIONS);
    for (let index = 0; index < SECTIONS.length; index++) {
      const element = SECTIONS[index];
      setContent(element.content);
    }
    //console.log(SECTIONS.content);
  };

  let _renderContent = ({item, index}) => {
    return (
      <View style={styles.content}>
        <Text>{item.section}</Text>
      </View>
    );
  };
  let _updateSections = activeSections => {
    setActiveSections(activeSections);
  };

  let _renderItem = ({item, index}) => {
    //console.log(item.title);
    return (
      <View style={{flex: 1, padding: 10}}>
        <TouchableOpacity onPress={() => onClick(index)}>
          <View style={{flexDirection: 'row'}}>
            <Text>{item.title}</Text>
            <Icon
              name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={30}
            />
          </View>
        </TouchableOpacity>

        {expanded ? (
          <View>
            <FlatList
              data={item.content}
              renderItem={_renderContent}
              keyExtractor={(item, index) => index.toString()}></FlatList>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <View style={{justifyContent: 'center'}}>
      <FlatList
        data={dataArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={_renderItem}></FlatList>

      {/* <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
      /> */}
    </View>
  );
};

export default Dropdownp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    marginLeft: 25,
    marginTop: 3,
    color: 'grey',
  },
  progressbtn: {
    marginBottom: 20,
  },
  droplist: {
    color: 'black',
    fontSize: 12,
    marginLeft: 30,
  },
  viewlist: {
    flexDirection: 'row',
    marginBottom: 15,
    width: '50%',
  },
  description: {
    color: 'grey',
    fontSize: 10,
    marginTop: 2,
    width: 150,
  },
  droplist2: {
    color: 'black',
    fontSize: 12,
    marginLeft: 15,
  },
});
