(function($) {
	
	$(document).on({ 'ready':init });

	/* =======================================================================
	init
	========================================================================== */
	function init() {

		var textArray = [];

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

			if (!$speek.hasClass('on')) return;
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

			var text = '';

			for (var i = 0; i < textArray.length; i++) {
				text += textArray[i] + '\n\n';
			}

			var value  = '';
			var length = results.length;
			for (var i = 0; i < length; i++) {

				var target = results[i];
				var val    = target[0].transcript;
				value += processing(val);

				if (target.isFinal) value += '\n';

			}

			$board.val(text + value).data('value',value);

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

			var val = $board.data('value');
			textArray.push(val);
			console.log(textArray)
			rec.stop();

		}

		function onClear() {

			$board.val('');
			textArray = [];

		}

		function processing(val) {

			if ($emoji.is(':checked')) {

				val = val.replace( /ラーメン/g,'🍜');
				val = val.replace( /カレー/g,'🍛');
				val = val.replace( /おにぎり/g,'🍙');
				val = val.replace( /日本/g,'🇯🇵');
				val = val.replace( /炎/g,'🔥');
				val = val.replace( /火/g,'🔥');
				val = val.replace( /可愛い/g,'🐹');

			}


			return val;

		}

	}

})(jQuery);
