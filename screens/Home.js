import React, {useCallback} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {connect} from 'react-redux';
import {getHoldings, getCoinMarket} from '../stores/market/marketActions';

import {BalanceInfo, IconTextButton, Chart} from '../components';
import {MainLayout} from './';
import {SIZES, COLORS, FONTS, dummyData, icons} from '../constants';

const Home = ({getHoldings, getCoinMarket, myHoldings, coins}) => {
  useFocusEffect(
    useCallback(() => {
      // eslint-disable-next-line no-undef
      getHoldings((holdings = dummyData.holdings));
      getCoinMarket();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0,
  );
  let percChange = (valueChange / (totalWallet - valueChange)) * 100;

  const renderWalletInfoSection = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomRightRadius: 25,
          borderBottomLeftRadius: 25,
          backgroundColor: COLORS.gray,
        }}>
        <BalanceInfo
          title="Your Wallet"
          displayAmount={totalWallet}
          changePct={percChange}
          containerStyle={{marginTop: 50}}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            marginBottom: -15,
            paddingHorizontal: SIZES.radius,
          }}>
          <IconTextButton
            label="Transfer"
            icon={icons.send}
            containerStyle={{
              flex: 1,
              height: 40,
              marginRight: SIZES.radius,
            }}
            onPress={() => console.log('Transfer')}
          />
          <IconTextButton
            label="Withdraw"
            icon={icons.withdraw}
            containerStyle={{
              flex: 1,
              height: 40,
            }}
            onPress={() => console.log('Transfer')}
          />
        </View>
      </View>
    );
  };

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}>
        {/* Header Wallet Info */}
        {renderWalletInfoSection()}

        {/* Chart */}
        <Chart
          containerStyle={{
            marginTop: SIZES.padding * 2,
          }}
          chartPrices={coins[0]?.sparkline_in_7d?.price}
        />

        {/* Top Cryptocurrencies */}
        <FlatList
          data={coins}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            marginTop: 30,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View style={{marginBottom: SIZES.radius}}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                  fontSize: 18,
                }}>
                Top Cryptocurrencies
              </Text>
            </View>
          }
          renderItem={({item}) => {
            let priceColor =
              item.price_change_percentage_7d_in_currency === 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;
            return (
              <TouchableOpacity
                style={{
                  height: 55,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* Logo  */}
                <View style={{width: 35}}>
                  <Image
                    source={{uri: item.image}}
                    style={{width: 20, height: 20}}
                  />
                </View>
                {/* Name */}
                <View
                  style={{
                    flex: 1,
                  }}>
                  <Text style={{color: COLORS.white, ...FONTS.h3}}>
                    {item.name}
                  </Text>
                </View>

                {/* Figures */}
                <View>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}>
                    $ {item.current_price}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}>
                    {item.price_change_percentage_7d_in_currency != 0 && (
                      <Image
                        source={icons.upArrow}
                        style={{
                          height: 10,
                          width: 10,
                          tintColor: priceColor,
                          transform:
                            item.price_change_percentage_7d_in_currency > 0
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
                        lineHeight: 15,
                      }}>
                      {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={<View style={{marginBottom: 50}} />}
        />
      </View>
    </MainLayout>
  );
};

const mapStateToProps = state => {
  return {
    myHoldings: state.marketReducer.myHoldings,
    coins: state.marketReducer.coins,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getHoldings: (
      holdings,
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page,
    ) => {
      return dispatch(
        getHoldings(
          holdings,
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
