// IMPORT
var React    = require("react");
var ReactDOM = require("react-dom");
var Provider = require("react-redux").Provider;
var store    = require("./store/store.jsx");

var MemoContainer = require("./components/memo.jsx");

ReactDOM.render(
    <Provider store={store}>
        <MemoContainer/>
    </Provider>,
document.getElementById('container'));
