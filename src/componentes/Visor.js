import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const estilos = StyleSheet.create({
  visor: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'flex-end',
  },

  valorNoVisor: {
    fontSize: 80,
    color: '#fff',
  }
})

export default props => 
  <View style={estilos.visor}>
    <Text style={estilos.valorNoVisor} 
          numberOfLines={1}>{props.valor}</Text>
  </View>