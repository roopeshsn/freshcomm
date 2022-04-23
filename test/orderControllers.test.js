const Order = require('../backend/models/orderModel')
const app =require('../backend/server')
const Product = require('../backend/models/productModel');
const chai = require ('chai');
const chaiHttp = require ('chai-http');
const expect = chai.expect
chai.use(chaiHttp);
chai.should();
describe('ORDER TESTS', () => {
    beforeEach((done) => { 
        Order.deleteMany({}, (err) => { 
           done();           
        });        
    })
    describe("/POST /api/order",()=>{
        it("should create order", (done) => {
            let order = new Order({
                orderItems: [
                    {
                      name:"onions",
                      qty: "1",
                      imageSrc: "hjldehde",
                      price: "20",
                      product:1,
                    },
                  ],
                user:1,
                shippingAddress: {
                    address: "test",
                    pinCode: 2,
                    city: "Nairobi",
                    state: "Narok",
                    country: "Kenya",
                  },
                paymentMethod:"wtf",
                itemsPrice:2,
                shippingPrice:4,
                totalPrice:23,
            })
            chai.request(app)
            .post('/api/orders')
            .send(order)
            .end((err, res)=>{ 
               res.should.have.a('object')
               done()
            })
   
        })
   
       })
})