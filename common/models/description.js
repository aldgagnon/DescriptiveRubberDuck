var random = require('random-js')();


module.exports = function(Description) {

  Description.disableRemoteMethod("create", true);
  Description.disableRemoteMethod("upsert", true);
  Description.disableRemoteMethod("updateAll", true);
  Description.disableRemoteMethod("updateAttributes", false);
  //Description.disableRemoteMethod("findById", false);
  Description.disableRemoteMethod("findOne", true);
  Description.disableRemoteMethod("deleteById", true);
  Description.disableRemoteMethod("confirm", true);
  Description.disableRemoteMethod("count", false);
  Description.disableRemoteMethod("exists", true);
  Description.disableRemoteMethod("resetPassword", true);
  Description.disableRemoteMethod("createChangeStream", true);

  Description.remoteMethod(
    'Random',
    {
      http: {path: '/Random', verb: 'get'},
      returns: { arg: 'Results', type: 'string'}
    });

    Description.afterRemote('find', function(ctx,user,next) {
      var des = ctx.result;
      var tes = JSON.parse('{ "name" : "andrew" }');
      console.log(tes);
      console.log(tes.name);

      console.log('after remote');
      console.log(des[0].name);

      // console.log(description);
      // ctx.result = '{ "name" : ' + description + '}';

      next();

    });

    Description.beforeRemote('find', function(ctx,user,next) {
      console.log('find beforeRemote');

      Description.count(null, function(err,res) {
        if(err) {
          console.log(err);
          cb(err);
        }
        else {

          var randomValue = random.integer(1,res);
          console.log(res);
          ctx.args.filter = '{ "where" : { "id": ' + res + '}}';
          console.log(ctx.args.filter);


          next();
        }
      });
    });


    Description.Random = function(cb) {
      Description.count(null, function(err,res) {
        if(err) {
          console.log(err);
          cb(err);
        }
        else {

          var randomValue = random.integer(1,res);




          Description.findById(randomValue, function(err,res) {
            if(err) {
              console.log(err);
              cb(err);
            }
            else {
              var DescriptiveRubberDucky = res.name + ' Rubber Duck';
              cb(null,DescriptiveRubberDucky);
            }
          });

        }
      });
    }


  };
