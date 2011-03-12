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
	// number of slides to advance when paginating
	slideBy: 4,
	// the speed for the pagination
	speed: "normal",
	// slideshow interval
	slideShowInterval: 5000,
	// delay before slide show begins
	slideShowDelay: 5000,
	// theme
	theme: "default",
	// allow the pagination to wrap continuously instead of stopping when the beginning or end is reached 
	continuousPaging : true,
	// selector for the story title
	contentTitle: "h3",
	// selector for the story subtitle
	contentSubTitle: "abbr",
	// selector for the story description
	contentDescription: "p",
	// function to call when the slider first initializes
	onLoad: null,
	// function to call when the slider is done being created
	onComplete: null

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

## Requirements

Each story that you want in the slider must have contain at a minimum:

1. an image wrapped in a link to the story page.
2. a container for the title
3. a container for the description

    <ul id="newsslider">
        <li>
            <a href="http://www.mmm.unifi.it/primo-piano/intervista-con-luca-farulli"><img src="graphics/luca-farulli-master-multimedia.jpg" width="82" height="30" alt="Luca Farulli" /></a>
            <h3><a href="http://www.mmm.unifi.it/primo-piano/intervista-con-luca-farulli">Luca Farulli interview</a></h3>
            <p>Luca Farulli, professor of Aesthetics at the Academy of Fine Arts of Venice, is the owner of the course of aesthetics of digital art and coordinator of the workshop for the Master of Arts and Multimedia <br /><a href="http://www.mmm.unifi.it/primo-piano/intervista-con-luca-farulli"> &raquo; read more</a></p>
        </li>
        <li>
            <a href="http://www.mmm.unifi.it/interviste/intervista-con-diego-mencarelli"><img src="graphics/diego-mencarelli-master-multimedia.jpg" width="82" height="30" alt="Diego Mencarelli" /></a>
            <h3><a href="http://www.mmm.unifi.it/interviste/intervista-con-diego-mencarelli" title="This should be the title text">Diego Mencarelli interview</a></h3>
            <p>Diego Mencarelli, new media consultant at Unicoop Tirreno, co-teaches a course on human-machine interface design, in particular the module dedicated to accessibility and web W3C standards <br /><a href="http://www.mmm.unifi.it/interviste/intervista-con-diego-mencarelli">&raquo; read more</a></p>
        </li>
    </ul>
	
## Demos

Demos can be found [here](http://rip747.github.com/Yahoo-style-news-slider-for-jQuery/).

## Themes

This plugin was built with themes in mind to make it easy for you to customize it for the look and feel of your site. Because of this, there are several classes that the plugin utilizes. Below is a list of those classes and a description of what each is for.

### Classes

_jqans-wrapper_

this is the main div that will encapsulate the plugin.

_jqans-container_

main container for encapsulating the headline and and story content

_jqans-headline_

container for the headline and subtitle of the story

_jqans-content_

container for the story content (image and blurb)

_jqans-stories_

wraps around the ul containing the stories that you want the slider to showcase

_jqans-stories-selector_

used to indicate which story is selected to shown in the slider

_jqans-pagination_

container for page count and previous and next links

_jqans-pagination-count_

wrapper for the parts that make up the pagination counter

_jqans-pagination-count-start_

story position for the start of page

_jqans-pagination-count-end_

story position for the end of the page

_jqans-pagination-count-total_

total number of stories in the slider

_jqans-pagination-controls_

wrapper for the previous and next controls

_jqans-pagination-controls-back_

wrapper containing the anchor that controls moving to back a  page

_jqans-pagination-controls-next_

wrapper containing the anchor that controls moving to the next page