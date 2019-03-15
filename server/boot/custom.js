module.exports = function(app) {
  function returnWordsForSayHello(ctx, model, next) {
    //   var status = ctx.res.statusCode;
    //   if (status && status === 200) {
    //     status = 201;
    //   }
    //   ctx.res.set('Content-Location', 'the internet');
    //   ctx.res.status(status).end();
    // console.log("ctx.result", ctx.result, ctx.methodString);
    // console.log("methodname", ctx.methodString);
    if (Array.isArray(ctx.result)) {
      // console.log("ctx.result is array");
      // console.log("res headers", ctx.res);
      // ctx.result[0].words.find().then(val => {
      //   ctx.result = val;
      //   console.log("ctx.args.filter", ctx.args.filter, ctx.args);
      let count = ctx.result[1];
      ctx.result = ctx.result[0];
      let skip = 0;
      let limit = 10;

      if (ctx.args && ctx.args.filter) {
        limit = ctx.args.filter.limit;
        skip = ctx.args.filter.skip;
      }
      let last = Math.min(skip + limit, count);
      console.log("ctx.args.filter", ctx.args.filter);

      ctx.res.set("content-range", `words ${skip}-${last}/${count}`);
      //   next();
      // });

      next();
      //ctx.result = ctx.result[0].words;
      // console.log(ctx.result[0].words.map(x => x.toJSON()));
      // if (Array.isArray(ctx.result[0].words)) {
      //   ctx.result = ctx.result[0].words;
      // }
    }
    //ctx.res.set('X-Total-Count',10);
    else {
      next();
    }
  }

  app.models.Wordbook.afterRemote("helloWords", returnWordsForSayHello);
  //app.models.ModelTwo.afterRemote('**', modifyResponse);
  //reference from this page
  //https://loopback.io/doc/en/lb3/Include-filter.html
  var Wordbook = app.models.Wordbook;
  Wordbook.scope("sayhello", {
    include: ["words"],
    where: { name: "new book1" }
  });
};
