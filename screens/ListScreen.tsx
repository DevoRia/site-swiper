import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Site } from '../types';

type SitesScreenProps = {
    navigation: any;
    sites: Site[];
};

const SitesScreen: React.FC<SitesScreenProps> = ({ navigation, sites }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>LinkDB</Text>
            <FlatList
                data={sites}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => navigation.navigate('Details', { site: item, sites: sites })}
                    >
                        <Text style={styles.itemTitle}>{item.name}</Text>
                        <Text style={styles.itemUrl}>{item.url.length > 40 ? `${item.url.substring(0, 40)}...` : item.url}</Text>
                    </TouchableOpacity>
                )}
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
    itemContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    itemTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    itemUrl: {
        fontSize: 16,
        color: '#888',
    },
});

export default SitesScreen;
