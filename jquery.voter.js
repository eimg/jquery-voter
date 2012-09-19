/**
 * jQuery Voter Plugin
 * Author: Ei Maung (Fairway Web)
 * License: The MIT License (MIT)
 * Usage and Demo: http://fairwayweb.com/jquery-voter-plugin/
 * Version: 0.1, 20 Sep, 2012
 */

;(function ( $, window, undefined ) {
	
	var pluginName = 'attachVoter',
		document = window.document,
		defaults = {
			"voterClass"	: "voter",
			"wrapperClass"	: "voter-wrapper",
			"upVoteClass"	: "up-vote",
			"upVoteTitle"	: "Vote Up",
			"voteCountClass": "vote-count",
			"downVoteClass"	: "down-vote",
			"downVoteTitle"	: "Vote Down",
			"disabledClass"	: "disabled",
			"undoTitle"		: "Click to Undo",
			"votedClass"	: "voted",
			"plusClass"		: "good",
			"minusClass"	: "bad",
			"upVoteChar"	: "▲",
			"downVoteChar"	: "▼",
			"useCookie"		: true,
			"doUpVote"		: function() {},
			"doDownVote"	: function() {},
			"undoUpVote"	: function() {},
			"undoDownVote"	: function() {}
		};

	function Plugin( element, options ) {
		this.element = element;
		this.options = $.extend( {}, defaults, options) ;
 
		this._defaults = defaults;
		this._name = pluginName;
		
		this.init();
	}

	Plugin.prototype.init = function () {
		var $this = this;
		var $options = this.options;
		var $element = $(this.element);

		var id = $element.data("id");

		// Voter Wrapper
		$element.wrapInner( "<div class='" + $options.wrapperClass + "'>" );

		// Create Voter
		var voter = $("<span>", {
			"class": $options.voterClass,
			"data-state": 0,
			"data-id": id
		});

		var upVoter = $("<span>", {
			
			"class": $options.upVoteClass,
			"title": $options.upVoteTitle,
			"data-id": id

		}).click(function() {

			if( voter.data("state") == 0 ) {

				// Up Vote
				$(this).addClass($options.votedClass)
					   .attr("title", $options.undoTitle);

				downVoter.addClass($options.disabledClass);

				voteCount.text( parseInt(voteCount.text()) + 1 );
				voter.data("state", 1);

				// Set cookie to be persistent this up vote
				if($options.useCookie) setCookie("voted-" + id, "1", 30);

				// Apply user callback
				$options.doUpVote(id);

			} else if ( voter.data("state") == 1 ) {

				// Undo Up Vote
				$(this).removeClass($options.votedClass)
					   .attr("title", $options.upVoteTitle);

				downVoter.removeClass($options.disabledClass);

				voteCount.text( parseInt(voteCount.text()) - 1 );
				voter.data("state", 0);

				// Remove cookie to clear this up vote
				if($options.useCookie) deleteCookie("voted-" + id);

				// Apply user callback
				$options.undoUpVote(id);

			}

			// Update vote-count class based on value
			if(parseInt(voteCount.text()) < 0) {
				voteCount.attr("class", $options.voteCountClass + " " + $options.minusClass);
			} else if (parseInt(voteCount.text()) > 0) {
				voteCount.attr("class", $options.voteCountClass + " " + $options.plusClass);
			} else {
				voteCount.attr("class", $options.voteCountClass);
			}

		}).html($options.upVoteChar).appendTo(voter);

		var voteCount = $("<span>", {

			"class": $options.voteCountClass,
			"data-id": id

		}).text("0").appendTo(voter);

		var downVoter = $("<span>", {

			"class": $options.downVoteClass,
			"title": $options.downVoteTitle,
			"data-id": id

		}).click(function(){

			if( voter.data("state") == 0 ) {

				// Down Vote
				$(this).addClass($options.votedClass)
					   .attr("title", $options.undoTitle);

				upVoter.addClass($options.disabledClass);

				voteCount.text( parseInt(voteCount.text()) - 1 );
				voter.data("state", -1);

				// Set cookie to be persistent this down vote
				if($options.useCookie) setCookie("voted-" + id, "-1", 30);

				// Apply user callback
				$options.doDownVote(id);

			} else if ( voter.data("state") == -1 ) {

				// Undo Down Vote
				$(this).removeClass($options.votedClass)
					   .attr("title", $options.upVoteTitle);

				upVoter.removeClass($options.disabledClass);

				voteCount.text( parseInt(voteCount.text()) + 1 );
				voter.data("state", 0);

				// Remove cookie to clear this down vote
				if($options.useCookie) deleteCookie("voted-" + id);

				// Apply user callback
				$options.undoDownVote(id);

			}

			// Update vote-count class based on value
			if(parseInt(voteCount.text()) < 0) {
				voteCount.attr("class", $options.voteCountClass + " " + $options.minusClass);
			} else if (parseInt(voteCount.text()) > 0) {
				voteCount.attr("class", $options.voteCountClass + " " + $options.plusClass);
			} else {
				voteCount.attr("class", $options.voteCountClass);
			}

		}).html($options.downVoteChar).appendTo(voter);
		
		// Set initial value
		var value = $element.data("value");
		var count_class = $options.voteCountClass;
		if(value < 0) count_class = $options.voteCountClass + " " + $options.minusClass;
		if(value > 0) count_class = $options.voteCountClass + " " + $options.plusClass;

		value = value ? value : 0;
		voteCount.text(value).attr("class", count_class);

		// Get initial vote status from cookie
		var state;

		if($options.useCookie) state = getCookie("voted-" + id);
		state = state ? state : 0;
		voter.data("state", state);

		// Set correct classes to up/down buttons
		if(state == 1) {

			upVoter.attr("class", $options.upVoteClass + " " + $options.votedClass)
				   .attr("title", $options.undoTitle);

			downVoter.attr("class", $options.downVoteClass + " " + $options.disabledClass);

		} else if (state == -1) {

			downVoter.attr("class", $options.downVoteClass + " " + $options.votedClass)
					 .attr("title", $options.undoTitle);

			upVoter.attr("class", $options.upVoteClass + " " + $options.disabledClass);

		}

		$("div", this.element).append(voter);
	};

	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
			}
		});
	};

	// Cookie Helpers
	function setCookie( name, value, days ) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}

	function getCookie( name ) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	function deleteCookie( name ) {
		setCookie(name,"",-1);
	}

}(jQuery, window));
