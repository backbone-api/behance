/* Backbone API: Behance
 * Source: https://github.com/backbone-api/behance
 *
 * Created by Makis Tracend (@tracend)
 * Distributed through [Makesites.org](http://makesites.org)
 * Released under the [MIT license](http://makesites.org/licenses/MIT)
 */

(function(_, Backbone) {

	// API reference: http://www.behance.net/dev/api/endpoints/

	// Constants
	var api = "http://www.behance.net/v2"

	// Support backbone-app (if available)
	var Model = ( typeof APP != "undefined" && !_.isUndefined( APP.Model) ) ? APP.Model : Backbone.Model;
	var Collection = ( typeof APP != "undefined" && !_.isUndefined( APP.Collection) ) ? APP.Collection : Backbone.Collection;


	// Base model - mainly used for setup options
	var Behance = new Backbone.Model({
		"key": null,
		"api": api
		// "uri": false
	});

	// Namespace definition
	Behance.Models = {};
	Behance.Collections = {};
	Behance.Views = {};

	// Models
	// JSONP requests for all direct API requests
	Behance.Model = Model.extend({

		sync : function( method, model, options ) {

			options.dataType = 'jsonp';

			return Backbone.sync( method, model, options );

		}
	});
	
	Behance.Collection = Collection.extend({

		sync : function( method, model, options ) {

			options.dataType = 'jsonp';

			return Backbone.sync( method, model, options );

		}
	});

	//
	Behance.Models.Project = Behance.Model.extend({
		// url: function(){ return api + "/projects/"+ this.id +".json" },
		url: function(){ 
			var url = Behance.get("api") + "/projects/"+ this.get("id") +"?api_key="+ Behance.get("key"); 
			console.log("Url" + url);
			return url;
		}, 
		defaults : {
		},
		
		parse: function( data ){
			// console.log("Behance.Models.Project: ", data);
			// validate data?
			return data[0];
		}
	});
	
	Behance.Collections.Projects = Behance.Collection.extend({
		model: Behance.Models.Project, 
		// url: "http://www.behance.net/v2/users/ryndel/projects?tags=monkey5&api_key="+ config.behance.key +"&callback=?", 
		
		url: function(){ 
			var url = Behance.get("api") + "/users/"+ this.options.user + "/projects?api_key="+ Behance.get("key"); 
			// console.log( this.options );
			return url;
		}, 
		
		options: {
			user: null
		},
		
		initialize: function(models, options){
			options = options || {};
			_.extend( this.options, options);
			return Behance.Collection.prototype.initialize.apply(this, arguments);
		},
		
		parse: function( data ){
			//console.log( data );
			return (data.projects) ? data.projects : data;
		}
	});


	// Store in selected namespace(s)
	//APP = window.APP || (APP = { Models: {}, Collections: {}, Views: {} });
	if( _.isUndefined(Backbone.API) ) Backbone.API = {};
	Backbone.API.Behance = Behance;

	// alias APP.API
	if( typeof APP != "undefined" && (_.isUndefined( APP.API) || _.isUndefined( APP.API.Behance) ) ){
		APP.API = APP.API || {};
		APP.API.Behance = Backbone.API.Behance;
	}

	// Shortcut
	if(typeof window.Behance == "undefined"){
		window.Behance = Behance;
	}

})(this._, this.Backbone);