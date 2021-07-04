import {StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  containerTabBar: {
    marginTop: SIZES.radius,
    marginHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.gray,
  },
  containerButtons: {
    flexDirection: 'row',
    marginTop: SIZES.radius,
    marginHorizontal: SIZES.radius,
  },
  containerList: {
    flex: 1,
    width: SIZES.width,
  },
  containerItemList: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.radius,
  },
  wrapCoin: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinNameText: {
    marginLeft: SIZES.radius,
    color: COLORS.white,
    ...FONTS.h3,
  },
  wrapLineChart: {
    flex: 1,
    alignItems: 'center',
  },
  wrapFigures: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  currentPrice: {
    color: COLORS.white,
    ...FONTS.h4,
  },
  wrapPriceChangePercentage7d: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
