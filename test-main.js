!(function (e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var i = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var i in e)
          n.d(
            r,
            i,
            function (t) {
              return e[t];
            }.bind(null, i)
          );
      return r;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 12));
})([
  function (e, t, n) {
    "use strict";
    /*!
     * Strongly Typed Events for TypeScript
     * https://github.com/KeesCBakker/StronlyTypedEvents/
     * http://keestalkstech.com
     *
     * Copyright Kees C. Bakker / KeesTalksTech
     * Released under the MIT license
     */ Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(1);
    (t.DispatcherBase = r.DispatcherBase),
      (t.DispatcherWrapper = r.DispatcherWrapper),
      (t.EventListBase = r.EventListBase),
      (t.Subscription = r.Subscription);
    var i = n(5);
    (t.EventDispatcher = i.EventDispatcher),
      (t.EventHandlingBase = i.EventHandlingBase),
      (t.EventList = i.EventList),
      (t.NonUniformEventList = i.NonUniformEventList);
    var o = n(7);
    (t.SimpleEventDispatcher = o.SimpleEventDispatcher),
      (t.SimpleEventHandlingBase = o.SimpleEventHandlingBase),
      (t.SimpleEventList = o.SimpleEventList),
      (t.NonUniformSimpleEventList = o.NonUniformSimpleEventList);
    var a = n(9);
    (t.SignalDispatcher = a.SignalDispatcher),
      (t.SignalHandlingBase = a.SignalHandlingBase),
      (t.SignalList = a.SignalList);
  },
  function (e, t, n) {
    "use strict";
    /*!
     * Strongly Typed Events for TypeScript - Core
     * https://github.com/KeesCBakker/StronlyTypedEvents/
     * http://keestalkstech.com
     *
     * Copyright Kees C. Bakker / KeesTalksTech
     * Released under the MIT license
     */ Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(3);
    (t.DispatcherBase = r.DispatcherBase),
      (t.DispatcherWrapper = r.DispatcherWrapper),
      (t.EventListBase = r.EventListBase);
    var i = n(2);
    t.Subscription = i.Subscription;
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = (function () {
      function e(e, t) {
        (this.handler = e), (this.isOnce = t), (this.isExecuted = !1);
      }
      return (
        (e.prototype.execute = function (e, t, n) {
          if (!this.isOnce || !this.isExecuted) {
            this.isExecuted = !0;
            var r = this.handler;
            e
              ? setTimeout(function () {
                  r.apply(t, n);
                }, 1)
              : r.apply(t, n);
          }
        }),
        e
      );
    })();
    t.Subscription = r;
  },
  function (e, t, n) {
    "use strict";
    var r =
      (this && this.__spreadArrays) ||
      function () {
        for (var e = 0, t = 0, n = arguments.length; t < n; t++)
          e += arguments[t].length;
        var r = Array(e),
          i = 0;
        for (t = 0; t < n; t++)
          for (var o = arguments[t], a = 0, s = o.length; a < s; a++, i++)
            r[i] = o[a];
        return r;
      };
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = n(4),
      o = n(2),
      a = (function () {
        function e() {
          (this._wrap = new c(this)), (this._subscriptions = new Array());
        }
        return (
          Object.defineProperty(e.prototype, "count", {
            get: function () {
              return this._subscriptions.length;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (e.prototype.subscribe = function (e) {
            var t = this;
            return (
              e && this._subscriptions.push(new o.Subscription(e, !1)),
              function () {
                t.unsubscribe(e);
              }
            );
          }),
          (e.prototype.sub = function (e) {
            return this.subscribe(e);
          }),
          (e.prototype.one = function (e) {
            var t = this;
            return (
              e && this._subscriptions.push(new o.Subscription(e, !0)),
              function () {
                t.unsubscribe(e);
              }
            );
          }),
          (e.prototype.has = function (e) {
            return (
              !!e &&
              this._subscriptions.some(function (t) {
                return t.handler == e;
              })
            );
          }),
          (e.prototype.unsubscribe = function (e) {
            if (e)
              for (var t = 0; t < this._subscriptions.length; t++)
                if (this._subscriptions[t].handler == e) {
                  this._subscriptions.splice(t, 1);
                  break;
                }
          }),
          (e.prototype.unsub = function (e) {
            this.unsubscribe(e);
          }),
          (e.prototype._dispatch = function (e, t, n) {
            for (
              var o = this,
                a = function (r) {
                  var a = new i.EventManagement(function () {
                      return o.unsub(r.handler);
                    }),
                    c = Array.prototype.slice.call(n);
                  if (
                    (c.push(a),
                    r.execute(e, t, c),
                    s.cleanup(r),
                    !e && a.propagationStopped)
                  )
                    return "break";
                },
                s = this,
                c = 0,
                u = r(this._subscriptions);
              c < u.length;
              c++
            ) {
              if ("break" === a(u[c])) break;
            }
          }),
          (e.prototype.cleanup = function (e) {
            if (e.isOnce && e.isExecuted) {
              var t = this._subscriptions.indexOf(e);
              t > -1 && this._subscriptions.splice(t, 1);
            }
          }),
          (e.prototype.asEvent = function () {
            return this._wrap;
          }),
          (e.prototype.clear = function () {
            this._subscriptions.splice(0, this._subscriptions.length);
          }),
          e
        );
      })();
    t.DispatcherBase = a;
    var s = (function () {
      function e() {
        this._events = {};
      }
      return (
        (e.prototype.get = function (e) {
          var t = this._events[e];
          return t || ((t = this.createDispatcher()), (this._events[e] = t), t);
        }),
        (e.prototype.remove = function (e) {
          delete this._events[e];
        }),
        e
      );
    })();
    t.EventListBase = s;
    var c = (function () {
      function e(e) {
        (this._subscribe = function (t) {
          return e.subscribe(t);
        }),
          (this._unsubscribe = function (t) {
            return e.unsubscribe(t);
          }),
          (this._one = function (t) {
            return e.one(t);
          }),
          (this._has = function (t) {
            return e.has(t);
          }),
          (this._clear = function () {
            return e.clear();
          }),
          (this._count = function () {
            return e.count;
          });
      }
      return (
        Object.defineProperty(e.prototype, "count", {
          get: function () {
            return this._count();
          },
          enumerable: !0,
          configurable: !0,
        }),
        (e.prototype.subscribe = function (e) {
          return this._subscribe(e);
        }),
        (e.prototype.sub = function (e) {
          return this.subscribe(e);
        }),
        (e.prototype.unsubscribe = function (e) {
          this._unsubscribe(e);
        }),
        (e.prototype.unsub = function (e) {
          this.unsubscribe(e);
        }),
        (e.prototype.one = function (e) {
          return this._one(e);
        }),
        (e.prototype.has = function (e) {
          return this._has(e);
        }),
        (e.prototype.clear = function () {
          this._clear();
        }),
        e
      );
    })();
    t.DispatcherWrapper = c;
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = (function () {
      function e(e) {
        (this.unsub = e), (this.propagationStopped = !1);
      }
      return (
        (e.prototype.stopPropagation = function () {
          this.propagationStopped = !0;
        }),
        e
      );
    })();
    t.EventManagement = r;
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(6);
    (t.EventDispatcher = r.EventDispatcher),
      (t.EventHandlingBase = r.EventHandlingBase),
      (t.EventList = r.EventList),
      (t.NonUniformEventList = r.NonUniformEventList);
  },
  function (e, t, n) {
    "use strict";
    var r,
      i =
        (this && this.__extends) ||
        ((r = function (e, t) {
          return (r =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
            })(e, t);
        }),
        function (e, t) {
          function n() {
            this.constructor = e;
          }
          r(e, t),
            (e.prototype =
              null === t
                ? Object.create(t)
                : ((n.prototype = t.prototype), new n()));
        });
    Object.defineProperty(t, "__esModule", { value: !0 });
    var o = n(1),
      a = (function (e) {
        function t() {
          return e.call(this) || this;
        }
        return (
          i(t, e),
          (t.prototype.dispatch = function (e, t) {
            this._dispatch(!1, this, arguments);
          }),
          (t.prototype.dispatchAsync = function (e, t) {
            this._dispatch(!0, this, arguments);
          }),
          (t.prototype.asEvent = function () {
            return e.prototype.asEvent.call(this);
          }),
          t
        );
      })(o.DispatcherBase);
    t.EventDispatcher = a;
    var s = (function () {
      function e() {
        this._events = {};
      }
      return (
        (e.prototype.get = function (e) {
          if (this._events[e]) return this._events[e];
          var t = this.createDispatcher();
          return (this._events[e] = t), t;
        }),
        (e.prototype.remove = function (e) {
          delete this._events[e];
        }),
        (e.prototype.createDispatcher = function () {
          return new a();
        }),
        e
      );
    })();
    t.NonUniformEventList = s;
    var c = (function (e) {
      function t() {
        return e.call(this) || this;
      }
      return (
        i(t, e),
        (t.prototype.createDispatcher = function () {
          return new a();
        }),
        t
      );
    })(o.EventListBase);
    t.EventList = c;
    var u = (function () {
      function e() {
        this._events = new c();
      }
      return (
        Object.defineProperty(e.prototype, "events", {
          get: function () {
            return this._events;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (e.prototype.subscribe = function (e, t) {
          this._events.get(e).subscribe(t);
        }),
        (e.prototype.sub = function (e, t) {
          this.subscribe(e, t);
        }),
        (e.prototype.unsubscribe = function (e, t) {
          this._events.get(e).unsubscribe(t);
        }),
        (e.prototype.unsub = function (e, t) {
          this.unsubscribe(e, t);
        }),
        (e.prototype.one = function (e, t) {
          this._events.get(e).one(t);
        }),
        (e.prototype.has = function (e, t) {
          return this._events.get(e).has(t);
        }),
        e
      );
    })();
    t.EventHandlingBase = u;
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(8);
    (t.SimpleEventDispatcher = r.SimpleEventDispatcher),
      (t.SimpleEventHandlingBase = r.SimpleEventHandlingBase),
      (t.SimpleEventList = r.SimpleEventList),
      (t.NonUniformSimpleEventList = r.NonUniformSimpleEventList);
  },
  function (e, t, n) {
    "use strict";
    var r,
      i =
        (this && this.__extends) ||
        ((r = function (e, t) {
          return (r =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
            })(e, t);
        }),
        function (e, t) {
          function n() {
            this.constructor = e;
          }
          r(e, t),
            (e.prototype =
              null === t
                ? Object.create(t)
                : ((n.prototype = t.prototype), new n()));
        });
    Object.defineProperty(t, "__esModule", { value: !0 });
    var o = n(1),
      a = (function (e) {
        function t() {
          return e.call(this) || this;
        }
        return (
          i(t, e),
          (t.prototype.dispatch = function (e) {
            this._dispatch(!1, this, arguments);
          }),
          (t.prototype.dispatchAsync = function (e) {
            this._dispatch(!0, this, arguments);
          }),
          (t.prototype.asEvent = function () {
            return e.prototype.asEvent.call(this);
          }),
          t
        );
      })(o.DispatcherBase);
    t.SimpleEventDispatcher = a;
    var s = (function () {
      function e() {
        this._events = {};
      }
      return (
        (e.prototype.get = function (e) {
          if (this._events[e]) return this._events[e];
          var t = this.createDispatcher();
          return (this._events[e] = t), t;
        }),
        (e.prototype.remove = function (e) {
          delete this._events[e];
        }),
        (e.prototype.createDispatcher = function () {
          return new a();
        }),
        e
      );
    })();
    t.NonUniformSimpleEventList = s;
    var c = (function (e) {
      function t() {
        return e.call(this) || this;
      }
      return (
        i(t, e),
        (t.prototype.createDispatcher = function () {
          return new a();
        }),
        t
      );
    })(o.EventListBase);
    t.SimpleEventList = c;
    var u = (function () {
      function e() {
        this._events = new c();
      }
      return (
        Object.defineProperty(e.prototype, "events", {
          get: function () {
            return this._events;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (e.prototype.subscribe = function (e, t) {
          this._events.get(e).subscribe(t);
        }),
        (e.prototype.sub = function (e, t) {
          this.subscribe(e, t);
        }),
        (e.prototype.one = function (e, t) {
          this._events.get(e).one(t);
        }),
        (e.prototype.has = function (e, t) {
          return this._events.get(e).has(t);
        }),
        (e.prototype.unsubscribe = function (e, t) {
          this._events.get(e).unsubscribe(t);
        }),
        (e.prototype.unsub = function (e, t) {
          this.unsubscribe(e, t);
        }),
        e
      );
    })();
    t.SimpleEventHandlingBase = u;
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(10);
    (t.SignalDispatcher = r.SignalDispatcher),
      (t.SignalHandlingBase = r.SignalHandlingBase),
      (t.SignalList = r.SignalList);
  },
  function (e, t, n) {
    "use strict";
    var r,
      i =
        (this && this.__extends) ||
        ((r = function (e, t) {
          return (r =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
            })(e, t);
        }),
        function (e, t) {
          function n() {
            this.constructor = e;
          }
          r(e, t),
            (e.prototype =
              null === t
                ? Object.create(t)
                : ((n.prototype = t.prototype), new n()));
        });
    Object.defineProperty(t, "__esModule", { value: !0 });
    var o = n(1),
      a = (function (e) {
        function t() {
          return e.call(this) || this;
        }
        return (
          i(t, e),
          (t.prototype.dispatch = function () {
            this._dispatch(!1, this, arguments);
          }),
          (t.prototype.dispatchAsync = function () {
            this._dispatch(!0, this, arguments);
          }),
          (t.prototype.asEvent = function () {
            return e.prototype.asEvent.call(this);
          }),
          t
        );
      })(o.DispatcherBase);
    t.SignalDispatcher = a;
    var s = (function (e) {
      function t() {
        return e.call(this) || this;
      }
      return (
        i(t, e),
        (t.prototype.createDispatcher = function () {
          return new a();
        }),
        t
      );
    })(o.EventListBase);
    t.SignalList = s;
    var c = (function () {
      function e() {
        this._events = new s();
      }
      return (
        Object.defineProperty(e.prototype, "events", {
          get: function () {
            return this._events;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (e.prototype.one = function (e, t) {
          this._events.get(e).one(t);
        }),
        (e.prototype.has = function (e, t) {
          return this._events.get(e).has(t);
        }),
        (e.prototype.subscribe = function (e, t) {
          this._events.get(e).subscribe(t);
        }),
        (e.prototype.sub = function (e, t) {
          this.subscribe(e, t);
        }),
        (e.prototype.unsubscribe = function (e, t) {
          this._events.get(e).unsubscribe(t);
        }),
        (e.prototype.unsub = function (e, t) {
          this.unsubscribe(e, t);
        }),
        e
      );
    })();
    t.SignalHandlingBase = c;
  },
  function (e, t, n) {},
  function (e, t, n) {
    "use strict";
    function r(e) {
      return (r =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            })(e);
    }
    n.r(t);
    var i = document.body,
      o = document.getElementById("engrid"),
      a = {
        init: function () {
          var e = document.querySelectorAll(
              ".en__field--text, .en__field--email:not(.en__field--checkbox), .en__field--telephone, .en__field--number, .en__field--textarea, .en__field--select, .en__field--checkbox"
            ),
            t = document.querySelectorAll(".en__field__input--other");
          Array.from(e).forEach(function (e) {
            var t = e.querySelector("input, textarea, select");
            t && t.value && e.classList.add("has-value"), s(e);
          }),
            Array.from(t).forEach(function (e) {
              ["focus", "input"].forEach(function (t) {
                e.addEventListener(
                  t,
                  function (e) {
                    var t = e.target;
                    if (t && t.parentNode && t.parentNode.parentNode) {
                      var n = t.parentNode;
                      n.classList.remove("en__field__item--hidden"),
                        n.parentNode &&
                          (n.parentNode.querySelector(
                            ".en__field__item:nth-last-child(2) input"
                          ).checked = !0);
                    }
                  },
                  !1
                );
              });
            });
        },
      },
      s = function (e) {
        var t = e.querySelector("input, textarea, select");
        t &&
          (t.addEventListener("focus", function (e) {
            var t = e.target;
            t &&
              t.parentNode &&
              t.parentNode.parentNode &&
              t.parentNode.parentNode.classList.add("has-focus");
          }),
          t.addEventListener("blur", function (e) {
            var t = e.target;
            if (t && t.parentNode && t.parentNode.parentNode) {
              var n = t.parentNode.parentNode;
              n.classList.remove("has-focus"),
                t.value
                  ? n.classList.add("has-value")
                  : n.classList.remove("has-value");
            }
          }),
          t.addEventListener("change", function (e) {
            var t = e.target;
            t &&
              t.parentNode &&
              t.parentNode.parentNode &&
              t.parentNode.parentNode.classList.add("has-value");
          }),
          t.addEventListener("input", function (e) {
            var t = e.target;
            t &&
              t.parentNode &&
              t.parentNode.parentNode &&
              t.parentNode.parentNode.classList.add("has-value");
          }),
          t.addEventListener("animationstart", function (e) {
            var t = e.target;
            switch (e.animationName) {
              case "onAutoFillStart":
                return (function (e) {
                  e.parentNode.parentNode.classList.add(
                    "is-autofilled",
                    "has-value"
                  );
                })(t);
              case "onAutoFillCancel":
                return (function (e) {
                  return e.parentNode.parentNode.classList.remove(
                    "is-autofilled",
                    "has-value"
                  );
                })(t);
            }
          }));
      },
      c = function (e, t) {
        for (var n = e.classList.length - 1; n >= 0; n--)
          e.classList[n].startsWith(t) && e.classList.remove(e.classList[n]);
      },
      u = document.getElementById("en__field_transaction_ccnumber"),
      l = document.getElementById("en__field_transaction_paymenttype"),
      d = document.querySelectorAll(
        ".en__field--ccexpire .en__field__input--splitselect"
      ),
      p = (document.getElementById("en__field_supporter_country"), d[0]),
      f = d[1],
      h = new Date(),
      v = h.getMonth() + 1,
      y = h.getFullYear() - 2e3,
      m = function () {
        var e = (function (e) {
            var t = e.charAt(0),
              n = u.className.split(" ").filter(function (e) {
                return !e.startsWith("live-card-type-");
              });
            switch (t) {
              case "0":
              case "1":
              case "2":
                return (
                  (u.className = n.join(" ").trim()),
                  u.classList.add("live-card-type-invalid"),
                  !1
                );
              case "3":
                return (
                  (u.className = n.join(" ").trim()),
                  u.classList.add("live-card-type-amex"),
                  "American Express"
                );
              case "4":
                return (
                  (u.className = n.join(" ").trim()),
                  u.classList.add("live-card-type-visa"),
                  "Visa"
                );
              case "5":
                return (
                  (u.className = n.join(" ").trim()),
                  u.classList.add("live-card-type-mastercard"),
                  "Mastercard"
                );
              case "6":
                return (
                  (u.className = n.join(" ").trim()),
                  u.classList.add("live-card-type-discover"),
                  "Discover"
                );
              case "7":
              case "8":
              case "9":
                return (
                  (u.className = n.join(" ").trim()),
                  u.classList.add("live-card-type-invalid"),
                  !1
                );
              default:
                return (
                  (u.className = n.join(" ").trim()),
                  u.classList.add("live-card-type-na"),
                  !1
                );
            }
          })(u.value),
          t = l.options[l.selectedIndex].text;
        e &&
          t != e &&
          (l.value = Array.from(l.options).filter(function (t) {
            return t.text === e;
          })[0].value);
      },
      b = function (e) {
        if ("month" == e) {
          var t = parseInt(p.value),
            n = t < v;
          console.log("month disable", n, r(n), t, v);
          for (var i = 0; i < f.options.length; i++)
            parseInt(f.options[i].value) <= y &&
              (n
                ? f.options[i].setAttribute("disabled", "disabled")
                : (f.options[i].disabled = !1));
        } else if ("year" == e) {
          var o = parseInt(f.value),
            a = o == y;
          console.log("year disable", a, r(a), o, y);
          for (var s = 0; s < p.options.length; s++)
            parseInt(p.options[s].value) < v &&
              (a
                ? p.options[s].setAttribute("disabled", "disabled")
                : (p.options[s].disabled = !1));
        }
      };
    u &&
      (u.addEventListener("keyup", function () {
        m();
      }),
      u.addEventListener("paste", function () {
        m();
      }),
      u.addEventListener("blur", function () {
        m();
      })),
      p &&
        f &&
        (p.addEventListener("change", function () {
          b("month");
        }),
        f.addEventListener("change", function () {
          b("year");
        }));
    var g = document.getElementById("en__field_supporter_country"),
      _ = document.getElementById("en__field_supporter_region");
    function L(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    function E(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    g &&
      g.addEventListener("change", function () {
        setTimeout(function () {
          1 == _.options.length && "other" == _.options[0].value
            ? _.classList.add("hide")
            : _.classList.remove("hide");
        }, 100);
      });
    var w = (function () {
        var e, t, n;
        function r(e, t) {
          var n = this;
          !(function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, r),
            E(this, "elements", void 0),
            E(this, "classes", void 0),
            (this.elements = document.getElementsByName(e)),
            (this.classes = t),
            this.hideAll();
          for (
            var i = function (e) {
                var t = n.elements[e];
                t.checked && n.show(t),
                  t.addEventListener("change", function (e) {
                    n.hideAll(), n.show(t);
                  });
              },
              o = 0;
            o < this.elements.length;
            o++
          )
            i(o);
        }
        return (
          (e = r),
          (t = [
            {
              key: "hideAll",
              value: function () {
                var e = this;
                this.elements.forEach(function (t, n) {
                  t instanceof HTMLInputElement && e.hide(t);
                });
              },
            },
            {
              key: "hide",
              value: function (e) {
                var t = e.value;
                document
                  .querySelectorAll("." + this.classes + t)
                  .forEach(function (e) {
                    e instanceof HTMLElement && (e.style.display = "none");
                  });
              },
            },
            {
              key: "show",
              value: function (e) {
                var t = e.value;
                document
                  .querySelectorAll("." + this.classes + t)
                  .forEach(function (e) {
                    e instanceof HTMLElement && (e.style.display = "");
                  }),
                  "checkbox" != e.type || e.checked || this.hide(e);
              },
            },
          ]) && L(e.prototype, t),
          n && L(e, n),
          r
        );
      })(),
      S = n(0);
    function k(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    function O(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    var A = (function () {
      function e(t, n) {
        var r = this;
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          O(this, "_onAmountChange", new S.SimpleEventDispatcher()),
          O(this, "_amount", 0),
          O(this, "_radios", ""),
          O(this, "_other", ""),
          O(this, "_dispatch", !0),
          (this._other = n),
          (this._radios = t),
          document.addEventListener("change", function (e) {
            var i = e.target;
            !i ||
              (i.name != t && i.name != n) ||
              ((i.value = r.removeCommas(i.value)),
              (r.amount = parseFloat(i.value)));
          });
      }
      var t, n, r;
      return (
        (t = e),
        (n = [
          {
            key: "load",
            value: function () {
              var e = document.querySelector(
                'input[name="' + this._radios + '"]:checked'
              );
              if (e && e.value) {
                var t = parseFloat(e.value);
                if (t > 0) this.amount = parseFloat(e.value);
                else {
                  var n = document.querySelector(
                    'input[name="' + this._other + '"]'
                  );
                  (t = parseFloat(n.value)),
                    (this.amount = parseFloat(n.value));
                }
              }
            },
          },
          {
            key: "setAmount",
            value: function (e) {
              var t =
                !(arguments.length > 1 && void 0 !== arguments[1]) ||
                arguments[1];
              if (
                !document.getElementsByName("transaction.donationAmt").length
              ) {
                this._dispatch = t;
                var n = Array.from(
                  document.querySelectorAll(
                    'input[name="' + this._radios + '"]'
                  )
                ).filter(function (t) {
                  return (
                    t instanceof HTMLInputElement && parseInt(t.value) == e
                  );
                });
                if (n.length) {
                  var r = n[0];
                  (r.checked = !0), this.clearOther();
                } else {
                  var i = document.querySelector(
                    'input[name="' + this._other + '"]'
                  );
                  i.focus(), (i.value = e.toString());
                }
                (this.amount = e), (this._dispatch = !0);
              }
            },
          },
          {
            key: "clearOther",
            value: function () {
              var e = document.querySelector(
                'input[name="' + this._other + '"]'
              );
              (e.value = ""),
                e.parentNode.classList.add("en__field__item--hidden");
            },
          },
          {
            key: "removeCommas",
            value: function (e) {
              return (
                e.length > 3 && "," == e.charAt(e.length - 3)
                  ? (e =
                      e.substr(0, e.length - 3) +
                      "." +
                      e.substr(e.length - 2, 2))
                  : e.length > 2 &&
                    "," == e.charAt(e.length - 2) &&
                    (e =
                      e.substr(0, e.length - 2) +
                      "." +
                      e.substr(e.length - 1, 1)),
                e.replace(/,/g, "")
              );
            },
          },
          {
            key: "amount",
            get: function () {
              return this._amount;
            },
            set: function (e) {
              (this._amount = e || 0),
                this._dispatch && this._onAmountChange.dispatch(this._amount);
            },
          },
          {
            key: "onAmountChange",
            get: function () {
              return this._onAmountChange.asEvent();
            },
          },
        ]) && k(t.prototype, n),
        r && k(t, r),
        e
      );
    })();
    function q(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    function B(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    var j = (function () {
      function e(t) {
        var n = this;
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          B(this, "_onFrequencyChange", new S.SimpleEventDispatcher()),
          B(this, "_frequency", "single"),
          B(this, "_radios", ""),
          (this._radios = t),
          document.addEventListener("change", function (e) {
            var r = e.target;
            r && r.name == t && (n.frequency = r.value);
          });
      }
      var t, n, r;
      return (
        (t = e),
        (n = [
          {
            key: "load",
            value: function () {
              var e = document.querySelector(
                'input[name="' + this._radios + '"]:checked'
              );
              e && e.value && (this.frequency = e.value);
            },
          },
          {
            key: "frequency",
            get: function () {
              return this._frequency;
            },
            set: function (e) {
              (this._frequency = "Y" == e ? "monthly" : "single"),
                this._onFrequencyChange.dispatch(this._frequency);
            },
          },
          {
            key: "onFrequencyChange",
            get: function () {
              return this._onFrequencyChange.asEvent();
            },
          },
        ]) && q(t.prototype, n),
        r && q(t, r),
        e
      );
    })();
    function M(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    function P(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    var C = (function () {
      function e() {
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          P(this, "_onSubmit", new S.SignalDispatcher()),
          P(this, "_onError", new S.SignalDispatcher()),
          P(this, "submit", !0);
      }
      var t, n, r;
      return (
        (t = e),
        (n = [
          {
            key: "dispatchSubmit",
            value: function () {
              this._onSubmit.dispatch(), console.log("dispatchSubmit");
            },
          },
          {
            key: "dispatchError",
            value: function () {
              this._onError.dispatch(), console.log("dispatchError");
            },
          },
          {
            key: "submitForm",
            value: function () {
              var e = document.querySelector("form .en__submit button");
              if (e) {
                var t = document.getElementById("enModal");
                t && t.classList.add("is-submitting"),
                  e.click(),
                  console.log("submitForm");
              }
            },
          },
          {
            key: "onSubmit",
            get: function () {
              return this._onSubmit.asEvent();
            },
          },
          {
            key: "onError",
            get: function () {
              return this._onError.asEvent();
            },
          },
        ]) && M(t.prototype, n),
        r && M(t, r),
        e
      );
    })();
    function D(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    function x(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    var N = (function () {
      function e(t) {
        var n = this;
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          x(this, "_amount", void 0),
          x(this, "_fees", void 0),
          x(this, "_frequency", void 0),
          x(this, "multiplier", 1 / 12),
          (this._amount = re),
          (this._frequency = ie),
          (this._fees = ae),
          re.onAmountChange.subscribe(function () {
            return n.changeSubmitButton(t);
          }),
          re.onAmountChange.subscribe(function () {
            return n.changeLiveAmount();
          }),
          re.onAmountChange.subscribe(function () {
            return n.changeLiveUpsellAmount();
          }),
          ae.onFeeChange.subscribe(function () {
            return n.changeLiveAmount();
          }),
          ae.onFeeChange.subscribe(function () {
            return n.changeLiveUpsellAmount();
          }),
          ae.onFeeChange.subscribe(function () {
            return n.changeSubmitButton(t);
          }),
          ie.onFrequencyChange.subscribe(function () {
            return n.changeLiveFrequency();
          }),
          ie.onFrequencyChange.subscribe(function () {
            return n.changeSubmitButton(t);
          }),
          oe.onSubmit.subscribe(function () {
            return n.loadingSubmitButton();
          }),
          oe.onError.subscribe(function () {
            return n.changeSubmitButton(t);
          }),
          document.addEventListener("click", function (e) {
            var t = e.target;
            t &&
              (t.classList.contains("monthly-upsell")
                ? n.upsold(e)
                : t.classList.contains("form-submit") &&
                  (e.preventDefault(), oe.submitForm()));
          });
      }
      var t, n, r;
      return (
        (t = e),
        (n = [
          {
            key: "getAmountTxt",
            value: function () {
              var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : 0,
                t = Number.isInteger(e) ? "$" + e : "$" + e.toFixed(2);
              return e > 0 ? t : "";
            },
          },
          {
            key: "getUpsellAmountTxt",
            value: function () {
              var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : 0,
                t = "$" + 5 * Math.ceil(e / 5);
              return e > 0 ? t : "";
            },
          },
          {
            key: "getUpsellAmountRaw",
            value: function () {
              var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : 0,
                t = 5 * Math.ceil(e / 5);
              return e > 0 ? t.toString() : "";
            },
          },
          {
            key: "changeSubmitButton",
            value: function (e) {
              var t = document.querySelector(".dynamic-giving-button button"),
                n = this.getAmountTxt(this._amount.amount + this._fees.fee);
              if (n) {
                var r = "single" == this._frequency.frequency ? "" : " Monthly",
                  i = "" != n ? e + " " + n + r : e + " Now";
                t.innerHTML = i;
              }
            },
          },
          {
            key: "loadingSubmitButton",
            value: function () {
              var e = document.querySelector(".en__submit button"),
                t = e.innerHTML,
                n =
                  "<span class='loader-wrapper'><span class='loader loader-quart'></span><span class='submit-button-text-wrapper'>" +
                  t +
                  "</span></span>";
              return (t = e.innerHTML), (e.innerHTML = n), !0;
            },
          },
          {
            key: "changeLiveAmount",
            value: function () {
              var e = this,
                t = this._amount.amount + this._fees.fee;
              document
                .querySelectorAll(".live-giving-amount")
                .forEach(function (n) {
                  return (n.innerHTML = e.getAmountTxt(t));
                });
            },
          },
          {
            key: "changeLiveUpsellAmount",
            value: function () {
              var e = this,
                t = (this._amount.amount + this._fees.fee) * this.multiplier;
              document
                .querySelectorAll(".live-giving-upsell-amount")
                .forEach(function (n) {
                  return (n.innerHTML = e.getUpsellAmountTxt(t));
                }),
                document
                  .querySelectorAll(".live-giving-upsell-amount-raw")
                  .forEach(function (n) {
                    return (n.innerHTML = e.getUpsellAmountRaw(t));
                  });
            },
          },
          {
            key: "changeLiveFrequency",
            value: function () {
              var e = this;
              document
                .querySelectorAll(".live-giving-frequency")
                .forEach(function (t) {
                  return (t.innerHTML =
                    "single" == e._frequency.frequency ? "" : "monthly");
                });
            },
          },
          {
            key: "upsold",
            value: function (e) {
              var t = document.querySelector(
                ".en__field--recurrpay input[value='Y']"
              );
              t && (t.checked = !0);
              var n = document.querySelector(
                ".en__field--donationAmt input[value='other']"
              );
              n && (n.checked = !0);
              var r = document.querySelector(
                "input[name='transaction.donationAmt.other']"
              );
              r &&
                ((r.value = this.getUpsellAmountRaw(
                  this._amount.amount * this.multiplier
                )),
                re.load(),
                ie.load(),
                r.parentElement &&
                  r.parentElement.classList.remove("en__field__item--hidden"));
              var i = e.target;
              i &&
                i.classList.contains("form-submit") &&
                (e.preventDefault(), oe.submitForm());
            },
          },
        ]) && D(t.prototype, n),
        r && D(t, r),
        e
      );
    })();
    function T(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function I(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    function F(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    var H = (function () {
      function e() {
        var t = this;
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          F(this, "_onFeeChange", new S.SimpleEventDispatcher()),
          F(this, "_amount", re),
          F(this, "_fee", 0),
          F(
            this,
            "_field",
            document.querySelector('input[name="supporter.processing_fees"]')
          ),
          F(this, "_subscribe", void 0),
          document.getElementsByName("transaction.donationAmt").length ||
            (this._field instanceof HTMLInputElement &&
              this._field.addEventListener("change", function (e) {
                t._field instanceof HTMLInputElement &&
                  t._field.checked &&
                  !t._subscribe &&
                  (t._subscribe = oe.onSubmit.subscribe(function () {
                    return t.addFees();
                  })),
                  t._onFeeChange.dispatch(t.fee);
              }));
      }
      var t, n, r;
      return (
        (t = e),
        (n = [
          {
            key: "calculateFees",
            value: function () {
              if (
                this._field instanceof HTMLInputElement &&
                this._field.checked &&
                "dataset" in this._field
              ) {
                var e = (function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                      var n = null != arguments[t] ? arguments[t] : {};
                      t % 2
                        ? T(n, !0).forEach(function (t) {
                            F(e, t, n[t]);
                          })
                        : Object.getOwnPropertyDescriptors
                        ? Object.defineProperties(
                            e,
                            Object.getOwnPropertyDescriptors(n)
                          )
                        : T(n).forEach(function (t) {
                            Object.defineProperty(
                              e,
                              t,
                              Object.getOwnPropertyDescriptor(n, t)
                            );
                          });
                    }
                    return e;
                  })(
                    {},
                    {
                      processingFeePercentAdded: "0",
                      processingFeeFixedAmountAdded: "0",
                    },
                    {},
                    this._field.dataset
                  ),
                  t =
                    (parseFloat(e.processingFeePercentAdded) / 100) *
                      this._amount.amount +
                    parseFloat(e.processingFeeFixedAmountAdded);
                return Math.round(100 * t) / 100;
              }
              return 0;
            },
          },
          {
            key: "addFees",
            value: function () {
              oe.submit &&
                this._amount.setAmount(this._amount.amount + this.fee, !1);
            },
          },
          {
            key: "removeFees",
            value: function () {
              this._amount.setAmount(this._amount.amount - this.fee);
            },
          },
          {
            key: "onFeeChange",
            get: function () {
              return this._onFeeChange.asEvent();
            },
          },
          {
            key: "fee",
            get: function () {
              return this.calculateFees();
            },
            set: function (e) {
              (this._fee = e), this._onFeeChange.dispatch(this._fee);
            },
          },
        ]) && I(t.prototype, n),
        r && I(t, r),
        e
      );
    })();
    function U(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function R(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? U(n, !0).forEach(function (t) {
              W(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : U(n).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    function W(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    function G(e, t) {
      if (!t) return "";
      var n = "; " + e;
      return !0 === t ? n : n + "=" + t;
    }
    function V(e, t, n) {
      return (
        encodeURIComponent(e)
          .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29") +
        "=" +
        encodeURIComponent(t).replace(
          /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
          decodeURIComponent
        ) +
        (function (e) {
          if ("number" == typeof e.expires) {
            var t = new Date();
            t.setMilliseconds(t.getMilliseconds() + 864e5 * e.expires),
              (e.expires = t);
          }
          return (
            G("Expires", e.expires ? e.expires.toUTCString() : "") +
            G("Domain", e.domain) +
            G("Path", e.path) +
            G("Secure", e.secure) +
            G("SameSite", e.sameSite)
          );
        })(n)
      );
    }
    function Y() {
      return (function (e) {
        for (
          var t = {}, n = e ? e.split("; ") : [], r = /(%[\dA-F]{2})+/gi, i = 0;
          i < n.length;
          i++
        ) {
          var o = n[i].split("="),
            a = o.slice(1).join("=");
          '"' === a.charAt(0) && (a = a.slice(1, -1));
          try {
            t[o[0].replace(r, decodeURIComponent)] = a.replace(
              r,
              decodeURIComponent
            );
          } catch (e) {}
        }
        return t;
      })(document.cookie);
    }
    function $(e) {
      return Y()[e];
    }
    function z(e, t, n) {
      document.cookie = V(e, t, R({ path: "/" }, n));
    }
    function X(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    function J(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    var K = (function () {
      function e() {
        var t = this;
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          J(this, "debug", !1),
          J(this, "overlay", void 0),
          J(this, "upsellModal", void 0),
          J(this, "exitModal", void 0),
          (this.upsellModal = document.getElementById("upsellModal")),
          (this.exitModal = document.getElementById("exitModal"));
        var n = document.createElement("div");
        (n.id = "enModal"),
          n.classList.add("is-hidden"),
          (n.innerHTML =
            '\n    <div class="enModal-container">\n        <a href="#" class="button-close"></a>\n        <div id="enModalContent">\n        </div>\n    </div>');
        var r = n.querySelector(".button-close");
        r.addEventListener("click", this.close.bind(this)),
          document.addEventListener("keyup", function (e) {
            "Escape" === e.key && r.click();
          }),
          (this.overlay = n),
          document.body.appendChild(n),
          this.upsellModal &&
            oe.onSubmit.subscribe(function () {
              return t.openUpsell();
            }),
          this.exitModal &&
            document.addEventListener("mouseout", function (e) {
              null !== e.toElement ||
                null !== e.relatedTarget ||
                t.overlay.classList.contains("is-hidden") ||
                t.overlay.classList.contains("is-submitting") ||
                !t.overlay.classList.contains("upsellModal") ||
                t.open(t.exitModal);
            });
      }
      var t, n, r;
      return (
        (t = e),
        (n = [
          {
            key: "openUpsell",
            value: function () {
              return (
                this.debug && console.log("Upsell Triggered"),
                "single" == ie.frequency &&
                this.overlay.classList.contains("is-hidden")
                  ? (this.open(this.upsellModal),
                    window.scrollTo(0, 0),
                    (oe.submit = !1),
                    !1)
                  : ((oe.submit = !0), !0)
              );
            },
          },
          {
            key: "open",
            value: function (e) {
              if (e && (!$("hide_upsellModal") || this.debug)) {
                var t = this.overlay.querySelector("#enModalContent");
                this.overlay.classList.remove("exitModal", "upsellModal"),
                  this.overlay.classList.add(e.id),
                  (t.innerHTML = e.innerHTML),
                  re.load(),
                  ie.load(),
                  this.overlay.classList.remove("is-hidden");
              }
            },
          },
          {
            key: "close",
            value: function (e) {
              e.preventDefault(),
                this.overlay.classList.contains("exitModal")
                  ? this.open(this.upsellModal)
                  : (z("hide_upsellModal", "1", { expires: 1 }),
                    this.overlay.classList.add("is-hidden"));
            },
          },
        ]) && X(t.prototype, n),
        r && X(t, r),
        e
      );
    })();
    function Q(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    function Z(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    var ee = function () {
      var e = document.body.offsetHeight;
      window.parent.postMessage({ frameHeight: e }, "*"),
        console.log("Sending height... ", e);
    };
    function te(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function ne(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    new ((function () {
      function e() {
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          Z(this, "debug", !1),
          Z(this, "overlay", document.createElement("div"));
        if (
          -1 !== navigator.userAgent.indexOf("MSIE") ||
          navigator.appVersion.indexOf("Trident/") > -1
        ) {
          var t = document.createElement("div");
          (t.id = "ieModal"),
            t.classList.add("is-hidden"),
            (t.innerHTML =
              '\n    <div class="ieModal-container">\n        <a href="#" class="button-close"></a>\n        <div id="ieModalContent">\n        <strong>Attention: </strong>\n        Your browser is no longer supported and will not receive any further security updates. Websites may no longer display or behave correctly as they have in the past. \n        Please transition to using <a href="https://www.microsoft.com/edge">Microsoft Edge</a>, Microsoft\'s latest browser, to continue enjoying the modern web.\n        </div>\n    </div>');
          var n = t.querySelector(".button-close");
          n.addEventListener("click", this.close.bind(this)),
            document.addEventListener("keyup", function (e) {
              "Escape" === e.key && n.click();
            }),
            (this.overlay = t),
            document.body.appendChild(t),
            this.open();
        }
      }
      var t, n, r;
      return (
        (t = e),
        (n = [
          {
            key: "open",
            value: function () {
              ($("hide_ieModal") && !this.debug) ||
                this.overlay.classList.remove("is-hidden");
            },
          },
          {
            key: "close",
            value: function (e) {
              e.preventDefault(),
                z("hide_ieModal", "1", { expires: 1 }),
                this.overlay.classList.add("is-hidden");
            },
          },
        ]) && Q(t.prototype, n),
        r && Q(t, r),
        e
      );
    })())();
    var re = new A("transaction.donationAmt", "transaction.donationAmt.other"),
      ie = new j("transaction.recurrpay"),
      oe = new C(),
      ae = new H(),
      se = function (e) {
        var t,
          n,
          r,
          s,
          u,
          l,
          d,
          p,
          f,
          h,
          v,
          y,
          b,
          g,
          _,
          L,
          E = (function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = null != arguments[t] ? arguments[t] : {};
              t % 2
                ? te(n, !0).forEach(function (t) {
                    ne(e, t, n[t]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    e,
                    Object.getOwnPropertyDescriptors(n)
                  )
                : te(n).forEach(function (t) {
                    Object.defineProperty(
                      e,
                      t,
                      Object.getOwnPropertyDescriptor(n, t)
                    );
                  });
            }
            return e;
          })({}, { backgroundImage: "auto", submitLabel: "Donate" }, {}, e);
        !(function (e) {
          console.log("Backgroud", e);
          var t,
            n = document.querySelector(".page-backgroundImage"),
            r = document.querySelector(".page-backgroundImage img"),
            o = document.querySelector(".background-image p"),
            a = "",
            s = document.querySelector(".content-footer");
          if (
            (r
              ? (s &&
                (t = s.getBoundingClientRect()).top >= 0 &&
                t.left >= 0 &&
                t.bottom <=
                  (window.innerHeight ||
                    document.documentElement.clientHeight) &&
                t.right <=
                  (window.innerWidth || document.documentElement.clientWidth)
                  ? i.classList.add("footer-above-fold")
                  : i.classList.add("footer-below-fold"),
                (a = r.src),
                (r.style.display = "none"))
              : o
              ? ((a = o.innerHTML), (o.style.display = "none"))
              : Array.isArray(e) &&
                (a = e[Math.floor(Math.random() * e.length)]),
            n && a)
          )
            if (
              -1 != navigator.appName.indexOf("Internet Explorer") ||
              navigator.userAgent.match(/Trident.*rv[ :]*11\./)
            );
            else {
              var c = "url(" + a + ")";
              n.style.setProperty("--background-image", c);
            }
        })(E.backgroundImage),
          (function () {
            if (document.querySelector("#engrid:not(.float-labels)")) {
              var e = document.querySelector(
                  ".en__field--donationAmt.en__field--withOther .en__field__input--other"
                ),
                t = document.querySelector("#en__field_supporter_phoneNumber2"),
                n = document.querySelector("#en__field_transaction_honname"),
                r = document.querySelector("#en__field_transaction_infname"),
                i = document.querySelector("#en__field_transaction_infemail"),
                o = document.querySelector("#en__field_transaction_infadd1"),
                a = document.querySelector("#en__field_transaction_infadd2"),
                s = document.querySelector("#en__field_transaction_infcity"),
                c = document.querySelector("#en__field_transaction_infpostcd"),
                u = document.querySelector("#en__field_transaction_gftrsn"),
                l = document.querySelector("#en__field_transaction_ccnumber");
              e &&
                ((e.placeholder = "Other"),
                e.setAttribute("inputmode", "numeric")),
                t && (t.placeholder = "000-000-0000 (optional)"),
                n && (n.placeholder = "Honoree name"),
                r && (r.placeholder = "Recipient name"),
                i && (i.placeholder = "Recipient email address"),
                o && (o.placeholder = "Recipient street address"),
                a && (a.placeholder = "Recipient Apt., ste., bldg."),
                s && (s.placeholder = "Recipient city"),
                c && (c.placeholder = "Recipient postal code"),
                u && (u.placeholder = "Reason for your gift"),
                l && (l.placeholder = "•••• •••• •••• ••••");
            }
          })(),
          (t = document.getElementById("en__field_transaction_inmem")) &&
            (t.checked
              ? o.classList.add("has-give-in-honor")
              : o.classList.remove("has-give-in-honor"),
            t.addEventListener("change", function (e) {
              t.checked
                ? o.classList.add("has-give-in-honor")
                : o.classList.remove("has-give-in-honor");
            })),
          (n = document.querySelector(".en__field--recurrpay")),
          (r = document.getElementsByName("transaction.recurrpay")),
          document.querySelector('input[name="transaction.recurrpay"]:checked'),
          (s = document.querySelector(
            'input[name="transaction.recurrpay"]:checked'
          )),
          (u = function (e) {
            "y" ==
            (s = document.querySelector(
              'input[name="transaction.recurrpay"]:checked'
            )).value.toLowerCase()
              ? (o.classList.remove("has-give-once"),
                o.classList.add("has-give-monthly"))
              : "n" == s.value.toLowerCase() &&
                (o.classList.remove("has-give-monthly"),
                o.classList.add("has-give-once"));
          }),
          n &&
            ("y" ==
            (s = document.querySelector(
              'input[name="transaction.recurrpay"]:checked'
            )).value.toLowerCase()
              ? (o.classList.remove("has-give-once"),
                o.classList.add("has-give-monthly"))
              : "n" == s.value.toLowerCase() &&
                (o.classList.add("has-give-once"),
                o.classList.remove("has-give-monthly"))),
          r &&
            Array.from(r).forEach(function (e) {
              e.addEventListener("change", u);
            }),
          (l = document.querySelector(".en__field--giveBySelect")),
          (d = document.getElementsByName("transaction.giveBySelect")),
          (p = document.querySelector("#en__field_transaction_paymenttype")),
          (f = document.querySelector(
            'input[name="transaction.giveBySelect"]:checked'
          )),
          (h = "has-give-by-"),
          (v = function (e) {
            (f = document.querySelector(
              'input[name="transaction.giveBySelect"]:checked'
            )),
              console.log("enFieldGiveBySelectCurrentValue:", f),
              f && "card" == f.value.toLowerCase()
                ? (c(o, h), o.classList.add("has-give-by-card"), m())
                : f && "check" == f.value.toLowerCase()
                ? (c(o, h),
                  o.classList.add("has-give-by-check"),
                  (p.value = "check"))
                : f &&
                  "paypal" == f.value.toLowerCase() &&
                  (c(o, h),
                  o.classList.add("has-give-by-paypal"),
                  (p.value = "paypal"));
          }),
          l &&
            ((f = document.querySelector(
              'input[name="transaction.giveBySelect"]:checked'
            )) && "card" == f.value.toLowerCase()
              ? (c(o, h), o.classList.add("has-give-by-card"), m())
              : f && "check" == f.value.toLowerCase()
              ? (c(o, h),
                o.classList.add("has-give-by-check"),
                (p.value = "check"),
                (p.value = "Check"))
              : f &&
                "paypal" == f.value.toLowerCase() &&
                (c(o, h),
                o.classList.add("has-give-by-paypal"),
                (p.value = "paypal"),
                (p.value = "Paypal"))),
          d &&
            Array.from(d).forEach(function (e) {
              e.addEventListener("change", v);
            }),
          (function () {
            var e = document.querySelector(".give-by-select"),
              t = document.getElementsByName("supporter.questions.180165"),
              n = document.querySelector("#en__field_transaction_paymenttype"),
              r = document.querySelector(
                'input[name="supporter.questions.180165"]:checked'
              ),
              i = new Option("paypal"),
              a = "has-give-by-",
              s = function (e) {
                (r = document.querySelector(
                  'input[name="supporter.questions.180165"]:checked'
                )),
                  console.log("enFieldGiveBySelectCurrentValue:", r),
                  r && "card" == r.value.toLowerCase()
                    ? (c(o, a), o.classList.add("has-give-by-card"), m())
                    : r && "check" == r.value.toLowerCase()
                    ? (c(o, a),
                      o.classList.add("has-give-by-check"),
                      (n.value = "Check"),
                      (n.value = "check"))
                    : r &&
                      "paypal" == r.value.toLowerCase() &&
                      (c(o, a),
                      o.classList.add("has-give-by-paypal"),
                      n.add(i),
                      (n.value = "Paypal"),
                      (n.value = "paypal"));
              };
            e &&
              ((r = document.querySelector(
                'input[name="supporter.questions.180165"]:checked'
              )) && "card" == r.value.toLowerCase()
                ? (c(o, a), o.classList.add("has-give-by-card"), m())
                : r && "check" == r.value.toLowerCase()
                ? (c(o, a),
                  o.classList.add("has-give-by-check"),
                  (n.value = "Check"),
                  (n.value = "check"))
                : r &&
                  "paypal" == r.value.toLowerCase() &&
                  (c(o, a),
                  o.classList.add("has-give-by-paypal"),
                  n.add(i),
                  (n.value = "Paypal"),
                  (n.value = "paypal"))),
              t &&
                Array.from(t).forEach(function (e) {
                  e.addEventListener("change", s);
                });
          })(),
          (y = document.querySelector(
            ".en__field--donationAmt .en__field__input--other"
          )) && y.setAttribute("step", ".01"),
          (function () {
            if (-1 != window.location.href.indexOf("/subscriptions")) {
              var e = document.querySelectorAll(".forceUncheck");
              e &&
                Array.from(e).forEach(function (e) {
                  var t = e.querySelectorAll("input[type='checkbox']");
                  t &&
                    Array.from(t).forEach(function (e) {
                      e.checked = !1;
                    });
                });
            }
          })(),
          (b = document.querySelectorAll(".en__contactDetails__rows")),
          (g = function (e) {
            var t =
              e.target.parentNode.parentNode.parentNode.querySelector("input");
            t.checked ? (t.checked = !1) : (t.checked = !0);
          }),
          b &&
            Array.from(b).forEach(function (e) {
              e.addEventListener("click", g);
            }),
          (_ = window.location.href),
          (L = ""),
          -1 !== _.search("edit") &&
            _.includes("https://act.ran.org/page/") &&
            ((L = (L = (L = (L = _.replace(
              "https://act.ran.org/page/",
              "https://us.e-activist.com/index.html#pages/"
            )).replace("/donate/1", "/edit")).replace(
              "/action/1",
              "/edit"
            )).replace("/data/1", "/edit")),
            (window.location.href = L)),
          a.init(),
          new w("transaction.giveBySelect", "giveBySelect-"),
          new w("supporter.questions.180165", "giveBySelect-"),
          new w("transaction.inmem", "inmem-"),
          new w("transaction.recurrpay", "recurrpay-"),
          (function () {
            if (
              -1 != window.location.href.indexOf("debug") ||
              "localhost" === location.hostname ||
              "127.0.0.1" === location.hostname
            ) {
              if (
                (i.classList.add("debug"),
                o &&
                  o.insertAdjacentHTML(
                    "beforebegin",
                    '<span id="debug-bar"><span id="info-wrapper"><span>DEBUG BAR</span></span><span id="buttons-wrapper"><span id="debug-close">X</span></span></span>'
                  ),
                window.location.search.indexOf("mode=DEMO") > -1)
              ) {
                var e = document.getElementById("info-wrapper"),
                  t = document.getElementById("buttons-wrapper");
                if (e) {
                  var n = new Date().getTime(),
                    r = (n - performance.timing.navigationStart) / 1e3,
                    a = r + (n - performance.timing.domInteractive) / 1e3;
                  e.insertAdjacentHTML(
                    "beforeend",
                    "<span>Initial Load: " +
                      r +
                      "s</span><span>DOM Interactive: " +
                      a +
                      "s</span>"
                  ),
                    t &&
                      t.insertAdjacentHTML(
                        "afterbegin",
                        '<button id="layout-toggle" type="button">Layout Toggle</button><button id="page-edit" type="button">Edit in PageBuilder (BETA)</button>'
                      );
                }
              }
              if (
                -1 != window.location.href.indexOf("debug") ||
                "localhost" === location.hostname ||
                "127.0.0.1" === location.hostname
              ) {
                var s = document.getElementById("buttons-wrapper");
                s &&
                  s.insertAdjacentHTML(
                    "afterbegin",
                    '<button id="layout-toggle" type="button">Layout Toggle</button><button id="fancy-errors-toggle" type="button">Toggle Fancy Errors</button><button id="float-labels-toggle" type="button">Toggle Float Lables</button>'
                  );
              }
              if (document.getElementById("fancy-errors-toggle")) {
                var u = document.getElementById("fancy-errors-toggle");
                u &&
                  u.addEventListener(
                    "click",
                    function () {
                      h();
                    },
                    !1
                  );
              }
              if (document.getElementById("float-labels-toggle")) {
                var l = document.getElementById("float-labels-toggle");
                l &&
                  l.addEventListener(
                    "click",
                    function () {
                      v();
                    },
                    !1
                  );
              }
              if (document.getElementById("layout-toggle")) {
                var d = document.getElementById("layout-toggle");
                d &&
                  d.addEventListener(
                    "click",
                    function () {
                      m();
                    },
                    !1
                  );
              }
              if (document.getElementById("page-edit")) {
                var p = document.getElementById("page-edit");
                p &&
                  p.addEventListener(
                    "click",
                    function () {
                      y();
                    },
                    !1
                  );
              }
              if (document.getElementById("debug-close")) {
                var f = document.getElementById("debug-close");
                f &&
                  f.addEventListener(
                    "click",
                    function () {
                      b();
                    },
                    !1
                  );
              }
              var h = function () {
                  o.classList.toggle("fancy-errors");
                },
                v = function () {
                  o.classList.toggle("float-labels");
                },
                y = function () {
                  window.location.href = window.location.href + "?edit";
                },
                m = function () {
                  o &&
                    (o.classList.contains("layout-ie11override")
                      ? (c(o, "layout-"),
                        o.classList.add("layout-centercenter1col"))
                      : o.classList.contains("layout-centercenter1col")
                      ? (c(o, "layout-"),
                        o.classList.add("layout-centercenter1col-wide"))
                      : o.classList.contains("layout-centercenter1col-wide")
                      ? (c(o, "layout-"),
                        o.classList.add("layout-centerright1col"))
                      : o.classList.contains("layout-centerright1col")
                      ? (c(o, "layout-"),
                        o.classList.add("layout-centerleft1col"))
                      : o.classList.contains("layout-centerleft1col")
                      ? (c(o, "layout-"), o.classList.add("layout-embedded"))
                      : o.classList.contains("layout-embedded")
                      ? (c(o, "layout-"),
                        o.classList.add("layout-ie11override"))
                      : console.log(
                          "While trying to switch layouts, something unexpected happen."
                        ));
                },
                b = function () {
                  i.classList.remove("debug");
                  var e = document.getElementById("debug-bar");
                  e && (e.style.display = "none");
                };
            }
          })(),
          re.onAmountChange.subscribe(function (e) {
            return console.log("Live Amount: ".concat(e));
          }),
          ie.onFrequencyChange.subscribe(function (e) {
            return console.log("Live Frequency: ".concat(e));
          }),
          oe.onSubmit.subscribe(function (e) {
            return console.log("Submit: ".concat(e));
          }),
          oe.onError.subscribe(function (e) {
            return console.log("Error: ".concat(e));
          }),
          (window.enOnSubmit = function () {
            return oe.dispatchSubmit(), oe.submit;
          }),
          (window.enOnError = function () {
            oe.dispatchError();
          });
        if (
          (function () {
            try {
              return window.self !== window.top;
            } catch (e) {
              return !0;
            }
          })()
        ) {
          var S = function () {
            if (document.querySelector(".en__errorHeader")) return !0;
            var e = document.referrer;
            return new RegExp(/^(.*)\/(page)\/(\d+.*)/).test(e);
          };
          (window.onload = function () {
            ee(),
              window.parent.postMessage({ scroll: S() }, "*"),
              document.addEventListener("click", function (e) {
                setTimeout(function () {
                  ee();
                }, 100);
              });
          }),
            (window.onresize = function () {
              return ee();
            });
          var k = document.getElementById("engrid") || document.body;
          k.classList.add("layout-embedded"),
            k.classList.remove("layout-centerleft1col"),
            k.classList.remove("layout-centercenter1col"),
            k.classList.remove("layout-centerright1col"),
            k.classList.remove("layout-centercenter1col-wide");
        }
        new N(E.submitLabel), (new K().debug = !0), re.load(), ie.load();
      },
      ce = (n(11), { submitLabel: "Give" });
    "loading" !== document.readyState
      ? se(ce)
      : document.addEventListener("DOMContentLoaded", function () {
          se(ce);
        });
  },
]);
