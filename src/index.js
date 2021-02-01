/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Text, NativeEventEmitter} from 'react-native';

import AccessibilityService from './react-native-accessibility-service';

function App() {
  let eventEmitterListener = React.useRef(null);
  let [message, setMessage] = React.useState('');
  const [
    isConnectedToNativeModule,
    setIsConnectedToNativeModule,
  ] = React.useState(false);

  React.useEffect(() => {
    console.log('Accessibility service');
    console.log(AccessibilityService);

    AccessibilityService.sampleMethod('Testing', 123, (messageFromModule) => {
      console.log('messageFromModule', messageFromModule);
      if (messageFromModule) {
        setIsConnectedToNativeModule(true);
      }
    });

    const eventEmitter = new NativeEventEmitter(AccessibilityService);
    eventEmitterListener.current = eventEmitter.addListener(
      'EventReminder',
      (event) => {
        console.log(event);

        setMessage(event);
      },
    );

    return () => {
      eventEmitterListener.current.remove();
    };
  }, []);

  if (isConnectedToNativeModule === true) {
    return (
      <React.Fragment>
        <Text style={{color: 'green'}}>Connected to nativeModule</Text>
        <View
          style={{...styles.centerScreen, paddingLeft: 20, paddingRight: 20}}>
          <Text>{message}</Text>
        </View>
      </React.Fragment>
    );
  }

  return (
    <Text style={{color: 'red'}}>
      Turn on Accessibility option on your device settings to grant permission
      to this app as an accessibility service.
    </Text>
  );
}

export default App;

const styles = {
  centerScreen: {flex: 1, justifyContent: 'center', alignItems: 'center'},
};
