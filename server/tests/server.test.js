const expect = require('expect')
const request = require('supertest')

const { app } = require('./../server')
const { Todo } = require('./../model/todo')


//delete all docs in Todos collection
beforeEach((done) => {
    Todo.deleteMany({})
        .then(() => {
            console.log('ALL docs in todos coll are now DELETED...')
            done()
        })
})

describe('POST / todos', () => {

    //testing creating new todo
    it('should create new todo', done => {
        const text = 'test create a todo'

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect(res => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if (err) {
                    //use return keyword just to make sure not to run the next line of code
                    return done(err)
                }

                //connecting & find docs in the DB server to check new created doc
                //todos coll docs will be deleted all with beforeEach()
                Todo.find().then(todos => {
                    expect(todos.length).toBe(1)
                    expect(todos[0].text).toBe(text)
                    done()
                })
                    .catch(err => { done(err) })
            })

    })

    //create new test with bad / empty text
    it('should NOT create new todo with invalid body data', done => {

        //const text = ''  //unnecessary 

        request(app)
            .post('/todos')
            // .send({ text }) //unnecessary, just send empty body
            .send({})
            .expect(400)
            // .expect(res => {
            //     expect(res.body.name).toBe("ValidationError")
            // }) //---> ga perlu, cukup check the expected value should be 400
            .end((err, res) => {
                if (err) {
                    console.log('Done with ERROR!!!', err)
                    return done(err)
                }

                // console.log('res.body.name=', res.body.name)

                // check DB server, it should NOT create new todo 
                // todos collection should be empty
                Todo.find({})
                    .then(todox => {
                        expect(todox.length).toBe(0)
                        done()
                    })
                    .catch(err => {
                        console.log('ERROR!!! when check DB:', err)
                        done(err)
                    })
            })

    })


})
