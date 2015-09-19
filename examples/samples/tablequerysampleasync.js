var fs = require('fs');
var assert = require('assert');
var util = require('util');
var http = require('http');

//console.log('FINDING FILES : '+ fs.readdirSync('./lib/'));


var azure;
if (fs.existsSync('./lib/azure-storage.js')) {
  console.log('loading local azure-storage lib')
  azure = require('../../lib/azure-storage.js');
} else {
    console.log('loading npm module azure storage');
  azure = require('azure-storage');
}

var TableQuery = azure.TableQuery;
var TableUtilities = azure.TableUtilities;
var eg = TableUtilities.entityGenerator;

var tableName = 'tablequerysample';
var tableService = azure.createTableService();

// optionally set a proxy
/*var proxy = {
  protocol: 'http:',
  host: '127.0.0.1',
  port: 8888
};

tableService.setProxy(proxy);*/

var entity1 = {
  PartitionKey: eg.String('partition1'),
  RowKey: eg.String('row1'),
  integerfield: eg.Int32(1),
  stringfield: eg.String('stringfield value'),
  longfield: eg.Int64('92233720368547758')
};

var entity2 = {
  PartitionKey: eg.String('partition1'),
  RowKey: eg.String('row2'),
  stringfield: eg.String('stringfield value'),
  longfield: eg.Int64('8547758')
};

mainFunction();

async function mainFunction() {
  console.log('starting test... \n');
  try {
   var rasp = await functionAsync();
  } catch (error) {
    console.error(`\n\n catched thrown error from function async! ${ JSON.stringify(error) } \n\n `);
  }
}

async function functionAsync() {

  try {
    
    //create table again 
    console.log(`starting table (${tableName}) creation `);
    rasp = await tableService.createTableAsync(tableName);
    console.log(`\n response from table creation ${ JSON.stringify(rasp) } \n\n`);
    
    //insert entities
    console.log(`inserting entities into table `);
    rasp = await tableService.insertEntityAsync(tableName, entity1);
    console.log(`\n inserting entity1 response ${JSON.stringify(rasp)} \n`);
    rasp = await tableService.insertEntityAsync(tableName, entity2);
    console.log(`\n inserting entity2 response ${JSON.stringify(rasp)} \n\n`);
    
    //query table
    console.log(`query entities`);
    rasp = await tableService.queryEntitiesAsync(tableName, null, null);
    console.log(`\n query entities response ${JSON.stringify(rasp) } \n\n`);
    
    //query table where 
    console.log(`query entities where scenario`);
    var tableQuery = new TableQuery().where(TableQuery.int64Filter('longfield', TableUtilities.QueryComparisons.GREATER_THAN, '10000000'));
    rasp = await  tableService.queryEntitiesAsync(tableName, tableQuery, null);
    console.log(`\n query entities where scenario response ${JSON.stringify(rasp) } \n\n`);
    
    //query table top 
    console.log(`query entities top scenario`);
    tableQuery = new TableQuery().top(1);
    rasp = await  tableService.queryEntitiesAsync(tableName, tableQuery, null);
    console.log(`\n query entities top scenario response ${JSON.stringify(rasp) } \n\n`);
    
    
    //query table select 
    console.log(`query entities select scenario`);
    var tableQuery = new TableQuery().select('integerfield');
    rasp = await  tableService.queryEntitiesAsync(tableName, tableQuery, null);
    console.log(`\n query entities select scenario response ${JSON.stringify(rasp) } \n\n`);
    
     //delete table
    console.log(`starting table (${tableName}) deletion (if exists) `);
    var rasp = await tableService.deleteTableIfExistsAsync(tableName);
    console.log(`\n response from table deletion ${ JSON.stringify(rasp) } \n\n`);
    console.log(`FINISHING TEST \n\n`);

  } catch (error) {
    console.error('\n\n catched error in functionAsync; throwing it up \n\n ');
    throw error;
  }
}
