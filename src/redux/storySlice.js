import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

const initialState = {
  stories: [
    {
      id: 1,
      user: 'Tarush',
      profile: 'https://picsum.photos/200/300',
      stories: [
        {id: 1, image: 'https://picsum.photos/200/300'},
        {id: 2, image: 'https://picsum.photos/200/301'},
        {id: 3, image: 'https://picsum.photos/200/302'},
      ],
      isViewed: false,
    },
    {
      id: 2,
      user: 'Vishu',
      profile: 'https://picsum.photos/200/301',
      stories: [
        {id: 4, image: 'https://picsum.photos/200/303'},
        {id: 5, image: 'https://picsum.photos/200/304'},
      ],
      isViewed: false,
    },
    {
      id: 3,
      user: 'Ravi',
      profile: 'https://picsum.photos/200/302',
      stories: [
        {id: 6, image: 'https://picsum.photos/200/305'},
        {id: 7, image: 'https://picsum.photos/200/306'},
      ],
      isViewed: false,
    },
    {
      id: 4,
      user: 'Ayushi',
      profile: 'https://picsum.photos/200/303',
      stories: [
        {id: 8, image: 'https://picsum.photos/200/307'},
        {id: 9, image: 'https://picsum.photos/200/304'},
      ],
      isViewed: false,
    },
  ],
};

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    markStoryAsViewed: (state, action) => {
      state.stories = state.stories.map(story =>
        story.id === action.payload ? {...story, isViewed: true} : story,
      );
    },
    resetStories: state => {
      return initialState; // Reset to initial state
    },
  },
});

export const {markStoryAsViewed, resetStories} = storiesSlice.actions;

// Persist Config
const persistConfig = {
  key: 'stories',
  storage: AsyncStorage,
};

// Export persisted reducer
export default persistReducer(persistConfig, storiesSlice.reducer);
