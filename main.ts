/**
 * Entradas Pinos E Multiplexador 
 * 
 * Sensor De Linha
 * 
 * Esquerda = P1
 * 
 * Centro   = P2
 * 
 * Direita  = P3
 * 
 * Sensor De Cor
 * 
 * Esquerda =
 * 
 * Direita  =
 * 
 * Vítimas  =
 * 
 * Servos 
 * 
 * Vítimas/Obstáculos = P4
 * 
 * Obstáculos 
 * 
 * Vítimas E Obstáculos = P0
 */
/**
 * Preto  < 40
 * 
 * rgb
 */
/**
 * branco  > 240
 * 
 * rgb
 */
/**
 * verde > 90
 */
/**
 * INCOMPLETO
 */
/**
 * REVISÃO
 */
/**
 * FAZER ESTÁ SEM PROCURAR VÍTIMAS
 */
function verificarModoResgate () {
    if (!(modoResgateAtivo) && tempoSemLinha >= 6000) {
        modoResgateAtivo = true
        tempoSemLinha = 0
        basic.showIcon(IconNames.Target)
        executarModoResgate()
    }
}
function executarModoResgate () {
    for (let index = 0; index < 7; index++) {
        TCS34725MUX.selecionarCanal(0)
        r = TCS34725MUX.lerVermelho()
        g = TCS34725MUX.lerVerde()
        b = TCS34725MUX.lerAzul()
        if (r < 40 && g < 40 && b < 40) {
            coletarBola()
            levarParaArea("verde")
        } else if (r > 240 && g > 240 && b > 240) {
            coletarBola()
            levarParaArea("vermelha")
        }
    }
    procurarSaida()
    modoResgateAtivo = false
    basic.showIcon(IconNames.Happy)
}
function seguirLinhaComViradaVerde () {
    sensorEsquerdaLinha = pins.digitalReadPin(DigitalPin.P8)
    sensorCentroLinha = pins.digitalReadPin(DigitalPin.P13)
    sensorDireitaLinha = pins.digitalReadPin(DigitalPin.P12)
    TCS34725MUX.selecionarCanal(1)
    r1 = TCS34725MUX.lerVermelho()
    g1 = TCS34725MUX.lerVerde()
    b1 = TCS34725MUX.lerAzul()
    TCS34725MUX.selecionarCanal(2)
    r2 = TCS34725MUX.lerVermelho()
    g2 = TCS34725MUX.lerVerde()
    b2 = TCS34725MUX.lerAzul()
    verdeEsquerda = r1 == 0 && (g1 > 90 && b1 == 0)
    verdeDireita = r2 == 0 && (g2 > 90 && b2 == 0)
    if (sensorEsquerdaLinha > 0 && (sensorCentroLinha > 1 && sensorDireitaLinha > 0)) {
        L298N.avancar(0)
    } else if (sensorEsquerdaLinha > 1 && (sensorCentroLinha > 1 && sensorDireitaLinha > 0)) {
        L298N.virarPorGraus(Sentido.Esquerda, 5, 87)
    } else if (sensorEsquerdaLinha > 0 && (sensorCentroLinha > 1 && sensorDireitaLinha > 1)) {
        L298N.virarPorGraus(Sentido.Direita, 0, 0)
    } else if (sensorEsquerdaLinha > 1 && (sensorCentroLinha > 1 && sensorDireitaLinha > 1)) {
        if (verdeEsquerda && verdeDireita) {
            L298N.virarPorGraus(Sentido.Esquerda, 360, 0)
        } else if (verdeDireita) {
            L298N.virarDireita(0)
        } else if (verdeEsquerda) {
            L298N.virarEsquerda(0)
        }
    } else if (sensorEsquerdaLinha > 0 && (sensorCentroLinha > 0 && sensorDireitaLinha > 0)) {
    	
    }
}
function levarParaArea (cor: string) {
    if (cor == "verde") {
    	
    }
}
function coletarBola () {
    pins.servoWritePin(garraServoPin, 0)
    basic.pause(200)
    pins.servoWritePin(garraServoPin, 90)
    basic.pause(600)
}
function Vitimas () {
    if (true) {
    	
    }
}
function procurarSaida () {
    servos.P0.setAngle(90)
    if (Obstaculos == 30) {
        L298N.avancar(0)
    }
}
let Obstaculos = 0
let verdeDireita = false
let verdeEsquerda = false
let b2 = 0
let g2 = 0
let r2 = 0
let b1 = 0
let g1 = 0
let r1 = 0
let sensorDireitaLinha = 0
let sensorCentroLinha = 0
let sensorEsquerdaLinha = 0
let b = 0
let g = 0
let r = 0
let tempoSemLinha = 0
let modoResgateAtivo = false
let garraServoPin = 0
garraServoPin = AnalogPin.P1
basic.forever(function () {
    if (!(modoResgateAtivo)) {
        seguirLinhaComViradaVerde()
        verificarModoResgate()
    }
})
basic.forever(function () {
    Obstaculos = sonar.ping(
    DigitalPin.P4,
    DigitalPin.P9,
    PingUnit.Centimeters
    )
})
basic.forever(function () {
    servos.P0.setAngle(90)
    if (Obstaculos == 4) {
        servos.P0.stop()
    }
})
basic.forever(function () {
    servos.P0.setAngle(90)
    if (Obstaculos == 4) {
        servos.P0.stop()
    }
})
basic.forever(function () {
    servos.P0.setAngle(90)
    if (Obstaculos == 4) {
        servos.P0.stop()
    }
})
basic.forever(function () {
    servos.P0.setAngle(90)
    if (Obstaculos == 4) {
        servos.P0.stop()
    }
})
basic.forever(function () {
    servos.P0.setAngle(90)
    if (Obstaculos == 4) {
        servos.P0.stop()
    }
})
basic.forever(function () {
    servos.P0.setAngle(90)
    if (Obstaculos == 4) {
        servos.P0.stop()
    }
})
basic.forever(function () {
    servos.P0.setAngle(90)
    if (Obstaculos == 4) {
        servos.P0.stop()
    }
})
basic.forever(function () {
    servos.P0.setAngle(90)
    if (Obstaculos == 4) {
        servos.P0.stop()
    }
})
basic.forever(function () {
    servos.P0.setAngle(90)
    if (Obstaculos == 4) {
        servos.P0.stop()
    }
})
basic.forever(function () {
    servos.P0.setAngle(90)
    if (Obstaculos == 4) {
        servos.P0.stop()
    }
})
