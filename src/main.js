import "primevue/resources/primevue.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "prismjs/themes/prism-coy.css";
import "./assets/styles/layout.scss";
import "./assets/demo/flags/flags.css";

import { createApp, reactive } from "vue";
import router from "./router";
import store from "./store";
import AppWrapper from "./AppWrapper.vue";
import PrimeVue from "primevue/config";
import AutoComplete from "primevue/autocomplete";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Avatar from "primevue/avatar";
import AvatarGroup from "primevue/avatargroup";
import Badge from "primevue/badge";
import BadgeDirective from "primevue/badgedirective";
import Button from "primevue/button";
import Breadcrumb from "primevue/breadcrumb";
import Calendar from "primevue/calendar";
import Card from "primevue/card";
import Carousel from "primevue/carousel";
import Chart from "primevue/chart";
import Checkbox from "primevue/checkbox";
import Chip from "primevue/chip";
import Chips from "primevue/chips";
import ColorPicker from "primevue/colorpicker";
import Column from "primevue/column";
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmPopup from "primevue/confirmpopup";
import ConfirmationService from "primevue/confirmationservice";
import ContextMenu from "primevue/contextmenu";
import DataTable from "primevue/datatable";
import DataView from "primevue/dataview";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import Dialog from "primevue/dialog";
import Divider from "primevue/divider";
import Dropdown from "primevue/dropdown";
import Fieldset from "primevue/fieldset";
import FileUpload from "primevue/fileupload";
import Image from "primevue/image";
import InlineMessage from "primevue/inlinemessage";
import Inplace from "primevue/inplace";
import InputMask from "primevue/inputmask";
import InputNumber from "primevue/inputnumber";
import InputSwitch from "primevue/inputswitch";
import InputText from "primevue/inputtext";
import Knob from "primevue/knob";
import Galleria from "primevue/galleria";
import Listbox from "primevue/listbox";
import MegaMenu from "primevue/megamenu";
import Menu from "primevue/menu";
import Menubar from "primevue/menubar";
import Message from "primevue/message";
import MultiSelect from "primevue/multiselect";
import OrderList from "primevue/orderlist";
import OrganizationChart from "primevue/organizationchart";
import OverlayPanel from "primevue/overlaypanel";
import Paginator from "primevue/paginator";
import Panel from "primevue/panel";
import PanelMenu from "primevue/panelmenu";
import Password from "primevue/password";
import PickList from "primevue/picklist";
import ProgressBar from "primevue/progressbar";
import Rating from "primevue/rating";
import RadioButton from "primevue/radiobutton";
import Ripple from "primevue/ripple";
import SelectButton from "primevue/selectbutton";
import ScrollPanel from "primevue/scrollpanel";
import ScrollTop from "primevue/scrolltop";
import Slider from "primevue/slider";
import Sidebar from "primevue/sidebar";
import Skeleton from "primevue/skeleton";
import SplitButton from "primevue/splitbutton";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import Steps from "primevue/steps";
import StyleClass from "primevue/styleclass";
import TabMenu from "primevue/tabmenu";
import Tag from "primevue/tag";
import TieredMenu from "primevue/tieredmenu";
import Textarea from "primevue/textarea";
import Timeline from "primevue/timeline";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import Toolbar from "primevue/toolbar";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Tooltip from "primevue/tooltip";
import ToggleButton from "primevue/togglebutton";
import Tree from "primevue/tree";
import TreeSelect from "primevue/treeselect";
import TreeTable from "primevue/treetable";
import TriStateCheckbox from "primevue/tristatecheckbox";

import CodeHighlight from "./AppCodeHighlight";
import BlockViewer from "./BlockViewer";

import msgErro from "./utilities/message/Erro";
import msgSuccess from "./utilities/message/Success";
import msgInfo from "./utilities/message/Info";
import msgWarn from "./utilities/message/Warn";
import DateTime from "./utilities/utils/DateTime";
import Firebase from "./firebaseApp";

import Token from "./utilities/jwt/Token";

router.beforeEach(function (to, from, next) {
  window.scrollTo(0, 0);
  next();
});

const app = createApp(AppWrapper);

app.config.globalProperties.$appState = reactive({
  theme: "bootstrap4-light-blue",
  darkTheme: false,
});

