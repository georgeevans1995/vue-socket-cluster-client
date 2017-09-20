[Socket cluster](http://socketcluster.io/#!/) implementation for Vuejs 2 leveraging uws

[Socket cluster documentation](http://socketcluster.io/#!/docs)

## Install

``` bash
npm install vue-socket-cluster-client --save
```

## Usage

#### Configuration
``` js
import VueSocketCluster from 'vue-socket-cluster-client';
Vue.use(VueSocketCluster, {
      connections: [{
            name: 'CONNECTION_NAME', // Each connection object must have a name and the name must be unique in the array
            hostname: '127.0.0.1',
            secure: false,
            port: 8000,
            rejectUnauthorized: false
            // Other socket cluster options
      }]
})
```

#### Add to the Vuejs instance
add a property ```CONNECTION_NAME+Events``` to listen to connection events
``` js
var vm = new Vue({
      CONNECTION_NAMEEvents:{
            connect: function(){
                console.log('socket connected')
            },
            CUSTOM_EVENT_NAME: function(data){
                console.log(data)
            },
            // ['error','connect','disconnect','connectAbort','connecting', etc ...] See socket cluster docs
            error () {
                //An error occurred on the connection name echo
            },
            connecting () {

            },
            // ...
            // for hyphen separated events such as 'custom-error' use ...
            customError () {

            }
      },
      methods: {
            //triggerInstance object = ```connection_name+Client```
            triggerEvent (name, data) {
                this.$CONNECTION_NAMEClient.emit('name', data);
            }
      }
})
```


Remove existing listener on client
``` js
delete this.$options.$CONNECTION_NAMEClient.event_name;
```

### Browser compatibility:
- Firefox
- Chrome
- Edge
- IE 11+ (not tested on below previous versions)
- Safari
- Others (not tested)

Based on works from [nigeltiany/vue-socket-cluster](https://github.com/nigeltiany/vue-socket-cluster) and its contributors
This module differs from vue-socket-cluster in that it does not only allows you to add the socket cluster client to the vue instance. 
