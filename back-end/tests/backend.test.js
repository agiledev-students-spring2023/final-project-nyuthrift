const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');

chai.use(chaiHttp);

describe('API/products endpoints', () => {
  // Test the GET /api/products route
  describe('GET /api/products', () => {
    it('should return an array of products', async () => {
      const res = await chai.request(app).get('/api/products');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.have.property('name');
      expect(res.body[0]).to.have.property('price');
    });
  });
});


describe('Sell endpoint', () => {
  it('should create a new listing', async () => {
    const res = await chai.request(app)
      .post('/sell')
      .field('title', 'test listing')
      .field('price', '50')
      .field('description', 'this is a test listing')
      .field('condition', 'new')
      .field('category', 'test')
      

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('id');
    expect(res.body.id).to.be.a('number');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('Listing created successfully');
  });
});