(function($) {
	
	$(document).on({ 'ready':init });

	/* =======================================================================
	init
	========================================================================== */
	function init() {

		var $textarea = $('#board');
		var $start    = $('#start');
		var $clear    = $('#clear');
		var $select   = $('#select');

		$start.on({ 'click':onStart });
		$clear.on({ 'click':onClear });

		window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
		var rec = new webkitSpeechRecognition();

		rec.interimResults = true;
		rec.continuous = true;

		rec.onresult = function(event) {

			var text = event.results[0][0].transcript;
			console.log(event.results);
			add(event.results);

		}

		rec.onsoundstart = function(event) {
			console.log(event);
		};
		rec.onnomatch = function(event) {
			console.log(event);
		};
		rec.onerror = function(event) {
			console.log(event);
		};
		rec.onsoundend = function(event) {
			console.log(event);
		};

		function add(results) {

			var text = '';
			for (var i = 0; i < results.length; i++) {

				var target = results[i];
				var val    = target[0].transcript;
				text += val;
				if (target.isFinal) text += '\n';

			}
			$textarea.val(text);

		}

		function onStart() {

			var lang = $select.val();
			rec.lang = lang;
			rec.start();

		}

		function onClear() {

			$textarea.val('');

		}

	}

})(jQuery);