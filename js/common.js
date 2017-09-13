
'use strict'



$('#darkpane').addClass('on');
$("body").addClass("wait");

( $( window ).width() > 1000 ?  $( '.s_conf_wrap_content' ).css( 'height' , $( window ).height() - 60 ) : 0 );

$( window ).resize( function () {
	var _x = $( window ).width(),
		_h = $( window ).height();

	if ( _x > 1000 ) {
		$( '.s_conf_wrap_content' ).css( 'height' , _h - 100 );
		$( '.s_conf_wrap_content' ).getNiceScroll().show();
		if ( $( '.nicescroll-rails' ).length > 0 ) {
			$( '.s_conf_wrap_content' ).niceScroll({
				styler : "fb" , 
				cursorcolor : "#f4f4f4" ,
				cursorwidth : '0' ,
				horizrailenabled : false,
				cursorborderradius : 0,
				cursorborder:'0',
				background : '' ,
				zindex : 99999999999999999,
				cursoropacitymin  : 0,
				cursoropacitymax  : 0,
			});
		}
	} else {
		$( '.nicescroll-rails' ).remove();
	}
	
} );

$( '.s_conf_wrap_content' ).niceScroll({
	styler : "fb" , 
	cursorcolor : "#f4f4f4" ,
	cursorwidth : '0' ,
	horizrailenabled : false,
	cursorborderradius : 0,
	cursorborder:'0',
	background : '' ,
	zindex : 99999999999999999,
	cursoropacitymin  : 0,
	cursoropacitymax  : 0,
});



$( '#scrollIndicator' ).off( 'click' );
$( '#scrollIndicator' ).on( 'click' , function ( e ) {
	var _self = $( this );
	var _height = $( window ).height();
	if ( _self.hasClass( 'active' ) ) {
		$( '#s_conf' ).fadeOut( 300 );
		$( 'div.wrpVis' ).animate( { 'bottom' : -100 } );
		//$( '#s_conf' ).animate( { 'top' :_height } );
		
		$( '#s_conf_submenu' ).animate( { 'top' : _height - 39 } );
		
		_self.removeClass( 'active' );
	} else {
		
		$( 'div.wrpVis' ).animate( { 'bottom' : 0 } );
		//$( '#s_conf' ).animate( { 'top' : '0' } );
		$( '#s_conf' ).fadeIn( 300 );
		$( '#s_conf_submenu' ).animate( { 'top' : '58px' } );
		_self.addClass( 'active' );
	}
	
} );




var objectall = $( 'body' ).dataengine().getxml();
var _carPaint = objectall.carPaint;
var _carCamera = objectall.carCamera;
var _carWheel = objectall.carWheel;
var _carTypeList = objectall.carTypeList;


/*车身颜色*/
var carPaintHtml = "";

for(var i = 0; i < _carPaint.length; i++) {
	var ctypearr = new Array();
	for(var ctype in _carPaint[i]) {
		ctypearr.push('data-' + ctype + '="' + _carPaint[i][ctype] + '"');
	};

	carPaintHtml += '<li id="s_exterieur_x_FP3" style="margin-right: .2857em;" class="tileColor_1" data-link-id="FP3" data-objid="' + i + '" ' + ctypearr.join('') + '>';
	carPaintHtml += '<flag class="tooltip-show-condition"></flag><span style="background-color:' + _carPaint[i].color + ' ;"></span>';
	carPaintHtml += '</li>';
}
$("#tiles_9").html(carPaintHtml);


/*车轮*/
var carWheelHtml = "";
if ( _carWheel != undefined ) {
	for(var i = 0; i < _carWheel.length; i++) {
		var carWheelarr = new Array();
		for(var carWheel in _carWheel[i]) {
			carWheelarr.push('data-' + carWheel + '="' + _carWheel[i][carWheel] + '"');
		};
		carWheelHtml += '<li id="s_exterieur_x_M395" style="margin-right: .2857em;" data-link-id="M395" data-objid="' + i + '"' + carWheelarr.join('') + '>';
		carWheelHtml += '<span class="wheel-option img-wrapper" style="max-width: 5.9375rem;"><flag class="tooltip-show-condition"></flag>';
		carWheelHtml += '<span class="img-element" style="padding-top: 100%; background-image: url(images/' + _carWheel[i].loadpath + '); background-position: ' + _carWheel[i].carImgPosition + ';"></span></span>';
		carWheelHtml += '</li>';
	}
}

$("#ARA .tileWheels").html(carWheelHtml);


//内饰颜色
var carInteriorHtml = "";
if ( objectall.carInterior != undefined ) {
	for(var i = 0; i < _carInterior.length; i++) {
		var interiorArr = new Array();
		for(var carItype in _carInterior[i]) {
			interiorArr.push('data-' + carItype + '="' + _carInterior[i][carItype] + '"');
		};
		carInteriorHtml += '<li id="s_interieur_x_IAG"  style="margin-right: .2857em;" class="tileColor_1 colorRecommendation" data-link-id="IAG" data-objid="' + i + '"' + interiorArr.join('') + '>';
		carInteriorHtml += '<flag class="tooltip-show-condition"></flag><span style="background-color: ' + _carInterior[i].loadpath + ';"></span></li>';
	}
}

$("#tiles_54").html(carInteriorHtml);

