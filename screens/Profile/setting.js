import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Switch,
  Text,
  StyleSheet,
} from 'react-native';
import {FONTS, COLORS, SIZES, icons} from '../../constants';

const Setting = ({title, value, type, onPress}) => {
  if (type === 'button') {
    return (
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.wrapValue}>
          <Text style={styles.valueText}>{value}</Text>
          <Image source={icons.rightArrow} style={styles.icons} />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={styles.buttonContainer}>
        <Text style={styles.title}>{title}</Text>
        <Switch value={value} onValueChange={value => onPress(value)} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  title: {flex: 1, color: COLORS.white, ...FONTS.h3},
  wrapValue: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  valueText: {
    marginRight: SIZES.radius,
    color: COLORS.lightGray3,
    ...FONTS.h3,
  },
  icons: {
    height: 15,
    width: 15,
    tintColor: COLORS.white,
  },
});

export default Setting;
