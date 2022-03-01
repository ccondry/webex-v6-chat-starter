<template>
  <div>
    <b-loading :is-full-page="true" :active="isLoading" />
    <!-- main -->
    <!-- <div
    id="main-container"
    class="container is-fluid is-marginless app-content"
    >
      <section class="main">
        <div class="content">
          <pre>{{ query }}</pre>
          <pre>{{ userId }}</pre>
          <pre>{{ sessionInfo.configuration }}</pre>
        </div>
      </section>
    </div> -->
    <!-- IMI Connect chat -->
    <div id="divicw" :data-bind="demoBaseConfig.imiConnectId" data-org="" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {getUrlQueryParams} from './utils'

export default {
  data () {
    return {
      query: {},
      userId: '',
      webexLoading: false
    }
  },

  computed: {
    ...mapGetters([
      'sessionInfo',
      'loading'
    ]),
    datacenter () {
      return this.query.datacenter
    },
    session () {
      return this.query.session
    },
    isLoading () {
      return this.loading.user.session || this.webexLoading
    }
  },

  watch: {
    userId (val) {
      if (val.length === 4) {
        // get session info with user config
        this.getSessionInfo({
          datacenter: this.datacenter,
          session: this.session,
          userId: this.userId
        })
      }
    },
    sessionInfo (val) {
      try {
        if (val.demo) {
          this.getDemoBaseConfig()
        }
      } catch (e) {
        // continue
      }
    },
    demoBaseConfig (val) {
      try {
        if (val && val.imiConnectId) {
          // has IMI ID - try to start chat
          this.initImiConnect()
        }
      } catch (e) {
        // continue
      }
    }
  },

  mounted () {
    // copy URL query parameters to data
    this.query = getUrlQueryParams()
    // set user ID, if available
    this.userId = this.query.userId || ''
    this.checkUserId()
  },

  methods: {
    ...mapActions([
      'getSessionInfo'
    ]),
    checkUserId () {
      if (this.userId.length !== 4) {
        // get user ID
        this.$buefy.dialog.prompt({
          message: 'What is your user ID?',
          rounded: true,
          confirmText: 'Submit',
          type: 'is-primary',
          canCancel: false,
          inputAttrs: {
            value: this.userId
          },
          onConfirm: (value) => {
            this.userId = value
          }
        })
      }
    },
    initImiConnect () {
      var i = {
        t: function () {
          var e = 'https://media.imi.chat/widget/js/imichatinit.js'
          try {
            var o = new XMLHttpRequest()
            o.onreadystatechange = function () {
              if (this.readyState === 4) {
                var t = document.getElementById('divicw')
                if (this.status === 0) {
                  i.o(t)
                  return
                }
                var e = document.createElement('script')
                e.innerHTML = this.responseText
                t.parentNode.insertBefore(e, t.nextSibling)
              }
            }
            o.open('GET', e, true)
            o.send()
          } catch (s) {
            console.error(s)
          }
        },
        o: function (t) {
          t.insertAdjacentHTML('afterend',
            '<iframe id="tls_al_frm" frameborder="0" style="overflow: hidden;height: 208px;width: 394px;position: fixed;display: block;right: 48px;bottom: 12px;z-index: 99999; display:none;"></iframe>'
          )
          var e = document.getElementById('tls_al_frm')
          var o = e.contentWindow || (e.contentDocument.document || e.contentDocument)
          o.document.open()
          o.document.write(
            '<!doctype html><html><head><meta charset="utf-8"><title>Untitled Document</title><style>body{font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;color: #99a0b0;font-size: 14px;}.popover__content{background-color: #fbfbfe; padding: 1.5rem; border-radius: 5px; width: 300px; box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);position: relative;}.popover__message{font-weight: 600;color:#56627c;font-size: 16px;}.pull-left{float:left;}.clearfix{clear: both;}.hdr-txt{width: 218px; margin-top: 3px;}.para-txt a{text-decoration: none;color: #005cde;}.close-btn{position: absolute;right:15px;top:15px;}.close-btn a{text-decoration: none;font-weight: 400; color: #56627c; font-size: 16px;}</style></head><body><div class="popover__content"><div class="close-btn"><a href="#" onclick="closeTLSAlert();">X</a></div><div class="popover__message"><div class="pull-left hdr-txt">This browser version is not supported on LiveChat.</div></div><div class="clearfix"></div><p class="para-txt">Please update your browser to the latest version and re-open the website to access the widget. </p></div><script>function closeTLSAlert(){window.parent.postMessage({key: "close_tls_alert",value: "close_tls_alert",action: "close_tls_alert"}, "*");}<\/script></body></html>'
          )
          o.document.close()
          e.style.display = 'block'
          window.addEventListener('message', function (t) {
            if (t.data.action === 'close_tls_alert') {
              i.s()
            }
          })
        },
        s: function () {
          var t = document.getElementById('tls_al_frm')
          t.remove()
        }
      }
      i.t(function () {})
    }
  }
}
</script>
