var Task = Class({
    Base: Class.Serializable,
    title: '',
    description: '',
    time: 15,
    complete: 0, // in percent 0..100
    
    Validate: {
        title: function(value){
            if (!value) 
                return 'Task title could not be empty';
        }
    },
    
    getFormatedTime: function(){
        return Task.formatTime(this.time);
    },
    getFormatedRemainingTime: function(){
        return Task.formatTime(this.getRemainingMinutes());
    },
    
    getRemainingMinutes: function(){
        return this.time * ( 1 - this.complete / 100) | 0;
    },
    
    Static: {
        formatTime: function(mins){
            var h = mins / 60 | 0,
                min = mins - h * 60;
            
            return (
                (h ? h + ' h ' : '') +
                (min ? min + ' min' : '')
            ).trim();
        },
        parseTime: function(str) {
			var match = /^((\d+) h)?\s*((\d+) min)?$/.exec(str);
			if (match == null) 
				return Infinity;
			
			var h = match[2] << 0,
				min = match[4] << 0;
			
			return (h && h * 60 || 0) + (min || 0); 
		}
    }
});


var TaskCollection = Class.Collection(Task, {
    // save collection to localStorage 
    Store: Class.LocalStore('/tasks'),
    
    remainingMinutes: function (){
        var minutes = 0,
            i = this.length;
        while (--i !== -1)
            minutes += this[i].remainingMinutes();
            
        return minutes;
    },
    
    removeCompleted: function(){
        this.remove({complete: 100});
    }
});