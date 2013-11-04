;(function($, undefined) {

	var pluginName = "quiz";
	var defaults = {
		questions : [],
		complete : function(score){}
	}

	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.currentQuestionIndex = 0;
		this.pointsSum = 0;
		this.init();
	}

	Plugin.prototype.init = function()
	{
		this.drawQuestion(this.options.questions[this.currentQuestionIndex], this.element);
	}

	Plugin.prototype.drawQuestion = function(question, element)
	{
		var _this = this;
		$(element).empty();
		var containerDiv = $("<div></div>");
		var questionDiv = $("<div></div>", {
			"text": question.question,
			"class" : "question"
		});
		containerDiv.append(questionDiv);
		for (i=0; i<question.answers.length; i++)
		{
			var answerDiv = $("<div></div>", {
				"text" : question.answers[i],
				"class" : "answer",
				"points" : question.points[i]
			});
			containerDiv.append(answerDiv);
		}
		$(element).append(containerDiv);
		$('.answer').on('click', function () {_this.onAnswerClick($(this).attr("points"));});
	}

	Plugin.prototype.onAnswerClick = function(points)
	{
		this.pointsSum += parseInt(points);
		if (this.currentQuestionIndex < this.options.questions.length - 1)
		{
			this.currentQuestionIndex++;
			this.drawQuestion(this.options.questions[this.currentQuestionIndex], this.element);
		}
		else
		{
			this.options.complete(this.pointsSum);
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

})(jQuery);
