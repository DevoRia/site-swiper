import React, { useState, useRef } from 'react';
import { ActivityIndicator, View, StyleSheet, Text, Animated } from 'react-native';
import { WebView } from 'react-native-webview';
import { Site } from '../types';
import GestureRecognizer  from 'react-native-swipe-gestures';

type DetailsScreenProps = {
    route: any;
    navigation: any;
    sites: Site[];
};

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route, navigation, sites }) => {
    const { site } = route.params;
    const [currentSite, setCurrentSite] = useState<Site>(site);
    const [loading, setLoading] = useState<boolean>(true);

    const swipeAnim = useRef(new Animated.Value(0)).current;
    const [swipeDirection, setSwipeDirection] = useState<'left' | 'right'>('right');
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    const handleSwipe = (direction: string) => {
        const currentIndex = sites.findIndex(s => s.id === currentSite.id);
        if (direction === 'SWIPE_LEFT' && currentIndex < sites.length - 1) {
            setSwipeDirection('left');
            animateSwipe();
            setCurrentSite(sites[currentIndex + 1]);
        } else if (direction === 'SWIPE_RIGHT' && currentIndex > 0) {
            setSwipeDirection('right');
            animateSwipe();
            setCurrentSite(sites[currentIndex - 1]);
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
        <View style={styles.container}>
            <WebView
                originWhitelist={['*']}
                mediaPlaybackRequiresUserAction={true}
                style={styles.webView}
                source={{ uri: currentSite.url }}
                onLoadEnd={() => setLoading(false)}
            />
            {loading && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
            <GestureRecognizer
                onSwipe={(direction, state) => handleSwipe(direction)}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webView: {
        height: '90%',
    },
    loaderContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
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

export default DetailsScreen;
