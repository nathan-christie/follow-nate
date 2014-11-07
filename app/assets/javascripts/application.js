// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$.fn.smoothRemove = function(options){
    var defaults = {
        dur: 250,
        killEmptyParents: false,
    };
    var options = options || {};
    options = $.extend({}, defaults, options);
    var $this = $(this);
    var $parent = $this.parent();
    $this.css({
        'overflow-y':'hidden',
        'height':$this.innerHeight(),
    });

    if (options.killEmptyParents && $parent.children().length < 2){
        $parent.smoothRemove({killEmptyParents: true,})
    } else if ($this.length > 0){
        var animation = $this.animate({
            'opacity':0,
            'padding':0,
            'margin':0,
            'height':0,
        }, {dur: options.dur,
            easing: 'linear',
            complete:function(){
                $this.remove();
			    if (options.complete){
			    	console.log('looking for complete function');
			    	options.complete();
			    } else {
			    	console.log('no complete function');
			    }
    			return true;
            }
        });
    } else {
    	return false;
    }
}

function displayJson(object, options){
    var defaults = {

    };
    var options = options || {};
    var options = $.extend({}, defaults, options);

	$html = $('<div/>');

    $tabs = $('<div class="tabs" data-tab/>').appendTo($html);
    	$tab1 = $('<dd class="active"/>').appendTo($tabs);
    		$tab1_link = $('<a/>')
	    		.text('Pretty')
	    		.on('click', function(){
	    			$('.tabs, .tabs-content').children().removeClass('active');
	    			$('.tabs, .tabs-content').children(':nth-child(1)').addClass('active');
	    		}).appendTo($tab1);
    	$tab2 = $('<dd class=""/>').appendTo($tabs);
    		$tab2_link = $('<a/>')
	    		.text('Raw')
	    		.on('click', function(){
	    			$('.tabs, .tabs-content').children().removeClass('active');
	    			$('.tabs, .tabs-content').children(':nth-child(2)').addClass('active');
	    		}).appendTo($tab2);

    $content = $('<div class="tabs-content printout"/>').appendTo($html);
	    $printout = makeSheet(object, {container: '<div class="sheet-data content active" id="pretty-json"/>'}).appendTo($content);
	    $raw = $('<div class="sheet-data content" id="raw-json"/>').appendTo($content);
	    	$raw_value = $('<p class="sheet-data-row"/>').text(JSON.stringify(object, null, " ")).appendTo($raw);

	return $html;
}



function makeSheet(object, options){
    var defaults = {
    	container: '<div class="sheet-data"/>',
    	line_wrapper: '<div class="sheet-data-row"/>',
    	key_elem: '<span class="sheet-data-key">',
    	value_elem: '<span class="sheet-data-value">',
    };
    var options = options || {};
    var options = $.extend({}, defaults, options);
    var $container = $(options.container).addClass(options.container_class || '');
  	$.each(object, function(key, data){
  		var $line_wrapper = $(options.line_wrapper).appendTo($container);
  		var $key_elem = $(options.key_elem).html(key).appendTo($line_wrapper);
  		if ($.type(data) == 'object'){
  			var $data_to_print = $('<div class="sheet-data-subsheet"/>').appendTo($line_wrapper);
  			$.each(data, function(subkey, subdata){
		  		var $subline_wrapper = $(options.line_wrapper).appendTo($data_to_print);
		  		var $subkey_elem = $(options.key_elem).html(subkey).appendTo($subline_wrapper);
  				var $value_elem = $(options.value_elem).html(subdata).appendTo($subline_wrapper);
  			});
  		} else {
  			var $data_to_print= $(options.value_elem).html(data).appendTo($line_wrapper);
  		}

  	});

  	return $container;
}

function getRandomUser(){
	$.ajax({
	  url: 'http://api.randomuser.me/',
	  dataType: 'json',
	  success: function(data){
	  	var user = data.results[0].user;
	  	var first_name = user.name.first.charAt(0).toUpperCase() + user.name.first.substr(1).toLowerCase();
	  	var last_name = user.name.last.charAt(0).toUpperCase() + user.name.last.substr(1).toLowerCase();
	  	var new_user_name = ([first_name, last_name].join(' '));
	  	var $html_data = $('<div/>');
	  	$prescript = $('<p/>').html("<a href='http://api.randomuser.me/'>http://api.randomuser.me/</a> sent us all this info:").appendTo($html_data);
	  	$printout = displayJson(user).appendTo($html_data);
	  	$postscript = $('<p/>').html("* We didn't actually create a user, we just print the returned data.").appendTo($html_data);
	  	makeModalFromHtml($html_data, {title: "New Random User <b>"+new_user_name+"</b> was generated!*"});
	  }
	});
}

function makeModalFromHtml(html_data, options){
    var defaults = {
        dur: 250,
    };
    var options = options || {};
    options = $.extend({}, defaults, options);
    var $this = $(this);
	$('#standardModal').foundation('reveal', 'close').remove();
	setTimeout(function(){
		var $contents = $('<div/>').html(html_data); //temp elem
		if(options.title){
			var $title = $('<h3/>').html(options.title).prependTo($contents);
		}
		$modal_elem = $('<div/>')
			.addClass('reveal-modal')
			.attr({
				'id':'standardModal',
				'data-reveal': true,
			}).html($contents)
			.appendTo('body');
		$modal_elem.foundation('reveal', 'open');
		}, options.dur+1);
}