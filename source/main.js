
var ARCarInfoMainFn = function () {

	var DoorAnimas = null;
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

    var Environment = window.Environment;
    var Material = window.Material;

    var PredefinedMaterials = {
        Silver: [ 0.971519, 0.959915, 0.915324 ],
        Aluminium: [ 0.913183, 0.921494, 0.924524 ],
        Gold: [ 1, 0.765557, 0.336057 ],
        Copper: [ 0.955008, 0.637427, 0.538163 ],
        Chromium: [ 0.549585, 0.556114, 0.554256 ],
        Nickel: [ 0.659777, 0.608679, 0.525649 ],
        Titanium: [ 0.541931, 0.496791, 0.449419 ],
        Cobalt: [ 0.662124, 0.654864, 0.633732 ],
        Platinum: [ 0.672411, 0.637331, 0.585456 ]
    };

    var CameraPresets = {
        CarBound: {
            fov: 60,
            eye: [ 284, -444,-379]
        },
      	FrontLightBound: {
          fov: 60,
          eye: [ 344,121,-476]
      	},
      	BackLightBound: {
          fov: 60,
          eye: [ -297,145,-498]
      	}
//      CameraCenter: {
//          target: [ 80.0, 0.0, 20.0 ],
//          eye: [ 80.0, -215.0, 20.0 ]
//      },
//      CameraPBR: {
//          target: [ 160.0, 0.0, 80.0 ],
//          eye: [ 160.0, -100.0, 80.0 ]
//      },
//      CameraSamples: {
//          target: [ 46.0, 20.0, 80.0 ],
//          eye: [ 46.0, -62.5, 80.0 ]
//      }


    };
    
    var FindByNameVisitor = function(name) {

        osg.NodeVisitor.call(this, osg.NodeVisitor.TRAVERSE_ALL_CHILDREN);

        this._name = name;

    };



    FindByNameVisitor.prototype = osg.objectInherit(osg.NodeVisitor.prototype, {

        // in found we'll store our resulting matching node

        init: function() {

            this.found = undefined;

        },

        // the crux of it

        apply: function(node) {

            if (node.getName() === this._name) {

                this.found = node;

                return;

            }

            this.traverse(node);

        }

    });
    
    var DoorAnimaUpdateCallback = function() {};


	DoorAnimaUpdateCallback.prototype = {
	
	    // rotation angle
	
	    angle: 0,
	    
	    direct : -1,
	    
	    startMat : null,
	    
	    startAngle : 0 ,
	    
	    endAngle : 0,
	    
	    time :0,
	    
	    curTime : 0,
	    
	    tmpMat : null ,
	    
	    rotMat : null,
	    
	    
	    starting : false,
	    
	    lastTime : 0 ,
	    
	    
	    setConfig : function(mat,sAngle,eAngle,t)
	    {
	    	this.startMat = mat;
	    	this.startAngle = sAngle*3.1415926/180;
	    	this.endAngle = eAngle*3.1415926/180;
	    	this.time = t;
	    	
	    	this.tmpMat = osg.mat4.create();
	    	
	    	this.rotMat = osg.mat4.create();
	    	
	    },
	    
	    start : function(dir)
	    {
	    	this.direct = dir;
	    	
	    	//this.curTime =0 ;
	    	
	    	this.starting = true;
	    	
	    	this.lastTime = null;
	    	
	    },
	    
	    update: function(node, nv) {
	
			if(!this.starting) return;
			
	        
	        if(this.lastTime == null)
	        {
	        	this.lastTime = nv.getFrameStamp().getSimulationTime();
	        }
	        
	        var t = nv.getFrameStamp().getSimulationTime()-this.lastTime;
	        
	        this.lastTime =  nv.getFrameStamp().getSimulationTime();
	         
	        this.curTime+= this.direct*t;	
	        
	        this.rotMat = osg.mat4.create();
	        
			if(this.curTime>this.time)
			{
				this.starting = false;
				
				this.curTime = this.time;
			}else if(this.curTime<0)
			{
				this.starting = false;
				this.curTime = 0;
			}
	        
	        
	        var alpha = this.curTime/this.time;
	        
	        
	        var pos = osg.vec3.create();
	        
	        pos[0] = this.startMat[12];
	        pos[1] = this.startMat[13];
	        pos[2] = this.startMat[14];
	        
	        osg.mat4.copy(this.tmpMat,this.startMat);
	        this.tmpMat[12] = 0;
	  		this.tmpMat[13] = 0;
	  		this.tmpMat[14] = 0;
	        
	        
	        var curAngle = alpha*this.endAngle+(1-alpha)*this.startAngle;
	        
	        osg.mat4.fromRotation(this.rotMat, curAngle, osg.vec3.fromValues(0.0, 0.0, 1.0));
	        
 
	        osg.mat4.mul( this.tmpMat, this.tmpMat, this.rotMat);

	        this.tmpMat[12] += pos[0];
	  		this.tmpMat[13] += pos[1];
	  		this.tmpMat[14] += pos[2];
	  		
	  		node.setMatrix(this.tmpMat);
	  		
	  		console.log("update");
	        
	        return true;
	
	    }
	
	};
    var MaterialApply = function () {
	    osg.NodeVisitor.call( this );
	    //this._Transparent = undefined;
	    //this._ControlMatrial = undefined;
	    //this._Default = undefined;
	    this.statesets = [];
	};
	MaterialApply.prototype = osg.objectInherit( osg.NodeVisitor.prototype, {
	    apply: function ( node ) {
	    	var stateSet = node.getStateSet();
	    	if(stateSet!=null&&stateSet!=undefined)
	    	{
	    		var name = stateSet.getName();
	    		if(name !=null&&name!=undefined)
	    		{
	    			if(this.statesets[name]==null&&this.statesets[name]==undefined)
	    			{
	    				this.statesets[name] = stateSet;
	    			}
	    		}
	    	}
	        this.traverse(node);
	    }
	 });

	var MyManipulator = function()
	{
		osgGA.OrbitManipulator.call(this)
	};
	MyManipulator.prototype = osg.objectInherit( osgGA.OrbitManipulator.prototype, {
	    update: ( function () {
	        var eye = osg.vec3.create();
	        return function ( nv ) {
	            var dt = nv.getFrameStamp().getDeltaTime();
				
				this.getEyePosition(eye)
	
	  			if(this.owner.cameraTarget!=null)
	            {
	            	osg.vec3.lerp(eye,eye,this.owner.cameraTarget.eye,4*dt);
	            	
	            	if(osg.vec3.squaredDistance(eye,this.owner.cameraTarget.eye)<0.5)
	            	{
	            		this.owner.cameraTarget = null;
	            	}
	            }
				this.setEyePosition(eye)
	            var delta;
	            var mouseFactor = 0.1;
	            delta = this._rotate.update( dt );
	            
	            var pitch = -delta[ 1 ] * mouseFactor * this._scaleMouseMotion;
	            
	            if(this.getEyePosition(eye)[2] <=this.getTarget(osg.vec3.create())[2]&&pitch<0)
	            {
	            	pitch = 0;
	            }
	            this.computeRotation( -delta[ 0 ] * mouseFactor * this._scaleMouseMotion, pitch);
	
	            var panFactor = 0.002;
	            delta = this._pan.update( dt );
	            this.computePan( -delta[ 0 ] * panFactor, -delta[ 1 ] * panFactor );
	
	
	            delta = this._zoom.update( dt );
	            this.computeZoom( 1.0 + delta[ 0 ] / 10.0 );
	
				if(this._distance>800)
				{
					this._distance = 800;
				}else if(this._distance<100)
				{
					this._distance =100;
				}
				this._target = osg.vec3.fromValues(0,0,-500);
	            var target = this._target;
	            var distance = this._distance;
				
	            /* 1. Works but bypass other manipulators */
	            // mat4.copy( this._inverseMatrix , this._vrMatrix );
	
	            /* 2. Works but gets broken by other manipulators */
	            osg.mat4.invert( this._inverseMatrix, this._rotation );
	            osg.mat4.mul( this._inverseMatrix, this._vrMatrix, this._inverseMatrix );
	
	            /* 3. Doesnt' work */
	            // mat4.mul( this._vrMatrix,  this._vrMatrix, this._rotation );
	            // mat4.invert( this._inverseMatrix, this._vrMatrix );
	
	            osg.vec3.set( eye, 0.0, distance, 0.0 );
	            osg.vec3.transformMat4( eye, eye, this._inverseMatrix );
	            
	          
	            
	            if(eye[2]<0)
	            {
	               eye[2] =0;
	            }
	            //console.log("dist : " +eye[0]+ "," + eye[1]+","+eye[2]);
	
	            osg.mat4.lookAt( this._inverseMatrix, osg.vec3.add( eye, target, eye ), target, this._upz );
	        };
	    } )(),
	 });
    var isMobileDevice = function () {

		//return false;
        if ( navigator.userAgent.match( /Mobile/i ) )
            return true;
        if ( navigator.userAgent.match( /Android/i ) )
            return true;
        if ( navigator.userAgent.match( /iPhone/i ) )
            return true;
        if ( navigator.userAgent.match( /iPad/i ) )
            return true;
        if ( navigator.userAgent.match( /iPod/i ) )
            return true;
        if ( navigator.userAgent.match( /BlackBerry/i ) )
            return true;
        if ( navigator.userAgent.match( /Windows Phone/i ) )
            return true;

        return false;

    };

    var optionsURL = {};
    ( function ( options ) {
        var vars = [],
            hash;
        var indexOptions = window.location.href.indexOf( '?' );
        if ( indexOptions < 0 ) return;

        var hashes = window.location.href.slice( indexOptions + 1 ).split( '&' );
        for ( var i = 0; i < hashes.length; i++ ) {
            hash = hashes[ i ].split( '=' );
            var element = hash[ 0 ];
            vars.push( element );
            var result = hash[ 1 ];
            if ( result === undefined ) {
                result = '1';
            }
            options[ element ] = result;
        }
    } )( optionsURL );


    var PBRWorklowVisitor = function () {

        this._workflow = [];
        osg.NodeVisitor.call( this );

    };
    PBRWorklowVisitor.prototype = osg.objectInherit( osg.NodeVisitor.prototype, {
        apply: function ( node ) {
            var data = node.getUserData();
            if ( data && data.pbrWorklow ) {
                var stateSetWorkflow = {
                    stateSet: node.getOrCreateStateSet(),
                    workflow: data.pbrWorklow
                };
                this._workflow.push( stateSetWorkflow );
            }
            this.traverse( node );
        },
        getWorkflows: function () {
            return this._workflow;
        }
    } );
   

    var modelList = [ 'sphere', 'model' ];

    var defaultEnvironment = 'textures/parking.zip';
    var envURL = defaultEnvironment;
    if ( optionsURL.env ) {
        if ( optionsURL.env.indexOf( 'http' ) !== -1 )
            envURL = optionsURL.env;
        else
            envURL = 'textures/' + optionsURL.env;
    }
    var environment = envURL;
    var environmentList = [];
    var environmentMap = {};
 
    var cameraTarget = {};

    var Example = function () {

//      this._gui = new window.dat.GUI();

        this._config = {
            lightdirect: Math.PI,
            lod: 0.01,
            carpaintsetting: '#ffffff',
            environmentType: 'cubemapSeamless',
            brightness: 1.2,
            normalAA: Boolean( optionsURL.normalAA === undefined ? true : optionsURL.normalAA ),
            specularPeak: Boolean( optionsURL.specularPeak === undefined ? true : optionsURL.specularPeak ),
            occlusionHorizon: Boolean( optionsURL.occlusionHorizon === undefined ? true : optionsURL.occlusionHorizon ),
            cameraPreset: optionsURL.camera ? Object.keys( CameraPresets )[ optionsURL.camera ] : 'CameraCenter',

            roughnesssetting: 0.05,
            material: 'Gold',

            format: '',
            model: modelList[ 0 ],
            envsetting: '',
            mobile: isMobileDevice(),
            nb: 8,
            offset: 1000,
            metallicsetting:0.12,
            cameraFov : 60
        };

        this.updateAlbedo();


        window.printCurrentCamera = function () {
            var eye = osg.vec3.create();
            var target = osg.vec3.create();
            console.log( 'target ' + this._viewer.getManipulator().getTarget( target ).toString() );
            console.log( 'eye ' + this._viewer.getManipulator().getEyePosition( eye ).toString() );
        }.bind( this );


    };
	var controlCarpaint = null;
    Example.prototype = {


        createEnvironment: function ( urlOrZip, zipFileName ) {

            var env = new Environment();

            var registerEnvironment = function ( envReady ) {

                var name = envReady.name;
                environmentMap[ name ] = envReady;
                environmentList.push( name );

//              var controllers = this._gui.__controllers;
//              var controller = controllers.filter( function ( cont ) {
//                  return cont.property === 'envsetting';
//              } )[ 0 ];
//
//              this._config.envsetting = name;
                //controller = controller.options( environmentList );
                //controller.onChange( this.setEnvironment.bind( this ) );

            }.bind( this );

            if ( typeof urlOrZip === 'string' ) {
                var url = urlOrZip;
                return env.loadPackage( url ).then( function () {
                    registerEnvironment( env );
                    return env;
                } );
            }

            var zip = urlOrZip;
            return env.readZipContent( zip, zipFileName ).then( function () {
                registerEnvironment( env );
                return env;
            } );

        },

       
        createModelMaterialSample: function () {

            this._proxyModel = new osg.Node();

            var request = osgDB.readNodeURL( 'models/material-test/kl5.osgjs' ,{
            	progress: function(event)
            	{
            		$( 'body' ).processbar().setValue( event.loaded / 38670085 );
            	}
            });

            request.then( function ( model ) {

                var mt = new osg.MatrixTransform();
                osg.mat4.fromRotation( mt.getMatrix(), -Math.PI / 2, [ 1, 0, 0 ] );
                var bb = model.getBound();
                osg.mat4.mul( mt.getMatrix(), osg.mat4.fromTranslation( osg.mat4.create(), [ 0, -bb.radius() / 2, 0 ] ), mt.getMatrix() );
                mt.addChild( model );

                this._modelMaterial = mt;

                this._proxyModel.addChild( this._modelMaterial );
                this._modelMaterial.setNodeMask( 0 );

                var tangentVisitor = new osgUtil.TangentSpaceGenerator();
                model.accept( tangentVisitor );
                
                var materialApply = new MaterialApply();
                model.accept( materialApply );
                
                this._proxyModel.statesets=materialApply.statesets;
                
                DoorAnimas = new Object();
                
                DoorAnimas.frDoorAnima = new DoorAnimaUpdateCallback();
                DoorAnimas.brDoorAnima = new DoorAnimaUpdateCallback();
                DoorAnimas.flDoorAnima = new DoorAnimaUpdateCallback();
                DoorAnimas.blDoorAnima = new DoorAnimaUpdateCallback();
                
                var finder = new FindByNameVisitor('chemen_fr');
                model.accept(finder);
                
                DoorAnimas.frDoorAnima.node = finder.found;
    			
    			finder.found.addUpdateCallback(DoorAnimas.frDoorAnima);
    			
    			DoorAnimas.frDoorAnima.setConfig(finder.found.getMatrix(),0,70,0.5);
    			
    			
    			
    			finder = new FindByNameVisitor('chemen_br');
                model.accept(finder);
                
                DoorAnimas.brDoorAnima.node = finder.found;
    			
    			finder.found.addUpdateCallback(DoorAnimas.brDoorAnima);
    			
    			DoorAnimas.brDoorAnima.setConfig(finder.found.getMatrix(),0,70,0.5);
    			
    			
    			finder = new FindByNameVisitor('chemen_fl');
                model.accept(finder);
                
                DoorAnimas.flDoorAnima.node = finder.found;
    			
    			finder.found.addUpdateCallback(DoorAnimas.flDoorAnima);
    			
    			DoorAnimas.flDoorAnima.setConfig(finder.found.getMatrix(),0,-70,0.5);
    			
    			
    			finder = new FindByNameVisitor('chemen_bl');
                model.accept(finder);
                
                DoorAnimas.blDoorAnima.node = finder.found;
    			
    			finder.found.addUpdateCallback(DoorAnimas.blDoorAnima);
    			
    			DoorAnimas.blDoorAnima.setConfig(finder.found.getMatrix(),0,-70,0.5);
    			
    			//frAnima.start(1);
    			
    			
                
            }.bind( this ) );
            
            return request;

        },

        updateModel: function () {

            this._modelMaterial.setNodeMask( 0x0 );

            var node= this._modelMaterial;

            if ( node ) {
                node.setNodeMask( ~0x0 );
                node.dirtyBound();
                this._viewer.getManipulator().computeHomePosition();
            }
        },

        updateRowModelsMetalic: function () {
//          this._rowMetalic.removeChildren();
//          this._rowMetalic.addChild( this.createRowModelsMetalic() );
        },
        createSampleModels: function () {

            var configs = [];
            
            var pbrdefault = new Material.PbrDefault();
            controlCarpaint = new Material.CarPaint();
            var envMaterial = new Material.EnvMaterial();
            var defaultMaterial = new Material.DefaultMaterial();
            for(var key in this._proxyModel.statesets)
            {
            	var config = null;
            	var stateset = this._proxyModel.statesets[key];
            	
            	var name = stateset.getName();
            	console.log("name : " + name);
            	if(name.indexOf("transparent_") == 0)
            	{
            		config = {
                		stateSet: stateset,
                		material : pbrdefault,
                		config: {
                    		noTangent: true,
                    		enableTransparent : true
               		 	}
            		};
            	}else if(name.indexOf("control_") == 0)
            	{
            		config = {
                		stateSet: stateset,
                		material : controlCarpaint,
                		config: {
                    		noTangent: true,
                    		globalMetalRoughness: true,
               		 	}
            		};
            	}else if(name.indexOf("normal_") == 0)
            	{
            		config = {
                		stateSet: stateset,
                		material : pbrdefault,
                		config: {
                    		noTangent: true,
                    		normalMap: true
               		 	}
            		};
            	}else if(name.indexOf("env_") == 0)
            	{
            		config = {
                		stateSet: stateset,
                		material : envMaterial,
            		};
            	}else if(name.indexOf("carPaint_") == 0)
            	{
            		config = {
                		stateSet: stateset,
                		material : controlCarpaint,
                		config: {
                    		noTangent: true
               		 	}
            		};
            	}else{
            		if(stateset.getNumTextureAttributeLists() == 1||stateset._binNumber ==10)
            		{
            			config = {
                			stateSet: stateset,
                			material : defaultMaterial,
            			};
            			
            		}else{
            			config = {
                			stateSet: stateset,
                			material : pbrdefault,
                			config: {
                    			noTangent: true
               		 		}
            			};
            		}
            		//this.setMaterial(stateset, false,this.createMetalRoughnessTextureFromColors(0.5, 0.5, false ));
            	}
            	configs.push(config);
            }
            Material.createShader(configs);
            
           	var rowMetalic = new osg.MatrixTransform();
           	
           	
            rowMetalic.addChild(this._proxyModel);
            
            var group = new osg.Node();
            group.addChild( rowMetalic );
            
            osg.mat4.fromTranslation(rowMetalic.getMatrix(), [ 0, 130, 0 ] );


            group.getOrCreateStateSet().setAttributeAndModes( new osg.CullFace() );
            
            controlCarpaint.setColor(Material.convertColor( this._config.carpaintsetting ));
            return group;
        },


        createSampleScene: function () {

            var group = this._mainSceneNode;


            group.addChild( this.createSampleModels() );


            return group;
        },
        createScene: function (environment) {


            this._mainSceneNode = new osg.Node();

            var root = new osg.Node();
            //root.addChild( osg.createAxisGeometry( 50 ) );

            var group = new osg.MatrixTransform();
            root.addChild( group );
            //root.addChild(this.getOrCreateModel());

            // add lod controller to debug
            this._lod = osg.Uniform.createFloat1( 0.0, 'uLod' );
            group.getOrCreateStateSet().addUniform( this._lod );
            //var flipNormalY = osg.Uniform.createInt1( 0, 'uFlipNormalY' );
            //group.getOrCreateStateSet().addUniform( flipNormalY );


            var promises = [];

            // precompute panorama
            P.all( promises ).then( function () {

				Material.preparePbr(root,environment);
                group.addChild( this.createSampleScene() );
                osg.mat4.fromRotation( group.getMatrix(), -Math.PI / 2, [ -1, 0, 0 ] );
                this._viewer.getManipulator().computeHomePosition();
                this.updateCameraPreset();


            }.bind( this ) );

            return root;
        },



        createGUI: function () {
            var gui = this._gui;

            var controller;

            //controller = gui.add( this._config, 'lightdirect', -Math.PI, Math.PI ).step( 0.1 );
            //controller.onChange( this.updateEnvironmentRotation.bind( this ) );

            //controller = gui.add( this._config, 'brightness', 0.0, 25.0 ).step( 0.01 );
            //controller.onChange( this.updateEnvironmentBrightness.bind( this ) );

            //controller = gui.add( this._config, 'normalAA' );
            //controller.onChange( this.updateNormalAA.bind( this ) );

            //controller = gui.add( this._config, 'specularPeak' );
            //controller.onChange( this.updateSpecularPeak.bind( this ) );

            //controller = gui.add( this._config, 'occlusionHorizon' );
            //controller.onChange( this.updateOcclusionHorizon.bind( this ) );

            controller = gui.add( this._config, 'cameraPreset', Object.keys( CameraPresets ) );
            controller.onChange( this.updateCameraPreset.bind( this ) );

            //controller = gui.add( this._config, 'lod', 0.0, 15.01 ).step( 0.1 );
            //controller.onChange( function ( value ) {
             //   this._lod.getInternalArray()[ 0 ] = value;
            //}.bind( this ) );

            //controller = gui.add( this._config, 'format', [] );

            //controller = gui.add( this._config, 'environmentType', [ 'cubemapSeamless', 'panorama' ] );
           // controller.onChange( this.updateEnvironment.bind( this ) );

            //controller = gui.add( this._config, 'material', Object.keys( PredefinedMaterials ) );
            //controller.onChange( this.updateRowModelsSpecularMetal.bind( this ) );

            controller = gui.add( this._config, 'roughnesssetting', 0, 1.0 );
            controller.onChange( this.updateRowModelsMetalic.bind( this ) );
            
            controller = gui.add( this._config, 'metallicsetting', 0, 1.0 );
            controller.onChange( this.updateRowModelsMetalic.bind( this ) );

            controller = gui.addColor( this._config, 'carpaintsetting' );
            controller.onChange( this.updateAlbedo.bind( this ) );
            
            
            controller = gui.add( this._config,'cameraFov', 30, 100 );

            //controller = gui.add( {
            //    loadModel: function () {}
            //}, 'loadModel' );
            //controller.onChange( this.loadFiles.bind( this ) );

            //controller = gui.add( this._config, 'model', modelList );
            //controller.onChange( this.updateModel.bind( this ) );

            //controller = gui.add( this._config, 'envsetting', environmentList );
           // controller.onChange( this.updateEnvironment.bind( this ) );
        },

        run: function ( canvas ,loadedComplete) {

            //osgGA.Manipulator.DEFAULT_SETTINGS = osgGA.Manipulator.DEFAULT_SETTINGS | osgGA.Manipulator.COMPUTE_HOME_USING_BBOX;

            var viewer = this._viewer = new osgViewer.Viewer( canvas, {
                preserveDrawingBuffer: true,
                premultipliedAlpha: false
            } );

			viewer._config = this._config
			if(!isMobileDevice())
			{
				viewer.computeCanvasSize = function(canvas)
				{
					var clientWidth, clientHeight;
		            clientWidth = canvas.clientWidth;
		            clientHeight = canvas.clientHeight;
		
		            if ( clientWidth < 1 ) clientWidth = 1;
		            if ( clientHeight < 1 ) clientHeight = 1;
		
		            var devicePixelRatio = this._devicePixelRatio;
		
		            var widthPixel = Math.floor( clientWidth * devicePixelRatio );
		            var heightPixel = Math.floor( clientHeight * devicePixelRatio );
		
		            var hasChanged = false;
		            if ( canvas.width !== 2.0*widthPixel ) {
		                canvas.width = 2.0*widthPixel;
		                this._canvasWidth = widthPixel;
		                hasChanged = true;
		            }
		
		            if ( canvas.width!== 2.0*heightPixel ) {
		                canvas.height = 2.0*heightPixel;
		                this._canvasHeight = heightPixel;
		                hasChanged = true;
		            }
		            
		            if(hasChanged)
		            {
		            	 osg.mat4.perspective( viewer.getCamera().getProjectionMatrix(), Math.PI / 180 * this._config.cameraFov, canvas.width / canvas.height, 0.1, 1000 );
		            }
		            return hasChanged;
		            
				}
				viewer.setUpView(canvas,viewer.initOptions({
	                preserveDrawingBuffer: true,
	                premultipliedAlpha: false
	            }));
			}
			

            viewer.init();

           

            var gl = viewer.getState().getGraphicContext();
            console.log( gl.getSupportedExtensions() );
            console.log( gl.getExtension( 'OES_texture_float' ) );
            var hasFloatLinear = gl.getExtension( 'OES_texture_float_linear' );
            console.log( hasFloatLinear );
            var hasTextureLod = gl.getExtension( 'EXT_shader_texture_lod' );
            console.log( hasTextureLod );

//          this.createGUI();

            var ready = [];

            var promise = this.createEnvironment( environment );
            ready.push( Material.readShaders() );
            ready.push( promise);
            Material.readAssets(ready)
            ready.push( this.createModelMaterialSample() );
            P.all( ready ).then( function () {
            	loadedComplete();
                var root = this.createScene(environmentMap[environmentList[ 0 ]] );
                viewer.setSceneData( root );

                viewer.setupManipulator();
                var mani = new MyManipulator();
                mani.owner = this;
                viewer.setManipulator(mani);
                
                
                viewer.getManipulator()._boundStrategy = OSG.osgGA.Manipulator.COMPUTE_HOME_USING_BBOX;
                
                viewer.getManipulator().computeHomePosition();
                viewer.getManipulator().setComputeBoundNodeMaskOverride( 0x0 );

                viewer.run();

                osg.mat4.perspective( viewer.getCamera().getProjectionMatrix(), Math.PI / 180 * this._config.cameraFov, canvas.width / canvas.height, 0.1, 1000 );


                this.updateModel();

                // Iterate over all controllers
//              for ( var i in this._gui.__controllers ) {
//                  this._gui.__controllers[ i ].updateDisplay();
//              }


            }.bind( this ) );
            
            return viewer;
        },

        updateCameraPreset: function () {
        	
            var preset = CameraPresets[ this._config.cameraPreset ];
            if ( !preset ) {
                preset = CameraPresets[ Object.keys( CameraPresets )[ 0 ] ];
                osg.warn( 'Camera preset not found, use default' );
            }
            this.cameraTarget = preset;
            //this._viewer.getManipulator().setTarget( preset.target );
            //this._viewer.getManipulator().setEyePosition( preset.eye );
        },
        updateAlbedo: function () {
        	
        },


    };

	var mouseMoveLength = 0;
	var mouseClick = function(canvas , viewer , ev)
	{
		//console.log("xy : " + x +","+y)
		if(DoorAnimas == null) return;
		
		
		  console.log("mouseMoveLength : " + mouseMoveLength)
		if(mouseMoveLength>50||mouseMoveLength<-50) return;
		
		
		//DoorAnimas.frDoorAnima.direct *=-1;
		
		//DoorAnimas.frDoorAnima.
		
        //DoorAnimas.brDoorAnima = new DoorAnimaUpdateCallback();
        //DoorAnimas.flDoorAnima = new DoorAnimaUpdateCallback();
        //DoorAnimas.blDoorAnima = new DoorAnimaUpdateCallback();
        
        
        var ratioX = canvas.width / canvas.clientWidth;

        var ratioY = canvas.height / canvas.clientHeight;


        var hits = viewer.computeIntersections(

            ev.clientX * ratioX,

            (canvas.clientHeight - ev.clientY) * ratioY
            
        );
        
        
        var cameraPos = viewer.getManipulator().getEyePosition(osg.vec3.create());
        
        console.log("hits.length : " + hits.length)
        if(hits.length<=0) return;
        
		hits.sort(function(a, b) {
			  var l1 = osg.vec3.squaredLength(osg.vec3.sub(osg.vec3.create(),a.point,cameraPos));
			  var l2 = osg.vec3.squaredLength(osg.vec3.sub(osg.vec3.create(),b.point,cameraPos));
		      return l2-l1;
		
		 });
		     
      for(var j = 0 ; j<hits.length; j++)
      {
        	var hit = hits[j];
        	for(var i = 0 ; i<hit.nodepath.length ; i++)
        	{
        		console.log(hit.nodepath[i].getName())
        		if(hit.nodepath[i]== DoorAnimas.frDoorAnima.node)
        		{
        			DoorAnimas.frDoorAnima.direct *=-1;
        			
        			DoorAnimas.frDoorAnima.start(DoorAnimas.frDoorAnima.direct);
        			
        			console.log(hit.nodepath[i].getName())
        			return;
        		}else if(hit.nodepath[i]== DoorAnimas.flDoorAnima.node)
        		{
        			DoorAnimas.flDoorAnima.direct *=-1;
        			DoorAnimas.flDoorAnima.start(DoorAnimas.flDoorAnima.direct);
        			console.log(hit.nodepath[i].getName())
        			return;
        		}else if(hit.nodepath[i]== DoorAnimas.brDoorAnima.node)
        		{
        			DoorAnimas.brDoorAnima.direct *=-1;
        			DoorAnimas.brDoorAnima.start(DoorAnimas.brDoorAnima.direct);
        			console.log(hit.nodepath[i].getName())
        			return;
        		}else if(hit.nodepath[i]== DoorAnimas.blDoorAnima.node)
        		{
        			DoorAnimas.blDoorAnima.direct *=-1;
        			DoorAnimas.blDoorAnima.start(DoorAnimas.blDoorAnima.direct);
        			console.log(hit.nodepath[i].getName())
        			return;
        		} 
        	 	
        	}
      }
        
       
	}
var canvas_mainfn = function () {


        var example = new Example();
        var canvas = $( '#View' )[ 0 ];
                    
			
        var viewer = example.run( canvas ,function()
        {
        	$( 'body' ).processbar().hideprocess();
        });
        $( 'body' ).dataengine().fnquery( function(data)
        {
        	//alert(data.type)
        	if(data.type == "color")
        	{
        		example._config.carpaintsetting = data.color;
        		example._config.metallicsetting = data.metallic*1.0;
        		example._config.roughnesssetting = data.roughness*1.0;
        		
        		controlCarpaint.setColor(Material.convertColor(data.color));
        		
        		controlCarpaint.setMetalRoughness(data.metallic*0.2,data.roughness*5.0)
        		
        	} else if(data.type == "camera")
        	{
        		example.cameraTarget = {}
        		example.cameraTarget.fov = data.fov;
        		example.cameraTarget.eye = data.eye;
        	}
        	
        });
        //controller.onChange( this.updateEnvironmentRotation.bind( this ) );
        //$( '#loading' ).hide();
		//$( 'body' ).processbar().hideprocess();

       // window.addEventListener( 'dragover', dragOverEvent.bind( example ), false );
        //window.addEventListener( 'drop', dropEvent.bind( example ), false );

        var lastMousePosition = {
            x: 0.0,
            y: 0.0,
            sx:0,
            sy:0
       
        };
        window.example = example;
        window.addEventListener( 'mousemove', function ( evt ) {

            var button = evt.which || evt.button;

            if ( evt.altKey && button ) {

                evt.stopPropagation();
                var deltaX = evt.clientX - lastMousePosition.x;
                example._config.lightdirect += deltaX * 0.01;
                example.updateEnvironmentRotation();

            }
            
            mouseMoveLength = evt.clientX-lastMousePosition.sx+evt.clientY-lastMousePosition.sy;
			
			
            lastMousePosition.x = evt.clientX;
            lastMousePosition.y = evt.clientY;
        }, true );
        
         window.addEventListener( 'mousedown', function ( evt ) {

            var button = evt.which || evt.button;

			mouseMoveLength = 0;
            lastMousePosition.sx = evt.clientX;
            lastMousePosition.sy = evt.clientY;

        }, true );
        window.addEventListener( 'click', function ( evt ) {
			mouseClick(canvas,viewer,evt);
        }, true );
        

    };
	
	canvas_mainfn();
};
ARCarInfoMainFn();