//车辆列表
var carTypeListHtmlarr = '';
for(var i = 0; i < _carTypeList.length; i++) {
	
	var carTypeListHtml = '',
		carTypeListChildHtml = '';
	if(_carTypeList[i].parentid == 0) {
		carTypeListHtml += '<div id="s_models_x_718" class="model-item">';
		carTypeListHtml += '<div id="s_models_x_718_x_flyoutopener" class="flyoutopener">';
		carTypeListHtml += '<div class="model-wrapper"><span class="model-title" >' + _carTypeList[i].title + '</span>';
		carTypeListHtml += '<div class="model-img"><span class="img-wrapper" style="max-width: 14.125rem;"><span class="img-element" style="padding-top: 44.2478%; background-image: url(images/' + _carTypeList[i].imgpath + '); background-position: ' + _carTypeList[i].imgposition + ';"></span></span>';
		carTypeListHtml += '</div></div></div>';
		for ( var c = 0 ; c < _carTypeList.length ; c++ ) {
			
			if ( _carTypeList[ c ].parentid == _carTypeList[i].id ) {
				carTypeListChildHtml += '<div id="s_models_x_718_x__982120JC33" class="flat-text-item" style="margin-top: 0.625rem;">';
				
				carTypeListChildHtml += '<div >';
				
				if(_carTypeList[c].url){
					carTypeListChildHtml += '<a href = \"/'+_carTypeList[c].url+'\">';
				}
				carTypeListChildHtml += _carTypeList[c].title 
				
				if(_carTypeList[c].url){
					
					carTypeListChildHtml += '</a>';
				}
				carTypeListChildHtml += '</div>';
				carTypeListChildHtml += '</div>';
			}
			
		}
		
		carTypeListHtmlarr += carTypeListHtml + ' <div id="s_models_x_718" class="groupItems model-derivate">' + carTypeListChildHtml + '</div></div>';
	}
	
}

$("#models").html( carTypeListHtmlarr );






//$('#darkpane').removeClass('on');
$("body").removeClass("wait");
$("body").addClass("ready");
//级联菜单("车型" 鼠标移入移出事件)
function fnFirstMenu(obj1) {

	var oVehicle = document.getElementById(obj1);
	//鼠标移入
	oVehicle.onmouseover = function() {
		//$("html").addClass("noscroll");
		$("body").addClass("open-modelflyout");
		$('#darkpane').addClass('on');
		$('#s_models').addClass('open');
	};
	$( '#navigation_main_x_mainsuboffer_x_models' ).click( function () {
		if ($('#s_models').hasClass( 'open' )) {
			$('#darkpane').removeClass('on');
			$('#s_models').removeClass('open');
		} else {
			$('#darkpane').addClass('on');
			$('#s_models').addClass('open');
		}
		
	} );
	

	
	//鼠标离开
	$('#s_models').mouseleave(function() {
		//$("html").removeClass("noscroll");
		$("body").removeClass("open-modelflyout");
		$('#darkpane').removeClass('on');
		$('#s_models').removeClass('open');
	});

};
//级联菜单-二级菜单
function fnSecondMenu(obj) {

	var oModels = document.getElementById(obj);
	var aDiv = oModels.querySelectorAll(".model-item");

	for(var i = 0; i < aDiv.length; i++) {

		aDiv[i].onmouseover = function() {
			$(".model-item").removeClass("open");
			$(this).addClass("open");
		};

		aDiv[i].onmouseout = function() {
			$(this).removeClass("open");
		};
	}
};

//nav导航左、右点击事件
function nav_left_right_showBtn() {};

