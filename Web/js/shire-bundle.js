! function() {
	"use strict";

	function e(e, n, t, o) {
		var r, i, c = new Date;
		c.setTime(c.getTime() + 24 * (n || 30) * 60 * 60 * 1e3), r = "; expires=" + c.toGMTString();
		for(i in e) document.cookie = i + "=" + e[i] + r + "; domain=" + (t || "douban.com") + "; path=" + (o || "/")
	}

	function n(e) {
		var n, t, o = e + "=",
			r = document.cookie.split(";");
		for(n = 0; n < r.length; n++) {
			for(t = r[n];
				" " == t.charAt(0);) t = t.substring(1, t.length);
			if(0 === t.indexOf(o)) return t.substring(o.length, t.length).replace(/\"/g, "")
		}
		return null
	}

	function t(e) {
		e.preventDefault ? e.preventDefault() : e.returnValue = !1
	}

	function o(e, n) {
		var t = 1;
		e.style.opacity = 1, e.style.pointerEvents = "none";
		var o = +new Date,
			r = function() {
				t -= (new Date - o) / 400, e.style.opacity = t < 0 ? 0 : t, o = +new Date, t > 0 ? window.requestAnimationFrame && requestAnimationFrame(r) || setTimeout(r, 16) : n()
			};
		r()
	}

	function r(e, n, t, o) {
		return !e.addEventListener && (n = "on" + n), (e.addEventListener || e.attachEvent).call(e, n, t, o), t
	}

	function i(e, n, t, o) {
		return !e.removeEventListener && (n = "on" + n), (e.removeEventListener || e.detachEvent).call(e, n, t, o), t
	}

	function c() {
		O = "Y"
	}

	function a(e) {
		if(window.Notification && e.num) {
			var t = n("enable_push_desktop_noty");
			if(t = "1" == t) {
				var o = "";
				if("notification" == e.type) o = "浣犳敹鍒颁竴涓柊鎻愰啋";
				else {
					if("doumail" != e.type) return;
					o = "浣犳敹鍒颁竴灏佹柊璞嗛偖"
				}
				var r = new Notification("璞嗙摚", {
					body: o,
					tag: e.id,
					icon: "//img3.doubanio.com/dae/accounts/resources/321e246/shire/assets/dou36.png"
				});
				r.onclick = function() {
					window.focus(), this.close()
				}, r.onshow = function() {
					setTimeout(function() {
						r.close()
					}, 3e3)
				}
			}
		}
	}

	function l() {
		var t = document.getElementById("top-nav-notimenu");
		b({
			url: _GLOBAL_NAV.DOUBAN_URL + "/j/notification/nav_pop",
			data: {
				ck: n("ck"),
				k: _GLOBAL_NAV.UPLOAD_AUTH_TOKEN,
				from_push: O
			},
			success: function(n) {
				if(!n.r) {
					t.innerHTML = n.s;
					var o = n.n;
					if(0 === o) {
						var r = document.querySelector("#db-global-nav .top-nav-reminder .num");
						r && r.parentNode.removeChild(r)
					} else {
						var i = document.querySelector("#db-global-nav .top-nav-reminder .num span");
						i && (i.innerHTML = o)
					}
					e({
						push_noty_num: n.n
					})
				}
			}
		})
	}

	function s(e) {
		var n = e.target || e.srcElement,
			t = n.getAttribute("href").split("#")[1],
			r = _GLOBAL_NAV.DOUBAN_URL + "/j/reply_notify/remove_notify?id=" + t;
		b({
			url: r,
			success: function(e) {
				var t = n.closest(".item-req").parentNode;
				o(t, function() {
					t.parentNode.removeChild(t)
				})
			}
		})
	}

	function d(e) {
		var t = e.target || e.srcElement,
			r = t.getAttribute("name"),
			i = _GLOBAL_NAV.DOUBAN_URL + "/j/notification/discard";
		b({
			url: i,
			data: {
				id: r,
				ck: n("ck")
			},
			success: function(e) {
				var n = t.closest(".item-req").parentNode;
				o(n, function() {
					n.parentNode.removeChild(n)
				})
			}
		})
	}

	function m(e) {
		B = e;
		var n = document.querySelector("#db-global-nav .top-nav-reminder");
		if(!e) {
			var t = n.querySelector(".num");
			return void(t && t.parentNode.removeChild(t))
		}
		var o = n.querySelector(".num span");
		o ? o.innerHTML = e : n.insertAdjacentHTML("beforeend", '<span class="num"><span>' + e + "</span><i></i></span>"), e > 0 && e < 10 ? n.style.marginRight = "5px" : e >= 10 && (n.style.marginRight = "15px")
	}

	function f(e) {
		D = e;
		var n = document.querySelector("#top-nav-doumail-link"),
			t = n.querySelector("em");
		if(!e) return void(t && t.parentNode.removeChild(t));
		var o = "(" + e + ")";
		t ? t.innerHTML = o : n.insertAdjacentHTML("beforeend", "<em>" + o + "</em>")
	}

	function p(e) {
		b({
			url: _GLOBAL_NAV.DOUBAN_URL + "/j/push/get_token_with_ts",
			success: function(n) {
				e(n.token, n.timestamp)
			}
		})
	}

	function v() {
		clearTimeout(V), V = setTimeout(function e() {
			var t = parseInt(n("push_noty_num") || "0", 10),
				o = parseInt(n("push_doumail_num") || "0", 10);
			t != B && m(t), o != D && f(o), t || o ? V = setTimeout(e, 1500) : clearTimeout(V)
		}, 1500)
	}

	function _(n, t, o) {
		if(window.EventSource) {
			var r = "notification:user:" + n,
				i = n + "_" + o + ":" + t,
				l = "http://push.douban.com:4394/sse?channel=" + r + "&auth=" + i;
			"https:" == location.protocol && (l = "https://push.douban.com:4397/sse?channel=" + r + "&auth=" + i);
			var s = null;
			try {
				s = new EventSource(l)
			} catch(e) {
				return
			}
			s.addEventListener("open", function() {
				q = 0
			}, !1), s.addEventListener("error", function(e) {
				this.readyState != EventSource.CLOSED && this.readyState != EventSource.CONNECTING || (s.close(), s = null, setTimeout(function() {
					(q += 1) < G && p(function(e, t) {
						_(n, e, t)
					})
				}, q * M))
			}, !1), s.addEventListener("message", function(t) {
				var o = JSON.parse(t.data);
				"notification" == o.type ? (m(o.num), c(), e({
					push_noty_num: o.num
				})) : "doumail" == o.type && (f(o.num), u(n), e({
					push_doumail_num: o.num
				})), v(), a(o)
			}, !1)
		}
	}

	function h() {
		j && (j.style.display = "none", C[I.key] = I.cookie, e(C))
	}

	function y() {
		j && (j.style.display = "block")
	}

	function L(e) {
		var n = e.parentNode;
		if(h(), S && (N(), n.contains(S))) return void(S = null);
		n.classList.add("more-active"), S = n.querySelector(".more-items")
	}

	function N() {
		S && S.parentNode.classList.remove("more-active")
	}

	function g(e) {
		this.element = e
	}
	var E = r,
		w = r,
		A = i;
	E.on = w, E.off = A;
	var O, S, k = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
		b = function(e, n) {
			return n = {
				exports: {}
			}, e(n, n.exports), n.exports
		}(function(e) {
			(function() {
				var n, t, o, r, i, c, u, a;
				o = function(e) {
					return window.document.createElement(e)
				}, r = window.encodeURIComponent, u = Math.random, n = function(e) {
					var n, r, c, u, l, s, d;
					if(null == e && (e = {}), s = {
							data: e.data || {},
							error: e.error || i,
							success: e.success || i,
							beforeSend: e.beforeSend || i,
							complete: e.complete || i,
							url: e.url || ""
						}, s.computedUrl = t(s), 0 === s.url.length) throw new Error("MissingUrl");
					return u = !1, !1 !== s.beforeSend({}, s) && (c = e.callbackName || "callback", r = e.callbackFunc || "jsonp_" + a(15), n = s.data[c] = r, window[n] = function(e) {
						return window[n] = null, s.success(e, s), s.complete(e, s)
					}, d = o("script"), d.src = t(s), d.async = !0, d.onerror = function(e) {
						return s.error({
							url: d.src,
							event: e
						}), s.complete({
							url: d.src,
							event: e
						}, s)
					}, d.onload = d.onreadystatechange = function() {
						var e, n;
						if(!(u || "loaded" !== (e = this.readyState) && "complete" !== e)) return u = !0, d ? (d.onload = d.onreadystatechange = null, null != (n = d.parentNode) && n.removeChild(d), d = null) : void 0
					}, l = window.document.getElementsByTagName("head")[0] || window.document.documentElement, l.insertBefore(d, l.firstChild)), {
						abort: function() {
							if(window[n] = function() {
									return window[n] = null
								}, u = !0, null != d ? d.parentNode : void 0) return d.onload = d.onreadystatechange = null, d.parentNode.removeChild(d), d = null
						}
					}
				}, i = function() {}, t = function(e) {
					var n;
					return n = e.url, n += e.url.indexOf("?") < 0 ? "?" : "&", n += c(e.data)
				}, a = function(e) {
					var n;
					for(n = ""; n.length < e;) n += u().toString(36).slice(2, 3);
					return n
				}, c = function(e) {
					var n, t, o;
					return n = function() {
						var n;
						n = [];
						for(t in e) o = e[t], n.push(r(t) + "=" + r(o));
						return n
					}(), n.join("&")
				}, (null !== e ? e.exports : void 0) ? e.exports = n : this.JSONP = n
			}).call(k)
		}),
		T = function(e, n, t) {
			for(var o = 0; o < e.length; o++) n.call(t, e[o])
		},
		B = 0,
		D = 0,
		U = {
			a_delete_reply_notify: s,
			a_discard_notify: d
		},
		q = 0,
		G = 20,
		M = 3e3,
		V = null,
		I = {
			key: "ap",
			cookie: "1"
		},
		C = {},
		j = document.querySelector("#doubanapp-tip"),
		R = function(e) {
			return new RegExp("(^| )" + e + "( |$)")
		},
		x = function(e, n, t) {
			for(var o = 0; o < e.length; o++) n.call(t, e[o])
		};
	g.prototype = {
			add: function() {
				x(arguments, function(e) {
					this.contains(e) || (this.element.className += " " + e)
				}, this)
			},
			remove: function() {
				x(arguments, function(e) {
					this.element.className = this.element.className.replace(R(e), "")
				}, this)
			},
			toggle: function(e) {
				return this.contains(e) ? (this.remove(e), !1) : (this.add(e), !0)
			},
			contains: function(e) {
				return R(e).test(this.element.className)
			},
			replace: function(e, n) {
				this.remove(e), this.add(n)
			}
		}, "classList" in Element.prototype || Object.defineProperty(Element.prototype, "classList", {
			get: function() {
				return new g(this)
			}
		}), window.DOMTokenList && null == DOMTokenList.prototype.replace && (DOMTokenList.prototype.replace = g.prototype.replace), window.Element && !Element.prototype.closest && (Element.prototype.closest = function(e) {
			var n, t = (this.document || this.ownerDocument).querySelectorAll(e),
				o = this;
			do {
				for(n = t.length; --n >= 0 && t.item(n) !== o;);
			} while (n < 0 && (o = o.parentElement));
			return o
		}),
		function() {
			var e = document.getElementById("db-global-nav");
			j && (n(I.key) || y(), w(j, "click", function(e) {
				t(e), h()
			})), w(e, "click", function(e) {
				var n = e.target || e.srcElement,
					o = n.closest(".bn-more, .top-nav-reminder .lnk-remind");
				o && (t(e), L(o), o.classList.contains("lnk-remind") && l())
			}), w(document, "click", function(e) {
				(e.target || e.srcElement).closest(".more-items, .more-active") || S && (N(), S = null)
			});
			var o = e.querySelector(".lnk-doubanapp"),
				r = e.querySelector("#top-nav-appintro");
			if(o) {
				var i;
				w(o, "mouseenter", function(e) {
					var n = e.target || e.srcElement;
					n.parentNode.classList.contains("more-active") || L(n)
				}), w(o, "mouseleave", function(e) {
					e.target || e.srcElement, i = setTimeout(function() {
						S && (N(), S = null)
					}, 200)
				}), w(r, "mouseenter", function(e) {
					i && (clearTimeout(i), i = null)
				}), w(r, "mouseleave", function(e) {
					var n = e.target || e.srcElement;
					S && (N(), n === S && (S = null))
				})
			}
		}(),
		
		function() {
			var e = document.querySelector(".nav-user-account .bn-more");
			e && w(e, "click", function() {
				var n = e.parentNode,
					t = n.querySelector(".tips-common");
				t && n.removeChild(t)
			})
		}()
}();