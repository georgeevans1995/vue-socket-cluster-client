import socketCluster from 'socketcluster-client'
import defaultSocketEvents from './socket-events'
import Emitter from './emitter'

class Connection {
    constructor(connection) {
        this.connection = socketCluster.connect(connection)
        defaultSocketEvents.map((event) => {
            this.connection.on(event, (payload) => {
                Emitter.emit(connection, event, payload)
            })
        })

        this.connection.on('message', (data) => {
            if(data !== '#1') {
                let payload = JSON.parse(data)
                Emitter.emit(connection, payload.event ? payload.event.replace(/(\-\w)/g, function(m){return m[1].toUpperCase();}) : 'message', payload.data);
            }
        })
    }
}

export default Connection
