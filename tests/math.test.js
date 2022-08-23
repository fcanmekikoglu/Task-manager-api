const { ExplainVerbosity } = require('mongodb')
const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')


test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)
})

test('Should calculate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test('Should convert fahrenheit to celsius', () => {
    const cel = fahrenheitToCelsius(32)
    expect(cel).toBe(0)
})

test('Should convert celsius to fahrenheit', () => {
    const fah = celsiusToFahrenheit(0)
    expect(fah).toBe(32)
})



test('should add two numbers', (done)=>{
    add(2,3).then((sum)=>{
        expect(sum).toBe(5)
        done()
    }) 
})

test('Should add two numbers asyn/await', async()=>{
    const sum = await add(11,22)
    expect(sum).toBe(32)
})

