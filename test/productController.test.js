const app =require('../backend/server')
const Product = require('../backend/models/productModel');
const chai = require ('chai');
const chaiHttp = require ('chai-http');
const expect = chai.expect
chai.use(chaiHttp);
chai.should();

describe('PRODUCT TESTS', () => {
    beforeEach((done) => { 
        Product.deleteMany({}, (err) => { 
           done();           
        });        
    })
    describe("/GET /api/products",()=>{
     it("should return all products", (done) => {
         chai.request(app)
         .get('/api/products')
         .end((err, res)=>{ 
            res.should.have.a('object')
            done()
         })

     })
    


    })


})
