(function(global, $) {

  //'new' an object; this fn return a new object created by calling new on Greetr.init
  var Greetr = function (firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);
  };

  //hidden within the scope of IIFE and never accessible from outsite the library
  var supportedLangs = ['en',  'es', 'ua'];

  //informal greeting
  var greetings = {
    en: 'Hello',
    es: 'Hola',
    ua: 'Привіт'
  };

  //formal greeting
  var formalGreetings = {
    en: 'Greetings',
    es: 'Saludos',
    ua: 'Вітаю'
  };

  //logger messages
  var logMessages = {
    en: 'Logged in',
    es: 'Inicio sesion',
    ua: 'Зареєструвало'
  };

  //prototype of a Greetr.init constructor function (holds mehtods to save memory space)
  Greetr.prototype = {

    //this refers to the calling object at execution time
    fullName: function () {
      return this.firstName + ' ' + this.lastName;
    },
    //check if the valid language was passed
    validate: function () {
      if (supportedLangs.indexOf(this.language) === -1) {
        throw 'Invalid language';
      }
    },
    //retrieve messages from object by refering to properties
    greeting: function () {
      return greetings[this.language] + ' ' + this.firstName + '!';
    },
    formalGreeting: function () {
      return formalGreetings[this.language] + ', ' + this.fullName();
    },
    //chainable methods return their own containing object
    greet: function(formal) {
      var msg;

      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting()
      }

      if (console) {
        console.log(msg);
      }
      //this refers to the calling object at execution time
      //makes the method chainable
      return this;
    },
    log: function () {
      if (console) {
        console.log(logMessages[this.language] + ': ' + this.fullName())
      }
      return this;
    },
    setLang: function(lang) {
      this.language = lang;
      this.validate();
      return this;
    },
    jQUpdateSelector: function(selector, formal) {
      if(!$) {
        throw 'jQuery not loaded';
      }
      if (!selector) {
        throw 'Missing jQuery selector'
      }
      var msg;

      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting()
      }

      $(selector).html(msg);
      return this;
    }


  };
  //the constructor function that creates the actual object, allowing us to create an new instanse of this class wihout using new
  Greetr.init = function (firstName, lastName, language) {

    var self = this;

    self.firstName = firstName !== undefined ? firstName : '';
    self.lastName = lastName !== undefined ? lastName : '';
    self.language = language !== undefined ? language : 'en';

    this.validate();

  }
  //trick borrowed from jQuery library; prototype property of constructor function points to Greetr.prototype for convenience in typing
  Greetr.init.prototype = Greetr.prototype;

  //attaching out Greetr to the global object, and providing an alias for it
  global.Greetr = global.G$ = Greetr;

}(window, jQuery));