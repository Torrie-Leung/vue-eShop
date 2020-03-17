import Vue from 'vue'
import {
  Button,
  Input,
  InputNumber,
  Form,
  FormItem,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  MessageBox,
  Tag,
  Tree,
  Select,
  Option,
  Cascader,
  Alert,
  Tabs,
  TabPane
} from 'element-ui'

// global register $message
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

export default Vue => {
  Vue.component(Button.name, Button)
  Vue.component(Form.name, Form)
  Vue.component(FormItem.name, FormItem)
  Vue.component(Input.name, Input)
  Vue.component(InputNumber.name, InputNumber)
  Vue.component(Container.name, Container)
  Vue.component(Header.name, Header)
  Vue.component(Aside.name, Aside)
  Vue.component(Main.name, Main)
  Vue.component(Menu.name, Menu)
  Vue.component(Submenu.name, Submenu)
  Vue.component(MenuItemGroup.name, MenuItemGroup)
  Vue.component(MenuItem.name, MenuItem)
  Vue.component(Breadcrumb.name, Breadcrumb)
  Vue.component(BreadcrumbItem.name, BreadcrumbItem)
  Vue.component(Card.name, Card)
  Vue.component(Row.name, Row)
  Vue.component(Col.name, Col)
  Vue.component(Table.name, Table)
  Vue.component(TableColumn.name, TableColumn)
  Vue.component(Switch.name, Switch)
  Vue.component(Tooltip.name, Tooltip)
  Vue.component(Pagination.name, Pagination)
  Vue.component(Dialog.name, Dialog)
  Vue.component(Tag.name, Tag)
  Vue.component(Tree.name, Tree)
  Vue.component(Select.name, Select)
  Vue.component(Option.name, Option)
  Vue.component(Cascader.name, Cascader)
  Vue.component(Alert.name, Alert)
  Vue.component(Tabs.name, Tabs)
  Vue.component(TabPane.name, TabPane)
}