//菜单(小窗口下的点击事件)
function fnBurgerMenu() {

	var search_x_button = document.getElementById("search_x_button");
	var search_x_inp = document.getElementById("search_x_inp");
	var oSubmenu_summary = document.getElementById("submenu_summary_x_myPorsche_submenu_x_submenu_parent");

	//菜单展开
	$("#s_burgermenu").click(function() {
		if($("body").hasClass("open-burgermenu")) {
			$("html").removeClass("noscroll");
			$("body").removeClass("open-burgermenu");
		} else {
			$("html").addClass("noscroll");
			$("body").addClass("open-burgermenu");

			//菜单展开后列表展开收缩
			$("#s_conf_submenu section").click(function() {

				if($(this).hasClass('selected')) {

					$("#s_conf_submenu section div").removeClass("selected");
					$("#s_conf_submenu section").removeClass("selected");
					$("#s_conf_submenu section").removeClass("activeNav");

				} else {

					$("#s_conf_submenu section div").removeClass("selected");
					$("#s_conf_submenu section").removeClass("selected");
					$("#s_conf_submenu section").removeClass("activeNav");
					$(this).addClass("selected");
					$(this).addClass("activeNav");
				}
				preventdefault;
			});

			//搜索按钮(放大镜)点击并赋予焦点
			search_x_button.onclick = function() {
				$("body").addClass("search-active");
				search_x_inp.focus(); //添加焦点事件
			};

			//失去焦点事件
			search_x_inp.onblur = function() {
				$("body").removeClass("search-active");
			};

			//汇总事件
			oSubmenu_summary.onclick = function() {

				$("html").addClass("show-scrollbar-y");
				//$("html").removeClass("noscroll");
				$("body").removeClass("open-burgermenu");
				//继续配置页面
				$("html").addClass("show-scrollbar-y");
				//$("body").addClass("wait");
				//$("#ui").addClass("summary");
			};
			//列表样式添加
			$(".configMenu_hdl").click(function() {

				if($(this).parent().parent().parent().hasClass("accordion-open")) {
					$(this).parent().parent().parent().removeClass("accordion-open");
					$(this).parent().parent().parent().addClass("accordion-closed");
					$(this).parent().parent().prev().attr("data-active", "false");
					$(this).parent().parent().next().next().attr("data-active", "false");
				} else {
					$(this).parent().parent().parent().removeClass("accordion-closed");
					$(this).parent().parent().parent().addClass("accordion-open");
					$(this).parent().parent().prev().attr("data-active", "true");
					$(this).parent().parent().next().next().attr("data-active", "true");
				}
			});

			//锚点跳转
			//车身颜色及车轮-车身颜色
			fnAnimate("#submenu_exterieur_x_AA_submenu_x_IAF", "#IAF_subHdl");
			//车身颜色及车轮-车轮
			fnAnimate("#submenu_exterieur_x_AA_submenu_x_IRA", "#IRA_subHdl");
			//车身颜色及车轮-车轮配件 
			fnAnimate("#submenu_exterieur_x_AA_submenu_x_IRZ", "#IRZ_subHdl");

			//内饰颜色及座椅-内饰颜色及材料
			fnAnimate("#submenu_interieur_x_AI_submenu_x_submenu_interior_and_material", "#submenu_interior_and_material_subHdl");
			//内饰颜色及座椅-座椅
			fnAnimate("#submenu_interieur_x_AI_submenu_x_submenu_seats", "#submenu_seats_subHdl");

			//选装-外部
			fnAnimate("#submenu_individualization_x_individual_submenu_x_IEX", "#IEX_subHdl");
			//选装-变速箱/底盘
			fnAnimate("#submenu_individualization_x_individual_submenu_x_IMG", "#IMG_subHdl");
			//选装-内饰
			fnAnimate("#submenu_individualization_x_individual_submenu_x_IIN", "#IIN_subHdl");
			//选装-真皮内饰
			fnAnimate("#submenu_individualization_x_individual_submenu_x_IIL", "#IIL_subHdl");
			//选装-Alcantara 内饰
			fnAnimate("#submenu_individualization_x_individual_submenu_x_IAL", "#IAL_subHdl");
			//选装-木质内饰
			fnAnimate("#submenu_individualization_x_individual_submenu_x_IIH", "#IIH_subHdl");
			//选装-碳纤维内饰
			fnAnimate("#submenu_individualization_x_individual_submenu_x_IIC", "#IIC_subHdl");
			//选装-铝合金内饰
			fnAnimate("#submenu_individualization_x_individual_submenu_x_IIA", "#IIA_subHdl");
			//选装-音响与交通
			fnAnimate("#submenu_individualization_x_individual_submenu_x_IAU", "#IAU_subHdl");

			//更多个性化选项-真皮颜色选择/装饰性缝线
			fnAnimate("#submenu_zoffer_x_zOffer_submenu_x_ZFW", "#ZFW_subHdl");

			//精装配件-车轮和车轮附件
			fnAnimate("#submenu_tequipment_x_tequipment_submenu_x_ABC", "#ABC_subHdl");
			//精装配件-车内
			fnAnimate("#submenu_tequipment_x_tequipment_submenu_x_AAF", "#AAF_subHdl");
			//精装配件-运输和保护
			fnAnimate("#submenu_tequipment_x_tequipment_submenu_x_ABE", "#ABE_subHdl");
			//精装配件-儿童座椅
			fnAnimate("#submenu_tequipment_x_tequipment_submenu_x_AAG", "#AAG_subHdl");
			//精装配件-养护
			fnAnimate("#submenu_tequipment_x_tequipment_submenu_x_ABB", "#ABB_subHdl");
		};
	});

}
//轮播图  (移入移出)prev next   
function prev_next_showBtn(id, id2) {

	var oShowBtn = document.getElementById(id);
	var oPrintBtn = document.getElementById(id2);

	oShowBtn.onmouseover = function() {

		$(oPrintBtn).addClass("showArrows");
	};

	oShowBtn.onmouseout = function() {

		$(oPrintBtn).removeClass("showArrows");

	};
};
//头部添加active选中样式
function addActive(id) {

	var navigation = document.getElementById(id);
	var aActive = navigation.getElementsByTagName("a");

	var len = aActive.length;

	for( var i = 1; i < len; i++ ) {

		aActive[i].onclick = function() {

			for(i = 0; i < len; i++) {

				aActive[i].className = '';
			};
			this.className = 'activeNav';
			if($("#navigation_main_x_mainsuboffer_x_myPorsche").hasClass("activeNav")) {
				$("html").addClass("show-scrollbar-y");
				//$("body").addClass("wait");
				$("#ui").addClass("summary");
			} else {
				$("html").removeClass("show-scrollbar-y");
				//$("body").removeClass("wait");
				$("#ui").removeClass("summary");
			}
		};
	};
};

//价格详情
function priceMobile(id) {

	var s_price_mobile = document.getElementById(id);

	s_price_mobile.onclick = function() {

		if(!$("#s_price_mobile").hasClass("open")) {
			$("#s_price_mobile").addClass("open")

		} else {
			$("#s_price_mobile").removeClass("open")
		}

	};
};

//大图预览
function fnBtnFullScreen2D(id) {
	var oBtnFullScreen2D = document.getElementById(id);

	oBtnFullScreen2D.onclick = function() {
		alert("2D模式大图预览事件")
	}
}

//搜索框
function oSearch(id1, id2, id3) {

	var oSearch_x_inp = document.getElementById(id1);
	var s_conf_submenu = document.getElementById(id2);

	var offsetW = s_conf_submenu.offsetWidth;

	//获得焦点事件
	oSearch_x_inp.onfocus = function() {

		var w = document.body.clientWidth;
		if(w > 1050) {
			oSearch_x_inp.style.width = offsetW - 15 + "px";
		} else if(w < 1050) {
			oSearch_x_inp.style.width = (offsetW - 50) + "px";
		}

	};

	//失去焦点事件
	oSearch_x_inp.onblur = function() {
		oSearch_x_inp.style.width = "";
	};
};

//添加选配列表按钮,开关(switchSize)
function addSwitchSize(id) {
	var oSwitchSize = document.getElementById(id);

	oSwitchSize.title = "添加选配列表";
	//点击展开
	oSwitchSize.onclick = function() {

		switchSize.title = "添加车辆图片";
		alert("添加选配列表按钮事件");
	}
};

