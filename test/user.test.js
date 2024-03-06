const request = require('supertest');
const app = require('../index.js');

const objectToTest = {

    "id": 15552221,
    "name": "NombrePrueba",
    "lastname": "ApellidoPrueba",
    "email": "Pruebass11@gmail.com",
    "password": "11111111"
}
let userId;
let token;

/*describe('GET /', () => {
    it('responds with status 200', async () => {
        //solicitud get en ruta principal
        const response = await request(app).get('/');
        //verificar status
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello world');
    });

    it('responds with text', async () => {
        //solicitud get en ruta principal
        const response = await request(app).get('/');
        //verificar texto
        expect(response.text).toBe('Hello world');
    });

    it('responds with status 200', async () => {
        //solicitud get en ruta principal
        const response = await request(app).get('/user');
        expect(response.status).toBe(200);
    });
})

describe('GET /', () => {
    it('responds with an array object that contains an specific user', async () => {
        //solicitud get en ruta principal
        const response = await request(app).get('/user');
        expect(response.status).toBe(200);
       //verificar que sea un array
       // expect(Array.isArray(response.body)).toBE(true);
        //verificar que contenga ese usuario
        expect(response.body).toEqual(expect.arrayContaining([objectToTest]));
    });
})*/
describe('POST /user', () => {
    it('create a new in the BD and response with the data ', async() => {

        const response = await request(app).post('/user').send(objectToTest)
        console.log(response.body.id)
        //asignart el _id del usuario nuevo a la variable userId
        //para ser usada en las pruebas
        userId = response.body._id;

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('_id')
        expect(response.body.name).toBe(objectToTest.name)
        expect(response.body.lastname).toBe(objectToTest.lastname)
        expect(response.body.email).toBe(objectToTest.email)
    })
})
/*    describe('GET /user/:id', () => {
    it('responds with an object that contains an specific user', async () => {
        jest.setTimeout(30000);
        //solicitud get en ruta principal
        const response = await request(app).get('/user/' + userId);
       
        expect(response.status).toBe(200);
        expect(typeof response.body === "object").toBe(true);
        expect(response.body).toHaveProperty('_id')
        expect(response.body.name).toBe(objectToTest.name)
        expect(response.body.lastname).toBe(objectToTest.lastname)
        expect(response.body.email).toBe(objectToTest.email)
    })
})

describe('POST /login', () => {
    it('Success login with email and password', async() => {
       
        const response = await request(app).post('/login').send(objectToTest)

        token = response.body.token;
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('token')
        expect(response.body.status).toBe("success")
    })

    it('Error login with email and password', async () => {
     
    const response = await request(app).post('/login').send(objectToTest)

    expect(response.statusCode).toBe(401)
    expect(response.body).toHaveProperty('token')
    expect(response.body.status).toBe("error")
    })
})

describe('POST /delete', () => {
    it('Success delete with _id', async () => {
        const id = "65cd73f21c8dd9573fc639c9"
        const token = "1111111111"

        const response = await request(app).delete('/user/' + _id)
        .set ('Autorization', 'Bearer' + token )

        expect(response.statusCode).toBe(200)
        expect(response.body.status).toBe('status')
    })
})*/

