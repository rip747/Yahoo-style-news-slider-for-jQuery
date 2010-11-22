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
			methods.init( $this , settings );
		});
		
	};
	
	var methods = {};
	
	// call jquery-ui to format the date display
	methods.formatDate = function( format ){
		return $.datepicker.formatDate( format, new Date() );
	}
	
	// draws and sets up the prev / next links if need be
	methods.prevNext = function($this, settings){
		var li = $this.children();
		
		// only draw prev and next links if need be
		if ( li.length <= settings.slideBy )
		{
			return;
		}
		var animating = false;
		var viewAll = $this.next("div.view_all");
		var nextBackLinks = "<span class=\"back\"><a href=\"#\" title=\"Back\">&lt;&lt; Back</a></span><span class=\"next\"><a href=\"#\" title=\"Next\">Next &gt;&gt;</a></span>";

		viewAll.append(nextBackLinks);
				
		var $next = $( ".next > a", viewAll );
		var $back = $( ".back > a", viewAll );
		var liWidth = $( li[0] ).width();
		
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
	
	// sets the content area of the container
	methods.content = function ($this, li){
		var container = methods.get($this);
		var _content = $("div.content", container);
		var img = $('<img></img>');
		var para = $('<div></div>');
		li.addClass('selected');		
		_content.empty();
		img.attr('src', $('img', li).attr('src'));
		para.html("<h1>" +  $('a.title', li ).text() + "</h1>" + "<p class='paraText'>" + $('p.description', li).html() + "</p>");
		_content.append(img);
		_content.append(para);
	}
	
	// sets up the main container to display
	methods.setup = function (context, settings){
		var li = context.children();
		var firstli = $("li:eq(0)", context);
	
		context.wrap("<div class=\"accessible_news_slider business_as_usual\"></div>");
		context.before("<div class=\"container\"></div>");
	
		var _date = ["<p><strong>", settings.headline, "</strong> ", methods.formatDate(settings.dateFormat), "</p>"].join("");
		var date = $("<div class='date'></div>").html(_date);
		var viewAll = [ "<div class=\"view_all\"><span class=\"count\">", li.length, " total</span></div>" ].join( "" );
		var content = $("<div class='content'></div>");
		
		methods.set(context, date);
		methods.set(context, content);
		methods.content(context, firstli);
		
		context.after( viewAll );
		
		methods.prevNext(context, settings);
	}
	
	// append some content to the main container
	methods.set = function (context, content){
		var container = methods.get(context);
		container.append(content);
	}
	
	// returns the main container
	methods.get = function (context){
		var container = context.prev("div.container");
		return container;
	} 
	
	// call to run the plugin
	methods.init = function( $this, settings){
		
		var li = $this.children();
		
		methods.setup($this, settings);

		li.hover(function ()
		{
			li.removeClass('selected');
			methods.content($this, $(this));
		}, function ()
		{
			current.parent().css('backgroundColor', 'transparent');
		});
		
	};
	
})( jQuery );