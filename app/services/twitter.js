import Service from '@ember/service'
import Twit from 'npm:twit'

export default Service.extend({
  init() {
    this._super(...arguments)

    this.api = new Twit({
      consumer_key:    'd57GN3Eul9miMhh5WZHrs6mMZ',
      app_only_auth:   true,
    })
  },

  getUser(user) {
    this.api.get('users/show', { screen_name: user })
  },
})
