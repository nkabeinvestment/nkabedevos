function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect;
var API = "http://localhost:3001";
var FALLBACK = {
  vehicles: [{
    id: "x",
    name: "Ride X",
    cap: 4,
    eta: 3,
    price: 12.5,
    icon: "🚗",
    desc: "Affordable everyday rides"
  }, {
    id: "comfort",
    name: "Comfort",
    cap: 4,
    eta: 5,
    price: 18.0,
    icon: "🚘",
    desc: "Newer cars, extra legroom"
  }, {
    id: "xl",
    name: "XL",
    cap: 6,
    eta: 7,
    price: 26.0,
    icon: "🚙",
    desc: "Room for 6, great for groups"
  }]
};
var PLACES = ["Central Station", "City Mall", "Riverside Park", "University Campus", "Airport Terminal 2"];
var DRIVER = {
  name: "Dennis M.",
  car: "Toyota Corolla · Silver",
  plate: "KCL 123A",
  rating: 4.9,
  eta: 3
};
function loadVehicles(cb) {
  fetch(API + "/api/vehicles").then(function (r) {
    return r.ok ? r.json() : Promise.reject();
  }).then(function (v) {
    return Array.isArray(v) && v.length ? cb(v) : cb(FALLBACK.vehicles);
  })["catch"](function () {
    return cb(FALLBACK.vehicles);
  });
}
function App() {
  var _useState = useState("home"),
    _useState2 = _slicedToArray(_useState, 2),
    view = _useState2[0],
    setView = _useState2[1];
  var _useState3 = useState(FALLBACK.vehicles),
    _useState4 = _slicedToArray(_useState3, 2),
    vehicles = _useState4[0],
    setVehicles = _useState4[1];
  var _useState5 = useState(""),
    _useState6 = _slicedToArray(_useState5, 2),
    dest = _useState6[0],
    setDest = _useState6[1];
  var _useState7 = useState("x"),
    _useState8 = _slicedToArray(_useState7, 2),
    vehicle = _useState8[0],
    setVehicle = _useState8[1];
  var _useState9 = useState(null),
    _useState0 = _slicedToArray(_useState9, 2),
    phase = _useState0[0],
    setPhase = _useState0[1]; // searching | assigned | active | completed
  var _useState1 = useState(loadHistory()),
    _useState10 = _slicedToArray(_useState1, 2),
    history = _useState10[0],
    setHistory = _useState10[1];
  useEffect(function () {
    loadVehicles(function (v) {
      return setVehicles(v);
    });
  }, []);
  var selected = vehicles.find(function (v) {
    return v.id === vehicle;
  }) || vehicles[0];
  var fare = selected ? selected.price.toFixed(2) : "—";
  function requestRide() {
    if (!dest.trim()) {
      setPhase("nodest");
      return;
    }
    setPhase("searching");
    setTimeout(function () {
      return setPhase("assigned");
    }, 1800);
    setTimeout(function () {
      return setPhase("active");
    }, 5200);
    setTimeout(function () {
      return setPhase("completed");
    }, 8800);
  }
  function finishRide() {
    var rec = {
      id: "RID-" + Date.now().toString(36).toUpperCase(),
      from: "Current location",
      to: dest.trim(),
      vehicle: selected.name,
      fare: Number(fare),
      time: new Date().toISOString()
    };
    var h = [rec].concat(_toConsumableArray(loadHistory())).slice(0, 20);
    localStorage.setItem("ridenow_history", JSON.stringify(h));
    setHistory(h);
    setPhase(null);
    setDest("");
    setView("home");
  }
  function loadHistory() {
    try {
      return JSON.parse(localStorage.getItem("ridenow_history")) || [];
    } catch (_unused) {
      return [];
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement(Header, {
    view: view,
    setView: setView
  }), view === "home" && /*#__PURE__*/React.createElement(Home, {
    vehicles: vehicles,
    vehicle: vehicle,
    setVehicle: setVehicle,
    dest: dest,
    setDest: setDest,
    fare: fare,
    selected: selected,
    onRequest: requestRide,
    phase: phase
  }), view === "history" && /*#__PURE__*/React.createElement(History, {
    rows: history
  }), view === "profile" && /*#__PURE__*/React.createElement(Profile, null), /*#__PURE__*/React.createElement(BottomNav, {
    view: view,
    setView: setView
  }), /*#__PURE__*/React.createElement(BookingOverlay, {
    phase: phase,
    fare: fare,
    dest: dest,
    onFinish: finishRide,
    onCancel: function onCancel() {
      return setPhase(null);
    }
  }));
}
function Header(_ref) {
  var view = _ref.view,
    setView = _ref.setView;
  return /*#__PURE__*/React.createElement("header", {
    className: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo"
  }, "\u26D3\uFE0F RideNow"), /*#__PURE__*/React.createElement("button", {
    className: "ghost-btn",
    onClick: function onClick() {
      return setView(view === "profile" ? "home" : "profile");
    }
  }, "\uD83D\uDC64"));
}
function Map(_ref2) {
  var dest = _ref2.dest,
    active = _ref2.active;
  return /*#__PURE__*/React.createElement("div", {
    className: "map"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "route",
    viewBox: "0 0 300 140",
    preserveAspectRatio: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 122 C 70 122, 70 30, 150 30 S 250 60, 282 22",
    fill: "none",
    stroke: "#1e1e2e",
    strokeWidth: "10",
    opacity: "0.25"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 122 C 70 122, 70 30, 150 30 S 250 60, 282 22",
    fill: "none",
    stroke: "#3aa0ff",
    strokeWidth: "3.5",
    strokeDasharray: "6 7"
  })), /*#__PURE__*/React.createElement("div", {
    className: "pin pick"
  }, "\uD83D\uDCCD"), /*#__PURE__*/React.createElement("div", {
    className: "pin drop"
  }, "\uD83C\uDFC1"), /*#__PURE__*/React.createElement("div", {
    className: "car-dot",
    style: {
      opacity: active ? 1 : 0.25
    }
  }, "\uD83D\uDE97"), /*#__PURE__*/React.createElement("div", {
    className: "map-label",
    style: {
      left: 8,
      top: 96
    }
  }, "You"), /*#__PURE__*/React.createElement("div", {
    className: "map-label",
    style: {
      right: 6,
      top: 6
    }
  }, dest || "Destination"));
}
function Home(_ref3) {
  var vehicles = _ref3.vehicles,
    vehicle = _ref3.vehicle,
    setVehicle = _ref3.setVehicle,
    dest = _ref3.dest,
    setDest = _ref3.setDest,
    fare = _ref3.fare,
    selected = _ref3.selected,
    onRequest = _ref3.onRequest,
    phase = _ref3.phase;
  return /*#__PURE__*/React.createElement("main", {
    className: "content"
  }, /*#__PURE__*/React.createElement(Map, {
    dest: dest,
    active: phase === "active"
  }), /*#__PURE__*/React.createElement("section", {
    className: "card"
  }, /*#__PURE__*/React.createElement("label", {
    className: "lbl"
  }, "Destination"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    placeholder: "Where to?",
    value: dest,
    onChange: function onChange(e) {
      return setDest(e.target.value);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "chips"
  }, PLACES.map(function (p) {
    return /*#__PURE__*/React.createElement("button", {
      key: p,
      className: dest === p ? "chip on" : "chip",
      onClick: function onClick() {
        return setDest(p);
      }
    }, p);
  }))), /*#__PURE__*/React.createElement("section", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-title"
  }, "Choose a ride"), vehicles.map(function (v) {
    return /*#__PURE__*/React.createElement("button", {
      key: v.id,
      className: vehicle === v.id ? "veh on" : "veh",
      onClick: function onClick() {
        return setVehicle(v.id);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "veh-icon"
    }, v.icon), /*#__PURE__*/React.createElement("span", {
      className: "veh-info"
    }, /*#__PURE__*/React.createElement("strong", null, v.name), /*#__PURE__*/React.createElement("small", null, v.desc, " \xB7 ~", v.eta, " min away")), /*#__PURE__*/React.createElement("span", {
      className: "veh-price"
    }, "$", v.price.toFixed(2)));
  })), /*#__PURE__*/React.createElement("button", {
    className: "cta",
    onClick: onRequest,
    disabled: phase === "searching"
  }, phase === "searching" ? "Finding your driver…" : "Request " + (selected ? selected.name : "")), phase === "nodest" && /*#__PURE__*/React.createElement("p", {
    className: "err"
  }, "Enter a destination to continue."));
}
function BookingOverlay(_ref4) {
  var phase = _ref4.phase,
    fare = _ref4.fare,
    dest = _ref4.dest,
    onFinish = _ref4.onFinish,
    onCancel = _ref4.onCancel;
  if (!phase) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "overlay"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet"
  }, /*#__PURE__*/React.createElement("button", {
    className: "sheet-x",
    onClick: onCancel
  }, "\u2715"), phase === "searching" && /*#__PURE__*/React.createElement("div", {
    className: "center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "spinner"
  }), /*#__PURE__*/React.createElement("h3", null, "Finding your driver"), /*#__PURE__*/React.createElement("p", {
    className: "muted"
  }, "Connecting you with the nearest RideNow vehicle\u2026")), phase === "assigned" && /*#__PURE__*/React.createElement("div", {
    className: "center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "driver-av"
  }, "\uD83D\uDC68\u200D\u2708\uFE0F"), /*#__PURE__*/React.createElement("h3", null, DRIVER.name, " is on the way"), /*#__PURE__*/React.createElement("p", {
    className: "muted"
  }, DRIVER.car), /*#__PURE__*/React.createElement("p", {
    className: "plate"
  }, DRIVER.plate, " \xB7 \u2B50 ", DRIVER.rating), /*#__PURE__*/React.createElement("p", {
    className: "eta-chip"
  }, "Arriving in ~", DRIVER.eta, " min")), phase === "active" && /*#__PURE__*/React.createElement("div", {
    className: "center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "driver-av"
  }, "\uD83D\uDE98"), /*#__PURE__*/React.createElement("h3", null, "You're on the road"), /*#__PURE__*/React.createElement("p", {
    className: "muted"
  }, "Heading to ", dest), /*#__PURE__*/React.createElement("div", {
    className: "progress"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bar"
  }))), phase === "completed" && /*#__PURE__*/React.createElement("div", {
    className: "center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "done"
  }, "\u2705"), /*#__PURE__*/React.createElement("h3", null, "Ride complete"), /*#__PURE__*/React.createElement("div", {
    className: "fare-box"
  }, /*#__PURE__*/React.createElement("span", null, "Total fare"), /*#__PURE__*/React.createElement("strong", null, "$", fare)), /*#__PURE__*/React.createElement("p", {
    className: "muted"
  }, "Rate ", DRIVER.name, " \u2B50\u2B50\u2B50\u2B50\u2B50"), /*#__PURE__*/React.createElement("button", {
    className: "cta",
    onClick: onFinish
  }, "Done"))));
}
function History(_ref5) {
  var rows = _ref5.rows;
  return /*#__PURE__*/React.createElement("main", {
    className: "content"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "page-title"
  }, "Your Trips"), !rows.length && /*#__PURE__*/React.createElement("p", {
    className: "muted"
  }, "No trips yet \u2014 request your first ride!"), rows.map(function (r) {
    return /*#__PURE__*/React.createElement("div", {
      key: r.id,
      className: "trip"
    }, /*#__PURE__*/React.createElement("div", {
      className: "trip-icon"
    }, "\uD83D\uDE97"), /*#__PURE__*/React.createElement("div", {
      className: "trip-body"
    }, /*#__PURE__*/React.createElement("strong", null, r.to), /*#__PURE__*/React.createElement("small", null, r.vehicle, " \xB7 ", new Date(r.time).toLocaleString())), /*#__PURE__*/React.createElement("div", {
      className: "trip-fare"
    }, "$", r.fare));
  }));
}
function Profile() {
  return /*#__PURE__*/React.createElement("main", {
    className: "content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "avatar"
  }, "\uD83D\uDC64"), /*#__PURE__*/React.createElement("h2", {
    className: "page-title"
  }, "Demo Profile"), /*#__PURE__*/React.createElement("p", {
    className: "muted"
  }, "This is a demo. Payment and profile data are stored in your browser only."), /*#__PURE__*/React.createElement("div", {
    className: "mini-list"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mini"
  }, /*#__PURE__*/React.createElement("span", null, "Payment"), /*#__PURE__*/React.createElement("span", null, "Visa \u2022\u2022\u2022\u2022 4242")), /*#__PURE__*/React.createElement("div", {
    className: "mini"
  }, /*#__PURE__*/React.createElement("span", null, "Mode"), /*#__PURE__*/React.createElement("span", null, "Cash \uD83D\uDCB5")), /*#__PURE__*/React.createElement("div", {
    className: "mini"
  }, /*#__PURE__*/React.createElement("span", null, "App version"), /*#__PURE__*/React.createElement("span", null, "1.0.0"))));
}
function BottomNav(_ref6) {
  var view = _ref6.view,
    setView = _ref6.setView;
  return /*#__PURE__*/React.createElement("nav", {
    className: "bottom"
  }, /*#__PURE__*/React.createElement("button", {
    className: view === "home" ? "on" : "",
    onClick: function onClick() {
      return setView("home");
    }
  }, "\uD83C\uDFE0", /*#__PURE__*/React.createElement("span", null, "Home")), /*#__PURE__*/React.createElement("button", {
    className: view === "history" ? "on" : "",
    onClick: function onClick() {
      return setView("history");
    }
  }, "\uD83E\uDDFE", /*#__PURE__*/React.createElement("span", null, "Trips")), /*#__PURE__*/React.createElement("button", {
    className: view === "profile" ? "on" : "",
    onClick: function onClick() {
      return setView("profile");
    }
  }, "\uD83D\uDC64", /*#__PURE__*/React.createElement("span", null, "Profile")));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));