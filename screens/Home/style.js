import {StyleSheet} from 'react-native';
import {SIZES, COLORS, FONTS} from '../../constants';
const styles = StyleSheet.create({
  infoContainer: {
    paddingHorizontal: SIZES.padding,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: COLORS.gray,
  },
  infoIconButtonContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: -15,
    paddingHorizontal: SIZES.radius,
  },
  infoIconButtonTextContainer: {
    flex: 1,
    height: 40,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  headerText: {
    color: COLORS.white,
    ...FONTS.h3,
    fontSize: 18,
  },
  contentContainerStyle: {
    marginTop: 30,
    paddingHorizontal: SIZES.padding,
  },
  itemContainer: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentPriceText: {
    textAlign: 'right',
    color: COLORS.white,
    ...FONTS.h4,
  },
  percentageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  percentageText: {
    marginLeft: 5,
    ...FONTS.body5,
    lineHeight: 15,
  },
});

export default styles;
