$(function() {
	function e(e, n) {
		var r = 48 / n.width,
			o = 48 / n.height;
		$("#preimg").css({
			width: Math.round(r * i) + "px",
			height: Math.round(o * t) + "px",
			marginLeft: "-" + Math.round(r * n.x1) + "px",
			marginTop: "-" + Math.round(o * n.y1) + "px"
		}), $("#imgpos") && $("#imgpos").attr("value", n.x1 + "_" + n.y1 + "_" + (n.x2 - n.x1)).attr("name", "imgpos")
	}
	var i, t, n = !0;
	$("li.user-icon h5 a").click(function(e) {
		e.preventDefault(), n && ("block" == $("li.user-icon form")[0].style.display ? ($("div.imgareaselect-outer").hide(), $("div.imgareaselect-outer").prev().hide()) : setTimeout(function() {
			$("div.imgareaselect-outer").show(), $("div.imgareaselect-outer").prev().show()
		}, 500), $(this).parent().next("form").slideToggle("normal"))
	}), $("li.user-intro h5 a").click(function(e) {
		e.preventDefault(), $(this).parent().next("form").slideToggle("normal")
	});
	var r = "/accounts/user_icon/upload",
		o = "usr-icon-upload",
		a = "姝ｅ湪涓婁紶涓紝璇风◢鍊�...",
		
		c = function() {
			var e = $("#" + o).attr("disabled", 1).parent(),
				i = e.find(".error"),
				t = e.find(".waiting");
			return i.hide(), 0 === t.length ? void(t = $('<span class="waiting">' + a + "</span>").appendTo(e)) : void t.show()
		},
		l = function(e) {
			var i = $("#" + o).attr("disabled", 0).parent(),
				t = i.find(".error");
			return 0 === t.length ? void(t = $('<span class="error">' + e + "</span>").appendTo(i)) : void t.show().html(e)
		},
		d = function() {
			"" != $("#usr-icon-upload").val() && (n = !1, $.ajaxFileUpload({
				url: r,
				global: !0,
				secureuri: !1,
				fileElementId: o,
				dataType: "json",
				timeout: 12e4,
				allowType: "jpg|png|bmp|gif|jpeg",
				extra: {
					needtype: "json",
					ck: get_cookie("ck")
				},
				success: function(r, a) {
					if(!r.r) return $("#" + o).parent().find(".waiting").hide(), void l(s[14]);
					var c = $("#" + this.fileElementId).attr("disabled", 0).parent();
					c.find(".error,.waiting").hide(), $("img#bigimg").attr("src", r.pic), $("img#preimg").attr("src", r.pic), $("img#bigimg")[0].onload = function() {
						$("#imgpos").attr("value", "0_0_0"), i = $("#bigimg").width(), t = $("#bigimg").height();
						var n = $("#imgpos").attr("value").split("_"),
							r = "0" != n[2] ? {
								x1: parseInt(n[0]),
								y1: parseInt(n[1]),
								x2: parseInt(n[0]) + parseInt(n[2]),
								y2: parseInt(n[1]) + parseInt(n[2])
							} : {
								x1: i > t ? (i - t) / 2 + 3 : 3,
								x2: i > t ? (i + t) / 2 - 3 : i - 3,
								y1: i > t ? 3 : (t - i) / 2 + 3,
								y2: i > t ? t - 3 : (t + i) / 2 - 3
							};
						$("#bigimg").imgAreaSelect($.extend(r, {
							aspectRatio: "1:1",
							onSelectChange: e,
							onSelectBegin: e,
							minWidth: 20,
							noNewSelect: "true"
						}))
					}, n = !0
				},
				begin: function(e) {
					return e ? void l(s[e + ""]) : void c()
				},
				error: function(e, i, t) {
					l(s[t + ""])
				}
			}), $("#" + o).bind("change", d))
		};
	$("#" + o).bind("change", d), $("#choose_submit").click(function() {
		$.post_withck(r, {
			imgpos: $("#imgpos").val()
		}, function(e) {
			e.r && window.location.reload()
		}, "json")
	}), $("#intro_submit").click(function() {
		$.post_withck("/j/accounts/intro", {
			text: $("#text").val()
		}, function(e) {
			e.r ? ($("p.error").text(""), window.location.reload()) : $("p.error").text("鑷垜浠嬬粛鏈夌鐢ㄧ殑鍐呭锛岃閲嶆柊淇敼")
		}, "json")
	})
});