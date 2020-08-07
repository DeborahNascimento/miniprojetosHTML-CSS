class Calculadora {
    constructor(proximoNumero, numeroAtual) {
      this.proximoNumero = proximoNumero
      this.numeroAtual = numeroAtual
      this.limpar()
    }
  
    limpar() {
      this.atual = ''
      this.proximo = ''
      this.operacao = undefined
    }
  
    delete() {
      this.atual = this.atual.toString().slice(0, -1)
    }
  
    adicionarNumero(numero) {
      if (numero === '.' && this.atual.includes('.')) return
      this.atual = this.atual.toString() + numero.toString();
    }
  
    escolherOperacao(operacao) {
      if (this.atual === '') return
      if (this.proximo !== '') {
        this.compute()
      }
      this.operacao = operacao
      this.proximo = this.atual
      this.atual = ''
    }
  
    compute() {
      let computacao
      const prev = parseFloat(this.proximo)
      const at = parseFloat(this.atual)
      if (isNaN(prev) || isNaN(at)) return
      switch (this.operacao) {
        case '+':
          computacao = prev + at
          break
        case '-':
          computacao = prev - at
          break
        case '*':
          computacao = prev * at
          break
        case '÷':
          computacao = prev / at
          break
        default:
          return
      }
      this.atual = computacao
      this.operacao = undefined
      this.proximo = ''
    }
  
    getNumeroDoDisplay(numero) {
      const stringNumero = numero.toString()
      const digitosInteiros = parseFloat(stringNumero.split('.')[0])
      const DigitosDecimais = stringNumero.split('.')[1]
      let displayInteiro
      if (isNaN(digitosInteiros)) {
        displayInteiro = ''
      } else {
        displayInteiro = digitosInteiros.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (DigitosDecimais != null) {
        return `${displayInteiro}.${DigitosDecimais}`
      } else {
        return displayInteiro
      }
    }
  
    atualizarDisplay() {
      this.numeroAtual.innerText =
        this.getNumeroDoDisplay(this.atual)
      if (this.operacao != null) {
        this.proximoNumero.innerText =
          `${this.getNumeroDoDisplay(this.proximo)} ${this.operacao}`
      } else {
        this.proximoNumero.innerText = ''
      }
    }
  }
  
  
  const botaoDeNumero = document.querySelectorAll('[data-number]')
  const botaoDeOperacao = document.querySelectorAll('[data-operation]')
  const botaoIgual = document.querySelector('[data-equals]')
  const botaoDelete = document.querySelector('[data-delete]')
  const botaoLimpar= document.querySelector('[data-all-clear]')
  const proximoNumero = document.querySelector('[data-previous-operand]')
  const numeroAtual = document.querySelector('[data-current-operand]')
  
  const calculadora = new Calculadora(proximoNumero, numeroAtual)
  
  botaoDeNumero.forEach(button => {
    button.addEventListener('click', () => {
      calculadora.adicionarNumero(button.innerText)
      calculadora.atualizarDisplay()
    })
  })
  
  botaoDeOperacao.forEach(button => {
    button.addEventListener('click', () => {
      calculadora.escolherOperacao(button.innerText)
      calculadora.atualizarDisplay()
    })
  })
  
  botaoIgual.addEventListener('click', button => {
    calculadora.compute()
    calculadora.atualizarDisplay()
  })
  
  botaoLimpar.addEventListener('click', button => {
    calculadora.limpar()
    calculadora.atualizarDisplay()
  })
  
  botaoDelete.addEventListener('click', button => {
    calculadora.delete()
    calculadora.atualizarDisplay()
  })