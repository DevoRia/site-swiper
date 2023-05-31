import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Site } from '../types';
import ListItem from "../components/ListItemComponent";

type SitesScreenProps = {
    navigation: any;
    sites: Site[];
};

const SitesScreen: React.FC<SitesScreenProps> = ({ navigation, sites }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>LinkB</Text>
            <FlatList
                data={sites}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ListItem item={item} navigation={navigation} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 20,
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
});

export default SitesScreen;
