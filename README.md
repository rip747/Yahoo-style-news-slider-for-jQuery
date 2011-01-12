#Yahoo style news slider for jQuery

All credit for this plugin goes to:

Brian Reindel (http://blog.reindel.com)
Andrea Ferracani (http://www.micc.unifi.it/ferracani)

You can read more about the plugin at Andrea's blog:

http://www.micc.unifi.it/ferracani/blog/web-applications/yahoo-style-news-slider-jquery-plugin

## About

Basically mimics Yahoo's (http://www.yahoo.com) content slider.

## Configuration

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
	theme: "business_as_usual",
	// allow the pagination to wrap continuously instead of stopping when the beginning or end is reached 
	continuousPaging : true

##Installation

Load the desired theme, jquery and plugin within your page's head section: 

	<!-- base theme css files -->
	<link type="text/css" rel="stylesheet" href="themes/base.css"/>
	<!-- desired theme -->
	<link type="text/css" rel="stylesheet" href="themes/default/theme.css"/>
	<!-- jquery itself -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
	<!-- plugin -->
	<script type="text/javascript" src="jquery.accessible-news-slider.js"></script>

##Usage

	// use default
	jQuery('#newsslider').accessNews();
	
	// passing in options
	jQuery('#newsslider2').accessNews({
		title : "BREAKING NEWS:",
		subtitle:"stories from the internet",
		speed : "slow",
		slideBy : 4,
		slideShowInterval: 10000,
		slideShowDelay: 10000
	});
	
## Demos

Demos can be found [here](http://rip747.github.com/Yahoo-style-news-slider-for-jQuery/).