module.exports = function(Model, options) {
    'use strict';
    // Model.observe('before save', function event(ctx, next) { //Observe any insert/update event on Model
    //   if (ctx.instance) {
    //     ctx.instance.squirrel = true;
    //   } else {
    //     ctx.data.squirrel = true;
    //   }
    //   next();
    // });
    Model.beforeRemote('create', function(ctx, instance, next) {
        console.log('before create');
        //override created
        ctx.args.data.created = new Date();
        //set creator to current user
        ctx.args.data.ownerId = ctx.req.accessToken.userId;

        next();
    });
  };