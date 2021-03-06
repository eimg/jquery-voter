jQuery Voter Plugin
=============

> A simple jQuery plugins to attach up/down voting functionality to selected HTML element.

Basic Usage
-------------

<code>$(selectors).attachVoter({ options });</code>

With Up/Down Vote Callbacks
-------------

<pre>
	$(selectors).attachVoter({
		"doUpVote": function(id, value) {
			//
		},
		"doDownVote": function(id, value) {
			//
		},
		"undoUpVote": function(id, value) {
			//
		},
		"undoDownVote": function(id, value) {
			//
		}
	});
</pre>

Options
-------------

* "voterClass"      : "voter",
* "wrapperClass"    : "voter-wrapper",
* "upVoteClass"     : "up-vote",
* "upVoteTitle"     : "Vote Up",
* "voteCountClass"  : "vote-count",
* "downVoteClass"   : "down-vote",
* "downVoteTitle"   : "Vote Down",
* "disabledClass"   : "disabled",
* "undoTitle"       : "Click to Undo",
* "votedClass"      : "voted",
* "plusClass"       : "good",
* "minusClass"      : "bad",
* "upVoteChar"      : "▲",
* "downVoteChar"    : "▼",
* "useCookie"       : true,
* "doUpVote"        : function() {},
* "doDownVote"      : function() {},
* "undoUpVote"      : function() {},
* "undoDownVote"    : function() {}

Release Note
-------------
* [http://fairwayweb.com/jquery-voter-plugin/](http://fairwayweb.com/jquery-voter-plugin/)