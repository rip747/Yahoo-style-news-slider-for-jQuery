/****************************************************************************
Accessible News Slider

Author:
Brian Reindel, modified and adapted by Andrea Ferracani

Author URL:
http://blog.reindel.com, http://www.micc.unifi.it/ferracani

License:
Unrestricted. This script is free for both personal and commercial use.
*****************************************************************************/
(function( $ ){

	$.fn.accessNews = function(settings){
		
		var defaults = {
			// title for the display
			headline: "TODAY NEWS:"
			// ?
			,speed: "normal"
			// number of slides to advance when pagnating
			,slideBy: 2
			// a valid jquery ui date format
			,dateFormat: "MM dd yy"
		};
		
		settings = $.extend(defaults, settings);		
		
		return this.each(function(){
			var $this = $(this);
			methods.run( $this , settings );
		});
		
	};
	
	var methods = {};
	
	methods.formatDate = function( format ){
		return $.datepicker.formatDate( format, new Date() );
	}
	
	methods.draw = function ($this, settings){
		var ul = $( "ul", $this );
		var li = ul.children();
		var firstli = $( "li:eq(0)", ul);
		var firstimg = $( "img", firstli );
		
		var container = "<div id=\"container\"></div>";
		var nextBackLinks = "<span class=\"back\"><a href=\"#\" title=\"Back\">&lt;&lt; Back</a></span> <span class=\"next\"><a href=\"#\" title=\"Next\">Next &gt;&gt;</a></span>";
		var date = $("<div></div>");
		var _date = ["<p class='date'><strong>", settings.headline, "</strong> ", methods.formatDate(settings.dateFormat), "</p>"].join("");
		var viewAll = [ "<div class=\"view_all\"><span class=\"count\">", settings.headline, " - ", li.length, " total</span>", nextBackLinks ,"</div>" ].join( "" );
		var img = $('<img></img>');
		var para = $('<div></div>');
		
		
		ul.before( container );
		ul.after( viewAll );
		date.appendTo("#container").html(_date);
		
		img.appendTo("#container");
		img.attr('src', firstimg.attr('src'));
		para.appendTo("#container");
		para.html("<h1>" +  $('a.title', firstli ).text() + "</h1>" + "<p id='paraText'>" + $('p.description', firstli).html() + "</p>");
		firstli.addClass('selected');
	}
	
	methods.run = function( $this, settings){
		
		var ul = $( "ul:eq(0)", $this );
		var li = ul.children();
		
		methods.draw ($this, settings);
		
		var $next = $( ".next > a", $this );
		var $back = $( ".back > a", $this );
		
		if ( li.length > settings.slideBy )
		{
			var liWidth = $( li[0] ).width();
			var animating = false;
			ul.css( "width", ( li.length * liWidth ) );
			
			$next.click(function()
			{
				if ( !animating )
				{
					animating = true;
					offsetLeft = parseInt( ul.css( "left" ) ) - ( liWidth * settings.slideBy );
					if ( offsetLeft + ul.width() > 0 ){
						$back.show();
						ul.animate({
							left: offsetLeft
						}, settings.speed, function(){
							if ( parseInt( ul.css( "left" ) ) + ul.width() <= liWidth * settings.slideBy ) {}
						});
					}
					animating = false;
				}
				return false;
			});
			
			$back.click(function()
			{
				if ( !animating )
				{
					animating = true;
					offsetRight = parseInt( ul.css( "left" ) ) + ( liWidth * settings.slideBy );
					if ( offsetRight + ul.width() <= ul.width() )
					{
						$next.show();
						ul.animate({
							left: offsetRight
						}, settings.speed, function()
						{
							if ( parseInt( ul.css( "left" ) ) == 0 ) {}
						});
					}
					animating = false;
				}
				return false;
			});
		}

		li.hover(function ()
		{
			li.removeClass('selected');
			var current = $(this);
			current.addClass('selected');
			img.attr('src', current.find('img').attr('src'));
			para.html("<h1>" +  $('.title', current).text() + "</h1>" + "<p id='paraText'>" + $('.description', current).html() + "</p>");
		}, function ()
		{
			current.parent().css('backgroundColor', 'transparent');
		});
		
	};
	
	
})( jQuery );