//概览按钮
function submenuAddOpen() {

	$('.flyout-label').click(function() {

		if(!$('#s_conf_submenu').hasClass('open')) {

			$('#s_conf_submenu').addClass("open");

			$("#s_conf_submenu section").click(function() {

				if($(this).hasClass('selected')) {
					$("#s_conf_submenu section div").removeClass("selected");
					$("#s_conf_submenu section").removeClass("selected");
					$("#s_conf_submenu section").removeClass("activeNav");

				} else {
					$("#s_conf_submenu section div").removeClass("selected");
					$("#s_conf_submenu section").removeClass("selected");
					$("#s_conf_submenu section").removeClass("activeNav");
					$(this).addClass("selected");
					$(this).addClass("activeNav");
				}
				preventdefault;
			});

		} else {
			$('#s_conf_submenu').removeClass("open");

		};

	});

	//车身颜色
	$("#IAF_subHdl").click(function() {

		if($(this).parent().parent().parent().hasClass("accordion-open")) {
			$(this).parent().parent().parent().removeClass("accordion-open");
			$(this).parent().parent().parent().addClass("accordion-closed");
			$(this).parent().parent().prev().attr("data-active", "false");
			$(this).parent().parent().next().next().attr("data-active", "false");

		} else {
			$(this).parent().parent().parent().removeClass("accordion-closed");
			$(this).parent().parent().parent().addClass("accordion-open");
			$(this).parent().parent().prev().attr("data-active", "true");
			$(this).parent().parent().next().next().attr("data-active", "true");

		}
	});

	//车轮
	$("#IRA_subHdl").click(function() {

		if($(this).parent().parent().parent().hasClass("accordion-open")) {
			$(this).parent().parent().parent().removeClass("accordion-open");
			$(this).parent().parent().parent().addClass("accordion-closed");
			$(this).parent().parent().prev().attr("data-active", "false");
			$(this).parent().parent().next().next().attr("data-active", "false");

		} else {
			$(this).parent().parent().parent().removeClass("accordion-closed");
			$(this).parent().parent().parent().addClass("accordion-open");
			$(this).parent().parent().prev().attr("data-active", "true");
			$(this).parent().parent().next().next().attr("data-active", "true");

		}
	});
	/*//概览列表菜单点击事件
	$(".configMenu_hdl").click(function() {

		if($(this).parent().parent().parent().hasClass("accordion-open")) {
			$(this).parent().parent().parent().removeClass("accordion-open");
			$(this).parent().parent().parent().addClass("accordion-closed");
			$(this).parent().parent().prev().attr("data-active", "false");
			$(this).parent().parent().next().next().attr("data-active", "false");

		} else {
			$(this).parent().parent().parent().removeClass("accordion-closed");
			$(this).parent().parent().parent().addClass("accordion-open");
			$(this).parent().parent().prev().attr("data-active", "true");
			$(this).parent().parent().next().next().attr("data-active", "true");

		}
	});*/

};

//单选按钮+文本
function fnCheckedText(obj1, obj2, obj3) {
	
	$( '.tileColor_1' ).on( 'mouseover' , function() {
		//提示框
		var _self = $( this );
		var _type = 'color',
			_color = _self.attr( 'data-color' ),
			_metallic = _self.attr( 'data-metallic' ),
			_roughness = _self.attr( 'data-roughness' ),
			_name = _self.attr( 'data-name' );
		layer.tips( _name + " -" + "2800￥", $(this), {
			tips: [1, '#000']
		});
	});

	$('.tileColor_1').click(function() {
		var _self = $( this );
		$(obj1).removeClass("selected");
		$(this).addClass("selected");
		$(obj2).text("车型");
		$(obj3).text("价格￥");
		
		var _type = 'color',
			_color = _self.attr( 'data-color' ),
			_metallic = _self.attr( 'data-metallic' ),
			_roughness = _self.attr( 'data-roughness' ),
			_name = _self.attr( 'data-name' );
		$( 'body' ).dataengine().requestfnquery(
			{
				'type' : _type,
				'color' : _color,
				'metallic' : _metallic,
				'roughness' : _roughness,
				'name':_name
			}
		);
	});

};

//单选按钮
function fnChecked(obj, obj2) {
	$(obj).click(function() {
		$(obj).removeClass("checked");
		$(obj2).removeClass("checked");
		$(this).addClass("checked");
		$(obj2).addClass("checked");
	});
};

