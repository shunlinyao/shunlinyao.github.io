/*
/
Author: Shunlin Yao
        syao54@wisc.edu

*/
function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');


    var r1 = 10;
    var r2 = 1;
    function draw() {
	canvas.width = canvas.width;

	// use the sliders to get the angles

   function background() {
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
     
	function moveToTx(loc,Tx)
	{var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.moveTo(res[0],res[1]);}

	function lineToTx(loc,Tx)
	{var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.lineTo(res[0],res[1]);}
	
	function drawObject(color,Tx) {
	    context.beginPath();
	    context.fillStyle = color;

      
    	moveToTx([1,-1,0],Tx);
      lineToTx([-.5,0,0],Tx);
	    lineToTx([-1,1,0],Tx);
      lineToTx([0,0.5,0],Tx);
	    lineToTx([1,1,0],Tx);
      lineToTx([0.5,0,0],Tx);
	    lineToTx([1,-1,0],Tx);
      lineToTx([0,-1,0],Tx);
    
	    context.closePath();
	    context.fill();
	}
	
	function draw4D(color,Tx) {
	    context.strokeStyle=color;
	    context.beginPath();
	    // Axes
	    moveToTx([30,0,0],Tx);
      lineToTx([0,0,0],Tx);
      lineToTx([0,30,0],Tx);
      lineToTx([30,30,0],Tx);
      lineToTx([30,0,0],Tx);
      lineToTx([40,10,0],Tx);
      lineToTx([40,40,0],Tx);
      lineToTx([10,40,0],Tx);
      lineToTx([0,30,0],Tx);
      lineToTx([10,40,0],Tx);
      lineToTx([10,10,0],Tx);
      lineToTx([0,0,0],Tx);
      lineToTx([10,10,0],Tx);
      lineToTx([40,10,0],Tx);
      lineToTx([40,40,0],Tx);
      lineToTx([30,30,0],Tx);  
    lineToTx([20,20,0],Tx);
    lineToTx([12,20,0],Tx);
    lineToTx([12,12,0],Tx);
    lineToTx([20,12,0],Tx);
    lineToTx([20,20,0],Tx);
    lineToTx([23,22,0],Tx);
    lineToTx([40,40,0],Tx);
    lineToTx([23,22,0],Tx);
    lineToTx([15,22,0],Tx);
    lineToTx([10,40,0],Tx);
    lineToTx([15,22,0],Tx);
    lineToTx([12,20,0],Tx);
    lineToTx([0,30,0],Tx);
    lineToTx([12,20,0],Tx);    
    lineToTx([15,22,0],Tx);
    lineToTx([15,14,0],Tx);
    lineToTx([10,10,0],Tx);
    lineToTx([15,14,0],Tx);
    lineToTx([12,12,0],Tx);
    lineToTx([0,0,0],Tx);
    lineToTx([12,12,0],Tx);
    lineToTx([15,14,0],Tx);
    lineToTx([23,14,0],Tx);
    lineToTx([40,10,0],Tx);
    lineToTx([23,14,0],Tx);
    lineToTx([20,12,0],Tx);
    lineToTx([30,0,0],Tx);
    lineToTx([20,12,0],Tx);
    lineToTx([23,14,0],Tx);
    lineToTx([23,22,0],Tx);

	    context.stroke();
	}



    var Hermite = function(t) {
	    return [
		2*t*t*t-3*t*t+1,
		t*t*t-2*t*t+t,
		-2*t*t*t+3*t*t,
		t*t*t-t*t
	    ];
	}

    var HermiteDerivative = function(t) {
        return [
        6*t*t-6*t,
        3*t*t-4*t+1,
        -6*t*t+6*t,
        3*t*t-2*t
        ];
    }

	function Cubic(basis,P,t){
	    var b = basis(t);
	    var result=vec3.create();
	    vec3.scale(result,P[0],b[0]);
	    vec3.scaleAndAdd(result,result,P[1],b[1]);
	    vec3.scaleAndAdd(result,result,P[2],b[2]);
	    vec3.scaleAndAdd(result,result,P[3],b[3]);
	    return result;
	}
	
	var p0=[0,0,0];
	var d0=[10,40,0];
      
	var p1=[20,20,-5];
	var d1=[-10,60,-5];
      
	var p2=[40,40,0];
	var d2=[0,30,0];
      
  var p3=[10,30,5];
	var d3=[-40,30,5];
      
	var p4=[0,0,0];
	var d4=[-50,40,0];

      
      
      
	var P0 = [p0,d0,p1,d1]; 
	var P1 = [p1,d1,p2,d2]; 
  var P2 = [p2,d2,p3,d3]; 
  var P3 = [p3,d3,p4,d4]; 

	var C0 = function(t_) {return Cubic(Hermite,P0,t_);};
	var C1 = function(t_) {return Cubic(Hermite,P1,t_);};
	var C2 = function(t_) {return Cubic(Hermite,P2,t_);};
  var C3 = function(t_) {return Cubic(Hermite,P3,t_);};
      
	var C0prime = function(t_) {return Cubic(HermiteDerivative,P0,t_);};
	var C1prime = function(t_) {return Cubic(HermiteDerivative,P1,t_);};
	var C2prime = function(t_) {return Cubic(HermiteDerivative,P2,t_);};
  var C3prime = function(t_) {return Cubic(HermiteDerivative,P3,t_);};    
      
    var Ccomp = function(t) {
         if (t<1){
            var u = t;
            return C0(u);
        } else if(t<2) {
            var u = t-1.0;
            return C1(u);
        } else if(t<3) {
            var u = t-2.0;
            return C2(u);
        } else if(t<4) {
            var u = t-3.0;           
            return C3(u);
        } else if(t<5) {
            var u = t-4.0;           
            return C0(u);}
          else if(t<6) {
            var u = t-5.0;           
            return C1(u);}
            else if(t<7) {
            var u = t-6.0;           
            return C2(u);}
        else {
          var u = t-6.0; 
          return C3(u);
        }
	}

    var Ccomp_tangent = function(t) {
      
         if (t<1){
            var u = t;
            return C0prime(u);
        } else if(t<2){
            var u = t-1.0;
            return C1prime(u);
        } else if(t<3){
            var u = t-2.0;
            return C2prime(u);
        }
          else if(t<4){
            var u = t-3.0;
             
            return C3prime(u);
        }
       
        
      
	}

    function drawTrajectory(t_begin,t_end,intervals,C,Tx,color) {
	    context.strokeStyle=color;
	    context.beginPath();
        moveToTx(C(t_begin),Tx);
        for(var i=1;i<=intervals;i++){
            var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
            lineToTx(C(t),Tx);
        }
        context.stroke();
	}

	  // make sure you understand these    
    background();
	  r1 = (r1 + 2) % 360;
    var time = new Date();
    // Create ViewPort transform
    var Tviewport = mat4.create();
	  mat4.fromTranslation(Tviewport,[320,470,0]); 
                                                  
                                                  
	  mat4.scale(Tviewport,Tviewport,[110,-110,1]); 
                                                  

    // Create projection transform
    // (orthographic for now)
    var Tprojection = mat4.create();
    mat4.ortho(Tprojection,-10,20,-10,10,-1,1);
    

    // Combined transform for viewport and projection
    var tVP_PROJ = mat4.create();
    mat4.multiply(tVP_PROJ,Tviewport,Tprojection);
    

    // Create Camera (lookAt) transform
    var locCamera = vec3.create();
    var distCamera = 40.0;
    locCamera[0] = distCamera*Math.sin(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
    locCamera[1] = 10;
    locCamera[2] = distCamera*Math.cos(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
      
      
    var locTarget = vec3.fromValues(20,0,0); 
    var vecUp = vec3.fromValues(0,1,0);
	  var TlookAt = mat4.create();
    mat4.lookAt(TlookAt, locCamera, locTarget, vecUp);
    
    

    // Viewport and Camera transformations
    var tVP_PROJ_CAM = mat4.create();
    mat4.multiply(tVP_PROJ_CAM,tVP_PROJ,TlookAt);
	  draw4D("white",tVP_PROJ_CAM);

	  drawTrajectory(0.0,1.0,100,C0,tVP_PROJ_CAM,"red");
    drawTrajectory(0.0,1.0,100,C1,tVP_PROJ_CAM,"red");
    drawTrajectory(0.0,1.0,100,C2,tVP_PROJ_CAM,"#00FFFF");  
    drawTrajectory(0.0,1.0,100,C3,tVP_PROJ_CAM,"#00FFFF");  
      
      
	  // Create model(ing) transform
  
    var Tmodel = mat4.create();
	  mat4.fromTranslation(Tmodel,Ccomp(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds()));
    var tangent = Ccomp_tangent(((2 * Math.PI) / 120) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
    var angle = Math.atan2(tangent[1],tangent[0]);
	  mat4.rotateZ(Tmodel,Tmodel,angle);


    // Viewport, camera, and modeling transform
    var tVP_PROJ_CAM_MOD = mat4.create();
	  mat4.multiply(tVP_PROJ_CAM_MOD, tVP_PROJ_CAM, Tmodel);

    
    drawObject('#b3f0ff',tVP_PROJ_CAM_MOD);
    window.requestAnimationFrame(draw);
    }
    

    draw();
}
window.onload = setup;
