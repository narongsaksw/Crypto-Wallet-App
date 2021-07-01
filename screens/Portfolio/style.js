import {StyleSheet} from 'react-native';
import {SIZES, COLORS, FONTS} from '../../constants';
const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: SIZES.padding,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: COLORS.gray,
  },
  headerTitle: {
    marginTop: 50,
    color: COLORS.white,
    ...FONTS.largeTitle,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  headerLabelText: {
    flex: 1,
    color: COLORS.lightGray3,
    textAlign: 'right',
  },
  headerLabelContainer: {
    flexDirection: 'row',
    marginTop: SIZES.radius,
  },
  itemContainer: {
    flexDirection: 'row',
    height: 55,
  },
  itemWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  assetWrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
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
  assetText: {
    color: COLORS.white,
    ...FONTS.h4,
    marginLeft: SIZES.radius,
  },
  itemText: {
    textAlign: 'right',
    color: COLORS.white,
    ...FONTS.h4,
    lineHeight: 15,
  },
  qtySimbolText: {
    textAlign: 'right',
    color: COLORS.lightGray3,
    ...FONTS.body5,
    lineHeight: 15,
  },
});

export default styles;
