function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
var API = "http://localhost:3002";
var SUBJECTS = ["Mathematics", "Physics", "Computer Science", "Chemistry", "English", "Economics"];
var MOCK_TUTORS = [{
  id: "t1",
  name: "Amara Okafor",
  subjects: ["Mathematics", "Physics"],
  rate: 25,
  rating: 4.9,
  sessions: 212,
  avatar: "👩‍🏫",
  bio: "PhD in Applied Mathematics. 6+ years tutoring calculus, linear algebra, and mechanics.",
  slots: ["Mon 10:00", "Mon 14:00", "Wed 16:00", "Fri 11:00"]
}, {
  id: "t2",
  name: "James Mwangi",
  subjects: ["Computer Science", "Mathematics"],
  rate: 30,
  rating: 4.8,
  sessions: 156,
  avatar: "👨‍💻",
  bio: "Software engineer teaching programming, algorithms, and databases with practical examples.",
  slots: ["Tue 12:00", "Wed 09:00", "Thu 15:00"]
}, {
  id: "t3",
  name: "Linda Chebet",
  subjects: ["English", "Economics"],
  rate: 20,
  rating: 4.7,
  sessions: 98,
  avatar: "👩‍🎓",
  bio: "Academic writing, literature, and micro/macroeconomics tutor. Friendly and structured.",
  slots: ["Mon 16:00", "Thu 10:00", "Sat 09:00"]
}, {
  id: "t4",
  name: "Brian Otieno",
  subjects: ["Chemistry", "Physics"],
  rate: 22,
  rating: 4.6,
  sessions: 134,
  avatar: "👨‍🔬",
  bio: "Lab-focused chemistry and physics tutor. Past papers and exam prep specialist.",
  slots: ["Tue 14:00", "Fri 15:00", "Sat 11:00"]
}];
function loadTutors(cb) {
  fetch(API + "/api/tutors").then(function (r) {
    return r.ok ? r.json() : Promise.reject();
  }).then(function (t) {
    return Array.isArray(t) && t.length ? cb(t) : cb(MOCK_TUTORS);
  })["catch"](function () {
    return cb(MOCK_TUTORS);
  });
}
function readBookings() {
  try {
    return JSON.parse(localStorage.getItem("studymate_bookings")) || [];
  } catch (_unused) {
    return [];
  }
}
function saveBookings(b) {
  localStorage.setItem("studymate_bookings", JSON.stringify(b));
}
var ME = {
  id: "t1",
  name: "Amara Okafor"
};
function App() {
  var _useState = useState(function () {
      return localStorage.getItem("studymate_role") || "student";
    }),
    _useState2 = _slicedToArray(_useState, 2),
    role = _useState2[0],
    setRole = _useState2[1];
  var _useState3 = useState(MOCK_TUTORS),
    _useState4 = _slicedToArray(_useState3, 2),
    tutors = _useState4[0],
    setTutors = _useState4[1];
  var _useState5 = useState("discover"),
    _useState6 = _slicedToArray(_useState5, 2),
    tab = _useState6[0],
    setTab = _useState6[1];
  var _useState7 = useState(null),
    _useState8 = _slicedToArray(_useState7, 2),
    selected = _useState8[0],
    setSelected = _useState8[1];
  var _useState9 = useState(readBookings()),
    _useState0 = _slicedToArray(_useState9, 2),
    bookings = _useState0[0],
    setBookings = _useState0[1];
  useEffect(function () {
    loadTutors(function (t) {
      return setTutors(t);
    });
  }, []);
  function switchRole(r) {
    setRole(r);
    localStorage.setItem("studymate_role", r);
  }
  function book(tutor, slot, topic) {
    var b = {
      id: "BK-" + Date.now().toString(36).toUpperCase(),
      tutorId: tutor.id,
      tutorName: tutor.name,
      subject: tutor.subjects[0],
      slot: slot,
      topic: topic || tutor.subjects[0] + " session",
      status: "pending",
      student: "Demo Student",
      created: new Date().toISOString()
    };
    saveBookings([b].concat(_toConsumableArray(readBookings())));
    setBookings(readBookings());
    setSelected(null);
    setTab("sessions");
  }
  function respond(b, status) {
    var next = readBookings().map(function (x) {
      return x.id === b.id ? _objectSpread(_objectSpread({}, x), {}, {
        status: status
      }) : x;
    });
    saveBookings(next);
    setBookings(readBookings());
  }
  var requests = bookings.filter(function (b) {
    return b.tutorId === ME.id && b.status === "pending";
  });
  var mine = bookings.filter(function (b) {
    return role === "student" ? b.student === "Demo Student" : b.tutorId === ME.id;
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement("header", {
    className: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo"
  }, "\uD83C\uDF93 StudyMate"), /*#__PURE__*/React.createElement("div", {
    className: "role-switch"
  }, /*#__PURE__*/React.createElement("button", {
    className: role === "student" ? "on" : "",
    onClick: function onClick() {
      return switchRole("student");
    }
  }, "Student"), /*#__PURE__*/React.createElement("button", {
    className: role === "tutor" ? "on" : "",
    onClick: function onClick() {
      return switchRole("tutor");
    }
  }, "Tutor"))), role === "tutor" && /*#__PURE__*/React.createElement(TutorBanner, {
    onSwitch: function onSwitch() {
      return switchRole("student");
    }
  }), tab === "discover" && /*#__PURE__*/React.createElement(Discover, {
    tutors: tutors,
    setSelected: setSelected
  }), tab === "sessions" && role === "student" && /*#__PURE__*/React.createElement(SessionsList, {
    bookings: mine,
    empty: "No sessions booked yet \u2014 discover a tutor and book!"
  }), tab === "sessions" && role === "tutor" && /*#__PURE__*/React.createElement(TutorDash, {
    requests: requests,
    mine: mine.filter(function (b) {
      return b.tutorId === ME.id;
    }),
    onRespond: respond
  }), /*#__PURE__*/React.createElement("nav", {
    className: "bottom"
  }, /*#__PURE__*/React.createElement("button", {
    className: tab === "discover" ? "on" : "",
    onClick: function onClick() {
      return setTab("discover");
    }
  }, "\uD83D\uDD0E", /*#__PURE__*/React.createElement("span", null, role === "tutor" ? "Requests" : "Discover")), /*#__PURE__*/React.createElement("button", {
    className: tab === "sessions" ? "on" : "",
    onClick: function onClick() {
      return setTab("sessions");
    }
  }, "\uD83D\uDCC5", /*#__PURE__*/React.createElement("span", null, "My Sessions"))), selected && /*#__PURE__*/React.createElement(TutorModal, {
    tutor: selected,
    onClose: function onClose() {
      return setSelected(null);
    },
    onBook: function onBook(slot, topic) {
      return book(selected, slot, topic);
    }
  }));
}
function TutorBanner(_ref) {
  var onSwitch = _ref.onSwitch;
  return /*#__PURE__*/React.createElement("div", {
    className: "banner"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "You're a tutor \uD83C\uDF93"), /*#__PURE__*/React.createElement("p", null, "Accept requests below, or switch back to browse as a student.")));
}
function Discover(_ref2) {
  var tutors = _ref2.tutors,
    setSelected = _ref2.setSelected;
  var _useState1 = useState(""),
    _useState10 = _slicedToArray(_useState1, 2),
    q = _useState10[0],
    setQ = _useState10[1];
  var _useState11 = useState("All"),
    _useState12 = _slicedToArray(_useState11, 2),
    subj = _useState12[0],
    setSubj = _useState12[1];
  var list = tutors.filter(function (t) {
    var okSub = subj === "All" || t.subjects.includes(subj);
    var okQ = t.name.toLowerCase().includes(q.toLowerCase());
    return okSub && okQ;
  });
  return /*#__PURE__*/React.createElement("main", {
    className: "content"
  }, /*#__PURE__*/React.createElement("input", {
    className: "input",
    placeholder: "Search tutors\u2026",
    value: q,
    onChange: function onChange(e) {
      return setQ(e.target.value);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "chips"
  }, /*#__PURE__*/React.createElement("button", {
    className: subj === "All" ? "chip on" : "chip",
    onClick: function onClick() {
      return setSubj("All");
    }
  }, "All"), SUBJECTS.map(function (s) {
    return /*#__PURE__*/React.createElement("button", {
      key: s,
      className: subj === s ? "chip on" : "chip",
      onClick: function onClick() {
        return setSubj(s);
      }
    }, s);
  })), list.map(function (t) {
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      className: "tutor",
      onClick: function onClick() {
        return setSelected(t);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "t-av"
    }, t.avatar), /*#__PURE__*/React.createElement("span", {
      className: "t-body"
    }, /*#__PURE__*/React.createElement("strong", null, t.name), /*#__PURE__*/React.createElement("small", null, t.subjects.join(" · ")), /*#__PURE__*/React.createElement("small", null, "\u2B50 ", t.rating, " \xB7 ", t.sessions, " sessions")), /*#__PURE__*/React.createElement("span", {
      className: "t-rate"
    }, "$", t.rate, /*#__PURE__*/React.createElement("small", null, "/hr")));
  }), !list.length && /*#__PURE__*/React.createElement("p", {
    className: "muted"
  }, "No tutors match."));
}
function TutorModal(_ref3) {
  var tutor = _ref3.tutor,
    onClose = _ref3.onClose,
    onBook = _ref3.onBook;
  var _useState13 = useState(""),
    _useState14 = _slicedToArray(_useState13, 2),
    slot = _useState14[0],
    setSlot = _useState14[1];
  var _useState15 = useState(""),
    _useState16 = _slicedToArray(_useState15, 2),
    topic = _useState16[0],
    setTopic = _useState16[1];
  return /*#__PURE__*/React.createElement("div", {
    className: "overlay",
    onClick: function onClick(e) {
      return e.target === e.currentTarget && onClose();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet"
  }, /*#__PURE__*/React.createElement("button", {
    className: "sheet-x",
    onClick: onClose
  }, "\u2715"), /*#__PURE__*/React.createElement("div", {
    className: "tutor-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-av big"
  }, tutor.avatar), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0
    }
  }, tutor.name), /*#__PURE__*/React.createElement("p", {
    className: "muted",
    style: {
      margin: 0
    }
  }, "\u2B50 ", tutor.rating, " \xB7 ", tutor.sessions, " sessions \xB7 $", tutor.rate, "/hr"))), /*#__PURE__*/React.createElement("p", {
    className: "bio"
  }, tutor.bio), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Pick a slot"), /*#__PURE__*/React.createElement("div", {
    className: "chips"
  }, tutor.slots.map(function (s) {
    return /*#__PURE__*/React.createElement("button", {
      key: s,
      className: slot === s ? "chip on" : "chip",
      onClick: function onClick() {
        return setSlot(s);
      }
    }, s);
  })), /*#__PURE__*/React.createElement("div", {
    className: "lbl",
    style: {
      marginTop: 12
    }
  }, "Topic / notes"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    placeholder: "e.g. Calculus II \u2014 derivatives review",
    value: topic,
    onChange: function onChange(e) {
      return setTopic(e.target.value);
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "cta",
    disabled: !slot,
    onClick: function onClick() {
      return onBook(slot, topic);
    }
  }, slot ? "Book session" : "Select a slot")));
}
function SessionsList(_ref4) {
  var bookings = _ref4.bookings,
    empty = _ref4.empty;
  return /*#__PURE__*/React.createElement("main", {
    className: "content"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "page-title"
  }, "My Sessions"), !bookings.length && /*#__PURE__*/React.createElement("p", {
    className: "muted"
  }, empty), bookings.map(function (b) {
    return /*#__PURE__*/React.createElement("div", {
      key: b.id,
      className: "trip"
    }, /*#__PURE__*/React.createElement("span", {
      className: "trip-icon"
    }, "\uD83C\uDF93"), /*#__PURE__*/React.createElement("span", {
      className: "trip-body"
    }, /*#__PURE__*/React.createElement("strong", null, b.tutorName), /*#__PURE__*/React.createElement("small", null, b.topic), /*#__PURE__*/React.createElement("small", null, b.slot, " \xB7 ", b.id)), /*#__PURE__*/React.createElement("span", {
      className: b.status === "confirmed" ? "st ok" : b.status === "declined" ? "st no" : "st"
    }, b.status));
  }));
}
function TutorDash(_ref5) {
  var requests = _ref5.requests,
    mine = _ref5.mine,
    onRespond = _ref5.onRespond;
  return /*#__PURE__*/React.createElement("main", {
    className: "content"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "page-title"
  }, "Booking Requests"), !requests.length && /*#__PURE__*/React.createElement("p", {
    className: "muted"
  }, "No pending requests. Book as a student to create one for yourself."), requests.map(function (b) {
    return /*#__PURE__*/React.createElement("div", {
      key: b.id,
      className: "trip"
    }, /*#__PURE__*/React.createElement("span", {
      className: "trip-icon"
    }, "\uD83D\uDE4B"), /*#__PURE__*/React.createElement("span", {
      className: "trip-body"
    }, /*#__PURE__*/React.createElement("strong", null, b.student), /*#__PURE__*/React.createElement("small", null, b.topic), /*#__PURE__*/React.createElement("small", null, b.slot)), /*#__PURE__*/React.createElement("span", {
      className: "req-actions"
    }, /*#__PURE__*/React.createElement("button", {
      className: "mini-ok",
      onClick: function onClick() {
        return onRespond(b, "confirmed");
      }
    }, "\u2713"), /*#__PURE__*/React.createElement("button", {
      className: "mini-no",
      onClick: function onClick() {
        return onRespond(b, "declined");
      }
    }, "\u2715")));
  }), /*#__PURE__*/React.createElement("h2", {
    className: "page-title"
  }, "Confirmed Sessions"), !mine.some(function (b) {
    return b.status === "confirmed";
  }) && /*#__PURE__*/React.createElement("p", {
    className: "muted"
  }, "No confirmed sessions yet."), mine.filter(function (b) {
    return b.status !== "pending";
  }).map(function (b) {
    return /*#__PURE__*/React.createElement("div", {
      key: b.id,
      className: "trip"
    }, /*#__PURE__*/React.createElement("span", {
      className: "trip-icon"
    }, "\uD83D\uDCC5"), /*#__PURE__*/React.createElement("span", {
      className: "trip-body"
    }, /*#__PURE__*/React.createElement("strong", null, b.student), /*#__PURE__*/React.createElement("small", null, b.topic), /*#__PURE__*/React.createElement("small", null, b.slot)), /*#__PURE__*/React.createElement("span", {
      className: b.status === "confirmed" ? "st ok" : "st no"
    }, b.status));
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));