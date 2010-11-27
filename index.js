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
			title: "TODAY NEWS:",
			// subtitle for the display
			subtitle: "November 27 2010",
			// number of slides to advance when pagnating
			slideBy: 4,
			// the speed for the pagination
			speed: "normal",
			// slideshow interval
			slideShowInterval: 5000,
			// delay before slide show begins
			slideShowDelay: 5000,
			// theme
			theme: "business_as_usual"
		};
		
		// call jquery-ui to format the date display
		var formatDate = function(format){
			return jQuery.datepicker.formatDate(format, new Date());
		}
		
		return this.each(function(){
			
			settings = jQuery.extend(defaults, settings);
			var _this = jQuery(this);
			var stories = _this.children();
			var intervalId;
			
			var container = {
			
				_wrapper: "<div class=\"accessible_news_slider " + settings.theme + "\"></div>",
				_container: "<div class=\"container\"></div>",
				_headline: jQuery("<div class='headline'></div>").html(["<p><strong>", settings.title, "</strong> ", settings.subtitle, "</p>"].join("")),
				_content: jQuery("<div class='content'></div>"),
				_first: jQuery(stories[0]),
				
				init: function(){
					// wrap the ul with our div class and assigned theme
					_this.wrap(this._wrapper);
					// our container where we show the image and news item
					_this.before(this._container);
					// set the width of the container
					_this.css("width", (stories.length * this._first.width()));
					this.append(this._headline);
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
				
				set: function(story){
					var container = this.get();
					var _content = jQuery("div.content", container);
					var img = jQuery('<img></img>');
					var para = jQuery('<div></div>');
					story.addClass('selected');
					_content.empty();
					img.attr('src', jQuery('img', story).attr('src'));
					var title = jQuery('p.title a', story);
					title = title.attr('title') || title.text();
					para.html("<h1>" + title + "</h1>" + "<p class='paraText'>" + jQuery('p.description', story).html() + "</p>");
					_content.append(img);
					_content.append(para);
				}
				
			};
			
			var pagination = {
			
				loaded: false,
				_animating: false,
				_totalPages: 0,
				_currentPage: 1,
				_storyWidth: 0,
				_slideByWidth: 0,
				_totalWidth: 0,

				init: function(){
					if (stories.length > settings.slideBy) {
						this._totalPages = Math.ceil(stories.length / settings.slideBy);
						this._storyWidth = jQuery(stories[0]).width();
						this._slideByWidth = this._storyWidth * settings.slideBy;
						this._totalWidth = this._storyWidth * stories.length;
						this.draw();
						this.loaded = true;
					}
				},
				
				draw: function(){
				
					var _viewAll = jQuery("<div class=\"view_all\"></div>").html(["<div class=\"count\"><span>", stories.length, " total</span></div><div class=\"controls\"><span class=\"back\"><a href=\"#\" title=\"Back\">&lt;&lt; Back</a></span><span class=\"next\"><a href=\"#\" title=\"Next\">Next &gt;&gt;</a></span></div>"].join(""));
					_this.after(_viewAll);
					
					var _next = jQuery(".next > a", _viewAll);
					var _back = jQuery(".back > a", _viewAll);
					
					_next.click(function(){
						
						var page = pagination._currentPage + 1;
						pagination.to(page);
						return false;
						
					});
					
					_back.click(function(){
						
						var page = pagination._currentPage - 1;
						pagination.to(page);
						return false;
						
					});

				},
				
				to: function(page){

					if(this._animating){
						return;
					}

					this._animating = true;
					
					if(page >= this._totalPages)
					{
						page = this._totalPages;
					}
					
					if (page <= 1)
					{
						page = 1;
					}

					var _move = false;
					var _left = parseInt(_this.css("left"));
					var _offset = (page * this._slideByWidth) - this._slideByWidth;
					_left = (_offset * -1);
						
					_this.animate({
						left: _left
					}, settings.speed);

					this._currentPage = page;
					this._animating = false;
						
				}

			};
			
			var slideshow = {
				
				init: function(){
					this.attach();
					setTimeout(function(){
						slideshow.on();
					}, settings.slideShowDelay);
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
					var page = 0;
					var storyIndex = 0;
					var storyMod = 0;
					var _page = 0;
					if (!next.length)
					{
						next = jQuery(stories[0]);
						page = 1;
					}
					storyIndex = stories.index(next);
					storyMod = (storyIndex) % settings.slideBy;
					
					if (storyMod === 0){
						page = (Math.ceil(storyIndex / settings.slideBy)) + 1;
					}

					current.removeClass('selected');
					container.set(next);
					if(page > 0){
						pagination.to(page);
					}
				},
				
				attach: function(){
					
					var that = jQuery(_this).parent("div.accessible_news_slider");
					that.hover(function(){
						// pause the slideshow on hover
						slideshow.off();
					}, function (){
						// resume slideshow on mouseout
						slideshow.on();
					});
					
				}
				
			};
			
			//setup the container
			container.init();
			// pagination setup
			pagination.init();
			// slideshow setup
			slideshow.init();
			// append hover every to each element to update container content
			stories.hover(function(){
				stories.removeClass('selected');
				// set container contect to hovered li
				container.set(jQuery(this));
			}, function (){
				current.parent().css('backgroundColor', 'transparent');
			});

		});
	};
})( jQuery );