app.use(PrimeVue, {
  ripple: true,
  locale: {
    startsWith: "Começa com",
    contains: "Contém",
    notContains: "Não contém",
    endsWith: "Termina com",
    equals: "Igual",
    notEquals: "Não é igual",
    noFilter: "Sem filtro",
    lt: "Menor que",
    lte: "Menos que ou igual a",
    gt: "Maior que",
    gte: "Melhor que ou igual a",
    dateIs: "Data é",
    dateIsNot: "Data não é",
    dateBefore: "A data é antes",
    dateAfter: "A data é antes",
    clear: "Limpar",
    apply: "Aplicar",
    matchAll: "Combinar todos",
    matchAny: "Combinar com qualquer",
    addRule: "Adicionar regra",
    removeRule: "Remove Rule",
    accept: "Sim",
    reject: "Não",
    choose: "Escolher",
    upload: "Upload",
    cancel: "Cancelar",
    dayNames: [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sabado",
    ],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthNamesShort: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    today: "Hoje",
    weekHeader: "Wk",
    firstDayOfWeek: 0,
    dateFormat: "mm/dd/yy",
    weak: "Fraca",
    medium: "Médio",
    strong: "Forte",
    passwordPrompt: "Insira uma senha",
    emptyFilterMessage: "Nenhum resultado encontrado.",
    emptyMessage: "Sem opções disponíveis",
  },
  inputStyle: "outlined",
});
app.use(ConfirmationService);
app.use(store);
app.use(ToastService);
app.use(router);

app.config.globalProperties.$msgErro = msgErro;
app.config.globalProperties.$msgSuccess = msgSuccess;
app.config.globalProperties.$msgInfo = msgInfo;
app.config.globalProperties.$msgWarn = msgWarn;

app.config.globalProperties.$DateTime = new DateTime();
app.config.globalProperties.$Firebase = new Firebase();
app.config.globalProperties.$Token = new Token();

app.directive("tooltip", Tooltip);
app.directive("ripple", Ripple);
app.directive("code", CodeHighlight);
app.directive("badge", BadgeDirective);
app.directive("styleclass", StyleClass);

app.component("Accordion", Accordion);
app.component("AccordionTab", AccordionTab);
app.component("AutoComplete", AutoComplete);
app.component("Avatar", Avatar);
app.component("AvatarGroup", AvatarGroup);
app.component("Badge", Badge);
app.component("Breadcrumb", Breadcrumb);
app.component("Button", Button);
app.component("Calendar", Calendar);
app.component("Card", Card);
app.component("Carousel", Carousel);
app.component("Chart", Chart);
app.component("Checkbox", Checkbox);
app.component("Chip", Chip);
app.component("Chips", Chips);
app.component("ColorPicker", ColorPicker);
app.component("Column", Column);
app.component("ConfirmDialog", ConfirmDialog);
app.component("ConfirmPopup", ConfirmPopup);
app.component("ContextMenu", ContextMenu);
app.component("DataTable", DataTable);
app.component("DataView", DataView);
app.component("DataViewLayoutOptions", DataViewLayoutOptions);
app.component("Dialog", Dialog);
app.component("Divider", Divider);
app.component("Dropdown", Dropdown);
app.component("Fieldset", Fieldset);
app.component("FileUpload", FileUpload);
app.component("Image", Image);
app.component("InlineMessage", InlineMessage);
app.component("Inplace", Inplace);
app.component("InputMask", InputMask);
app.component("InputNumber", InputNumber);
app.component("InputSwitch", InputSwitch);
app.component("InputText", InputText);
app.component("Galleria", Galleria);
app.component("Knob", Knob);
app.component("Listbox", Listbox);
app.component("MegaMenu", MegaMenu);
app.component("Menu", Menu);
app.component("Menubar", Menubar);
app.component("Message", Message);
app.component("MultiSelect", MultiSelect);
app.component("OrderList", OrderList);
app.component("OrganizationChart", OrganizationChart);
app.component("OverlayPanel", OverlayPanel);
app.component("Paginator", Paginator);
app.component("Panel", Panel);
app.component("PanelMenu", PanelMenu);
app.component("Password", Password);
app.component("PickList", PickList);
app.component("ProgressBar", ProgressBar);
app.component("RadioButton", RadioButton);
app.component("Rating", Rating);
app.component("SelectButton", SelectButton);
app.component("ScrollPanel", ScrollPanel);
app.component("ScrollTop", ScrollTop);
app.component("Slider", Slider);
app.component("Sidebar", Sidebar);
app.component("Skeleton", Skeleton);
app.component("SplitButton", SplitButton);
app.component("Splitter", Splitter);
app.component("SplitterPanel", SplitterPanel);
app.component("Steps", Steps);
app.component("TabMenu", TabMenu);
app.component("TabView", TabView);
app.component("TabPanel", TabPanel);
app.component("Tag", Tag);
app.component("Textarea", Textarea);
app.component("TieredMenu", TieredMenu);
app.component("Timeline", Timeline);
app.component("Toast", Toast);
app.component("Toolbar", Toolbar);
app.component("ToggleButton", ToggleButton);
app.component("Tree", Tree);
app.component("TreeSelect", TreeSelect);
app.component("TreeTable", TreeTable);
app.component("TriStateCheckbox", TriStateCheckbox);

app.component("BlockViewer", BlockViewer);

app.mount("#app");
