const app =require('../backend/server')
const  mongoose = require("mongoose");
const User = require('../backend/models/userModel');
const chai = require ('chai');
const chaiHttp = require ('chai-http');
const expect = chai.expect
chai.use(chaiHttp);
chai.should();


describe('USERS', () => {
    beforeEach((done) => { 
        User.deleteMany({}, (err) => { 
           done();           
        });        
    });
    describe('/POST user', () => {
        it('it should  register user', (done) => {
            let user = {
                name: 'Felex onyango',
                email: "felexonyango@gmail.com",
                password: '@Felex2020'
               
            }
             chai.request(app)
              .post('/api/users')
              .send(user)
              .end((err, res) => {
                    res.should.have.status(201);
                    res.should.have.a('object')
                    res.body.should.have.property('name');
                    res.body.should.have.property('email');
                done();
              });
        });
  
    });
    describe('/POST login user',()=>{
    it('should login user',(done)=>{
        let user = {
            email: "felexonyango@gmail.com",
            password: '@Felex2020'
           
        }
        chai.request(app)
        .post('/api/users/login')
        .send(user)
        .end((err, res)=>{
            res.should.have.a('object')
            done()
        })
    })
    })

    describe('/GET profile ', () => {
        it('it should  return profile of user user by id', (done) => {
            let user=new User({ name:"Felex onyango",email:"felexonyango@gmail.com"})
         user.save((err, user) => {
            chai.request(app)
            .get('/api/users/profile')
            .send(user)
            .end((err, res) => {
                  res.should.have.a('object')
                  done();
            });
         })
     
        });
    })
    describe('PUT /api/users/profile',()=>{
        it('should update user profile',(done)=>{
            let user=new User({ name:"Felex onyango",email:"felexonyango19@gmail.com"})
        user.save((err, user) => {
         chai.request(app)
            .put('/api/users/profile')
            .send(user)
            .end((err, res)=>{
                res.should.have.a('object')
                done()
            })

        })
           
        })
        })
        describe('/api/users/forgotpassword',()=>{
            it('should forget password of a user',(done)=>{
                let user = {
                    email: "felexonyango19@gmail.com",
                }
                chai.request(app)
                .post('/api/users/forgotpassword')
                .send(user)
                .end((err, res)=>{
                    res.should.have.a('object')
                    done()
                })
            })
            })
            describe('/GET users ', () => {
                it('it should  return all users', (done) => {
                 chai.request(app)
                    .get('/api/users')
                    .end((err, res) => {
                          res.should.have.a('object')
                          done();
                    })
             
                });
            })
            describe('/DELETE UserId ', () => {
                it('it should  delete the user by id', (done) => {
                    const id = 1;
                chai.request(app)
                 .delete(`/api/users/${id}`)
                    .end((err, res) => {
                          res.should.have.a('object')
                          done();
                    })
             
                });
            })
            describe('/GET UserId ', () => {
                it('it should  get the user by id', (done) => {
                    const id = 2;
                chai.request(app)
                 .delete(`/api/users/${id}`)
                    .end((err, res) => {
                          res.should.have.a('object')
                          done();
                    })
             
                });
            })
            describe('PUT /api/users/:id', () => {
                it('it should  update the user by id', (done) => {
                    const id = 2;
                    let user={
                        name:"Felex tabu",
                        email:"felex@gmail.com",
                    }
                chai.request(app)
                 .patch(`/api/users/${id}`)
                 .send(user)
                    .end((err, res) => {
                          res.should.have.a('object')
                          done();
                    })
             
                });
            })

})