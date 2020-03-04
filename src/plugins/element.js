import Vue from 'vue'
import { Button, Input, Form, FormItem, Message, Container, Header, Aside, Main } from 'element-ui'

// global register $message
Vue.prototype.$message = Message

export default Vue => {
  Vue.component(Button.name, Button)
  Vue.component(Form.name, Form)
  Vue.component(FormItem.name, FormItem)
  Vue.component(Input.name, Input)
  Vue.component(Container.name, Container)
  Vue.component(Header.name, Header)
  Vue.component(Aside.name, Aside)
  Vue.component(Main.name, Main)
}
