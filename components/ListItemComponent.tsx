import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Site } from '../types';

type ListItemProps = {
    item: Site;
    navigation: any;
};

const ListItem: React.FC<ListItemProps> = ({ item, navigation }) => {
    return (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('Details', { site: item })}
        >
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemUrl}>{item.url.length > 40 ? `${item.url.substring(0, 40)}...` : item.url}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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

export default ListItem;
