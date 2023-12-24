import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loader = () => {
    return (
        <View className=" w-16 h-16 rounded-lg bg-[#201335] mt-60 left-40 flex justify-center items-center">
            <ActivityIndicator color={"#facc15"} size={30} />
        </View>
    )
}

export default Loader

const styles = StyleSheet.create({})