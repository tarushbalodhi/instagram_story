import {configureStore} from '@reduxjs/toolkit';
import {persistStore} from 'redux-persist';
import {Provider} from 'react-redux';
import storiesReducer from './storySlice';

const store = configureStore({
  reducer: {
    stories: storiesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

const persistor = persistStore(store);

export {store, persistor};
