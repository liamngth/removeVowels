const mysql = require('mssql');
const connectionString = 'some-cnn-string';
const query1 = 'some-query-1';
const query2 = 'some-query-2';
const query3 = 'some-query-3';

class Database {
  constructor( config ) {
    this.connection = mysql.createConnection( config );
  }

  query( sql, args ) {
    return new Promise( ( resolve, reject ) => {
      this.connection.query( sql, args, ( err, rows ) => {
        if ( err )
          return reject( err );
        resolve( rows );
      } );
    } );
  }

  close() {
    return new Promise( ( resolve, reject ) => {
      this.connection.end( err => {
        if ( err )
          return reject( err );
        resolve();
      } );
    } );
  }
}

const connection = new Database(connectionString);

function getAccountId(apiKey, cb) {
  connection.query(query1).then(result1 => {
    console.log(result1);
    return connection.query(query2, {...result1});
  }).then((result2) => {
    console.log(result2);
    return connection.query(query3, {...result2});
  }).then(result3 => {
    console.log(result3);
  }, err => {
    return connection.close().then(() => {throw err;})
  }).catch(err => {
    // handle the error
    console.log(err);
  });
}

module.exports = getAccountId(apiKey, cb);
