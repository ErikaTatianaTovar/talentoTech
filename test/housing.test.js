const request = require('supertest');
const app = require('../index.js');

const objectToTest = {
    "type": "finca",
    "state": "Bogotá",
    "city": "Bogotá",
    "address": "Prueba1",
    "zip_code": 110010,
    "price": 240000000,
    "size": 120,
    "rooms": 3,
    "bathrooms": 2,
    "parking": true
};
describe('POST /housing', () => {
    it('create a new housing in the BD and response with the data ', async() => {

        const response = await request(app).post('/housing').send(objectToTest)
        console.log(response.body)

        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('code')
        expect(response.body.type).toBe(objectToTest.type)
        expect(response.body.state).toBe(objectToTest.state)
        expect(response.body.city).toBe(objectToTest.city)
        expect(response.body.address).toBe(objectToTest.address)
        expect(response.body.zip_code).toBe(objectToTest.zip_code)
        expect(response.body.price).toBe(objectToTest.price)
        expect(response.body.size).toBe(objectToTest.size)
        expect(response.body.rooms).toBe(objectToTest.rooms)
        expect(response.body.bathrooms).toBe(objectToTest.bathrooms)
        expect(response.body.parking).toBe(objectToTest.parking)
    
       })
    it('should handle missing required fields error', async () => {
        // Enviar una solicitud sin el campo requerido 'type'
        const incompleteObject = { ...objectToTest };
        delete incompleteObject.type;

        const response = await request(app).post('/housing').send(incompleteObject);

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toMatch(/Error al crear vivienda:/); // Comprobando el mensaje de error
    });

})