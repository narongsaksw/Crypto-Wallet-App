import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {getHoldings} from '../../stores/market/marketActions';

import {MainLayout} from '../../Layout';
import {BalanceInfo, Chart} from '../../components';
import {SIZES, FONTS, COLORS, dummyData, icons} from '../../constants';
import styles from './style';
const Portfolio = ({getHoldings, myHoldings}) => {
  const [selectedCoin, setSelectedCoin] = useState(null);
  useFocusEffect(
    useCallback(() => {
      // eslint-disable-next-line no-undef
      getHoldings((holdings = dummyData.holdings));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0,
  );
  let percChange = (valueChange / (totalWallet - valueChange)) * 100;
  const renderCurrentBalanceSection = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Portfolio</Text>
        <BalanceInfo
          title="Current Balance"
          displayAmount={totalWallet}
          changePct={percChange}
          containerStyle={{
            marginTop: SIZES.radius,
            marginBottom: SIZES.padding,
          }}
        />
      </View>
    );
  };
  return (
    <MainLayout>
      <View style={styles.container}>
        {/* Header - Current balance */}
        {renderCurrentBalanceSection()}

        {/* Chart */}
        {
          <Chart
            containerStyle={{marginTop: SIZES.radius}}
            chartPrices={
              selectedCoin
                ? selectedCoin?.sparkline_in_7d?.value
                : myHoldings[0]?.sparkline_in_7d?.value
            }
          />
        }

        {/* Your Assets */}
        <FlatList
          data={myHoldings}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View>
              {/* Section Title */}
              <Text style={{...FONTS.h2, color: COLORS.white}}>
                Your Assets
              </Text>

              {/* Header Label */}
              <View style={styles.headerLabelContainer}>
                <Text style={{...styles.headerLabelText, textAlign: 'left'}}>
                  Asset
                </Text>
                <Text style={styles.headerLabelText}>Price</Text>
                <Text style={styles.headerLabelText}>Holdings</Text>
              </View>
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
                style={styles.itemContainer}
                onPress={() => setSelectedCoin(item)}>
                {/* Asset */}
                <View style={styles.assetWrapper}>
                  <Image
                    source={{uri: item.image}}
                    style={{width: 20, height: 20}}
                  />
                  <Text style={styles.assetText}>{item.name}</Text>
                </View>

                {/* Price */}
                <View style={styles.itemWrapper}>
                  <Text style={styles.itemText}>
                    $ {item.current_price.toLocaleString()}
                  </Text>

                  <View style={styles.percentageWrapper}>
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
                        ...styles.percentageText,
                        color: priceColor,
                      }}>
                      {item.price_change_percentage_7d_in_currency.toFixed(2)} %
                    </Text>
                  </View>
                </View>

                {/* Holdings */}
                <View style={styles.itemWrapper}>
                  <Text style={styles.itemText}>
                    $ {item.total.toLocaleString()}
                  </Text>

                  <Text style={styles.qtySymbolText}>
                    {item.qty} {item.symbol.toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </MainLayout>
  );
};

const mapStateToProps = state => {
  return {
    myHoldings: state.marketReducer.myHoldings,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
