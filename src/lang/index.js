import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './en-US'
import zhLocale from './zh-CN'

Vue.use(VueI18n)

const messages = {
  'en': {
    ...enLocale,
    ...elementEnLocale
  },
  'zh-cn': {
    ...zhLocale,
    ...elementZhLocale
  }
}

let chanslate = {
  'zh_CN': 'zh-cn',
  'en_US': 'en'
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: chanslate[Cookies.get('language')] || chanslate['zh_CN'],
  // set locale messages
  messages
})

export default i18n
