import React, {useState} from 'react';
import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';

import {MainLayout} from '..';
import {HeaderBar} from '../../components';
import Setting from './setting';
import SectionTitle from './sectionTitle';
import {FONTS, COLORS, SIZES, dummyData, icons} from '../../constants';

const Profile = () => {
  const [faceId, setFaceId] = useState(true);
  return (
    <MainLayout>
      <View style={styles.container}>
        {/* Header */}
        <HeaderBar title="Profile" />
        {/* Detail */}
        <ScrollView>
          {/* Email & User Id */}
          <View style={styles.containerEmail}>
            <View style={{flex: 1}}>
              <Text style={styles.emailText}>{dummyData.profile.email}</Text>
              <Text style={styles.idText}>ID: {dummyData.profile.id}</Text>
            </View>

            {/* Status */}
            <View style={styles.wrapStatus}>
              <Image source={icons.verified} style={styles.verifiedIcon} />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>

          {/* APP */}
          <SectionTitle title="APP" />

          <Setting
            title="Launch Screen"
            value="Home"
            type="button"
            onPress={() => console.log('Pressed')}
          />

          <Setting
            title="Appearance"
            value="Dark"
            type="button"
            onPress={() => console.log('Pressed')}
          />

          {/* ACCOUNT */}
          <SectionTitle title="ACCOUNT" />

          <Setting
            title="Payment Currency"
            value="USD"
            type="button"
            onPress={() => console.log('Pressed')}
          />

          <Setting
            title="Language"
            value="English"
            type="button"
            onPress={() => console.log('Pressed')}
          />

          {/* SECURITY */}
          <SectionTitle title="SECURITY" />

          <Setting
            title="Face ID"
            value={faceId}
            onPress={value => setFaceId(value)}
          />

          <Setting
            title="Password Setting"
            value=""
            type="button"
            onPress={() => console.log('Pressed')}
          />

          <Setting
            title="Change Password"
            value=""
            type="button"
            onPress={() => console.log('Pressed')}
          />

          <Setting
            title="2-Factor Authentication"
            value=""
            type="button"
            onPress={() => console.log('Pressed')}
          />
        </ScrollView>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.black,
  },
  containerEmail: {
    flexDirection: 'row',
    marginTop: SIZES.radius,
  },
  emailText: {
    color: COLORS.white,
    ...FONTS.h3,
  },
  idText: {
    color: COLORS.lightGray3,
    ...FONTS.body4,
  },
  wrapStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedIcon: {
    height: 25,
    width: 25,
  },
  verifiedText: {
    marginLeft: SIZES.base,
    color: COLORS.lightGreen,
    ...FONTS.body4,
  },
});

export default Profile;
