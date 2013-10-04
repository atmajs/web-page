

Class.MongoStore.settings({
	//ip: '127.0.0.1',
	//port: '27017',
	// <- default
	
	db: 'mynotesdb'
});


var Note = Class({
	Base: Class.Serializable,
	Store: Class.MongoStore.Single('notes'),
	
	text: '',
	
	Validate: {
		text: function(value){
			if (!value) 
				return 'Note must be not empty!';
		}
	}
});

var Notes = Class.Collection(Note, {
	Store: Class.MongoStore.Collection('notes')
});


include.exports = {
	Note: Note,
	Notes: Notes
};