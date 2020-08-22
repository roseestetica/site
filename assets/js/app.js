
var estado = 0,
vw = $(window).width();
$(".nav-mb li a").click(function() {
var delay_time = 0;
$("#hamburger").toggleClass('open');
if (estado === 0) {
TweenMax.to($("#bg-menu-mobile"), 1, {
  x:-vw,
  ease: Expo.easeInOut
});

$(".nav-mb li").each(function() {
  TweenMax.to($(this), 1.2, {
    x:-vw,
    scaleX: 1,
    delay: delay_time,
    ease: Expo.easeInOut
  });
  delay_time += .04;
});
estado = 1;
} else {
estado = 0;
TweenMax.to($("#bg-menu-mobile"), 1.2, {
  x:0,
  ease: Expo.easeInOut
});
$(".nav-mb li").each(function() {
  TweenMax.to($(this), 1, {
    x:0,
    delay: delay_time,
    ease: Expo.easeInOut
  });
  delay_time += .02;
});
}
});

var estado = 0,
vw = $(window).width();
$("#hamburger").click(function() {
var delay_time = 0;
$(this).toggleClass('open');

if (estado === 0) {
TweenMax.to($("#bg-menu-mobile"), 1, {
  x:-vw,
  ease: Expo.easeInOut
});

$(".nav-mb li").each(function() {
  TweenMax.to($(this), 1.2, {
    x:-vw,
    scaleX: 1,
    delay: delay_time,
    ease: Expo.easeInOut
  });
  delay_time += .04;
});
estado = 1;
} else {
estado = 0;
TweenMax.to($("#bg-menu-mobile"), 1.2, {
  x:0,
  ease: Expo.easeInOut
});
$(".nav-mb li").each(function() {
  TweenMax.to($(this), 1, {
    x:0,
    /*
    x:vw,
    scaleX: 2.3,
    */
    delay: delay_time,
    ease: Expo.easeInOut
  });
  delay_time += .02;
});
}
});

var myFullpage = new fullpage('#fullpage', {
  anchors: ['home', 'servicos', 'horarios', 'contato'],
  menu: '#menu',
  continuousVertical: true,
});




/*
 * typethis v1.0
 * https://github.com/alejandromur/typethis
 *
 * Copyright 2016, alejandro@mamutlove.es
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 */

;(function( window, document, undefined ){

  // Constructor ------------------------------

  this.Typethis = function(){

      // DOM Elements
      this.output_wrapper = null;
      this.output = null;
      this.cursor = null;

      // Control flow values
      this.words = null;
      this.repetitions = null;
      this.repetition = 0;
      this.letters = null;
      this.timeout = null;

      // Self reference
      that = this;

      // Determine proper prefix ----------------
      this.transitionEnd = transitionSelect();

      // Options (defaults) ---------------------
      var defaults = {
          autoWriting: true,
          className: ".typethis",
          delay: 200,
          loop: true,
          speed : [200,275],
          words: "www.mamutlove.com"
      };

      if ( arguments[0] && typeof arguments[0] === "object" ) {
          this.options = extendDefaults( defaults, arguments[0] );
      }

      if(this.options.autoWriting === true) this.initialize();

  };


  // Public Methods ----------------------------

  Typethis.prototype = {

      initialize : function(){

          // Prepare content
          setContent.call(this);

          // setting elements
          createElements.call(this);

          // run script
          this.run();
      },

      run : function(){

          if( this.repetition < this.repetitions ){

              this.write();

          }else{

              if( this.options.loop ){
                  this.repetition = 0;
                  this.run();
              }else{
                  return false;
              }
          }

      },

      write : function(){

          function addLetter(word){

              var counter_max = getLength(word);

              if( counter <= counter_max ) {
                  that.output.innerHTML += word[counter];
                  counter++;
                  clearTimeout(that.timeout);
                  setTimer();
              }else{
                  that.stop();
                  toggleCursor(true);
                  listen(that.transitionEnd);
              }
          }

          function setTimer(){
              that.timeout = setTimeout(function() {
                  addLetter(that.letters[that.repetition]);
              }, getSpeed(that.options.speed[0],that.options.speed[1]));
          }

          var counter = 0;
          setTimer();
      },

      stop : function(){
          clearTimeout(this.timeout);
      }

  };


  // Private Methods ---------------------------

  function getSpeed(min, max){
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getLength(w){
      return w.length-1;
  }

  function getElement(){
      return this.output;
  }

  function getRepetitions(words){
      if( typeof words === "string" ){
          return 1;
      }else{
          return words.length;
      }
  }

  function breakWords(p){
      var _array = [];
      if( typeof p === "string" ){
          _array.push(p.split(""));
      }else{
          for(var i = 0, l = p.length-1; i <= l; i++){
              _array.push(p[i].split(""));
          }
      }
      return _array;
  }

  function createElements(){
      this.output_wrapper = document.querySelector(this.options.className);

      var _container = document.createElement("span");
      var _cursor = document.createElement("i");

      _container.setAttribute("class","typethis__output");
      _cursor.setAttribute("class","cursor");

      this.output_wrapper.appendChild(_container);
      this.output_wrapper.appendChild(_cursor);

      this.cursor = document.querySelector(".cursor");
      this.output = document.querySelector(".typethis__output");
  }

  function setContent(){
      this.words = this.options.words;
      this.repetitions = getRepetitions(this.words);
      this.letters = breakWords(this.words);

      this.delay = this.options.delay;
      this.loop = this.options.loop;
  }

  function toggleCursor(control){
      if( control ){
          if( (that.repetition+1) === that.repetitions && !that.loop ){
              return false;
          }else{
              that.cursor.classList.toggle("is-done");
          }
      }else{
          that.cursor.classList.toggle("is-done");
      }

  }

  function transitionend(){
      that.repetition++;
      deleteWord();
  }

  function deleteWord(){
      setTimeout(function(){
          that.output.innerHTML = "";
          toggleCursor();
          eventListener("remove",that.cursor,that.transitionEnd,transitionend,false);
          that.run();
      }, that.options.delay);
  }

  function listen(event){
      eventListener("add",that.cursor,event,transitionend,false);
  }

  function eventListener(action,el,e,fn,m){
      if( action === "add" ){
          el.addEventListener(e,fn,m);
      }else{
          el.removeEventListener(e,fn,m);
      }

  }


  // Utilities ---------------------------------

  function extendDefaults( source, properties ){
      var property;
      for ( property in properties ) {
          if ( properties.hasOwnProperty( property ) ) {
              source[property] = properties[property];
          }
      }
      return source;
  }

  function transitionSelect() {
      var el = document.createElement("div");
      if (el.style.WebkitTransition) return "webkitTransitionEnd";
      if (el.style.OTransition) return "oTransitionEnd";
      return 'transitionend';
  }


}( window, document ));

var t = new Typethis({
  autoWriting: true,
  delay: 600,
  loop: false,
  speed : [200,600],
  words: ["Esteticista", "Manicure", "Lash designer"]
});

$(".regular").slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});