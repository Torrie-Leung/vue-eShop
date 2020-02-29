// import Vue from 'vue'
import { Button, Input, Form, FormItem } from 'element-ui'
// Vue.use(Button)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Input)
export default Vue => {
  Vue.component(Button.name, Button)
  Vue.component(Form.name, Form)
  Vue.component(FormItem.name, FormItem)
  Vue.component(Input.name, Input)
}
