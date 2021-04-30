// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .


/*global $,onload*/
onload = function(){
  $('#tab-contents .tab[id != "tab1"]').hide();

  $('#tab-menu a').on('click', function(event) {
    $("#tab-contents .tab").hide();
    $("#tab-menu .active").removeClass("active");
    $(this).addClass("active");
    $($(this).attr("href")).show();
    event.preventDefault();
  });
};

/* global location */
function dropsort(){
  var page = document.sort_form.sort.value;
  location.href = page
}

document.addEventListener("turbolinks:load", function(){
  $(function(){
    $('.js-modal-open').each(function(){
      $(this).on('click',function(){
        var target = $(this).data('target');
        var modal = document.getElementById(target);
        $(modal).fadeIn();
        return false;
      });
    });
    $('js-modal-close').on('click',function(){
      $('.js-modal').fadeOut();
      return false;
    });
  });

  /*$(function(){
    $('.dungeon-img').each(function(i){
      var array = [...Array(5)].map((_, i) => i + 1);
      var number = array[Math.floor(Math.random() * array.length)];
      $(this).prop('src','/assets/dungeon/dungeon' + number + '.jpg');
    });
  });*/

  $(function(){
    $('.random-monster-img').each(function(i){
      var array = [...Array(5)].map((_, i) => i + 1);
      var number = array[Math.floor(Math.random() * array.length)];
      $(this).prop('src','/assets/monster/monster' + number + '.png');
    });
  });

  $(function(){
    $('.levelup-text').each(function(){
      var txt = $(this).html();
      $(this).html(txt.replace("LEVELUP!","<span>L</span><span>E</span><span>V</span><span>E</span><span>L</span><span>_</span><span>U</span><span>P</span><span>!</span>"));
    });
  });

  $(function(){
    setTimeout("$('.levelup-back').fadeOut('slow')", 1200
    );
  });

  $(function(){
    setTimeout("$('.clear-back').fadeOut('slow')", 3500
    );
  });

  /* global jQuery */
  jQuery.fn.exists = function(){return Boolean($('body:has(' + this.selector + ')').length > 0);};
  jQuery.fn.noExists = function(){return !this.exists();};

  /* global gon */
  $(function(){
    if (gon.goals == 0) {
      $('.goal-icon, .create-goal-link').addClass('js-bound');
    } else if (gon.goals >= 1 && gon.documents == 0) {
      $('.goal-icon, .create-goal-link').removeClass('js-bound');
      $('.create-doc-icon').addClass('js-bound');
    } else {
      $('.create-doc-icon').removeClass('js-bound');
    }
  })

  $(function(){
    $('.js-select-box').change(function(){
      var id = $(this).val();

      /*console.log(id);*/
      /*$.ajax({
      type: 'GET', // リクエストのタイプ
      url: '/goals/search', // リクエストを送信するURL
      data:  { goal_id: id }, // サーバーに送信するデータ
      dataType: 'json' // サーバーから返却される型
    });*/
    });
  });

  /*$(function(){
    $('.doc-title span').each(function(key, value){
      var text = $(value).text();
      var result = Number(text);
      console.log(result)
      console.log(key)
    });
  });*/

  $('.menu').hide();

  $(function(){
    $('.menu-icon').on('click', function(){
      $(this).next().slideToggle();
      $(this).children('p').toggleClass('active');
    });
  });

  $('#tabBoxes .tabBox[id != "tabBox1"]').hide();

  $('.tabBox a').on('click', function(event) {
    $("#tabBoxes .tabBox").hide();
    $($(this).attr("href")).show();
    event.preventDefault();
  });



});
