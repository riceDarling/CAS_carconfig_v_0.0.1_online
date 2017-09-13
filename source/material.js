//readBinaryArrayURL
(function() {
	function Mat() {
		this.width;
		this.height;
		this.data = new Array();
	}

	var buildMat = function(width, height, val) {
		var ret = new Mat();

		ret.width = width;
		ret.height = height;

		for(var i = 0; i < width; i++) {
			var valArray = new Array();
			for(var j = 0; j < height; j++) {

				valArray.push(val);
			}
			ret.data.push(valArray)
		}

		return ret;
	}

	var multiy = function(mat1, mat2) {

		var ret = new Mat();
		ret.width = mat2.width;

		ret.height = mat1.height;

		for(var i = 0; i < mat2.width; i++) {
			var col = new Array();
			for(var j = 0; j < mat1.height; j++) {

				var val = 0;
				for(var m = 0; m < mat1.width; m++) {

					val += mat1.data[m][j] * mat2.data[i][m];
				}
				col.push(val);
			}
			ret.data.push(col)
		}
		return ret;
	}

	var t = function(mat) {
		var ret = new Mat();

		ret.width = mat.height;
		ret.height = mat.width;

		for(var i = 0; i < mat.height; i++) {

			var val = new Array();
			for(var j = 0; j < mat.width; j++) {
				val.push(mat.data[j][i]);
			}
			ret.data.push(val)
		}
		return ret;
	}

	var getA = function(arcs, n) {
		if(n == 1) {
			return arcs.data[0][0];
		}
		var ans = 0;
		var temp = buildMat(n, n, 0);

		var i, j, k;
		for(i = 0; i < n; i++) {
			for(j = 0; j < n - 1; j++) {
				for(k = 0; k < n - 1; k++) {
					temp.data[j][k] = arcs.data[j + 1][(k >= i) ? k + 1 : k];

				}
			}
			var t = getA(temp, n - 1);
			if(i % 2 == 0) {
				ans += arcs.data[0][i] * t;
			} else {
				ans -= arcs.data[0][i] * t;
			}
		}
		return ans;
	}
	var getAStart = function(arcs, n, ans) {
		if(n == 1) {
			ans.data[0][0] = 1;
			return;
		}
		var i, j, k, t;
		var temp = buildMat(n, n, 0);

		for(var i = 0; i < n; i++) {
			for(var j = 0; j < n; j++) {
				for(var k = 0; k < n - 1; k++) {
					for(var t = 0; t < n - 1; t++) {
						temp.data[k][t] = arcs.data[k >= i ? k + 1 : k][t >= j ? t + 1 : t];
					}
				}

				ans.data[j][i] = getA(temp, n - 1);
				if((i + j) % 2 == 1) {
					ans.data[j][i] = -ans.data[j][i];
				}
			}
		}
	}

	var getMatrixInverse = function(src, n, des) {
		var flag = getA(src, n);
		var t = buildMat(n, n, 0);
		if(flag == 0) {
			return false;
		} else {
			getAStart(src, n, t);
			for(var i = 0; i < n; i++) {
				for(var j = 0; j < n; j++) {
					des.data[i][j] = t.data[i][j] / flag;
				}

			}
		}
		return true;
	}

	var getKey = function(ary) {

		var matX = new Mat();

		matX.width = ary.length - 1;
		matX.height = ary[0].length;

		var matY = new Mat();

		matY.width = 1;
		matY.height = ary.length - 1;

		matY.data.push(ary[ary.length - 1]);

		for(var i = 0; i < ary.length - 1; i++) {
			matX.data.push(ary[i]);
		}

		var matXT = t(matX);

		var invMat = buildMat(matX.width, matXT.height, 0)

		getMatrixInverse(multiy(matXT, matX), matX.width, invMat);

		var s = multiy(invMat, matXT);

		var result = multiy(s, matY);

		return result.data[0];

	}
	var readModel = function(content) {
		var data = new Uint8Array(content);
		var ary = new Array(
			new Array(357.0478262557381, 266.49315272261714, 15657.385906944315, 14973.81891674743, 3504.716541383663, 2047.2402412766796, 6288.450262839116, 4395.4762014996495), new Array(110.19987825209802, 87.20649742920114, 2268.6912946889775, 2189.1023208667584, 685.0500757285422, 445.5896018226441, 1093.5405810497336, 821.1164379925397), new Array(34.012287076855046, 28.537217996685264, 328.72410638577827, 320.0365249418396, 133.9034414664543, 96.98426655029246, 190.16306918561747, 153.39230013610847), new Array(10.497612978772747, 9.338441916572654, 47.63078095820997, 46.78784372961377, 26.173461286741237, 21.108993387242418, 33.06872511981273, 28.65512934873161), new Array(44428.92132432963, 34197.16995586655, 1502617.2236650398, 1439843.1013010067, 363529.85003709845, 219887.48754929262, 630810.695668132, 449819.47149828967)
		);

		var ary2 = new Array(
			new Array(57.37608066912578, 922.8368654601134, 20.621842440053264, 33.30016550397022, 473.8906214075309, 129.914506851738), new Array(20.847220448725988, 167.43401884252225, 9.677108229286201, 13.862284060264768, 101.56839398333359, 38.480724203794715), new Array(7.574700038227638, 30.378230123891573, 4.541127881931235, 5.770629558719761, 21.769028949577216, 11.398004511831797), new Array(9409.078046101478, 124731.52676900428, 3790.800239764907, 5781.6592000881465, 66289.65608827541, 19822.13504262422)
		);
		var key = getKey(ary);
		var key2 = getKey(ary2);

		for(var i = 0; i < data.length; i++) {
			var keyIndex = i % key.length;
			var keyIndex2 = i % key2.length;

			var t1 = parseInt(Math.round(key[keyIndex]));
			var t2 = parseInt(Math.round(key2[keyIndex2]));

			data[i] = data[i] ^ t1;
			data[i] = data[i] ^ t2;
		}

		function readInt(idata, offset) {
			var a = idata[offset];
			var b = idata[offset + 1];
			var c = idata[offset + 2];
			var d = idata[offset + 3];

			return(d << 24) | (c << 16) | (b << 8) | a;
		}

		function readString(idata, offset, length) {

			var out, i, len, c;
			var char2, char3;

			out = "";
			len = length;
			i = 0;
			while(i < len) {
				c = idata[offset + i];
				i++;
				switch(c >> 4) {
					case 0:
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
					case 6:
					case 7:
						// 0xxxxxxx
						out += String.fromCharCode(c);
						break;
					case 12:
					case 13:
						// 110x xxxx   10xx xxxx
						char2 = array[i++];
						out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
						break;
					case 14:
						// 1110 xxxx  10xx xxxx  10xx xxxx
						char2 = array[i++];
						char3 = array[i++];
						out += String.fromCharCode(((c & 0x0F) << 12) |
							((char2 & 0x3F) << 6) |
							((char3 & 0x3F) << 0));
						break;
				}
			}

			return out;
		}
		var pointer = 0;

		var dataMap = {};
		while(pointer < data.length) {
			pointer++;

			var fileNameLen = readInt(data, pointer);
			pointer += 4;

			var fileContentLen = readInt(data, pointer);
			pointer += 4;

			var fileName = readString(data, pointer, fileNameLen);
			pointer += fileNameLen;

			var fileContent = readString(data, pointer, fileContentLen);
			pointer += fileContentLen;

			dataMap[fileName] = fileContent;
		}
		return dataMap;
	}

	window.readModelRender = readModel;
})();
( function () {
	
	var P = window.P;
    var OSG = window.OSG;
    var osg = OSG.osg;
    var osgViewer = OSG.osgViewer;
    var osgDB = OSG.osgDB;
    var osgGA = OSG.osgGA;
    var osgUtil = OSG.osgUtil;
    var osgShader = OSG.osgShader;
    var $ = window.$;
    var JSZip = window.JSZip;
    var Object = window.Object;
	window.ALBEDO_TEXTURE_UNIT = 3;
    window.DIFFUSE_TEXTURE_UNIT = 0;
    window.METALLIC_ROUGHNESS_TEXTURE_UNIT = 1;
    window.SPECULAR_TEXTURE_UNIT = 4;
    window.NORMAL_TEXTURE_UNIT = 2;
    window.COAT_NORMAL = 5;
    
    var linear2Srgb = function ( value, gammaIn ) {
        var gamma = gammaIn;
        if ( !gamma ) gamma = 2.2;
        var result = 0.0;
        if ( value < 0.0031308 ) {
            if ( value > 0.0 )
                result = value * 12.92;
        } else {
            result = 1.055 * Math.pow( value, 1.0 / gamma ) - 0.055;
        }
        return result;
    };
    var _shaderPath = 'shaders/';
    
    var shaderProcessor = new osgShader.ShaderProcessor();
    
	var Material = function () {
		
    };
    
    Material.preparePbr = function(rootNode,environment)
    {
    	rootNode.getOrCreateStateSet().addUniform( osg.Uniform.createInt( window.METALLIC_ROUGHNESS_TEXTURE_UNIT, 'metallicRoughnessMap' ) );
        rootNode.getOrCreateStateSet().addUniform( osg.Uniform.createInt( window.NORMAL_TEXTURE_UNIT, 'normalMap' ) );
        rootNode.getOrCreateStateSet().addUniform( osg.Uniform.createInt( window.SPECULAR_TEXTURE_UNIT, 'specularMap' ) );
        rootNode.getOrCreateStateSet().addUniform( osg.Uniform.createInt( window.ALBEDO_TEXTURE_UNIT, 'albedoMap' ) );
        rootNode.getOrCreateStateSet().addUniform( osg.Uniform.createInt( window.DIFFUSE_TEXTURE_UNIT, 'diffuseMap' ) );
        
        var texture = environment.getPanoramaUE4()['LUV'].getTexture();

        var stateSet = rootNode.getOrCreateStateSet();
        var w = texture.getWidth();
        stateSet.addUniform(osg.Uniform.createFloat2([w, w / 2], 'uEnvironmentSize'));
        	  // x4 because the base is for cubemap
        var textures = environment.getTextures('specular_ue4', 'luv', 'panorama');

        var textureConfig = textures[0];
        var minTextureSize = textureConfig.limitSize;

        var nbLod = Math.log(w) / Math.LN2;
        var maxLod = nbLod - Math.log(minTextureSize) / Math.LN2;

        stateSet.addUniform(osg.Uniform.createFloat2([nbLod, maxLod], 'uEnvironmentLodRange'));
        stateSet.addUniform(osg.Uniform.createInt1(6, 'uEnvironment'));

        stateSet.setTextureAttributeAndModes(6, texture);
        
        stateSet.addUniform( environment.getSpherical().getUniformSpherical() );

    };
    
    Material.assets = {};
    
    Material.readAssets = function(requests){
    	var request = osgDB.readImageURL('textures/T_MetalFlakes_N.png');
    	request.then(function(img) {
    		var texture = new osg.Texture(); 
    		texture= new osg.Texture();
    		texture.setImage(img);
    		texture.setMinFilter('LINEAR');
    		texture.setMagFilter('LINEAR');
    		texture.setWrapS('REPEAT');
    		texture.setWrapT('REPEAT');
    		Material.assets['carPaintCoatNormal']  = texture;
    	}.bind(this));
    	requests.push(request);
    };
    
    Material.readShaders_ = function()
    {
    	var defer = P.defer();

            var shaderNames = [
                'math.glsl',
                'panoramaSampler.glsl',
                'pbrReferenceVertex.glsl',
                'colorSpace.glsl',
                'pbr_ue4.glsl',
                'pbr_define.glsl',
                'pbr_output.glsl',
                'pbr_default.glsl',
                'sphericalHarmonics.glsl',
                'vertex.glsl',
                'fragment.glsl',
                'envVertex.glsl' ,
                'envFragment.glsl',
                'carPaint.glsl',

            ];


            var shaders = shaderNames.map( function ( arg ) {
                return _shaderPath + arg;
            }.bind( this ) );


            var promises = [];
            shaders.forEach( function ( shader ) {
                promises.push( P.resolve( $.get( shader ) ) );
            } );


            P.all( promises ).then( function ( args ) {

                var shaderNameContent = {};
                shaderNames.forEach( function ( name, idx ) {
                    shaderNameContent[ name ] = args[ idx ];
                } );

                shaderProcessor.addShaders( shaderNameContent );
                defer.resolve();

            } );

            return defer.promise;
    };
    
    Material.readShaders = function(){
    	
    	var request = osgDB.readBinaryArrayURL("textures/tmp.zip")
    	
    	request.then(function(data){
    		var datas = window.readModelRender(data);
    		shaderProcessor.addShaders( datas );
    	})
    	
    }
    
    
    
    Material.createShader = function(configs)
    {
    	 configs.forEach( function ( config ) {
                var stateSet = config.stateSet;
                var material = config.material;
                var shaderConfig = osg.objectMix( {
                    format: "panorama",
                    mobile: true,
                }, config.config );
                
                var program = Material.getRenderProgram(material,config.config);
                material.applyStateSet(stateSet,config.config);
                stateSet.setAttributeAndModes(program);

        }.bind( this ) );
    };
    Material.defaultConfig = function(config)
    {
    	var defines = [];



        defines.push( '#define PANORAMA ' );
        defines.push( '#define panorama');
        defines.push( '#define MOBILE' );
        defines.push( '#define LUV' );
            
//      if(config&&config.enableTransparent === true){
//          defines.push( '#define TRANSPARENT' );
//      }
//      if(config&&config.enableAlbedo === true){
//          defines.push( '#define ALBEDO' );
//      }
        return defines;
    	
    };
    
    Material.materials = {};
    
    Material.getRenderProgram = function(material,config)
    {
    	var defines = Material.defaultConfig(config);
    	material.getDefines(config, defines);
    	
    	if(!Material.materials[material.getName()])
    	{
    		Material.materials[material.getName()] = {};
    	}
    	
    	
    	var hash = defines.join();
    	
    	if (!Material.materials[material.getName()][ hash ] ) {
                
            Material.materials[material.getName()][ hash ] = material.createProgram(defines);
        }
    	
    	return Material.materials[material.getName()][hash];
    };
    
    Material.createTextureFromColor = function ( colorArg, srgb, textureOutput ) {
            var colorInput = colorArg;
            var albedo = new osg.Uint8Array( 4 );

            if ( typeof colorInput === 'number' ) {
                colorInput = [ colorInput ];
            }
            var color = colorInput.slice( 0 );

            if ( color.length === 3 )
                color.push( 1.0 );

            if ( color.length === 1 ) {
                color.push( color[ 0 ] );
                color.push( color[ 0 ] );
                color.push( 1.0 );
            }

            color.forEach( function ( value, index ) {
                if ( srgb )
                    albedo[ index ] = Math.floor( 255 * linear2Srgb( value ) );
                else
                    albedo[ index ] = Math.floor( 255 * value );
            } );

            var texture = textureOutput;
            if ( !texture )
                texture = new osg.Texture();
            texture.setTextureSize( 1, 1 );
            texture.setImage( albedo );
            return texture;
    };

 	Material.convertColor = function ( color ) {

            var r, g, b;

            // rgb [255, 255, 255]
            if ( color.length === 3 ) {
                r = color[ 0 ];
                g = color[ 1 ];
                b = color[ 2 ];

            } else if ( color.length === 7 ) {

                // hex (24 bits style) '#ffaabb'
                var intVal = parseInt( color.slice( 1 ), 16 );
                r = intVal >> 16;
                g = intVal >> 8 & 0xff;
                b = intVal & 0xff;
            }

            var result = [ 0, 0, 0, 1 ];
            result[ 0 ] = r / 255.0;
            result[ 1 ] = g / 255.0;
            result[ 2 ] = b / 255.0;
            return result;
    };
    Material.createMetalRoughnessTextureFromColors = function ( metalColor, roughnessColor, srgb, textureOutput ) {
            var colorInput = metalColor;
            var albedo = new osg.Uint8Array( 4 );

            if ( typeof colorInput === 'number' ) {
                colorInput = [ colorInput ];
            }
            var color = colorInput.slice( 0 );

            if ( color.length === 3 )
                color[ 1 ] = roughnessColor;

            if ( color.length === 1 ) {
                color.push( roughnessColor );
                // 2nd and 3rd safely could be ignored
                color.push( 0.0 );
                color.push( 0.0 );
            }

            color.forEach( function ( value, index ) {
                if ( srgb )
                    albedo[ index ] = Math.floor( 255 * linear2Srgb( value ) );
                else
                    albedo[ index ] = Math.floor( 255 * value );
            } );

            var texture = textureOutput;
            if ( !texture )
                texture = new osg.Texture();
            texture.setTextureSize( 1, 1 );
            texture.setImage( albedo );
            return texture;
    };

    Material.prototype = {
    	getDefines : function(config,defines){
    	},
    	createProgram : function(defines){
    	},
    	getName : function(){},
    	applyStateSet : function(stateSet){
    		
    	},
    };
    var DefaultMaterial = function () {
	    Material.call( this );
	};
	DefaultMaterial.prototype = osg.objectInherit( Material.prototype, {
    	createProgram : function(defines)
    	{
    		var vertexshader = shaderProcessor.getShader( 'vertex.glsl' );
            var fragmentshader = shaderProcessor.getShader( 'fragment.glsl' );

            var program = new osg.Program(
                new osg.Shader( 'VERTEX_SHADER', vertexshader ),
                    new osg.Shader( 'FRAGMENT_SHADER', fragmentshader ) );
            return program;
    	},
    	getName : function()
    	{ 
    		return "DefaultMaterial"
    	},
    	applyStateSet :function(stateSet)
    	{
    		stateSet.addUniform( osg.Uniform.createInt(0, 'uTexture' ));
    	},
	});

	var EnvMaterial = function () {
	    Material.call( this );
	};
	EnvMaterial.prototype = osg.objectInherit( Material.prototype, {
    	createProgram : function(defines)
    	{
    		var vertexshader = shaderProcessor.getShader( 'envVertex.glsl' );
            var fragmentshader = shaderProcessor.getShader( 'envFragment.glsl' );

            var program = new osg.Program(
                new osg.Shader( 'VERTEX_SHADER', vertexshader ),
                    new osg.Shader( 'FRAGMENT_SHADER', fragmentshader ) );
            return program;
    	},
    	getName : function()
    	{ 
    		return "EnvMaterial"
    	},
	});
	 
    var PbrDefault = function () {
	    Material.call( this );
	    
	    
	    var rotateYtoZ = osg.mat4.create();
        
        osg.mat4.fromRotation( rotateYtoZ, 3.1415926, [ 0, 1, 0] );
	    this._environmentTransformUniform = osg.Uniform.createMatrix4( rotateYtoZ, 'uEnvironmentTransform' );
        this._envBrightnessUniform = osg.Uniform.createFloat1( 1.0, 'uBrightness' );

        this._specularPeak = osg.Uniform.createInt1(0, 'uSpecularPeak' );

        this._occlusionHorizon = osg.Uniform.createInt1( 0, 'uOcclusionHorizon' );
	    
	};

	PbrDefault.prototype = osg.objectInherit( Material.prototype, {
		getDefines: function(config,defines)
    	{
          	if ( config && config.noTangent === true )
	           	defines.push( '#define NO_TANGENT' );
		    if ( config && config.normalMap === true )
	           	defines.push( '#define NORMAL' );
	        if(config&&config.enableTransparent === true)
          		defines.push( '#define TRANSPARENT' );
    	},
    	createProgram : function(defines)
    	{
    		var vertexshader = shaderProcessor.getShader( 'pbrReferenceVertex.glsl' );
            var fragmentshader = shaderProcessor.getShader( 'pbr_default.glsl', defines );

            var program = new osg.Program(
                new osg.Shader( 'VERTEX_SHADER', vertexshader ),
                    new osg.Shader( 'FRAGMENT_SHADER', fragmentshader ) );
            return program;
    	},
    	getName : function()
    	{ 
    		return "PbrDefault"
    	},
    	applyStateSet : function(stateSet,config)
    	{
    		if(config.enableTransparent)
    		{
    			stateSet.setRenderingHint('TRANSPARENT_BIN');
           		stateSet.setAttributeAndModes(new osg.BlendFunc('ONE', 'ONE_MINUS_SRC_ALPHA'));
    		}
    		stateSet.addUniform( this._environmentTransformUniform );
            stateSet.addUniform( this._envBrightnessUniform );
            stateSet.addUniform( this._specularPeak );
            stateSet.addUniform( this._occlusionHorizon );
    	},
	 });
	 
	 
	var CarPaint = function () {
	    PbrDefault.call( this );
	    this.carPaintCoatNormalTexture = Material.assets['carPaintCoatNormal'];
	    this.carPaintColor = osg.Uniform.createFloat3( osg.vec3.fromValues( 1.0, 1.0, 1.0 ), 'uCarPaintColor' );
	    
	    this.metal = 1.0;
	    this.roughness = 0.0;
	    
	    this.metalRoughnessTexture = new osg.Texture();
	    
	};
	CarPaint.prototype = osg.objectInherit( PbrDefault.prototype, {
    	createProgram : function(defines)
    	{
    		var vertexshader = shaderProcessor.getShader( 'pbrReferenceVertex.glsl' );
            var fragmentshader = shaderProcessor.getShader( 'carPaint.glsl', defines );

            var program = new osg.Program(
                new osg.Shader( 'VERTEX_SHADER', vertexshader ),
                    new osg.Shader( 'FRAGMENT_SHADER', fragmentshader ) );
            return program;
    	},
    	getName : function()
    	{ 
    		return "CarPaint"
    	},
    	
    	setMetalRoughness: function(metal,roughness)
    	{
    		this.metal =metal;
	    	this.roughness = roughness;
	    	Material.createMetalRoughnessTextureFromColors(this.metal,this.roughness,false,this.metalRoughnessTexture);
    	},
    	setColor:function(color){
    		this.carPaintColor.setFloat3(color);
    	},
    	applyStateSet : function(stateSet,config)
    	{
    		PbrDefault.prototype.applyStateSet.call(this,stateSet,config); 
    		
    		stateSet.addUniform( osg.Uniform.createInt( window.COAT_NORMAL, 'coatMap' ) );
            stateSet.setTextureAttributeAndModes( window.COAT_NORMAL, this.carPaintCoatNormalTexture);
    		stateSet.addUniform(this.carPaintColor);
    		
    		if(config.globalMetalRoughness)
    		{
    			stateSet.setTextureAttributeAndModes( window.METALLIC_ROUGHNESS_TEXTURE_UNIT, this.metalRoughnessTexture );
    		}
        },
    	
	});
    
   window.Material = Material;
   
   Material.CarPaint = CarPaint;
   Material.PbrDefault = PbrDefault;
   Material.EnvMaterial = EnvMaterial;
   Material.DefaultMaterial = DefaultMaterial;
} )();
