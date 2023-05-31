import React, { useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { Site } from '../types';

type SiteViewerProps = {
    currentSite: Site
};

const SiteViewer: React.FC<SiteViewerProps> = ({ currentSite }) => {
    const [loading, setLoading] = useState<boolean>(true);

    return (
        <>
            <WebView
                originWhitelist={['*']}
                mediaPlaybackRequiresUserAction={true}
                style={styles.webView}
                source={{ uri: currentSite.url }}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
            />
            {loading && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
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
});

export default SiteViewer;
