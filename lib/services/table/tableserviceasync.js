// require('./tableservice');

TableService.prototype._performEntityOperationPromise = function (operation, table, entityDescriptor, options)
{
   var self = this;

     return new Promise(function (resolve, reject) {
        self._performEntityOperation(operation, table, entityDescriptor,options,function (error, entityResponse, response) {
            if (error) {
                reject(error);
            } else {
                resolve([entityResponse,response]);
            }
        }
            );
    });
};