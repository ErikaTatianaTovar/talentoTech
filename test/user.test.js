const request = require('supertest');
const app = require('../index.js');

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
        const objectToTest = {
            
                "_id": "65cd73f21c8dd9573fc639c9",
                "name": "Julia",
                "lastname": "Torres",
                "email": "julia@gmail.com",
                "password": "1221212",
                "__v": 0,
                "avatar": "uploads/user/1709168852023-julia.jpeg"
                
        }
        expect(response.status).toBe(200);
    });
})

describe('GET /', () => {
    it('responds with an array object that contains an specific user', async () => {
        //solicitud get en ruta principal
        const response = await request(app).get('/user');
        const objectToTest = {
            
                "_id": "65cd73f21c8dd9573fc639c9",
                "name": "Julia",
                "lastname": "Torres",
                "email": "julia@gmail.com",
                "password": "1221212",
                "__v": 0,
                "avatar": "uploads/user/1709168852023-julia.jpeg"
                
        }
        expect(response.status).toBe(200);
       //verificar que sea un array
       // expect(Array.isArray(response.body)).toBE(true);
        //verificar que contenga ese usuario
        expect(response.body).toEqual(expect.arrayContaining([objectToTest]));
    });
})

    describe('GET /user/:id', () => {
    it('responds with an object that contains an specific user', async () => {

        const id = "65cd73f21c8dd9573fc639c9"
        //solicitud get en ruta principal
        const response = await request(app).get('/user/' + id);
        const objectToTest = {
            
                "_id": "65cd73f21c8dd9573fc639c9",
                "name": "Julia",
                "lastname": "Torres",
                "email": "julia@gmail.com",
                "password": "1221212",
                "__v": 0,
                "avatar": "uploads/user/1709168852023-julia.jpeg"
                
        }
        expect(response.status).toBe(200);
        //verificar que 
        expect(typeof response.body === "object").toBe(true);
        //verificar que contenga ese usuario
        expect(response.body).toStrictEqual(objectToTest)
    })
})

describe('POST /user', () => {
    it('create a new in the BD and response with the data ', async() => {
        const newUser = {
                "id": 12,
                "name": "maria",
                "lastname": "Mendez",
                "email": "maria@gmail.com",
                "password": "pruebaa"
        }

        const response = await request(app).post('/user').send(newUser)

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('_id')
        expect(response.body.name).toBe(newUser.name)
        expect(response.body.lastname).toBe(newUser.lastname)
        expect(response.body.email).toBe(newUser.email)
    })
})*/

describe('POST /login', () => {
    it('Success login with email and password', async() => {
        const user = {
                "email": "maria@gmail.com",
                "password": "pruebaa"
        }

        const response = await request(app).post('/login').send(user)

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('token')
        expect(response.body.status).toBe("success")
    })

    it('Error login with email and password', async () => {
        const user = {
            "email": "maria@gmail.com",
            "password": "pruebaa"
    }

    const response = await request(app).post('/login').send(user)

    expect(response.statusCode).toBe(401)
    expect(response.body).toHaveProperty('token')
    expect(response.body.status).toBe("error")
    })
})

describe('POST /delete', () => {
    it('Success delete with _id', async () => {
        const id = "65cd73f21c8dd9573fc639c9"
        const token = "1111111111"

        const response = await request(app).delete('/user/' + id).set ('Autorization', 'Bearer' + token )

        expect(response.statusCode).toBe(200)
        expect(response.body.status).toBe('status')
    })
})

