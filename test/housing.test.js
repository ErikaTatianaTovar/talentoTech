const request = require("supertest");
const app = require("../index.js");
const HousingSchema = require("../models/Housing");

let createdHousingCode;

const objectToTest = {
  type: "finca",
  state: "Bogotá",
  city: "Bogotá",
  address: "Prueba1",
  zip_code: 110010,
  price: 240000000,
  size: 120,
  rooms: 3,
  bathrooms: 2,
  parking: true,
};

describe("POST /housing", () => {
  it("create a new housing in the BD and response with the data ", async () => {
    const response = await request(app).post("/housing").send(objectToTest);

    createdHousingCode = response.body.code;

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("code");
    expect(response.body.type).toBe(objectToTest.type);
    expect(response.body.state).toBe(objectToTest.state);
    expect(response.body.city).toBe(objectToTest.city);
    expect(response.body.address).toBe(objectToTest.address);
    expect(response.body.zip_code).toBe(objectToTest.zip_code);
    expect(response.body.price).toBe(objectToTest.price);
    expect(response.body.size).toBe(objectToTest.size);
    expect(response.body.rooms).toBe(objectToTest.rooms);
    expect(response.body.bathrooms).toBe(objectToTest.bathrooms);
    expect(response.body.parking).toBe(objectToTest.parking);
  });

  it("should handle missing required fields error", async () => {
    const incompleteObject = { ...objectToTest };
    delete incompleteObject.type;

    const response = await request(app).post("/housing").send(incompleteObject);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toMatch(/Error al crear vivienda:/); // Comprobando el mensaje de error
  });

  it("should handle duplicate code when creating housing", async () => {
    const duplicateObject = { ...objectToTest };
    duplicateObject.code = createdHousingCode;

    const response = await request(app).post("/housing").send(duplicateObject);
    expect(response.status).toBe(400);
  });
});
describe("GET /housing", () => {
  it("responds with an array object that contains all user", async () => {
    const response = await request(app).get("/housing");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  it("responds error when an array object that  not contains all user", async () => {
    const nullObject = { ...objectToTest };
    delete nullObject;

    const response = await request(app).post("/housing").send(nullObject);
    expect(response.status).toBe(500);
  });
});

describe("GET /housing/:code", () => {
  it("responds with an object that contains a specific housing", async () => {
    const response = await request(app).get("/housing/" + createdHousingCode);

    expect(response.status).toBe(200);
    expect(typeof response.body === "object").toBe(true);
    expect(response.body).toHaveProperty("code");
    expect(response.body.type).toBe(objectToTest.type);
    expect(response.body.state).toBe(objectToTest.state);
    expect(response.body.city).toBe(objectToTest.city);
    expect(response.body.address).toBe(objectToTest.address);
    expect(response.body.zip_code).toBe(objectToTest.zip_code);
    expect(response.body.price).toBe(objectToTest.price);
    expect(response.body.size).toBe(objectToTest.size);
    expect(response.body.rooms).toBe(objectToTest.rooms);
    expect(response.body.bathrooms).toBe(objectToTest.bathrooms);
    expect(response.body.parking).toBe(objectToTest.parking);
  });
  it("error with a code incorrect in the param for find specific housing", async () => {
    const response = await request(app).get("/housing/" + "aaaa1234");
    expect(response.status).toBe(500);
  });
});

describe("PATCH /housing/:code", () => {
  it("responds with a specific object update", async () => {
    const UpdateObjectToTest = {
      size: 100,
      rooms: 10,
    };
    const response = await request(app)
      .patch("/housing/" + createdHousingCode)
      .send(UpdateObjectToTest);

    expect(response.status).toBe(200);
    expect(typeof response.body === "object").toBe(true);
    expect(response.body.result.size).toBe(UpdateObjectToTest.size);
    expect(response.body.result.rooms).toBe(UpdateObjectToTest.rooms);
  });
  it("error update specific object", async () => {
    const InvalidUpdateObject = {
      state: "assdsf",
      city: "ssfsafas",
      zip_code: "110010",
      size: "abc",
      rooms: -1000,
      price: -100,
      type: "dcdcd",
      rooms: -3,
      bathrooms: "2",
    };
    const response = await request(app)
      .patch("/housing/" + InvalidUpdateObject)
      .send(UpdateObjectToTest);
    expect(response.status).toBe(500);
  });
});

describe("DELETE /housing/:code", () => {
  it("responds with a specific object delete", async () => {
    const response = await request(app).delete(
      "/housing/" + createdHousingCode
    );

    expect(response.status).toBe(200);
    expect(typeof response.body === "object").toBe(true);

    const deletedHousing = await HousingSchema.findOne({
      code: createdHousingCode,
    });
    expect(deletedHousing).toBeNull();
  });
  it("error delete a specific object", async () => {
    const response = await request(app).delete("/housing/" + "aaaa1234");

    expect(response.status).toBe(500);
  });
});
