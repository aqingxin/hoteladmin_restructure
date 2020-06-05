import Vue from 'vue'
import { Button, Form, Input, FormItem, Checkbox, Notification, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Checkbox)

Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
