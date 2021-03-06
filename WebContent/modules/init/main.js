function MainPage() {
	var me = this;

	me.doResize = function() {
		var topDiv = jQuery("#topDiv").height();
		var leftMenu = jQuery("#leftMenu").width();

		var wh = jQuery(window).height();
		var ww = jQuery(window).width();
		// var wh = window.document.body.offsetHeight;
		// var ww = window.document.body.offsetWidth;
		jQuery("#downWrapperDiv").height(wh - topDiv);
		jQuery("#centerMain").width(ww - leftMenu);

		// 总是撑出去一点 不知道为什么 可能是page默认的margin或者padding,如果是自己的页面 估计没问题
		jQuery("#rightIframe").height(jQuery("#centerMain").height() - 5);
	};

	me.attachEvents = function() {
		var wresize = new Wresize();
		wresize.attachWindowResize(me.doResize);
		jQuery("#leftMenu .antMenu").each(function(index) {
			jQuery(this).bind("click", me.highlightTab);
		});

		// 绑定LogOut事件
		jQuery("#logOutDiv #loginedAccName").text(
				window.accountInfoJson.empname);
		jQuery("#logOutDiv").unbind().bind("click", me.doLogOut);
	};

	me.doLogOut = function() {
		document.logoutForm.action = "door/out;jsessionid=" + window.jsessionid;
		document.logoutForm.submit();
	};

	me.highlightTab = function() {
		var tabId = jQuery(this).attr("id");
		var moduleName = tabId.substring(0, tabId.indexOf("_"));
		var modulePath = "modules/" + moduleName + "/" + moduleName + ".jsp";
		jQuery("#leftMenu .antMenu").each(function(index) {
			jQuery(this).removeClass("antMenuHighlight");
		});
		jQuery("#" + tabId).addClass("antMenuHighlight");
		jQuery("#rightIframe").attr("src", modulePath);
	};

	me.refreshMenu = function() {
		//alert(window.roleInfoJson);
		var roleId = window.roleInfoJson.roleid;
		if (roleId == 1) {// 管理员, 显示所有的tab，高亮账户资料
			jQuery("#leftMenu .antMenu").each(function(index) {
				jQuery(this).show();
			});
			jQuery("#leftMenu #account_menu").addClass("antMenuHighlight");
		} else if (roleId == 2) {
			jQuery("#leftMenu .antMenu").each(function(index) {
				if (this.id != "account_menu") {
					jQuery(this).show();
				}
			});
		} else if (roleId == 5) {// 业务员
			var custom_menu = jQuery("#leftMenu #custom_menu");
			custom_menu.show();
			custom_menu.addClass("antMenuHighlight");
		}

		jQuery("#leftMenu #custom_menu").click();
	};
}

jQuery(document).ready(function() {
	var mainPage = new MainPage();
	// do resize
	mainPage.doResize();

	// bind events
	mainPage.attachEvents();

	// refresh(hide/show) tabs
	mainPage.refreshMenu();
});