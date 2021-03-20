/*
Fifth Computer Graphics assignment. The approach is similar to the one adopted in the previous assignment,
where the matrices are computed by using separate functions.
Note: the M1 matrix is the simplified version of the projection matrix M, and it is reported for learning purposes.
*/

function computeA1Matrix(){
// Make perspective projection, FoV-y = 70 deg, a = 16/9, n = 1, f = 101.

var fov = 70.0 * (Math.PI/180.0);
var a = 16.0/9.0;
var n = 1.0;
var f = 101.0;

var t = n * Math.tan(fov/2.0);
var b = -n * Math.tan(fov/2.0);
var l = a * b;
var r = a * t;

var M =  [	2.0*n/(r-l),		0.0,			(r+l)/(r-l),		0.0,
			0.0,				2.0*n/(t-b),	(t+b)/(t-b),		0.0,
			0.0,				0.0,			(f+n)/(n-f),		2.0*f*n/(n-f),
			0.0,				0.0,			- 1.0,				0.0];


var M1 =  [	1.0/(a*Math.tan(fov/2)),	0.0,				0.0,				0.0,
			0.0,						1/Math.tan(fov/2),	0.0,				0.0,
			0.0,						0.0,				(f+n)/(n-f),		2.0*f*n/(n-f),
			0.0,						0.0,				-1.0,				0.0];


return M;

}

function computeA2Matrix(){
	// Make perspective projection, FoV-y = 105 deg, a = 16/9, n = 1, f = 101
	
	var fov = 105.0 * (Math.PI/180.0);
	var a = 16.0/9.0;
	var n = 1.0;
	var f = 101.0;
	
	var t = n * Math.tan(fov/2.0);
	var b = -n * Math.tan(fov/2.0);
	var l = a * b;
	var r = a * t;
	
	var M =  [	2.0*n/(r-l),		0.0,			(r+l)/(r-l),		0.0,
				0.0,				2.0*n/(t-b),	(t+b)/(t-b),		0.0,
				0.0,				0.0,			(f+n)/(n-f),		2.0*f*n/(n-f),
				0.0,				0.0,			- 1.0,				0.0];
	
	
	var M1 =  [	1.0/(a*Math.tan(fov/2)),	0.0,				0.0,				0.0,
				0.0,						1/Math.tan(fov/2),	0.0,				0.0,
				0.0,						0.0,				(f+n)/(n-f),		2.0*f*n/(n-f),
				0.0,						0.0,				-1.0,				0.0];
	
	
	return M;
	
	}


function computeA3Matrix(){
		// Make perspective projection, FoV-y = 40 deg, a = 16/9, n = 1, f = 101
		
		var fov = 40.0 * (Math.PI/180.0);
		var a = 16.0/9.0;
		var n = 1.0;
		var f = 101.0;
		
		var t = n * Math.tan(fov/2.0);
		var b = -n * Math.tan(fov/2.0);
		var l = a * b;
		var r = a * t;
		
		var M =  [	2.0*n/(r-l),		0.0,			(r+l)/(r-l),		0.0,
					0.0,				2.0*n/(t-b),	(t+b)/(t-b),		0.0,
					0.0,				0.0,			(f+n)/(n-f),		2.0*f*n/(n-f),
					0.0,				0.0,			- 1.0,				0.0];
		
		
		var M1 =  [	1.0/(a*Math.tan(fov/2)),	0.0,				0.0,				0.0,
					0.0,						1/Math.tan(fov/2),	0.0,				0.0,
					0.0,						0.0,				(f+n)/(n-f),		2.0*f*n/(n-f),
					0.0,						0.0,				-1.0,				0.0];
		
		
		return M;
		
		}

function computeO1Matrix(){
	// Make perspective projection, FoV-y = 90 deg, a = 4/3, n = 1, f = 101. Note: since the aspect ratio is not correct, the image should appear to be deformed
			
			var fov = 90.0 * (Math.PI/180.0);
			var a = 4.0/3.0;
			var n = 1.0;
			var f = 101.0;
			
			var t = n * Math.tan(fov/2.0);
			var b = -n * Math.tan(fov/2.0);
			var l = a * b;
			var r = a * t;
			
			var M =  [	2.0*n/(r-l),		0.0,			(r+l)/(r-l),		0.0,
						0.0,				2.0*n/(t-b),	(t+b)/(t-b),		0.0,
						0.0,				0.0,			(f+n)/(n-f),		2.0*f*n/(n-f),
						0.0,				0.0,			- 1.0,				0.0];
			
			
			var M1 =  [	1.0/(a*Math.tan(fov/2)),	0.0,				0.0,				0.0,
						0.0,						1/Math.tan(fov/2),	0.0,				0.0,
						0.0,						0.0,				(f+n)/(n-f),		2.0*f*n/(n-f),
						0.0,						0.0,				-1.0,				0.0];
			
			
			return M;
			
}

function computeO2Matrix(){
	// Make perspective projection, l = -1.2, r = 0, t = 0.3375, b = -0.3375, n = 1, f = 101. Note: due to the asimmetry of this projection, only the left part of the scene should be visible
			
			var n = 1.0;
			var f = 101.0;
			
			var t = 0.3375;
			var b = -0.3375
			var l = -1.2;
			var r = 0;
			
			var M =  [	2.0*n/(r-l),		0.0,			(r+l)/(r-l),		0.0,
						0.0,				2.0*n/(t-b),	(t+b)/(t-b),		0.0,
						0.0,				0.0,			(f+n)/(n-f),		2.0*f*n/(n-f),
						0.0,				0.0,			- 1.0,				0.0];
			
			return M;
			
}
	

function perspective() {
	// Make perspective projection, FoV-y = 70 deg, a = 16/9, n = 1, f = 101.
	var A1 = computeA1Matrix();

	// Make perspective projection, FoV-y = 105 deg, a = 16/9, n = 1, f = 101
	var A2 =  computeA2Matrix();

	// Make perspective projection, FoV-y = 40 deg, a = 16/9, n = 1, f = 101
	var A3 = computeA3Matrix();

	// Make perspective projection, FoV-y = 90 deg, a = 4/3, n = 1, f = 101. Note: since the aspect ratio is not correct, the image should appear to be deformed
	var O1 =  computeO1Matrix();

	// Make perspective projection, l = -1.2, r = 0, t = 0.3375, b = -0.3375, n = 1, f = 101. Note: due to the asimmetry of this projection, only the left part of the scene should be visible
	var O2 =  computeO2Matrix();

	return [A1, A2, A3, O1, O2];
}
