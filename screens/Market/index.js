import React, {useCallback, useEffect, useRef} from 'react';
import {View, Text, Animated, Image, FlatList} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

import {connect} from 'react-redux';
import {getCoinMarket} from '../../stores/market/marketActions';

import {HeaderBar, TextButton} from '../../components';
import Tabs from './tab';

import {MainLayout} from '../../Layout';
import {COLORS, constants, FONTS, icons, SIZES} from '../../constants';
import styles from './style';

const marketTabs = constants.marketTabs.map(marketTab => ({
  ...marketTab,
  ref: React.createRef(),
}));

const Market = ({getCoinMarket, coins}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const marketTabScrollViewRef = useRef();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onMarketTabPress = useCallback(marketTabIndex => {
    marketTabScrollViewRef?.current?.scrollToOffset({
      offset: marketTabIndex * SIZES.width,
    });
  });
  useEffect(() => {
    getCoinMarket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTabBar = () => {
    return (
      <View style={styles.containerTabBar}>
        <Tabs
          scrollX={scrollX}
          onMarketTabPress={onMarketTabPress}
          marketTabs={marketTabs}
        />
      </View>
    );
  };

  const renderButtons = () => {
    return (
      <View style={styles.containerButtons}>
        <TextButton label="USD" />
        <TextButton label="% (7d)" containerStyle={{marginLeft: SIZES.base}} />
        <TextButton label="Top" containerStyle={{marginLeft: SIZES.base}} />
      </View>
    );
  };

  const renderList = () => {
    const onScroll = Animated.event(
      [{nativeEvent: {contentOffset: {x: scrollX}}}],
      {
        useNativeDriver: false,
      },
    );
    return (
      <Animated.FlatList
        ref={marketTabScrollViewRef}
        data={marketTabs}
        contentContainerStyle={{
          marginTop: SIZES.padding,
        }}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onScroll={onScroll}
        renderItem={({item, index}) => {
          return (
            <View style={styles.containerList}>
              <FlatList
                data={coins}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => {
                  let priceColor =
                    item.price_change_percentage_7d_in_currency === 0
                      ? COLORS.lightGray3
                      : item.price_change_percentage_7d_in_currency > 0
                      ? COLORS.lightGreen
                      : COLORS.red;
                  let data = {
                    datasets: [
                      {
                        data: item.sparkline_in_7d.price,
                      },
                    ],
                  };
                  return (
                    <View style={styles.containerItemList}>
                      {/* Coins */}
                      <View style={styles.wrapCoin}>
                        <Image
                          source={{uri: item.image}}
                          style={{
                            height: 20,
                            width: 20,
                          }}
                        />

                        <Text style={styles.coinNameText}>{item.name}</Text>
                      </View>

                      {/* Line Chart */}
                      <View style={styles.wrapLineChart}>
                        <LineChart
                          withVerticalLabels={false}
                          withHorizontalLabels={false}
                          withDots={false}
                          withInnerLines={false}
                          withVerticalLines={false}
                          withOuterLines={false}
                          data={data}
                          width={100}
                          height={60}
                          chartConfig={{
                            color: () => priceColor,
                          }}
                          bezier
                          style={{
                            paddingRight: 0,
                          }}
                        />
                      </View>

                      {/* figures */}
                      <View style={styles.wrapFigures}>
                        <Text style={styles.currentPrice}>
                          $ {item.current_price}
                        </Text>

                        <View style={styles.wrapPriceChangePercentage7d}>
                          {item.price_change_percentage_7d_in_currency != 0 && (
                            <Image
                              source={icons.upArrow}
                              style={{
                                width: 10,
                                height: 10,
                                tintColor: priceColor,
                                transform:
                                  item.price_change_percentage_7d_in_currency >
                                  0
                                    ? [{rotate: '45deg'}]
                                    : [{rotate: '125deg'}],
                              }}
                            />
                          )}
                          <Text
                            style={{
                              marginLeft: 5,
                              color: priceColor,
                              ...FONTS.body5,
                            }}>
                            {item.price_change_percentage_7d_in_currency.toFixed(
                              2,
                            )}
                            %
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
    );
  };
  return (
    <MainLayout>
      <View style={styles.container}>
        {/* Header */}
        <HeaderBar title="Market" />
        {/* Tab Bar */}
        {renderTabBar()}
        {/* Buttons */}
        {renderButtons()}
        {/* Market List */}
        {renderList()}
      </View>
    </MainLayout>
  );
};

const mapStateToProps = state => {
  return {
    coins: state.marketReducer.coins,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCoinMarket: (
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page,
    ) => {
      return dispatch(
        getCoinMarket(
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page,
        ),
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Market);
