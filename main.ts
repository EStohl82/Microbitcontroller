function CalculateNegGradient (_in: number) {
    return -0.25 * _in + 101
}
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P14, joystickbit.ButtonType.down, function () {
    radio.sendString("E")
    basic.showString("E")
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P15, joystickbit.ButtonType.down, function () {
    radio.sendString("F")
    basic.showString("F")
})
function CalculatePosGradient (_in: number) {
    return 0.25 * (_in - 620)
}
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P13, joystickbit.ButtonType.down, function () {
    radio.sendString("D")
    basic.showString("D")
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P12, joystickbit.ButtonType.down, function () {
    radio.sendString("C")
    basic.showString("C")
})
let Calc_Y = 0
let Forward = 0
let Calc_X = 0
let Sideways = 0
radio.setGroup(1)
joystickbit.initJoystickBit()
let OneRun = 0
loops.everyInterval(200, function () {
    if (OneRun == 0) {
        if (Sideways == 1) {
            radio.sendValue("L", Calc_X)
            basic.showArrow(ArrowNames.West)
        } else if (Sideways == 0) {
            radio.sendValue("R", Calc_X)
            basic.showArrow(ArrowNames.East)
        } else {
            radio.sendValue("L", 0)
            radio.sendValue("R", 0)
        }
        OneRun = 1
    } else {
        if (Forward == 1) {
            radio.sendValue("V", Calc_Y)
            basic.showArrow(ArrowNames.North)
        } else if (Forward == 0) {
            radio.sendValue("Z", Calc_Y)
            basic.showArrow(ArrowNames.South)
        } else {
            radio.sendValue("V", 0)
            radio.sendValue("R", 0)
        }
        OneRun = 0
    }
})
loops.everyInterval(100, function () {
    if (joystickbit.getRockerValue(joystickbit.rockerType.X) > 624) {
        Calc_X = CalculatePosGradient(joystickbit.getRockerValue(joystickbit.rockerType.X))
        Sideways = 1
    } else if (joystickbit.getRockerValue(joystickbit.rockerType.X) < 400) {
        Calc_X = CalculateNegGradient(joystickbit.getRockerValue(joystickbit.rockerType.X))
        Sideways = 0
    } else {
        Calc_X = 0
        Sideways = 2
    }
    if (joystickbit.getRockerValue(joystickbit.rockerType.Y) > 624) {
        Calc_Y = CalculatePosGradient(joystickbit.getRockerValue(joystickbit.rockerType.Y))
        Forward = 1
    } else if (joystickbit.getRockerValue(joystickbit.rockerType.Y) < 400) {
        Calc_Y = CalculateNegGradient(joystickbit.getRockerValue(joystickbit.rockerType.Y))
        Forward = 0
    } else {
        Forward = 2
        Calc_Y = 0
    }
})
