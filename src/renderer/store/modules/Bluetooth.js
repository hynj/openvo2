const state = {
  devices: [],
  services: [],
  characteristics: []
}

const mutations = {
  BLE_DEVICE_ADDED (state, device) {
    const storedDevice = state.devices.find(storedDevice => storedDevice.id === device.id)
    const storedDeviceIndex = state.devices.indexOf(storedDevice)
    if (storedDeviceIndex < 0){
      
      state.devices.push(device)
    }
      else{
      Vue.set(state.devices, storedDeviceIndex, device)
    }
  }
}

const actions = {
  async addDevice (state, query) {
    var requestParameters = { }
    // Was a device name set for the character
    if(query.name || query.namePrefix || query.anyDevices) {
      var filters = []
      if (query.name) {
        filters.push({name: query.name})
      }
      if (query.namePrefix) {
        filters.push({namePrefix: query.namePrefix})
      }
      if (query.anyDevices) {
        requestParameters['acceptAllDevices'] = true
      }
      if(filters.length > 0)
        requestParameters.filters = filters
      requestParameters.optionalServices = query.services
    } else {
      requestParameters.filters = [{ services: query.services }]
    }
    // Perform Query
    let device = await navigator.bluetooth.requestDevice(requestParameters)
    if (device) {
      console.log(device.id.toString('hex'));
      console.log("found device");
      state.commit('BLE_DEVICE_ADDED', device);
    }
  },

}

export default {
  state,
  mutations,
  actions
}

/** 
const state = {
    devices: [],
    services: [],
    characteristics: []
  }
  
  const mutations = {
    [BLE_DEVICE_ADDED] (state, device) {
        const storedDevice = state.devices.find(storedDevice => storedDevice.id === device.id)
        const storedDeviceIndex = state.devices.indexOf(storedDevice)
        if (storedDeviceIndex < 0)
          state.devices.push(device)
        else
          //Vue.set(state.devices, storedDeviceIndex, device)
      }
  }
  
  const actions = {
     /*
    action launches the bluetooth native dialog to find devices in the proxmity
    the query can contain the following keys:
      * name
      * namePrefix
      * services - Setting services without a name or namePrefix will not return any results
      * optionalServices
  */
 /** 
  async addDevice ({ dispatch, commit }, query) {
    var requestParameters = { }
    // Was a device name set for the character
    if(query.name || query.namePrefix || query.anyDevices) {
      var filters = []
      if (query.name) {
        filters.push({name: query.name})
      }
      if (query.namePrefix) {
        filters.push({namePrefix: query.namePrefix})
      }
      if (query.anyDevices) {
        requestParameters['acceptAllDevices'] = true
      }
      if(filters.length > 0)
        requestParameters.filters = filters
      requestParameters.optionalServices = query.services
    } else {
      requestParameters.filters = [{ services: query.services }]
    }
    // Perform Query
    let device = await navigator.bluetooth.requestDevice(requestParameters)
    if (device) {
      commit(BLE_DEVICE_ADDED, device)
    }
  },
  }

  
export default {
    state,
    mutations,
    actions
  }
*/