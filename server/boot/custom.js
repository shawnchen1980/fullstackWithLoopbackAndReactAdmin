module.exports = function(app) {

    function modifyResponse(ctx, model, next) {
    //   var status = ctx.res.statusCode;
    //   if (status && status === 200) {
    //     status = 201;
    //   }
    //   ctx.res.set('Content-Location', 'the internet');
    //   ctx.res.status(status).end();
      console.log("ctx.result",ctx.result,ctx.methodString);
      //ctx.res.set('X-Total-Count',10);
      next();
    }
  
    app.models.Wordbook.afterRemote('**', modifyResponse);
    //app.models.ModelTwo.afterRemote('**', modifyResponse);
  };