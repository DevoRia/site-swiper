import React, { useState, useRef } from 'react';
import { StyleSheet, Text, Animated } from 'react-native';
import GestureRecognizer  from 'react-native-swipe-gestures';

type SwiperProps = {
    swipeLeftFn: () => void;
    swipeRightFn: () => void;
};

const Swiper: React.FC<SwiperProps> = ({ swipeLeftFn, swipeRightFn }) => {
    const swipeAnim = useRef(new Animated.Value(0)).current;
    const [swipeDirection, setSwipeDirection] = useState<'left' | 'right'>('right');
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    const handleSwipe = (direction: string) => {
        if (direction === 'SWIPE_LEFT') {
            setSwipeDirection('left');
            animateSwipe();
            swipeLeftFn();
        } else if (direction === 'SWIPE_RIGHT') {
            setSwipeDirection('right');
            animateSwipe();
            swipeRightFn();
        }
    }

    const animateSwipe = () => {
        Animated.timing(swipeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false
        }).start(() => {
            swipeAnim.setValue(0); // reset the animated value
        });
    }

    const swipeAnimInterpolate = swipeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    })

    return (
        <GestureRecognizer
            onSwipe={(direction) => handleSwipe(direction)}
            config={config}
            style={styles.swipeContainer}
        >
            <Animated.View
                style={{
                    ...styles.swipeAnimation,
                    width: swipeAnimInterpolate,
                    left: swipeDirection === 'right' ? 0 : undefined,
                    right: swipeDirection === 'left' ? 0 : undefined,
                }}
            />
            <Text>Swipe left or right to switch site</Text>
        </GestureRecognizer>
    );
}

const styles = StyleSheet.create({
    swipeContainer: {
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(200, 200, 200, 0.8)',
    },
    swipeAnimation: {
        backgroundColor: 'blue',
        height: '100%',
        position: 'absolute',
    },
});

export default Swiper;
