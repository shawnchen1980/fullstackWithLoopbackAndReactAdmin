module.exports = function(app) {
  function returnWordsForSayHello(ctx, model, next) {
    //   var status = ctx.res.statusCode;
    //   if (status && status === 200) {
    //     status = 201;
    //   }
    //   ctx.res.set('Content-Location', 'the internet');
    //   ctx.res.status(status).end();
    console.log("ctx.result", ctx.result, ctx.methodString);
    if (Array.isArray(ctx.result)) {
      console.log("ctx.result is array");
      ctx.result[0].words.find().then(val => {
        ctx.result = val;
        next();
      });
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

  app.models.Wordbook.afterRemote("__get__sayhello", returnWordsForSayHello);
  //app.models.ModelTwo.afterRemote('**', modifyResponse);
  //reference from this page
  //https://loopback.io/doc/en/lb3/Include-filter.html
  var Wordbook = app.models.Wordbook;
  Wordbook.scope("sayhello", {
    include: "words",
    where: { name: "new book1" }
  });
};
