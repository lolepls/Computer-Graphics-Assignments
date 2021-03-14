/*
This is the fourth Computer Graphic Assignment. The focus of the assignment will be on axonometric
projections. Following the approach of Assignment 03, each matrix will be computed by using a separate
function.
*/


function computeA1Matrix(){
//Make an isometric view, w = 50, a=16/9, n=1, f=101
var w = 50.0;
var a = 16/9;
var n = 1.0;
var f = 101.0;

var M  =  [1.0/w,	0.0,			0.0,				0.0,
		   0.0,		a/w,			0.0,				0.0,
		   0.0,		0.0,     -2.0/(f-n),		-(f+n)/(f-n),		
		   0.0,		0.0,			0.0,				1.0];

var Xr = utils.MakeRotateXMatrix(35.26);
var Yr = utils.MakeRotateYMatrix(45);

M = utils.multiplyMatrices(M, Xr);
M = utils.multiplyMatrices(M, Yr);

return M;

}

function computeA2Matrix(){
// Make a dimetric view, w = 50, a = 16/9, n = 1, f = 101, rotated 20 around the x-axis
var w = 50.0;
var a = 16/9;
var n = 1.0;
var f = 101.0;

var M  =  [1.0/w,	0.0,			0.0,				0.0,
		   0.0,		a/w,			0.0,				0.0,
		   0.0,		0.0,     -2.0/(f-n),		-(f+n)/(f-n),		
		   0.0,		0.0,			0.0,				1.0];

var Xr = utils.MakeRotateXMatrix(20);
var Yr = utils.MakeRotateYMatrix(45);

M = utils.multiplyMatrices(M, Xr);
M = utils.multiplyMatrices(M, Yr);

return M;

}

function computeA3Matrix(){
// Make a trimetric view, w = 50, a = 16/9, n = 1, f = 101, rotated -30 around the x-axis and 30 around the y-axis
var w = 50.0;
var a = 16/9;
var n = 1.0;
var f = 101.0;

var M  =  [1.0/w,	0.0,			0.0,				0.0,
		   0.0,		a/w,			0.0,				0.0,
		   0.0,		0.0,     -2.0/(f-n),		-(f+n)/(f-n),		
		   0.0,		0.0,			0.0,				1.0];

var Xr = utils.MakeRotateXMatrix(-30);
var Yr = utils.MakeRotateYMatrix(30);

M = utils.multiplyMatrices(M, Xr);
M = utils.multiplyMatrices(M, Yr);

return M;



}

function computeO1Matrix(){
// Make a cavalier projection view, w = 50, a = 16/9, n = 1, f = 101, at 45 degrees
var w = 50.0;
var a = 16/9;
var n = 1.0;
var f = 101.0;

var M  =  [1.0/w,	0.0,			0.0,				0.0,
		   0.0,		a/w,			0.0,				0.0,
		   0.0,		0.0,     -2.0/(f-n),		-(f+n)/(f-n),		
		   0.0,		0.0,			0.0,				1.0];

var p = 1;
var alfa = Math.PI / 4;

var Z = utils.MakeShearZMatrix(-p*Math.cos(alfa), -p*Math.sin(alfa));
M = utils.multiplyMatrices(M, Z);

return M;


}

function computeO2Matrix(){
	// Make a cabinet projection view, w = 50, a = 16/9, n = 1, f = 101, at 60 degrees
	var w = 50.0;
	var a = 16/9;
	var n = 1.0;
	var f = 101.0;
	
	var M  =  [1.0/w,	0.0,			0.0,				0.0,
			   0.0,		a/w,			0.0,				0.0,
			   0.0,		0.0,     -2.0/(f-n),		-(f+n)/(f-n),		
			   0.0,		0.0,			0.0,				1.0];
	
	var p = 0.5;
	var alfa = Math.PI * (1/3);
	
	var Z = utils.MakeShearZMatrix(-p*Math.cos(alfa), -p*Math.sin(alfa));
	M = utils.multiplyMatrices(M, Z);
	
	return M;
	
	
	}


function axonometry() {
	// Make an isometric view, w = 50, a = 16/9, n = 1, f = 101.
	var A1 = computeA1Matrix();
			   
	// Make a dimetric view, w = 50, a = 16/9, n = 1, f = 101, rotated 20 around the x-axis
	var A2 = computeA2Matrix();
			   
	// Make a trimetric view, w = 50, a = 16/9, n = 1, f = 101, rotated -30 around the x-axis and 30 around the y-axis
	var A3 = computeA3Matrix();
			   
	// Make a cavalier projection view, w = 50, a = 16/9, n = 1, f = 101, at 45 degrees
	var O1 = computeO1Matrix();

	// Make a cabinet projection view, w = 50, a = 16/9, n = 1, f = 101, at 60 degrees
	var O2 = computeO2Matrix();

	return [A1, A2, A3, O1, O2];
}