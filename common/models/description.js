var random = require('random-js')();


module.exports = function(Description) {

  Description.disableRemoteMethod("create", true);
  Description.disableRemoteMethod("upsert", true);
  Description.disableRemoteMethod("updateAll", true);
  Description.disableRemoteMethod("updateAttributes", false);
  Description.disableRemoteMethod("findOne", true);
  Description.disableRemoteMethod("findById", true);
  Description.disableRemoteMethod("deleteById", true);
  Description.disableRemoteMethod("confirm", true);
  Description.disableRemoteMethod("count", true);
  Description.disableRemoteMethod("exists", true);
  Description.disableRemoteMethod("resetPassword", true);
  Description.disableRemoteMethod("createChangeStream", true);


  Description.afterRemote('find', function(ctx,user,next) {
    if(ctx) {
      ctx.result = ctx.result[0].name + ' Rubber Duck';
    }

    next();

  });

  Description.beforeRemote('find', function(ctx,user,next) {

    Description.count(null, function(err,res) {
      if(err) {
        console.log(err);
        cb(err);
      }
      else {

        var randomValue = random.integer(1,res);
        console.log(res);
        ctx.args.filter = '{ "where" : { "id": ' + randomValue + '}}';
        console.log(ctx.args.filter);


        next();
      }
    });
  });


};
