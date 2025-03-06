import { View, Text, Modal, StyleSheet, ActivityIndicator, Image } from 'react-native'
import React, { useState } from 'react'
import { images } from '@/assets/index'

interface loaderProps {
    visible : boolean,
    setVisble : React.Dispatch<React.SetStateAction<boolean>>
}

export default function Loader({visible , setVisble} : loaderProps) {
 
  return (
    <Modal
    animationType='slide'
    transparent={false}
    visible={visible}
    onRequestClose={()=> setVisble(false)}>
        <View style={styles.container}>
            <View style={styles.content}>
                <Image
                source={images.Logo}
                style={{width : 140 , height: 140,}}
                 resizeMode='contain'
                />
               <ActivityIndicator size={50} color='#999999'  />
            </View>
        </View>
        </Modal>
  )
}


const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)' 
      },
      content: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 50,
        paddingVertical : 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
})