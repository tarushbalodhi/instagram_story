import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {Images} from '../../assets';

type StoryCircleProps = {
  user: {
    username: string;
    profileImage: any;
  };
};

const handleStoryOpen = () => {};

const StoryCircle = ({user}: StoryCircleProps) => {
  return (
    <Pressable style={styles.storyCircleContainer} onPress={handleStoryOpen}>
      <View style={styles.borderRing}>
        <Image source={Images.profileImage} style={styles.profileImg} />
      </View>
      <Text style={styles.userName}>{user.username}</Text>
    </Pressable>
  );
};

export default StoryCircle;
