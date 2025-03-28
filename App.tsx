import {View, Text, SafeAreaView, FlatList, ScrollView} from 'react-native';
import React from 'react';
import StoryCircle from './src/components/story';
import {dummyData} from './src/utils/storyData';

const App = () => {
  return (
    <SafeAreaView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}>
        <View style={{flexDirection: 'row', overflow: 'hidden'}}>
          {dummyData?.map((user, index) => (
            <StoryCircle key={index} user={user} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
