import Connection from './connection'
import Emitter from './emitter'

export default {

	    install(Vue, options = {
        connections: []
    	}) {
	    	
	    	if(options.connections.length === 0) {
	    	    return
	    	}

	    	options.connections.map((connection) => {
	    		Vue.prototype[`$${connection.name}Client`] = new Connection(connection).connection
	    	});
	    	
	    	Vue.mixin({
	    	    created(){
	    	    	options.connections.map((connection) => {
								Emitter.addEventSource(connection);

								var connectionHook = this.$options[`${connection.name}Events`];

								  this.$options[connectionHook] = {}

								if(connectionHook) {

								    Object.keys(connectionHook).forEach( (eventHook) => {
								    		Emitter.addEventHook(connection, eventHook, connectionHook[eventHook], this)
								        this.$options[connectionHook][eventHook] = connectionHook[eventHook];
								    });
								}
								
	    	    	});
	    	    },
	    	    beforeDestroy(){
	    	        options.connections.map((connection) => {

	    	            let connectionHook = this.$options[`${connection.name}Events`]

	    	            if(connectionHook){
	    	                Object.keys(connectionHook).forEach((eventHook) => {
	    	                    delete this.$options[connectionHook][eventHook]
	    	                });
	    	            }
	    	        })
	    	    }
	    	})
	    	
	    }
}
