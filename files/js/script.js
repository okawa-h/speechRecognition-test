(function($) {
	
	$(document).on({ 'ready':init });

	/* =======================================================================
	init
	========================================================================== */
	function init() {

		var $board = $('#board');
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
		var rec = new SpeechRecognition();

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

			var text   = '';
			var length = results.length;
			for (var i = 0; i < length; i++) {

				var isLast = (length - 1 == i);
				var target = results[i];
				var val    = target[0].transcript;

				if (isLast && -1 < val.indexOf('級数上げ')) {
					var size = Std.parseInt($board.css('font-size')) + 1;
					$board.css({ 'font-size':size });
				}

				if (isLast && -1 < val.indexOf('級数下げ')) {
					var size = Std.parseInt($board.css('font-size')) - 1;
					$board.css({ 'font-size':size });
				}

				if (-1 < val.indexOf('級数上げ')) val = val.replace( /級数上げ/g,'');
				if (-1 < val.indexOf('級数下げ')) val = val.replace( /級数下げ/g,'');
				if (-1 < val.indexOf('ラーメン')) val = val.replace( /ラーメン/g,'🍜');
				if (-1 < val.indexOf('カレー')) val = val.replace( /カレー/g,'🍛');

				text += val;
				if (target.isFinal) text += '\n';

			}
			$board.val(text);

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