(function($) {
	
	$(document).on({ 'ready':init });

	/* =======================================================================
	init
	========================================================================== */
	function init() {

		var $board  = $('#board');
		var $status = $('#status');
		var $speek  = $('#speek');
		var $emoji  = $('#emoji');
		var $select = $('#select');

		$('[data-js]').on({ 'click':onClick });

		window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
		var rec = new SpeechRecognition();

		rec.interimResults = true;
		rec.continuous = true;

		rec.onresult = function(event) {

			set(event.results);

		}

		rec.onsoundstart = function(event) {
			$speek.addClass('on');
		};
		rec.onnomatch = function(event) {
			console.log(event);
		};
		rec.onerror = function(event) {
			console.log(event);
		};
		rec.onsoundend = function(event) {
			$speek.removeClass('on');
		};

		function set(results) {

			var text   = '';
			var length = results.length;
			for (var i = 0; i < length; i++) {

				var target = results[i];
				var val    = target[0].transcript;
				text += processing(val);

				if (target.isFinal) text += '\n';

			}
			$board.val(text);

		}

		function onClick(event) {

			var action = $(event.currentTarget).data('js');
			switch(action) {
				case 'start':onStart(); break;
				case 'stop' :onStop(); break;
				case 'clear':onClear(); break;
			}

		}

		function onStart() {

			if ($status.hasClass('on')) return;
			$status.addClass('on');
			rec.lang = $select.val();
			rec.start();

		}

		function onStop() {

			if (!$status.hasClass('on')) return;
			$status.removeClass('on');
			rec.stop();

		}

		function onClear() {

			$board.val('');

		}

		function processing(val) {

			if ($emoji.is(':checked')) {

				val = val.replace( /ラーメン/g,'🍜');
				val = val.replace( /カレー/g,'🍛');
				val = val.replace( /おにぎり/g,'🍙');
				val = val.replace( /日本/g,'🇯🇵');
				
			}


			return val;

		}

	}

})(jQuery);