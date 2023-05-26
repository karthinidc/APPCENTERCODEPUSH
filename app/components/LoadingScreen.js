/*************************************************
 * InnovaZones
 * @exports
 * @class SplashScreen.js
 * @extends Component
 *  * Created by KARTHI NALLIYAPPAN on JULY 11. 2022
 * Copyright © 2022 InnovaZones. All rights reserved.
 *************************************************/

'use strict';
import React, {Component} from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';

import Constants from '../util/Constants';
import Spinner from 'react-native-spinkit';

const deviceWidth = Dimensions.get('window').width;

class LoadingScreen extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Renders Splash Screen Design
   */
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            source={require('../images/FireDepartment.png')}
            style={styles.image}
          />

          <Image
            resizeMode="contain"
            source={require('../images/Poweredby.png')}
            style={styles.image}
          />

        </View>

        <Spinner
          style={{marginTop: deviceWidth / 15}}
          isVisible={true}
          size={60}
          type={'ChasingDots'}
          color={Constants.COLOR.THEME_COLOR}
        />
      </View>
    );
  }
}

export default LoadingScreen;

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: deviceWidth * (9 / 10),
    height: deviceWidth / 2,
  },
});
