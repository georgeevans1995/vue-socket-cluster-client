
class Emitter {

    constructor () {
        this.connections = {};
    }

    addEventSource (connection) {
        this.connections[`${connection.name}Events`] = {};
    }

    addEventHook (connection, event, callback, vm) {
        if(typeof callback === 'function'){
            if ( !this.connections[connection.name+event] ) this.connections[connection.name+event] = [];
          
            this.connections[connection.name+event].push({callback: callback, vm: vm});

            return true
        }

        return false
    }

    emit (connection, event, ...args) {
        let hooks = this.connections[connection.name+event];
        //console.log(...args)
        if (hooks && hooks.length) {
            hooks.forEach((hook) => {
                hook.callback.call(hook.vm, ...args)
            });
            return true;
        }
        return false;
    }

}

export default new Emitter
