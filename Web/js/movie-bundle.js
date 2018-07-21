! function() {
	"use strict";
	! function(t) {
		function e(e, n, l, a) {
			var i = {
				data: a || (n ? n.data : {}),
				_wrap: n ? n._wrap : null,
				tmpl: null,
				parent: n || null,
				nodes: [],
				calls: s,
				nest: p,
				wrap: c,
				html: d,
				update: f
			};
			return e && t.extend(i, e, {
				nodes: [],
				parent: n
			}), l && (i.tmpl = l, i._ctnt = i._ctnt || i.tmpl(t, i), i.key = ++w, (C.length ? _ : y)[w] = i), i
		}

		function n(e, a, i) {
			var r, o = i ? t.map(i, function(t) {
				return "string" == typeof t ? e.key ? t.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + g + '="' + e.key + '" $2') : t : n(t, e, t._ctnt)
			}) : e;
			return a ? o : (o = o.join(""), o.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function(e, n, a, i) {
				r = t(a).get(), u(r), n && (r = l(n).concat(r)), i && (r = r.concat(l(i)))
			}), r || l(o))
		}

		function l(e) {
			var n = document.createElement("div");
			return n.innerHTML = e, t.makeArray(n.childNodes)
		}

		function a(e) {
			return new Function("jQuery", "$item", "var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('" + t.trim(e).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function(e, n, l, a, i, o, u) {
				var s, p, c, d = t.tmpl.tag[l];
				if(!d) throw "Template command not found: " + l;
				return s = d._default || [], o && !/\w$/.test(i) && (i += o, o = ""), i ? (i = r(i), u = u ? "," + r(u) + ")" : o ? ")" : "", p = o ? i.indexOf(".") > -1 ? i + r(o) : "(" + i + ").call($item" + u : i, c = o ? p : "(typeof(" + i + ")==='function'?(" + i + ").call($item):(" + i + "))") : c = p = s.$1 || "null", a = r(a), "');" + d[n ? "close" : "open"].split("$notnull_1").join(i ? "typeof(" + i + ")!=='undefined' && (" + i + ")!=null" : "true").split("$1a").join(c).split("$1").join(p).split("$2").join(a ? a.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g, function(t, e, n, l) {
					return l = l ? "," + l + ")" : n ? ")" : "", l ? "(" + e + ").call($item" + l : t
				}) : s.$2 || "") + "_.push('"
			}) + "');}return _;")
		}

		function i(e, l) {
			e._wrap = n(e, !0, t.isArray(l) ? l : [$.test(l) ? l : t(l).html()]).join("")
		}

		function r(t) {
			return t ? t.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null
		}

		function o(t) {
			var e = document.createElement("div");
			return e.appendChild(t.cloneNode(!0)), e.innerHTML
		}

		function u(n) {
			function l(n) {
				function l(t) {
					t += s, r = p[t] = p[t] || e(r, y[r.parent.key + s] || r.parent)
				}
				var a, i, r, o, u = n;
				if(o = n.getAttribute(g)) {
					for(; u.parentNode && 1 === (u = u.parentNode).nodeType && !(a = u.getAttribute(g)););
					a !== o && (u = u.parentNode ? 11 === u.nodeType ? 0 : u.getAttribute(g) || 0 : 0, (r = y[o]) || (r = _[o], r = e(r, y[u] || _[u]), r.key = ++w, y[w] = r), k && l(o)), n.removeAttribute(g)
				} else k && (r = t.data(n, "tmplItem")) && (l(r.key), y[r.key] = r, u = t.data(n.parentNode, "tmplItem"), u = u ? u.key : 0);
				if(r) {
					for(i = r; i && i.key != u;) i.nodes.push(n), i = i.parent;
					delete r._ctnt, delete r._wrap, t.data(n, "tmplItem", r)
				}
			}
			var a, i, r, o, u, s = "_" + k,
				p = {};
			for(r = 0, o = n.length; r < o; r++)
				if(1 === (a = n[r]).nodeType) {
					for(i = a.getElementsByTagName("*"), u = i.length - 1; u >= 0; u--) l(i[u]);
					l(a)
				}
		}

		function s(t, e, n, l) {
			if(!t) return C.pop();
			C.push({
				_: t,
				tmpl: e,
				item: this,
				data: n,
				options: l
			})
		}

		function p(e, n, l) {
			return t.tmpl(t.template(e), n, l, this)
		}

		function c(e, n) {
			var l = e.options || {};
			return l.wrapped = n, t.tmpl(t.template(e.tmpl), e.data, l, e.item)
		}

		function d(e, n) {
			var l = this._wrap;
			return t.map(t(t.isArray(l) ? l.join("") : l).filter(e || "*"), function(t) {
				return n ? t.innerText || t.textContent : t.outerHTML || o(t)
			})
		}

		function f() {
			var e = this.nodes;
			t.tmpl(null, null, null, this).insertBefore(e[0]), t(e).remove()
		}
		var m, h = t.fn.domManip,
			g = "_tmplitem",
			$ = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
			y = {},
			_ = {},
			v = {
				key: 0,
				data: {}
			},
			w = 0,
			k = 0,
			C = [];
		t.each({
			appendTo: "append",
			prependTo: "prepend",
			insertBefore: "before",
			insertAfter: "after",
			replaceAll: "replaceWith"
		}, function(e, n) {
			t.fn[e] = function(l) {
				var a, i, r, o, u = [],
					s = t(l),
					p = 1 === this.length && this[0].parentNode;
				if(m = y || {}, p && 11 === p.nodeType && 1 === p.childNodes.length && 1 === s.length) s[n](this[0]), u = this;
				else {
					for(i = 0, r = s.length; i < r; i++) k = i, a = (i > 0 ? this.clone(!0) : this).get(), t(s[i])[n](a), u = u.concat(a);
					k = 0, u = this.pushStack(u, e, s.selector)
				}
				return o = m, m = null, t.tmpl.complete(o), u
			}
		}), t.fn.extend({
			tmpl: function(e, n, l) {
				return t.tmpl(this[0], e, n, l)
			},
			tmplItem: function() {
				return t.tmplItem(this[0])
			},
			template: function(e) {
				return t.template(e, this[0])
			},
			domManip: function(e, n, l) {
				if(e[0] && t.isArray(e[0])) {
					for(var a, i = t.makeArray(arguments), r = e[0], o = r.length, u = 0; u < o && !(a = t.data(r[u++], "tmplItem")););
					a && k && (i[2] = function(e) {
						t.tmpl.afterManip(this, e, l)
					}), h.apply(this, i)
				} else h.apply(this, arguments);
				return k = 0, !m && t.tmpl.complete(y), this
			}
		}), t.extend({
			tmpl: function(l, a, r, o) {
				var u, s = !o;
				if(s) o = v, l = t.template[l] || t.template(null, l), _ = {};
				else if(!l) return l = o.tmpl, y[o.key] = o, o.nodes = [], o.wrapped && i(o, o.wrapped), t(n(o, null, o.tmpl(t, o)));
				return l ? ("function" == typeof a && (a = a.call(o || {})), r && r.wrapped && i(r, r.wrapped), u = t.isArray(a) ? t.map(a, function(t) {
					return t ? e(r, o, l, t) : null
				}) : [e(r, o, l, a)], s ? t(n(o, null, u)) : u) : []
			},
			tmplItem: function(e) {
				var n;
				for(e instanceof t && (e = e[0]); e && 1 === e.nodeType && !(n = t.data(e, "tmplItem")) && (e = e.parentNode););
				return n || v
			},
			template: function(e, n) {
				return n ? ("string" == typeof n ? n = a(n) : n instanceof t && (n = n[0] || {}), n.nodeType && (n = t.data(n, "tmpl") || t.data(n, "tmpl", a(n.innerHTML))), "string" == typeof e ? t.template[e] = n : n) : e ? "string" != typeof e ? t.template(null, e) : t.template[e] || t.template(null, $.test(e) ? e : t(e)) : null
			},
			encode: function(t) {
				return("" + t).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")
			}
		}), t.extend(t.tmpl, {
			tag: {
				tmpl: {
					_default: {
						$2: "null"
					},
					open: "if($notnull_1){_=_.concat($item.nest($1,$2));}"
				},
				wrap: {
					_default: {
						$2: "null"
					},
					open: "$item.calls(_,$1,$2);_=[];",
					close: "call=$item.calls();_=call._.concat($item.wrap(call,_));"
				},
				each: {
					_default: {
						$2: "$index, $value"
					},
					open: "if($notnull_1){$.each($1a,function($2){with(this){",
					close: "}});}"
				},
				if: {
					open: "if(($notnull_1) && $1a){",
					close: "}"
				},
				else: {
					_default: {
						$1: "true"
					},
					open: "}else if(($notnull_1) && $1a){"
				},
				html: {
					open: "if($notnull_1){_.push($1a);}"
				},
				"=": {
					_default: {
						$1: "$data"
					},
					open: "if($notnull_1){_.push($.encode($1a));}"
				},
				"!": {
					open: ""
				}
			},
			complete: function() {
				y = {}
			},
			afterManip: function(e, n, l) {
				var a = 11 === n.nodeType ? t.makeArray(n.childNodes) : 1 === n.nodeType ? [n] : [];
				l.call(e, n), u(a), k++
			}
		})
	}(jQuery),
	function(t) {
		t.fn.iSuggest = function(e) {
			function n(e) {
				if(u && u.abort(), /27$|38$|40$/.test(e.keyCode) && d.is(":visible")) switch(e.preventDefault(), e.keyCode) {
						case 38:
							r("up");
							break;
						case 40:
							r("down");
							break;
						case 27:
							d.hide()
					} else if(/13$/.test(e.keyCode) && d.find("." + f.currClass).length) e.preventDefault(), o(d.find("." + f.currClass));
					else {
						try {
							clearTimeout(s), s = null
						} catch(e) {}
						s = setTimeout(function() {
							l(t.trim(c.val()))
						}, f.delay_ms)
					}
			}

			function l(e) {
				e.length ? u = t.get(f.api, {
					q: e
				}, function(n) {
					n.length ? (t("#search_suggest ul").empty(), a(n, e)) : d.hide()
				}) : d.hide()
			}

			function a(e, n) {
				e.length && (t.each(e, function(t, e) {
					e.keyword = n, e.index = t
				}), t("#search_suggest ul").html(t("#" + f.tmplId).tmpl(e)), i(), d.show(), t("#search_suggest ul").delegate("li", "click", function() {
					o(this)
				}))
			}

			function i() {
				var t = c.offset(),
					e = c.outerHeight();
				d.css({
					top: t.top + e + "px",
					left: t.left + "px"
				})
			}

			function r(t) {
				var e = d.find("." + f.currClass);
				e.length ? (e.removeClass(f.currClass), "up" == t ? e.prev("li").length ? e.prev("li").addClass(f.currClass) : d.find("li:last").addClass(f.currClass) : "down" == t && (e.next("li").length ? e.next("li").addClass(f.currClass) : d.find("li:first").addClass(f.currClass))) : "up" == t ? d.find("li:last").addClass(f.currClass) : "down" == t && d.find("li:first").addClass(f.currClass)
			}

			function o(e) {
				t.isFunction(f.item_act) ? f.item_act(e) : console.error("iSuggest: call back is not a function")
			}
			var u, s, p = {
					api: "",
					delay_ms: 300,
					tmplId: "suggResult",
					currClass: "curr_item"
				},
				c = t(this),
				d = t("<div id='search_suggest'><ul></ul></div>"),
				f = t.extend({}, p, e);
			return d.appendTo("body").hide(), c.blur(function() {
				setTimeout(function() {
					d.hide()
				}, 300)
			}), t(window).load(i).resize(i), c.each(function() {
				c.attr("autocomplete", "off"), c.keyup(function(t) {
					n(t)
				}).keydown(function(t) {
					/27$|38$|40$/.test(t.keyCode) && d.is(":visible") && t.preventDefault()
				})
			})
		}
	}(jQuery), $("#db-nav-movie").find("input[name=search_text]").iSuggest({
		api: "/j/subject_suggest",
		tmplId: "suggResult",
		item_act: function(t) {
			window.location = t.data("link")
		}
	})
}();