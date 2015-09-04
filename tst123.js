var fs = require('fs');
var assert = require('assert');
var util = require('util');
var http = require('http');

var azure;

if (fs.existsSync('./lib/azure-storage.js')) {
  azure = require('./lib/azure-storage.js');
  console.log("tadaaaa");
} else {
  // azure = require('azure-storage');
  console.log("nuuuuu");
}

var TableQuery = azure.TableQuery;
var TableUtilities = azure.TableUtilities;
var eg = TableUtilities.entityGenerator;

var tableName = 'tablequerysample';
var tableService = azure.createTableService('storageapitest', 'Xq0t50sDkQmxdqlsw9o4esZCfjRhRmijSIf2cKm9fiq873Q+7HOoM1bSV4tUjaWVFBZ7xR4BXHFFAp3eKKe2og==');

var entity1 = {
  PartitionKey: eg.String('partition1'),
  RowKey: eg.String('row14'),
  integerfield: eg.Int32(1),
  stringfield: eg.String('stringfield value'),
  longfield: eg.Int64('92233720368547758')
};

async function mainMethod() {
  console.log('starting insert entity --- ');
  try {
    var rr = await tableService.insertEntityAsync(tableName, entity1);
    console.log('after await -- insert succesful; rr '+JSON.stringify(rr));
  }
  catch (e) {
    console.error("errrorr ----- "+e);
  }

}

mainMethod();
