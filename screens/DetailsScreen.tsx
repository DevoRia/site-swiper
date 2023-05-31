import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Site } from '../types';
import Swiper from "../components/SwiperComponent";
import SiteViewerComponent from "../components/SiteViewerComponent";

type DetailsScreenProps = {
    route: {
        params: {
            site: Site
        }
    };
    sites: Site[];
};

function getCurrentSiteIndex(currentSite: Site, sites: Site[]) {
    return sites.findIndex(s => s.id === currentSite.id);
}

function swipeLeft(currentSite: Site, sites: Site[], setCurrentSite) {
    const currentIndex = getCurrentSiteIndex(currentSite, sites);
    if (currentIndex < sites.length - 1) {
        setCurrentSite(sites[currentIndex + 1]);
    }
}

function swipeRight(currentSite: Site, sites: Site[], setCurrentSite) {
    const currentIndex = getCurrentSiteIndex(currentSite, sites);
    if (currentIndex > 0) {
        setCurrentSite(sites[currentIndex - 1]);
    }
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route, sites }) => {
    const { site } = route.params;
    const [currentSite, setCurrentSite] = useState<Site>(site);

    return (
        <View style={styles.container}>
            <SiteViewerComponent currentSite={currentSite} />
            <Swiper
                swipeLeftFn={() => swipeLeft(currentSite, sites, setCurrentSite)}
                swipeRightFn={() => swipeRight(currentSite, sites, setCurrentSite)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default DetailsScreen;
