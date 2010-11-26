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
			headline: "TODAY NEWS:",
			// ?
			speed: "normal",
			// number of slides to advance when pagnating
			slideBy: 4,
			// a valid jquery ui date format
			dateFormat: "MM dd yy",
			// slideshow interval
			slideShowInterval: 5000
		};
		
		// call jquery-ui to format the date display
		var formatDate = function(format){
			return jQuery.datepicker.formatDate(format, new Date());
		}
		
		return this.each(function(settings){
			settings = jQuery.extend(defaults, settings);
			var _this = jQuery(this);
			var lis = _this.children();
			var intervalId;
			
			var container = {
			
				_wrapper: "<div class=\"accessible_news_slider business_as_usual\"></div>",
				_container: "<div class=\"container\"></div>",
				_date: jQuery("<div class='date'></div>").html(["<p><strong>", settings.headline, "</strong> ", formatDate(settings.dateFormat), "</p>"].join("")),
				_content: jQuery("<div class='content'></div>"),
				_first: jQuery(lis[0]),
				
				init: function(){
					// wrap the ul with our div class and assigned theme
					_this.wrap(this._wrapper);
					// our container where we show the image and news item
					_this.before(this._container);
					// set the width of the container
					_this.css("width", (lis.length * this._first.width()));
					this.append(this._date);
					this.append(this._content);
					this.set(this._first);
				},
				
				append: function(content){
					this.get().append(content);
				},
				
				// returns the main container
				get: function(){
					return _this.prev("div.container");
				},
				
				set: function(li){
					var container = this.get();
					var _content = jQuery("div.content", container);
					var img = jQuery('<img></img>');
					var para = jQuery('<div></div>');
					li.addClass('selected');
					_content.empty();
					img.attr('src', jQuery('img', li).attr('src'));
					var title = jQuery('p.title a', li);
					title = title.attr('title') || title.text();
					para.html("<h1>" + title + "</h1>" + "<p class='paraText'>" + jQuery('p.description', li).html() + "</p>");
					_content.append(img);
					_content.append(para);
				}
				
			};
			
			var prevNext = {
			
				_viewAll: ["<div class=\"view_all\"><div class=\"count\"><span>", lis.length, " total</span></div></div>"].join(""),

				init: function(){
					_this.after(this._viewAll);
					if (lis.length > settings.slideBy) {
						this.draw();
					}
				},
				
				draw: function(){
				
					var animating = false;
					var viewAll = _this.next("div.view_all");
					var nextBackLinks = "<div class=\"controls\"><span class=\"back\"><a href=\"#\" title=\"Back\">&lt;&lt; Back</a></span><span class=\"next\"><a href=\"#\" title=\"Next\">Next &gt;&gt;</a></span></div>";
					
					viewAll.append(nextBackLinks);
					
					var _next = jQuery(".next > a", viewAll);
					var _back = jQuery(".back > a", viewAll);
					var liWidth = jQuery(lis[0]).width();
					var slideByWidth = liWidth * settings.slideBy;
					var totalWidth = liWidth * lis.length; 
					
					_next.click(function(){
						if (!animating) {
							animating = true;
							offsetLeft = parseInt(_this.css("left")) - (slideByWidth);
							if (offsetLeft + _this.width() > 0 && offsetLeft <= totalWidth) {
								_back.show();
								_this.animate({
									left: offsetLeft
								}, settings.speed);
							}
							animating = false;
						}
						return false;
					});
					
					_back.click(function(){
						if (!animating) {
							animating = true;
							offsetRight = parseInt(_this.css("left")) + (slideByWidth);
							if (offsetRight + _this.width() <= _this.width()) {
								_next.show();
								_this.animate({
									left: offsetRight
								}, settings.speed);
							}
							animating = false;
						}
						return false;
					});
					
				}
			};
			
			var slideshow = {
				
				init: function(){
					this.on();
				},
				
				on: function(){
					intervalId = setInterval( this.slide, settings.slideShowInterval );
				},
				
				off: function(){
					clearInterval(intervalId);
				},
				
				slide: function(){
					
					var current = jQuery("li.selected", _this);
					var next = current.next("li");
					if (!next.length)
					{
						next = jQuery(lis[0]);
					}
					current.removeClass('selected');
					next.addClass('selected');
					container.set(next);
				}
				
			};
			
			//setup the container
			container.init();
			// append hover every to each element to update container content
			prevNext.init();
			slideshow.init();
			lis.hover(function(){
				slideshow.off();
				lis.removeClass('selected');
				container.set(jQuery(this));
			}, function (){
				slideshow.on();
				current.parent().css('backgroundColor', 'transparent');
			})

		});
	};
})( jQuery );