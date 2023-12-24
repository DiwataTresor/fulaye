import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'

const Like = ({ id, categorie }) => {
    return (
        
        <View className="flex flex-row gap-5 pb-4 items-center justify-center bg-white rounded-lg">
          <View className=" flex flex-row gap-1  rounded-full  border-neutral-100">
            <Text></Text>
            <AntDesign name='like1' size={15} />
            {/* <Text>J'aime</Text> */}
          </View>
          <View className=" flex flex-row gap-1  rounded-full   border-neutral-100">
            <AntDesign name='message1' />
            <Text>Commenter</Text>
          </View>
        </View>
    )
}

export default Like