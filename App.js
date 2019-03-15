import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import Botao from './src/componentes/Botao'
import Visor from './src/componentes/Visor'

const estadoInicial = {
  valorDoVisor: '0',
  limparVisor: false,
  operacao: null,
  valores: [0, 0],
  indiceCorrente: 0,
}

export default class App extends Component {

  state = { ...estadoInicial }

  addDigito = num => {
    // Valida se o visor é igual a zero ou se a variável limparVisor é true
    const limparVisor = this.state.valorDoVisor === '0' || this.state.limparVisor

    // Valida se já existe o dígito ponto(.) dentro do visor e não vai limpar o visor
    if (num === '.' && !limparVisor && this.state.valorDoVisor.includes('.')) {
      return
    }

    // Valida se limparVisor é true e seta vazio no visor, se não, fica exatamente o valor que está no visor
    const valorCorrente = limparVisor ? '' : this.state.valorDoVisor

    // Concatena o valor atual do visor com o valor que foi digitado
    const valorDoVisor  = valorCorrente + num

    // Muda o estado do visor para ficar com o valor passado na linha acima e seta limparVisor para false obviamente
    this.setState({ valorDoVisor, limparVisor: false })

    if (num !== '.') {
      const novoValor                  = parseFloat(valorDoVisor)
      const values                     = [...this.state.valores]
      values[this.state.valorCorrente] = novoValor
      this.setState({ valores: values })
      // console.debug(`${values}`)
    }
  }

  limparMemoria = () => {
    this.setState({ ...estadoInicial })
  }

  setOperacao = operacao => {
    if (this.state.indiceCorrente === 0) {
      this.setState( { operacao, indiceCorrente: 1, limparVisor: true })
    } else {
      const igual = operacao === '='
      const values = [...this.state.valores]
      try {
        // Avalia a expressão e faz a operação. Depois seta o resultado na primeira posição de valores
        values[0] = eval(`${values[0]} ${this.state.operacao} ${values[1]}`)
      } catch (e) {
        values[0] = this.state.values[0]
      }

      values[1] = 0
      this.setState({
        valorDoVisor: `${values[0]}`,
        operacao: igual ? null : operacao,
        indiceCorrente: igual ? 0 : 1,
        limparVisor: true,
        valores: values
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Visor valor={this.state.valorDoVisor} />
        <View style={styles.botoes}>
          <Botao label='AC' triplo   onClick={this.limparMemoria} />
          <Botao label='/'  operador onClick={this.setOperacao} />
          <Botao label='7'           onClick={this.addDigito}   />
          <Botao label='8'           onClick={this.addDigito}   />
          <Botao label='9'           onClick={this.addDigito}   />
          <Botao label='*'  operador onClick={this.setOperacao} />
          <Botao label='4'           onClick={this.addDigito}   />
          <Botao label='5'           onClick={this.addDigito}   />
          <Botao label='6'           onClick={this.addDigito}   />
          <Botao label='-'  operador onClick={this.setOperacao} />
          <Botao label='1'           onClick={this.addDigito}   />
          <Botao label='2'           onClick={this.addDigito}   />
          <Botao label='3'           onClick={this.addDigito}   />
          <Botao label='+'  operador onClick={this.setOperacao} />
          <Botao label='0'  duplo    onClick={this.addDigito}   />
          <Botao label='.'           onClick={this.addDigito}   />
          <Botao label='='  operador onClick={this.setOperacao} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },

  botoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    
  },
});
