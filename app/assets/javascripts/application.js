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

/*global $*/
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
    $('.js-modal-close').on('click',function(){
      $('.error__message').remove();
      $('.js-modal').fadeOut();
      return false;
    });
  });

  $(function(){
    var goal_select_box = '.my-page__menu--js-select-box';

    if (gon.goals <= 3) {
      $(goal_select_box).hide();
    } else {
      $(goal_select_box).show();
    }

    $(goal_select_box).on('change',function(){
      var goal_id = $(this).val();
      var goal_edit_modal = '#modal-goal' + goal_id  + '-edit';

      $(goal_edit_modal).fadeIn();
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
      $('.levelup__text').html("<span>L</span><span>E</span><span>V</span><span>E</span><span>L</span><span>_</span><span>U</span><span>P</span><span>!</span>");
  });

  $(function(){
    setTimeout("$('.levelup__back').fadeOut('slow')", 1200
    );
  });

  $(function(){
    setTimeout("$('.clear__back').fadeOut('slow')", 3500
    );
  });

  /* global gon */
  $(function(){
    if (gon.goals == 0) {
      $('.my-page__menu--icon--goal, my-page__link--create-goal').addClass('js-bound');
    } else if (gon.goals >= 1 && gon.documents == 0) {
      $('.my-page__menu--icon--goal, my-page__link--create-goal').removeClass('js-bound');
      $('.my-page__link--create-doc-img').addClass('js-bound');
    } else {
      $('.my-page__link--create-doc-img').removeClass('js-bound');
    }
  });

  $(function () {
    $('.js-doc-search-select').on('change', function () {
      var category = $(this).val();

      $.ajax({
        type: 'GET',
        url: '/documents',
        data:  { category: category },
        dataType: 'html'
      })

      .done(function (data) {
        $('.js-card').html(data);
      })

      .fail(function() {
        alert("絞り込みに失敗しました。ページを再読み込みして下さい。");
      });
    });
  });

  $('.my-page__menu').hide();

  $(function(){
    $('.my-page__menu--icon').on('click', function(){
      $(this).next().slideToggle();
      $(this).children('.my-page__menu--text').toggleClass('active');
    });
  });

  $(function(){
    $('.js-withdraw-confirm').hide();
  });

  $(function(){
    $('.js-withdraw-btn').on('click', function(){
      $('.js-user-edit').hide();
      $('.js-withdraw-confirm').show();
      event.preventDefault();

      $('.js-user-edit-btn').on('click', function(){
        $('.js-user-edit').show();
        $('.js-withdraw-confirm').hide();
        event.preventDefault();
      });
    });
  });

  $('#tabBoxes .tabBox[id != "tabBox1"]').hide();
  $('#js-message .message[id != "message1"]').hide();

  $('.tabBox a').on('click', function(event) {
    $('#tabBoxes .tabBox').hide();
    $('#js-message .message').hide();
    $($(this).attr("href")).show();
    $($(this).attr("class")).show();
    event.preventDefault();
  });

  $('.js-todo-lists-search').hide();

  $('.js-todo-lists__form').hide();

  $('.js-create-todo-lists__icon').on('click', function(event) {
    $(this).toggleClass('active-form');
    $('.js-todo-lists__form').show();

    if($(this).hasClass('active-form')) {
      $(this).prop('src','/assets/icon/quill-pen.png');
    } else {
      $(this).prop('src','/assets/icon/create-icon.png');
      $('.js-todo-lists__form').hide();
      $('#todo_list_body').val("");
      $('.error__message').remove();
    }
  });

  $('.js-text_field').on('keyup', function () {
    var word = $.trim($(this).val());

    $.ajax({
      type: 'GET',
      url: '/todo_lists/searches',
      data:  { word: word },
      dataType: 'json'
    })

    .done(function (data) {
      $('.js-todo-lists li').remove();

      $(data).each(function(i,todo_list) {
        $('.js-todo-lists').append(`<li>${todo_list.body}</li>`);
        /*$('.js-todo-lists').append(`<%= j(render ${todo_list}) %>`);*/
      });
    })

    .fail(function() {
      alert("検索に失敗しました。ページを再読み込みして下さい。");
    });
  });



});
