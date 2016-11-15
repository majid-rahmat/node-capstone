var mongoose = require('mongoose');

var authorSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	title:{
		type: String,
		required: true
	},
	description:{
		type: String
	},
	});

var Author = module.exports = mongoose.model('Author', authorSchema);

module.exports.getAuthors = function(callback, limit){
	Author.find(callback).limit(limit);
}

module.exports.addAuthor = function(author, callback){
	Author.create(author, callback);
}

module.exports.updateAuthor = function(id, author, options, callback){
	var query = {_id: id};
	var update = {
		name: author.name,
		title: author.title,
		description: author.description
	}
	Author.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeAuthor = function(id, callback){
	var query = {_id: id};
	Author.remove(query, callback);
}