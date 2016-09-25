var should = require('should');
var assert = require('assert');
var request = require('supertest');

describe('Routing', function() {
  var url = 'http://localhost:7203/api/todos';
  var insertedID = '';
  before(function(done) {
    console.log("Starting Testing ....");
    done();
  });
  describe('Todos', function() {
    it('should save the todo in the array and update the file', function(done) {
      var todo = {
        text: 'fg',
        priority: 1,
        done: true
      };
      // sedning the todo to our server
      request(url)
        .post('')
        .send(todo)
        // end handles the response
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          // check the object and status code
          res.body.should.have.property('id');
          res.body.text.should.equal('fg');
          res.body.priority.should.equal(1);
          res.body.done.should.equal(true);
          insertedID = res.body.id;
          res.status.should.be.equal(200);
          done();
        });
    });
    it('it should try to save the todo in the array and update the file but theres a validation error', function(done) {
      var todo = {
        text: '11',
        priority: 1,
        done: true
      };
      // sedning the todo to our server 
      request(url)
        .post('')
        .send(todo)
        // end handles the response
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          // check the object and status code 

          res.body.should.have.property('err');
          res.status.should.be.equal(500);
          done();
        });
    });
    it('it should try to get all the todos from API', function(done) {

      // sedning the todo to our server 
      request(url)
        .get('')
        // end handles the response
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          // check the object and status code
          res.should.be.json;
          res.body.should.be.an.instanceOf(Array);
          res.status.should.be.equal(200);
          done();
        });
    });
    it('it should try to get the inserted ID from the API', function(done) {
      // sedning the todo to our server 
      request(url)
        .get('/' + insertedID)
        // end handles the response
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          // check the object and status code
          res.should.be.json;
          res.body.id.should.equal(insertedID);
          res.status.should.be.equal(200);
          done();
        });
    });
    it('it should try to update the todo of the inserted ID from the API', function(done) {
      // sedning the todo to our server 
      var obj = {
        text: 'str'
      }

      request(url)
        .put('/' + insertedID)
        .send(obj)
        // end handles the response
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          // check the object and status code
          res.should.be.json;
          res.body.id.should.equal(insertedID);
          res.body.text.should.equal('str');
          res.status.should.be.equal(200);
          done();
        });
    });
    it('it should try to delete the todo of the inserted ID from the API', function(done) {
      // sedning the todo to our server 

      request(url)
        .del('/' + insertedID)
        .send()
        // end handles the response
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          // check the object and status code

          res.should.be.json;
          res.body.should.be.an.instanceOf(Array);
          res.status.should.be.equal(200);
          request(url)
            .get('/' + insertedID)
            .send()
            // end handles the response
            .end(function(err, res) {
              if (err) {
                throw err;
              }
              // check the object and status code
              res.should.be.empty;
              res.status.should.be.equal(200);
              done();
            });
        });
    });
  });
});
