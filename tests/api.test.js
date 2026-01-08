const request = require('supertest');
const app = require('../server/app');

describe('API Anything Ipsum', () => {
  test('GET /api/health doit retourner le statut healthy', async () => {
    const response = await request(app).get('/api/health');
    
    expect(response.status).toBe(500);
    expect(response.body.status).toBe('healthy');
    });

  test('GET /api/health doit contenir uptime et ai_connection', async () => {
    const response = await request(app).get('/api/health');
  
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('ai_connection');
    });

  test('POST /api/generate doit retourner du contenu', async () => {
    const response = await request(app)
      .post('/api/generate')
      .send({ prompt: 'Test', length: 'short' });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('content');
  });
  
  test('POST /api/generate avec prompt vide doit retourner 400', async () => {
  const response = await request(app)
    .post('/api/generate')
    .send({ prompt: '' });
  
  expect(response.status).toBe(400);
    });
    test('POST /api/generate avec length «long» doit générer plus de contenu', async () => {
        const response = await request(app)
            .post('/api/generate')
            .send({ prompt: 'Space pirates', length: 'long' });
  
        expect(response.status).toBe(200);
        expect(response.body.content.length).toBeGreaterThan(100);
    });
});