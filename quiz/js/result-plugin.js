;(function($, window, document, undefined) {

	var pluginName = "quizresult"; 
	var defaults = {
		data : [],
		score : 0
	}

	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype.init = function()
	{
		$(this.element).empty();
		var resultDiv = $("<div></div>", {
			"text": this.getResultMsg(),
			"class" : "quiz-result"
		});
		$(this.element).append(resultDiv);
	};

	Plugin.prototype.getResultMsg = function()
	{
		for (i=this.options.data.length-1;i>=0;i--)
		{
			if (this.options.score >= parseInt(this.options.data[i].to))
			{
				return this.options.data[i].status;
			}
			else if (i === 0)
			{
				return this.options.data[i].status;
			}
		}
	}

	$.fn[pluginName] = function(options) {
		return this
				.each(function() {
					if (!$.data(this, "plugin_" + pluginName)) {
						$.data(this, "plugin_" + pluginName, new Plugin(this,
								options));
					}
				});
	}

})(jQuery, window, document);