//锚点
function fnAnimate(obj1, obj2) {

	var _offtop2 = $('#s_conf_submenu').offset().top + $('#s_conf_submenu').height() - 2; //166

	$(obj1).click(function() {

		if($("body").hasClass("open-burgermenu")) {
			//$("html").removeClass("noscroll");
			$("body").removeClass("open-burgermenu");
		} else {
			//$("#ui").addClass("smallView");
			$(this).addClass("selected").siblings(".selected").removeClass("selected");

			$("html, body").animate({
				scrollTop: $(obj2).offset().top - _offtop2
			}, {
				duration: 500,
				easing: "swing"
			});

			$('#s_conf_submenu').removeClass("open");

			return false;
		}

	});
};
//提示框
function headNavTooltip() {

	$("#navigation_contact_x_ConfigurationListView").mouseover(function() {
		layer.tips('载入', '#navigation_contact_x_ConfigurationListView', {
			tips: [1, '#999']
		});
	});

	$("#navigation_contact_x_saveAsButton").mouseover(function() {
		layer.tips('保存', '#navigation_contact_x_saveAsButton', {
			tips: [1, '#999']
		});
	});

	$("#navigation_contact_x_printButton").mouseover(function() {
		layer.tips('打印', '#navigation_contact_x_printButton', {
			tips: [1, '#999']
		});
	});

	$("#navigation_contact_x_shareButton").mouseover(function() {
		layer.tips('分享', '#navigation_contact_x_shareButton', {
			tips: [1, '#999']
		});
	});

	$("#navigation_contact_x_pictureButton").mouseover(function() {
		layer.tips('截图', '#navigation_contact_x_pictureButton', {
			tips: [1, '#999']
		});
	});

};
//截图
function fnPictureButton() {

	// 进行canvas生成
	$("#navigation_contact_x_pictureButton").click(function() {
		html2canvas($("#main"), {
			onrendered: function(canvas) {
				//添加属性
				canvas.setAttribute('id', 'mycanvas');
				var dataUrl = canvas.toDataURL();
				//读取属性值
				var value = canvas.getAttribute('id');
				document.getElementById('pictureButton').appendChild(canvas);
				$("#pictureButton img").remove();
				//替换 img-src 地址
				//$("#pictureButton img").attr("src", dataUrl);
			}
		});
	});

	/*
	 * 说明
	 * html2canvas，目前该插件还在开发中，暂不支持带有图片的div转换。图片会被忽略
	 * 对一些的默认样式的支持可能不那么尽如人意，建议自己定义样式,
	 * 不支持iframe
	 * 不支持跨域图片
	 * 不能在浏览器插件中使用
	 * 部分浏览器上不支持SVG图片
	 * 不支持Flash
	 * 不支持古代浏览器和IE，如果你想确认是否支持某个浏览器，可以用它访问 http://deerface.sinaapp.com/ 试试
	 */

	$("#navigation_contact_x_saveAsButton").click(function() {
		var oCanvas = document.getElementById("mycanvas");

		/*自动保存为png*/
		// 获取图片资源
		var img_data1 = Canvas2Image.saveAsPNG(oCanvas, true).getAttribute('src');
		saveFile(img_data1, 'car');

		/*下面的为原生的保存，不带格式名*/
		// 这将会提示用户保存PNG图片
		// Canvas2Image.saveAsPNG(oCanvas);
	});
	// 保存文件函数
	var saveFile = function(data, filename) {
		var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
		save_link.href = data;
		save_link.download = filename;

		var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		save_link.dispatchEvent(event);
	};
};

//分享
function fnShareButton() {
	$("#navigation_contact_x_shareButton").click(function() {
		/*layer.msg('分享功能', {
			offset: 'c',
			anim: 6
		});*/
		layer.open({
			type: 1,
			title: false,
			closeBtn: 0,
			shadeClose: true,
			content: '<div id="code" style="width:240px;height:240px;text-align: center;background:#fff;color:#000;opacity:0.75"></div>'
		});
		$("#code").qrcode({
			render: "table", //table方式 
			width: 200, //宽度 
			height: 200, //高度 
			text: "www.baidu.com" //任意内容 
		});
	})
};

//360°  3D模型按钮vL_3D
function modelBtn(obj) {
	var oVL_3D = document.getElementById(obj);

	$("#vL_3D").mouseover(function() {
		layer.tips('3D 模式可以提供更加宽广展示,包括所有的选装项和额外的功能,例如360°画面以及内饰和外饰的不同背景', '#vL_3D', {
			tips: [1, '#999'] //还可配置颜色
		});
	});

	$(".vL_3D_carphoto").click( function () {
		var _self = $( this );
		var _fov = _self.attr( 'data-fov' ),
			_eye = ( _self.attr( 'data-eye' ) ).split( ',' );
		var _eyearr = new Array();
		for ( var c = 0 ; c < _eye.length ; c++ ) {
			_eyearr.push( _eye[ c ]*1 );
		}
		
		$( 'body' ).dataengine().requestfnquery( 
			{
				type : 'camera',
				fov: _fov,
				eye: _eyearr
			}
		);
	} );
};

//查看内饰(view)
function seeInterior(obj) {

	var oView = document.getElementById(obj);
	var xLlength = 1;

	var t_left = $(".api3dxcite-container.swiper-slide-active").width();

	$("#view").mouseover(function() {
		layer.tips('查看内饰', '#view', {
			tips: [1, '#999']
		});
	});

	var imgmovefn = function(xL) {
		$('#vis2d_swiper .paginationVis2d > span').removeClass('swiper-visible-switch swiper-active-switch');
		$('#vis2d_swiper .paginationVis2d > span').eq(xL - 1).addClass('swiper-visible-switch swiper-active-switch');
	};
	var sidemovefn = function(xL) {
		$(".api3dxcite-container").removeClass('swiper-slide-visible swiper-slide-active');
		$('.api3dxcite-container.extcam0' + xL).addClass('swiper-slide-visible swiper-slide-active');
	};

	oView.onclick = function() {

		if($("#view").hasClass("ex_on")) {
			$("#view").removeClass("ex_on");
			$("#view").addClass("in_on");
			debugger;
			if(xLlength = 1) {
				xLlength = 5;
				var imgrest = function() {
					imgmovefn(xLlength);
					sidemovefn(xLlength);
				};
				$("#vis2d_swiper .swiper-wrapper").animate({
						'left': t_left
					}, {
						duration: 600,
						easing: "easeOutQuad"
					},
					imgrest()
				);
				setTimeout(function() {
					$('#vis2d_swiper .swiper-wrapper').css('left', -((xLlength - 1) * t_left));
				}, 620);
			}
		} else {
			$("#view").removeClass("in_on");
			$("#view").addClass("ex_on");

			if(xLlength = 5) {
				xLlength = 1;
				var imgrest = function() {
					imgmovefn(xLlength);
					sidemovefn(xLlength);
				};
				$("#vis2d_swiper .swiper-wrapper").animate({
						'left': t_left
					}, {
						duration: 600,
						easing: "easeOutQuad"
					},
					imgrest()
				);
				setTimeout(function() {
					$('#vis2d_swiper .swiper-wrapper').css('left', -((xLlength - 1) * t_left + 20));
				}, 620);
			}
		}

	};
};

