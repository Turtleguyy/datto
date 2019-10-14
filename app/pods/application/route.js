import Route from '@ember/routing/route'
import RSVP from 'rsvp'
import fetch from 'fetch'
import { inject as service } from '@ember/service'

export default Route.extend({
  twitter: service(),

  model() {

    // twitch
    const client = 'zvp7v759yk8qscey6q06xh6mr4ev69'
    // const twitchURL = 'https://api.twitch.tv/helix/users?login=datto'
    const twitchURL = 'https://api.twitch.tv/helix/users/follows?to_id=42296879'

    // youtube
    const part = 'statistics'
    const id   = 'UCkmAjbIecTIjTQctolYeuDw'
    const key  = 'AIzaSyBgOn1bSc2CcLUywtttJ4OWSrejZaGsKCM'
    const youtubeURL = `https://www.googleapis.com/youtube/v3/channels?part=${part}&id=${id}&key=${key}`

    return RSVP.hash({
      twitch: fetch(twitchURL, {
        headers: {
          'Client-ID': `${client}`,
        }
      })
      .then(response => response.json())
      .then(data => data.total),
      // twitter: this.twitter.getUser(),
      youtube: fetch(youtubeURL)
        .then(response => response.json())
        .then(data => {
          if (data.items.length) return data.items[0].statistics.subscriberCount
        })
    })
  }
})
