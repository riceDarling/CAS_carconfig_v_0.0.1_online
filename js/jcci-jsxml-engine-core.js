'use strict'




$.fn[ 'dataengine' ] = function () {
	var self = $( this ),
		settings = {
			folder : 'object-xml/',				/* 存储xml对象的文件夹 */				
			coreurl : 'xml-engine-core.xml',	/* 核心xml对象的路径 */
			type : 'get',						/* 获取方式 */
			timeout : 1000,						/* 延迟时间 如果对象内容较多则设置的延迟时间大些 */
			dataname : '',						/* html中的对象标记 */
			cache : false,						/* 是否缓存 */
			async : false,						/* 是否异步加载 */
			fnafter : function () {},			/* 加载成功后执行的方法 */
			fnerror : function () {},			/* 加载失败后执行的方法 */
			jsondata : '',						/* 转换后的json对象 */
			M_DOT : 1,							/* 用于核心xml缩进, 根据节点级别 此参数不是外传参数 */
			cM_DOT : 1,							/* 用于非核心xml缩进, 根据节点级别 此参数不是外传参数 */
			stringarr : [],						/* 用于承载对象字符串的数组 此参数不是外传参数 */
			Objectarr : {},						/* 存储用于生成json的对象 此参数不是外传参数 */
			objerror : [],						/* 用于存储无法加载的xml对象文件 */
			fnquery : function () {}			/* 用于储存模型图的主方法 */
		};
	var exps = {
		init : function ( options ) {
			
			settings = $.extend( settings , options );
			$.ajax({
				type : settings.type,
				url : 'xml-engine-core.xml',
				dataType : 'xml',
				timeout : settings.timeout,
				cache : settings.cache,
				async : settings.async,
				success : function ( xmldata ) {
					
					$( xmldata ).find( '*:first' ).children().each( function( i ){

						exps.nodefn( $( this ) , settings.stringarr );

					});

				
					var clearspace = /\s/g;
					var child_obj = {}; 
					for ( var c = 0 ; c < settings.stringarr.length ; c++ ) {
						
						var objstr = ( ( settings.stringarr[ c ] ).split( '        ' ) )[ 1 ].replace( clearspace , '' );
						
						$.ajax({
							type : settings.type,
							url : settings.folder + '/' + objstr + '.xml',
							dataType : 'xml',
							timeout : settings.timeout,
							cache : settings.cache,
							async : settings.async,
							success : function ( xmldata2 ) {

								
								child_obj[ objstr ] = new Array();	
								
								$( xmldata2 ).find( '*:first' ).children().each( function( i ){

									exps.childobjnodefn( $( this ) , child_obj[ objstr ] );

								});
								
								var child_objwell = new Array();
								
								for ( var k = 0 ; k < child_obj[ objstr ].length ; k++ ) {
									var tojsonarr = {};
										
									
									for ( var h = 0 ; h < child_obj[ objstr ][ k ].length ; h++ ) {
										
										var _cc = child_obj[ objstr ][ k ][ h ];
										tojsonarr[ _cc.tagName ] = _cc.textContent;
										
									}
										
									child_objwell.push( tojsonarr );
								}
								
								child_obj[ objstr ] = child_objwell;
								
							},
							error : function () {
								settings.objerror.push( objstr + 'xml' );
							}
						});
				
						
					}
					
					settings.Objectarr = child_obj;
					self.data( 'settings' , settings );
					
					

				},
				error : function () {
					alert('先设置浏览器跨域')
					settings.fnerror();
					settings.objerror.push( 'xml-engine-core.xml' );
				
				}
			});

		},
		getxml : function () {
			return self.data( 'settings').Objectarr;
		},
		childobjnodefn : function ( nodeobj , objarr ) {
			
			var myObj = nodeobj[ 0 ].attributes;
			$( myObj ).each( function ( i ) {
				var _str = $( this )[ 0 ].ownerElement.children;
				
				if ( _str != null && _str != undefined ) {
					objarr.push( _str );
				}
			});
			if ( nodeobj.length > 0 ) {
				nodeobj.children().each( function ( i ) {
					exps.childobjnodefn( $( this ) );
				})
			}else{
				return false;
			}
			
		},
		faildload : function () {
		
			return settings.objerror;
			
		},
		nodefn : function ( nodeobj , objarr ) {
			
			var myObj = nodeobj[ 0 ].attributes;

			$( myObj ).each( function ( i ) {
				var _str = $( this )[ 0 ].ownerElement.textContent;
				if ( _str != null && _str != undefined ) {
					objarr.push( _str );
				}
			});

			if ( nodeobj.length > 0 ) {
				nodeobj.children().each( function ( i ) {
					settings.M_DOT++; 
					exps.nodefn( $( this ) );
					settings.M_DOT--;
				})

			}else{
				return false;
			}
			
		},
		jsondata : function () {
		},
		fnquery : function ( fn ) {
			settings.fnquery = fn;
			
			self.data( 'settings' , settings );
			
		},
		requestfnquery : function ( configobj ) {
			
			return self.data( 'settings' ).fnquery( configobj );
		}
	}
	return exps;
}


//$( 'body' ).dataengine().fnquery(  );



/* 进度条 */
var _timer
$.fn[ 'processbar' ] = function () {

	var exps = {
		setValue : function ( persent ) {
			var process_width = $( '.processcontainer' ).width();
			var processbar_width = process_width * persent;
			clearTimeout( _timer );
			$( '.processcontainer .processbar' ).animate( { 'width' : processbar_width } , 300 );
			/*_timer = setTimeout( function () {
				$( '.processcontainer-title' ).html( persent * 100 + '%' );
			} , 1000 );*/
		},
		hideprocess : function () {
			$( '.car_config_loading' ).fadeOut( 500 );
		},
		showprocess : function () {
			$( '.car_config_loading' ).fadeIn( 500 );
		}
	}
	return exps;
}



$( 'body' ).dataengine().init();

//$( 'body' ).processbar().setValue( 0.7 );

//$( 'body' ).processbar().hideprocess();