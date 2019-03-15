"use strict";

module.exports = function(Wordbook) {
  // Wordbook.beforeRemote('create', function(ctx, instance, next) {
  //     console.log('before create');
  //     //override created
  //     ctx.args.data.created = new Date();
  //     //set creator to current user
  //     ctx.args.data.ownerId = ctx.req.accessToken.userId;

  //     next();
  // });
  /**
   * create a new wordbook possibly with some words in it.
   * @param {string} name the required name of a wordbook
   * @param {array} words an array of new words for the newly created wordbook
   * @param {Function(Error, object)} callback
   */

  Wordbook.appCreate = function(name, words = [], options, callback) {
    var data = {};
    // TODO
    var app = Wordbook.app;
    var Word = app.models.Word;
    const token = options && options.accessToken;
    const userId = token && token.userId;
    // Get the current access token

    console.log("userId", userId);
    data.ownerId = userId;
    Wordbook.findOrCreate({ name, ownerId: userId })
      .then(res => {
        console.log("instance,created,words", res, words);
        data.name = res[0].name;
        data.id = res[0].id;
        return Promise.all(
          words.map(v => res[0].words.create({ spelling: v.spelling }))
        );
        //   console.log("warr", warr);
        //   callback(null, { ...res[0], words: warr });
      })
      .then(arr => {
        console.log(arr);
        data.words = arr;
        console.log("data", data);
        callback(null, data);
      });
  };

  /**
   * return words from a certain wordbook, which could be used by visitor users
   * @param {object} filter the filter for the words
   * @param {Function(Error, array)} callback
   */

  Wordbook.helloWords = function(filter, callback) {
    var data = [];
    var app = Wordbook.app;
    var WordMapping = app.models.WordMapping;
    console.log("filter from helloWords", filter);
    Wordbook.findOne({ where: { name: "new book1" } })
      .then(book => {
        console.log(book);
        console.log(filter.where);
        return Promise.all([
          book.words.find(filter),
          WordMapping.count({ bookId: book.id })
        ]);
      })
      .then(results => {
        console.log("results", results);
        callback(null, results);
      });

    console.log("for filter", filter);
    // TODO
    // callback(null, data);
  };
};
