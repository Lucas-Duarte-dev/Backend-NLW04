import request from 'supertest';
import { app } from '../app';

import createConnection from '../database'

describe('Surveys', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })
    
    it("Should be able to create a new survey", async () => {
        const response = await request(app)
        .post('/survey')
        .send({ title: "Title example", description: "description exempla" });
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id')
    });

    it("should be able to get a survey", async () => {
        await request(app)
        .post('/survey')
        .send({ title: "Title example", description: "description exempla" });

        const response = await request(app).get('/survey');

        expect(response.body.length).toBe(2);
    })
});