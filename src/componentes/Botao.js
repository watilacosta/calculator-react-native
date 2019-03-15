import React from 'react'
import {
	StyleSheet,
	Text,
	Dimensions,
	TouchableHighlight
} from 'react-native'

const estilos = StyleSheet.create({
	botao: {
		fontSize: 40,
		height: Dimensions.get('window').width / 4,
		width: Dimensions.get('window').width / 4,
		padding: 20,
		backgroundColor: '#f0f0f0',
		textAlign: 'center',
		borderWidth: 1,
		borderColor: '#888',
	},

	botaoOperador: {
		color: '#fff',
		backgroundColor: '#fa8231',
	},

	botaoDuplo: {
		width: (Dimensions.get('window').width / 4) * 2,
	},

	botaoTriplo: {
		width: (Dimensions.get('window').width / 4) * 3,
	}
})

export default props => {
	
	const estilosBotoes = [estilos.botao]

	if (props.duplo) estilosBotoes.push(estilos.botaoDuplo)
	if (props.triplo) estilosBotoes.push(estilos.botaoTriplo)
	if (props.operador) estilosBotoes.push(estilos.botaoOperador)

	return (
		<TouchableHighlight onPress={() => props.onClick(props.label)}>
			<Text style={estilosBotoes}>{props.label}</Text>
		</TouchableHighlight>
	)
}