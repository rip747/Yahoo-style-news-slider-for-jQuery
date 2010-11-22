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
		var li = $this.children();
		var firstli = $("li:eq(0)", $this);
		var firstimg = $( "img", firstli );
		
		methods.initContainer($this);

		var nextBackLinks = "<span class=\"back\"><a href=\"#\" title=\"Back\">&lt;&lt; Back</a></span> <span class=\"next\"><a href=\"#\" title=\"Next\">Next &gt;&gt;</a></span>";
		var _date = ["<p class='date'><strong>", settings.headline, "</strong> ", methods.formatDate(settings.dateFormat), "</p>"].join("");
		var date = $("<div></div>").html(_date);
		var viewAll = [ "<div class=\"view_all\"><span class=\"count\">", settings.headline, " - ", li.length, " total</span>", nextBackLinks ,"</div>" ].join( "" );
		var img = $('<img></img>');
		var para = $('<div></div>');
		
		$this.after( viewAll );
		img.attr('src', firstimg.attr('src'));
		para.html("<h1>" +  $('a.title', firstli ).text() + "</h1>" + "<p id='paraText'>" + $('p.description', firstli).html() + "</p>");
		
		methods.setContainer($this, date);
		methods.setContainer($this, img);
		methods.setContainer($this, para);
		
		firstli.addClass('selected');
	}
	
	methods.initContainer = function (context){
		context.wrap("<div class=\"accessible_news_slider business_as_usual\"></div>");
		context.before("<div class=\"container\"></div>");
	}
	
	methods.setContainer = function (context, content){
		var container = methods.getContainer(context);
		container.append(content);
	}
	
	methods.getContainer = function (context){
		var container = context.prev("div.container");
		return container;
	} 
		
	methods.run = function( $this, settings){
		
		var li = $this.children();
		
		methods.draw ($this, settings);
		
		var viewAll = $this.next("div.view_all");		
		var $next = $( ".next > a", viewAll );
		var $back = $( ".back > a", viewAll );

		if ( li.length > settings.slideBy )
		{
			var liWidth = $( li[0] ).width();
			var animating = false;
			$this.css( "width", ( li.length * liWidth ) );
			$next.click(function()
			{
				if ( !animating )
				{
					animating = true;
					offsetLeft = parseInt( $this.css( "left" ) ) - ( liWidth * settings.slideBy );
					if ( offsetLeft + $this.width() > 0 ){
						$back.show();
						$this.animate({
							left: offsetLeft
						}, settings.speed, function(){
							if ( parseInt( $this.css( "left" ) ) + $this.width() <= liWidth * settings.slideBy ) {}
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
					offsetRight = parseInt( $this.css( "left" ) ) + ( liWidth * settings.slideBy );
					if ( offsetRight + $this.width() <= $this.width() )
					{
						$next.show();
						$this.animate({
							left: offsetRight
						}, settings.speed, function()
						{
							if ( parseInt( $this.css( "left" ) ) == 0 ) {}
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