//声响按钮事件(sound)
function fnSound(obj) {
	var oSound = document.getElementById(obj);

	$("#sound").mouseover(function() {
		layer.tips('播放发动机声响', '#sound', {
			tips: [1, '#999']
		});
	});

	oSound.onclick = function() {
		alert("声响按钮事件");
	};
};

//显示汇总按钮事件
function showSummary(obj, obj2, obj3) {

	var oShowSelection = document.getElementById(obj);
	var myPorsche_submenu = document.getElementById(obj2);
	var navigation_mainsuboffer = document.getElementById(obj3);

	oShowSelection.onclick = myPorsche_submenu.onclick = /*navigation_mainsuboffer.onclick =*/ function() {
		$("html").addClass("show-scrollbar-y");
		//$("body").addClass("wait");
		$("#ui").addClass("summary");
	};

	$("#s_navigation_summary_config_end_x_s_navigation_summary_config_end_x_configureButton a,#s_navigation_summary_config_x_s_navigation_summary_config_x_configureButton a").click(function() {
		$("html").removeClass("show-scrollbar-y");
		//$("body").removeClass("wait");
		$("#ui").removeClass("summary");
	});
};

//下方红色箭头按钮
function redBtnClick(id1, id2) {

	var oScrollIndicator = document.getElementById(id1);
	var oScrollIndicatorWrapper = document.getElementById(id2);

	oScrollIndicator.onclick = function() {

	};
};

//级联菜单(一二级菜单)
fnFirstMenu("navigation_main_x_mainsuboffer_x_models");
fnSecondMenu("models");
//轮播图(中心区域图片移入移出事件)
//prev_next_showBtn("vis2d_swiper_arrow_left", "vis2d_swiper");
//prev_next_showBtn("vis2d_swiper_arrow_right", "vis2d_swiper");

//头部添加active选中样式
addActive("navigation_main_x_mainsuboffer");

//头部导航提示框
headNavTooltip();

//截图+保存
fnPictureButton();

//分享
fnShareButton();

//小窗口菜单点击事件
fnBurgerMenu();

//手机版nav导航事件
nav_left_right_showBtn();

//搜索框
//oSearch("search_x_inp", "s_conf_submenu");

//添加选配列表按钮,开关(switchSize)
addSwitchSize("switchSize");

//概览按钮事件
submenuAddOpen();

//360°  3D模型按钮vL_3D
modelBtn("vL_3D");

//查看内饰(view)
//seeInterior("view");

//声响按钮事件(sound)
//fnSound("sound");

//显示汇总按钮事件
showSummary("s_navigation_config_end_x_s_navigation_config_end_x_showSelection", "submenu_summary_x_myPorsche_submenu_x_submenu_parent", "navigation_main_x_mainsuboffer_x_myPorsche");
//右下方红色箭头
redBtnClick("scrollIndicator", "scrollIndicatorWrapper");

//价格详情弹窗
//priceMobile("s_price_mobile");

//大图预览
//fnBtnFullScreen2D("btnfullscreen2D");

/*锚点 start*/
//车身颜色及车轮-车身颜色
fnAnimate("#submenu_exterieur_x_AA_submenu_x_IAF", "#IAF_subHdl");
//车身颜色及车轮-车轮
fnAnimate("#submenu_exterieur_x_AA_submenu_x_IRA", "#IRA_subHdl");
//车身颜色及车轮-车轮配件 
fnAnimate("#submenu_exterieur_x_AA_submenu_x_IRZ", "#IRZ_subHdl");

//内饰颜色及座椅-内饰颜色及材料
fnAnimate("#submenu_interieur_x_AI_submenu_x_submenu_interior_and_material", "#submenu_interior_and_material_subHdl");
//内饰颜色及座椅-座椅
fnAnimate("#submenu_interieur_x_AI_submenu_x_submenu_seats", "#submenu_seats_subHdl");

//选装-外部
fnAnimate("#submenu_individualization_x_individual_submenu_x_IEX", "#IEX_subHdl");
//选装-变速箱/底盘
fnAnimate("#submenu_individualization_x_individual_submenu_x_IMG", "#IMG_subHdl");
//选装-内饰
fnAnimate("#submenu_individualization_x_individual_submenu_x_IIN", "#IIN_subHdl");
//选装-真皮内饰
fnAnimate("#submenu_individualization_x_individual_submenu_x_IIL", "#IIL_subHdl");
//选装-Alcantara 内饰
fnAnimate("#submenu_individualization_x_individual_submenu_x_IAL", "#IAL_subHdl");
//选装-木质内饰
fnAnimate("#submenu_individualization_x_individual_submenu_x_IIH", "#IIH_subHdl");
//选装-碳纤维内饰
fnAnimate("#submenu_individualization_x_individual_submenu_x_IIC", "#IIC_subHdl");
//选装-铝合金内饰
fnAnimate("#submenu_individualization_x_individual_submenu_x_IIA", "#IIA_subHdl");
//选装-音响与交通
fnAnimate("#submenu_individualization_x_individual_submenu_x_IAU", "#IAU_subHdl");

//更多个性化选项-真皮颜色选择/装饰性缝线
fnAnimate("#submenu_zoffer_x_zOffer_submenu_x_ZFW", "#ZFW_subHdl");

