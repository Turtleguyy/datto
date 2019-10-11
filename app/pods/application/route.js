import Route from '@ember/routing/route'
import RSVP from 'rsvp'
import fetch from 'fetch'

export default Route.extend({
  model() {

    // twitch
    const client = 'zvp7v759yk8qscey6q06xh6mr4ev69'
    const twitchURL = 'https://api.twitch.tv/helix/users?login=datto'

    // twitter
    const twitterURL = 'https://api.twitter.com/1.1/users/show.json?screen_name=DattosDestiny'

    // youtube
    const part = 'statistics'
    const id   = 'UCkmAjbIecTIjTQctolYeuDw'
    const key  = 'AIzaSyBgOn1bSc2CcLUywtttJ4OWSrejZaGsKCM'
    const youtubeURL = `https://www.googleapis.com/youtube/v3/channels?part=${part}&id=${id}&key=${key}`

    return RSVP.hash({
      twitch: fetch(twitchURL, {
        headers: {
          'Client-ID': 'zvp7v759yk8qscey6q06xh6mr4ev69',
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.data.length) return data.data[0].view_count
      }),
      // twitter: fetch(twitterURL, {
      //   headers: {
      //     'authorization': `Bearer ${id}`,
      //   }
      // }),
      youtube: fetch(youtubeURL)
        .then(response => response.json())
        .then(data => {
          if (data.items.length) return data.items[0].statistics.subscriberCount
        })
    })
  }
})
