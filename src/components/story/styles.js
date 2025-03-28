import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  profileImg: {
    height: 60,
    width: 60,
    borderRadius: 30, // Circular profile image
    resizeMode: 'cover',
  },
  storyCircleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    gap: 6,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  userName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  borderRing: {
    height: 80, // Slightly larger than the profile image to create the border effect
    width: 80,
    borderRadius: 40, // Circular ring
    borderWidth: 3, // Thickness of the border
    borderColor: '#FF6347', // Border color (you can change this to any color)
    justifyContent: 'center',
    alignItems: 'center',
  },
});
