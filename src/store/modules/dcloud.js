import * as types from '../mutation-types'

const state = {
  session: {},
  demoBaseConfig: {}
}

const mutations = {
  [types.SET_SESSION_INFO] (state, data) {
    state.session = data
  },
  [types.SET_DEMO_BASE_CONFIG] (state, data) {
    state.demoBaseConfig = data[0]
  }
}

const getters = {
  // session configuration information for current session ID and datacenter
  sessionInfo: state => state.session,
  // base configuration for the demo type
  demoBaseConfig: state => state.demoBaseConfig
}

const actions = {
  async getSessionInfo ({dispatch, getters}, query) {
    return dispatch('fetch', {
      group: 'user',
      type: 'session',
      url: getters.endpoints.session,
      message: 'Get dCloud session information',
      showNotification: false,
      mutation: types.SET_SESSION_INFO,
      options: {
        query
      }
    })
  },
  async getDemoBaseConfig ({dispatch, getters}) {
    // const query = {
    //   type: {
    //     // $regex: getters.sessionInfo.demo,
    //     $regex: 'webex',
    //     $options: 'i'
    //   }
    // }
    // if (getters.sessionInfo.version) {
    //   query.version = {
    //     // $regex: getters.sessionInfo.version,
    //     $regex: 'v6',
    //     $options: 'i'
    //   }
    // }
    // if (getters.isInstantDemo) {
    //   query.instant = getters.sessionInfo.instant
    // }
    return dispatch('fetch', {
      group: 'dcloud',
      type: 'baseConfig',
      url: getters.endpoints.demo,
      message: 'Get dCloud demo base configuration',
      showNotification: false,
      mutation: types.SET_DEMO_BASE_CONFIG,
      options: {
        // method: 'POST',
        query: {
          type: 'webex',
          version: 'v6',
          instant: true
        }
      }
    })
  }
}

export default {
  actions,
  getters,
  mutations,
  state
}
