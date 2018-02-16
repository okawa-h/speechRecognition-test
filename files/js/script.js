(function($) {
	
	$(document).on({ 'ready':init });

	/* =======================================================================
	init
	========================================================================== */
	function init() {

		var $textarea = $('#board');
		var $status   = $('#status');
		var $speek    = $('#speek');
		var $start    = $('#start');
		var $stop     = $('#stop');
		var $clear    = $('#clear');
		var $select   = $('#select');

		$start.on({ 'click':onStart });
		$stop.on({  'click':onStop });
		$clear.on({ 'click':onClear });

		window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
		var rec = new webkitSpeechRecognition();

		rec.interimResults = true;
		rec.continuous = true;

		rec.onresult = function(event) {

			var text = event.results[0][0].transcript;
			console.log(event.results);
			set(event.results);

		}

		rec.onsoundstart = function(event) {
			$speek.addClass('on');
			console.log(event);
		};
		rec.onnomatch = function(event) {
			console.log(event);
		};
		rec.onerror = function(event) {
			console.log(event);
		};
		rec.onsoundend = function(event) {
			$speek.removeClass('on');
			console.log(event);
		};

		function set(results) {

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

			if ($status.hasClass('on')) return;
			$status.addClass('on');
			var lang = $select.val();
			rec.lang = lang;
			rec.start();

		}

		function onStop() {

			if (!$status.hasClass('on')) return;
			$status.removeClass('on');
			rec.stop();

		}

		function onClear() {

			$textarea.val('');

		}

	}

})(jQuery);