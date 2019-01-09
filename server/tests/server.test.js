const expect = require('expect')
const request = require('supertest')

const { app } = require('./../server')
const { Todo } = require('./../model/todo')

//fake todos data for testing
const todos = [{ text: 'Test todo #1' }, { text: 'Test todo #2' }]

//delete all docs in Todos collection, then added 2 docs (for the GET/todos route test)
beforeEach((done) => {
    Todo.deleteMany({})
        .then(() => {
            // console.log('ALL docs in todos coll are now DELETED...')
            return Todo.insertMany(todos)
        })
        .then(() => { done() })
})

// POST test
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

                //connecting & find docs with {text:text} in the DB server to check new created doc
                Todo.find({ text }).then(todos => {
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
                        expect(todox.length).toBe(2)
                        done()
                    })
                    .catch(err => {
                        console.log('ERROR!!! when check DB:', err)
                        done(err)
                    })
            })

    })


})

//GET todos route test

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
        // kalo this done arguement, here and di atas (done)=> ga dipake
        // then gw canti expect(200) jadi (201) or (3000), it still pass
        // jadi 'done' argument penting juga
        // gw musti denger lecture about testing with mocha....gw skip soalnya :)
    });
});