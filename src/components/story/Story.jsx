import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  PanResponder,
} from 'react-native';
import React, {useCallback, useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {markStoryAsViewed, resetStories} from '../../redux/storySlice';

export default function Story() {
  const dispatch = useDispatch();
  const stories = useSelector(state => state.stories.stories);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (modalVisible) {
      startProgressAnimation();
    }
  }, [currentStoryIndex, currentUserIndex, modalVisible]);

  const handleStoryPress = useCallback(storyIndex => {
    setCurrentUserIndex(storyIndex);
    setCurrentStoryIndex(0);
    setModalVisible(true);
  }, []);

  const startProgressAnimation = () => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: 10000, // 10 seconds
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        nextStory();
      }
    });
  };

  const nextStory = () => {
    const currentUser = stories[currentUserIndex];
    if (currentStoryIndex < currentUser.stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
    } else {
      nextUserStory();
      dispatch(markStoryAsViewed(stories[currentUserIndex].id));
    }
  };

  const nextUserStory = () => {
    if (currentUserIndex < stories.length - 1) {
      setCurrentUserIndex(prev => prev + 1);
      setCurrentStoryIndex(0);
    } else {
      closeModal();
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    dispatch(markStoryAsViewed(stories[currentUserIndex].id));
    setCurrentUserIndex(0);
    setCurrentStoryIndex(0);
  };

  const handleTap = event => {
    const {locationX, pageX} = event.nativeEvent;
    const screenWidth = event.nativeEvent.pageX;

    if (locationX > screenWidth / 2) {
      nextStory(); // Right tap → Next Story
    } else {
      prevStory(); // Left tap → Previous Story
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 50) {
          prevStory(); // Swipe right → Previous story
        } else if (gesture.dx < -50) {
          nextStory(); // Swipe left → Next story
        } else if (gesture.dy > 50) {
          closeModal(); // Swipe down → Close modal
        }
      },
    }),
  ).current;

  return (
    <View style={{flex: 1}}>
      <View>
        <FlatList
          data={stories}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.storyRing}
              onPress={() => handleStoryPress(index)}>
              <Image
                source={{uri: item.profile}}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 50,
                  borderWidth: 3,
                  borderColor: item.isViewed ? 'grey' : 'red',
                }}
              />
              <Text style={styles.ringText}>{item.user}</Text>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          padding: 10,
          backgroundColor: 'red',
          borderRadius: 10,
          margin: 10,
          position: 'absolute',
          bottom: 10,
        }}
        onPress={() => dispatch(resetStories())}>
        <Text
          style={{
            fontSize: 20,
            color: 'white',
            fontWeight: 'bold',
            marginHorizontal: 20,
          }}>
          Reset
        </Text>
      </TouchableOpacity>

      {/* Story Viewer Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={handleTap}>
          <View style={styles.modalContainer} {...panResponder.panHandlers}>
            {stories[currentUserIndex] && (
              <>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeModal}>
                  <Text style={styles.closeText}>close</Text>
                </TouchableOpacity>

                {/* Progress Bars */}
                <View style={styles.progressBarContainer}>
                  {stories[currentUserIndex].stories.map((_, index) => (
                    <View key={index} style={styles.progressBackground}>
                      <Animated.View
                        style={[
                          styles.progressFill,
                          {
                            width:
                              index < currentStoryIndex
                                ? '100%'
                                : index === currentStoryIndex
                                ? progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0%', '100%'],
                                  })
                                : '0%',
                          },
                        ]}
                      />
                    </View>
                  ))}
                </View>

                <Image
                  source={{
                    uri: stories[currentUserIndex].stories[currentStoryIndex]
                      .image,
                  }}
                  style={styles.storyImage}
                />
              </>
            )}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  closeText: {
    fontSize: 20,
    color: 'white',
  },
  progressBarContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 50,
    width: '90%',
    justifyContent: 'space-between',
  },
  progressBackground: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
  },
  storyImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  storyRing: {
    marginVertical: 10,
    marginHorizontal: 4,
    padding: 5,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  ringText: {
    fontSize: 12,
  },
});