//精装配件-车轮和车轮附件
fnAnimate("#submenu_tequipment_x_tequipment_submenu_x_ABC", "#ABC_subHdl");
//精装配件-车内
fnAnimate("#submenu_tequipment_x_tequipment_submenu_x_AAF", "#AAF_subHdl");
//精装配件-运输和保护
fnAnimate("#submenu_tequipment_x_tequipment_submenu_x_ABE", "#ABE_subHdl");
//精装配件-儿童座椅
fnAnimate("#submenu_tequipment_x_tequipment_submenu_x_AAG", "#AAG_subHdl");
//精装配件-养护
fnAnimate("#submenu_tequipment_x_tequipment_submenu_x_ABB", "#ABB_subHdl");
/*锚点 end*/

/*功能列表配置项-单选按钮选中事件 start*/
//车身颜色及车轮-车身颜色--请求中状态( " curSelected " );

fnCheckedText("#s_exterieur_x_IAF ul li", "#s_exterieur_x_IAF .tt_text.tt_cell", "#s_exterieur_x_IAF .tt_price.tt_cell");
//车身颜色及车轮-车轮
fnCheckedText("#s_exterieur_x_IRA ul li", "#s_exterieur_x_IRA .tt_text.tt_cell", "#s_exterieur_x_IRA .tt_price.tt_cell");
//车身颜色及车轮-车轮配件
fnChecked("#s_exterieur_x_IRZ #vs_table_IRZ div");
//内饰颜色及座椅-内饰颜色及材料
fnCheckedText("#s_interieur_x_submenu_interior_and_material ul li", "#s_interieur_x_submenu_interior_and_material .tt_text.tt_cell", "#s_interieur_x_submenu_interior_and_material .tt_price.tt_cell");
//内饰颜色及座椅-座椅
fnChecked("#s_interieur_x_submenu_seats .content span", "#s_interieur_x_submenu_seats .content .seatTypes");
//选装-外部
fnChecked("#s_individual #vs_table_IEX div");
//选装-变速箱/底盘
fnChecked("#s_individual #vs_table_IMG div");
//选装-内饰
fnChecked("#s_individual #vs_table_IIN div");
//选装-真皮内饰
fnChecked("#s_individual #vs_table_IIL div");
//选装-Alcantara 内饰
fnChecked("#s_individual #vs_table_IAL div");
//选装-木质内饰
fnChecked("#s_individual #vs_table_IIH div");
//选装-碳纤维内饰
fnChecked("#s_individual #vs_table_IIC div");
//选装-铝合金内饰
fnChecked("#s_individual #vs_table_IIA div");
//选装-音响与交通
fnChecked("#s_individual #vs_table_IAU div");

//更多个性化选项 - 真皮颜色选择/装饰性缝线
fnChecked("#s_zoffer #vs_table_ZFW div");

//精装配件 -车轮和车轮附件
fnChecked("#s_tequipment #vs_table_ABC div");
//精装配件 -车内
fnChecked("#s_tequipment #vs_table_AAF div");
//精装配件 -运输和保护
fnChecked("#s_tequipment #vs_table_ABE div");
//精装配件 -儿童座椅
fnChecked("#s_tequipment #vs_table_AAG div");
//精装配件 -养护
fnChecked("#s_tequipment #vs_table_ABB div");
/*功能列表配置项-单选按钮选中事件 end*/





    
	


        


/* 调用 */




/* 点击导航的锚点 BEGIN */
var _offtop = $('#s_conf_submenu').offset().top + $('#s_conf_submenu').height() - 2; //166

//车身颜色及车轮
$("#navigation_main_x_mainsuboffer_x_AA").click(function() {
	$("html, body").animate({
		scrollTop: $("#s_exterieur").offset().top - _offtop
	}, {
		duration: 500,
		easing: "swing"
	});
	return false;
});
//内饰颜色及座椅
$("#navigation_main_x_mainsuboffer_x_AI").click(function() {
	$("html, body").animate({
		scrollTop: $("#s_interieur").offset().top - _offtop
	}, {
		duration: 500,
		easing: "swing"
	});
	return false;
});
//选装
$("#navigation_main_x_mainsuboffer_x_individual").click(function() {
	$("html, body").animate({
		scrollTop: $("#s_individual").offset().top - _offtop
	}, {
		duration: 500,
		easing: "swing"
	});
	return false;
});
//精装配件
$("#navigation_main_x_mainsuboffer_x_tequipment").click(function() {
	$("html, body").animate({
		scrollTop: $("#s_tequipment").offset().top - _offtop
	}, {
		duration: 500,
		easing: "swing"
	});
	return false;
});

var _flagcur = '0';
/* 滚轮滚动的锚点 */
$('body').bind('mousewheel', function(event, delta) {
	var selftop = $(this).scrollTop();

	if(selftop < $("#s_exterieur").height()) {
		$('li.nav_main_item.swiper-slide.swiper-slide-visible > a').removeClass('activeNav');
		_flagcur = 0;
	}
	if(selftop > $("#s_exterieur").height()) {
		$('li.nav_main_item.swiper-slide.swiper-slide-visible > a').removeClass('activeNav');
		_flagcur = 1;
	}
	if(selftop > ($("#s_exterieur").height() + $("#s_interieur").height())) {
		_flagcur = 2;
	}
	if(selftop > ($("#s_exterieur").height() + $("#s_interieur").height() + $("#s_individual").height())) {
		_flagcur = 3;
	}

	if(_flagcur == 0) {
		$('#navigation_main_x_mainsuboffer_x_AA').addClass('activeNav');
	}
	if(_flagcur == 1) {
		$('#navigation_main_x_mainsuboffer_x_AI').addClass('activeNav');
	}
	if(_flagcur == 2) {
		$('#navigation_main_x_mainsuboffer_x_individual').addClass('activeNav');
	}
	if(_flagcur == 3) {
		$('#navigation_main_x_mainsuboffer_x_tequipment').addClass('activeNav');
	}

	//preventdefault;
});
/* 点击导航的锚点 END */

