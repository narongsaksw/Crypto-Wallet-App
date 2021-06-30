import React, {useRef, useEffect} from 'react';
import {View, Animated} from 'react-native';

import {connect} from 'react-redux';

import {IconTextButton} from '../components';
import {COLORS, SIZES, icons} from '../constants';

const MainLayout = ({children, isTradeModalVisible}) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (isTradeModalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTradeModalVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 280],
  });
  return (
    <View style={{flex: 1}}>
      {children}
      {/* Dim Background */}
      <Animated.View
        style={{
          // position: 'absolute',
          // top: 0,
          // left: 0,
          // right: 0,
          // bottom: 0,
          backgroundColor: COLORS.transparentBlack,
        }}
        opacity={modalAnimatedValue}
      />

      {/* Modal */}
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          top: modalY,
          width: '100%',
          padding: SIZES.padding,
          backgroundColor: COLORS.primary,
        }}>
        <IconTextButton
          label="Transfer"
          icon={icons.send}
          onPress={() => console.log('tranfer')}
        />
        <IconTextButton
          label="Withdraw"
          icon={icons.withdraw}
          containerStyle={{
            marginTop: SIZES.base,
          }}
          onPress={() => console.log('withdraw')}
        />
      </Animated.View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    isTradeModalVisible: state.tabReducer.isTradeModalVisible,
  };
};

export default connect(mapStateToProps, null)(MainLayout);
