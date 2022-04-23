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
    describe("/ GET /api/products/:id",()=>{
        it("should return product by id", (done) => {
            const id = 1;
            chai.request(app)
            .get(`/api/products${id}`)
            .end((err, res)=>{ 
               res.should.have.a('object')
               done()
            })
   
        })
   
       })
       describe("/  DELETE /api/products/:id",()=>{
        it("should return product by id", (done) => {
            const id = 1;
            chai.request(app)
            .delete(`/api/products${id}`)
            .end((err, res)=>{ 
               res.should.have.a('object')
               done()
            })
   
        })
   
       })
       describe("/ POST /api/products/",()=>{
        it("should create a product", (done) => {
            let products =new Product({
                name:"Banana",
                price:20,
                mrp:1,
                user: 1,
                imageSrc:"jkdekde",
                imageAlt:"kdieduied",
                category :"kdidldil",
                countInStock:2,
                description : "Test sweet",

            })
            chai.request(app)
            .post("/api/products")
            .send(products)
            .end((err, res)=>{ 
               res.should.have.a('object')
               done()
            })
   
        })
   
       })
       describe("/ PUT /api/products/:id",()=>{
        it("should update a product", (done) => {
        let id =1
        let products =new Product({
            name:"orange",
            price:27,
            mrp:2,
            user: 1,
            imageSrc:"jkdekdess",
            imageAlt:"kdieduiedcsxdsx",
            category :"kdidldilxs",
            countInStock:3,
            description : "Test sweeter",

        })
            chai.request(app)
            .put(`/api/products/${id}`)
            .send(products)
            .end((err, res)=>{ 
               res.should.have.a('object')
               done()
            })
   
        })
   
       })
   


})
