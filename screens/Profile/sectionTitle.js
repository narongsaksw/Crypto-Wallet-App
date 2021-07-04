import React from 'react';
import {View, Text} from 'react-native';
import {FONTS, COLORS, SIZES} from '../../constants';

const SectionTitle = ({title}) => {
  return (
    <View
      style={{
        marginTop: SIZES.padding,
      }}>
      <Text style={{color: COLORS.lightGray3, ...FONTS.h4}}>{title}</Text>
    </View>
  );
};

export default SectionTitle;
