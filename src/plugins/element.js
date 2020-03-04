import Vue from 'vue'
import { Button, Input, Form, FormItem, Message } from 'element-ui'
// Vue.use(Button)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Input)

// global register $message
Vue.prototype.$message = Message
export default Vue => {
  Vue.component(Button.name, Button)
  Vue.component(Form.name, Form)
  Vue.component(FormItem.name, FormItem)
  Vue.component(Input.name, Input)
}
