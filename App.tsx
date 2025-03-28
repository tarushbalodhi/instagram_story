import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {SafeAreaView, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import Story from './src/components/story/Story';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView>
          <SafeAreaView style={{flex: 1}}>
            <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
            <Story />
          </SafeAreaView>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
