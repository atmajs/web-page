(function () {
	'use strict';

	var Task = Class({
		Base: Class.Serializable,

		label: '',
		completed: false,

		Validate: {
			label: function (value) {
				if (!value) 
					return 'Task can not be empty';
				
				if (value.length > 50) 
					return 'Task is too long';
				
			}
		}
	});


	include.exports = Class.Collection(Task, {
		Store: Class.LocalStore('todo/atmajs'),

		create: function(label, completed) {
			return this
				.push({
					label: label,
					completed: completed
				})
				.save()
				.last();
		},

		status: {
			count: 0,
			todoCount: 0,
			completedCount: 0,
		},

		Override: {
			save: function() {
				return this
					.super(arguments)
					.calcStatus();
			},
			del: function() {
				return this
					.super(arguments)
					.calcStatus();
			},
			fetch: function() {
				return this
					.super(arguments)
					.calcStatus();
			}
		},
		Static: {
			Task: Task
		},
		calcStatus: function() {

			this.status.count = this.length;
			this.status.todoCount = ruqq.arr.count(this, 'completed', '==', false);
			this.status.completedCount = ruqq.arr.count(this, 'completed', '==', true);
			return this;
		}
	});


}());