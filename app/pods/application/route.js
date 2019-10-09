import Route from '@ember/routing/route'
import RSVP from 'rsvp'
import fetch from 'fetch'

export default Route.extend({
  model() {
    const part = 'statistics'
    const id   = 'UCkmAjbIecTIjTQctolYeuDw'
    const key  = 'AIzaSyBgOn1bSc2CcLUywtttJ4OWSrejZaGsKCM'

    return RSVP.hash({
      twitch: '',
      twitter: '',
      youtube: fetch(`https://www.googleapis.com/youtube/v3/channels?part=${part}&id=${id}&key=${key}`)
        .then(response => response.json())
        .then(data => {
          if (data.items.length) {
            return data.items[0].statistics.subscriberCount
          }
        })
    })
  }
})
