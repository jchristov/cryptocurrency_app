import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function Loader({size='large', color='#0000ff'}) {
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size={size} color={color} animating />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
      }
})