/* 幻灯片轮播 BEGIN */
$('#vis2d_swiper').on('mouseover', function() {
	$(this).addClass('showArrows');
});
$('#vis2d_swiper').on('mouseleave', function() {
	$(this).removeClass('showArrows');
});
/* 点击左右按钮 */
var xLlength = 1,
	isdrag = 0;
var t_left = $(".api3dxcite-container.swiper-slide-active").width();

var imgmovefn = function ( xL ) {
	$( '#vis2d_swiper .paginationVis2d > span' ).removeClass( 'swiper-visible-switch swiper-active-switch' );
	$( '#vis2d_swiper .paginationVis2d > span' ).eq( xL - 1 ).addClass( 'swiper-visible-switch swiper-active-switch' );
};
var sidemovefn = function ( xL ) {
	$( ".api3dxcite-container" ).removeClass( 'swiper-slide-visible swiper-slide-active' );
	$( '.api3dxcite-container.extcam0' + xL ).addClass( 'swiper-slide-visible swiper-slide-active' );
};
var leftsideclickfn = function ( xL ) {
	if(xLlength < 1) {
		xLlength = 6;
		var imgrest = function () {
			imgmovefn( xLlength );
			sidemovefn( xLlength );
		};
		$("#vis2d_swiper .swiper-wrapper").animate(
			{ 'left': t_left }, 
			{ duration: 600, easing: "easeOutQuad" },
			imgrest()
		);
		setTimeout(function() {
			$('#vis2d_swiper .swiper-wrapper').css('left', -((xLlength - 1) * t_left + 20));
		}, 620);
	} else {
		var classrest = function () {
			imgmovefn( xLlength );
			sidemovefn( xLlength );
		};
		$("#vis2d_swiper .swiper-wrapper").animate(
			{ 'left': -((xLlength - 1) * t_left) }, 
			{ duration: 600, easing: "easeOutQuad"},
			classrest()
		);
	}
	
};
var rightsideclickfn = function ( xL ) {
	if(xLlength > 6) {
		xLlength = 1;
		var imgrest = function () {
			imgmovefn( xLlength );
			sidemovefn( xLlength );
		};
		$( "#vis2d_swiper .swiper-wrapper" ).animate(
			{ 'left': ( -6 * t_left - 40 ) }, 
			{ duration: 600, easing: "easeOutQuad" },
			imgrest() 
		);
		setTimeout( function () {
			$( '#vis2d_swiper .swiper-wrapper' ).css( 'left' , -( ( xLlength - 1 ) * t_left + 20 ) );
		}, 620 );
	} else {
		var classrest = function () {
			imgmovefn( xLlength );
			sidemovefn( xLlength );
		};
		$("#vis2d_swiper .swiper-wrapper").animate({
			'left': ( xLlength == 6 ? -( ( xLlength - 1 ) * t_left + 20 ) : -( ( xLlength - 1 ) * t_left + 10 ) )
		}, {
			duration: 600,
			easing: "easeOutQuad"
		}, classrest() );
	}
	
};
$( window ).resize( function () {
	t_left = $(".api3dxcite-container.swiper-slide-active").width();
	rightsideclickfn( xLlength );
} );
var _flag = 0;		//此事件的标记
$('#vis2d_swiper_arrow_left').click(function( e ) {
	
	xLlength--;
	leftsideclickfn( xLlength );
	_flag = 0;
	
});
$('#vis2d_swiper_arrow_right').click(function( e ) {
	
	xLlength++;
	rightsideclickfn( xLlength );
	_flag = 0;
	
});
/* 拖动图片 */
var doc = $( document ),
	movetimestart = 0,	//鼠标移动的开始时间
	movetimeend = 0,	//鼠标移动的结束时间
	movelength = 0;		//鼠标移动经过的距离

$( '#vis2d_swiper > div > div.api3dxcite-container' ).on( 'mousedown' , function ( e ) {
	var _self = $( this );
	_flag = 1;
	_self.addClass( 'unselect' );
	e = window.event || e;
	isdrag = 1;
	var disX = e.clientX;
	//var cL = $( '#vis2d_swiper > div.swiper-wrapper' ).offset().left;
	doc.on( 'mousemove' , function( ev ){
		movetimestart = new Date().getTime();
		if ( isdrag == 1 ) {
			ev = ev || _window.event;
			var iL = ev.clientX - disX;
			$( '#vis2d_swiper > div.swiper-wrapper' ).css({
				'left' : -( xLlength - 1 ) * t_left + iL
			});
			movelength = iL;
		}
		
	});
	doc.on( 'mouseup' , function(){
		movetimeend = new Date().getTime();
		var movetime = movetimeend - movetimestart;
		isdrag = 0;
		if ( Math.abs( movelength ) >= t_left/2 && movelength > 0 ) {
			xLlength--;
			leftsideclickfn( xLlength );
			doc.off( 'mouseup' );
		}
		if ( Math.abs( movelength ) < t_left/2 && movelength > 0 ) {
			leftsideclickfn( xLlength );
			doc.off( 'mouseup' );
		}
		if ( Math.abs( movelength ) >= t_left/2 && movelength < 0 ) {
			xLlength++;
			rightsideclickfn( xLlength );
			doc.off( 'mouseup' );
		}
		if ( Math.abs( movelength ) < t_left/2 && movelength < 0 ) {
			rightsideclickfn( xLlength );
			doc.off( 'mouseup' );
		}
		preventdefault;
	});
	e.preventDefault();
} );

$( '#darkpane' ).fadeOut( 600 );
$( '#glasspane' ).fadeOut( 600 );



setTimeout( function () {
	
	$.ajax({
		url: "main.js",
		dataType: "script",
		cache: true,
		async : false,
		success: function ( data ) {}
	});
	
} , 3000 );




/* 幻灯片轮播 END */

