function Anim1(t) {
	// A car moving on a road. Actually, the road and the hills are sliding behind the car...

	/* Slow version:
	var x_coord = t*0.25;
	var out = utils.MakeTranslateMatrix(x_coord, 0.5, 0);
	out = utils.multiplyMatrices(out, utils.MakeScaleMatrix(0.25));
	*/

	/*
	Fast version:
	 We want the range of x coordinate of the translate matrix to be [0-0.25]. In order to obtain this I 
	used the series of if conditions on the value of t. The latter solution is easier but provides a slower
	 animation.
	*/

	if(t<0.25){
		var out = utils.MakeTranslateMatrix(t, 0.5, 0);
	}

	else if(t<0.5){
		var out = utils.MakeTranslateMatrix(t-0.25, 0.5, 0);
	}

	else if (t<0.75){
		var out = utils.MakeTranslateMatrix(t-0.5, 0.5, 0);
	}

	else{
		var out = utils.MakeTranslateMatrix(t-0.75, 0.5, 0);
	}

	out = utils.multiplyMatrices(out, utils.MakeScaleMatrix(0.25));
	return out;
}

function Anim2(t) {
	// Bumping code. In order to have smooth bumping, we have to go each time from 0.5 to 0.75 and come back
	// from 0.75 to 0.5. We need to do this an even amount of times so that the animation can loop smoothly.

	
	//da 0.5 a 0.75
	if(t<0.25){
		var out = utils.MakeTranslateMatrix(0.75, t+0.5, 0);
	}

	//da 0.75 a 0.5
	else if(t<0.5){
		var out = utils.MakeTranslateMatrix(0.75, 1-t,0);
	}

	//da 0.5 a 0.75
	else if(t<0.75){
		var out = utils.MakeTranslateMatrix(0.75, t ,0);
	}

	//da 0.75 a 0.5
	else{
		var out = utils.MakeTranslateMatrix(0.75, 1.5-t ,0);
	}

	//Ho t che va da 0.5 a 0.75. Devo renderlo da 0.75 a 0.5.

	//var out = utils.MakeTranslateMatrix(0.75, 0.25, 0);

	out = utils.multiplyMatrices(out, utils.MakeScaleMatrix(0.25));
	return out;
}


function Anim3(t) {
	// Rotating fan. The fan is rotating around an arbitrary axis centered in (0.625, 0.875, 0) and aligned 
	// with the z-axis. We need to implement the rotation around this axis with a combination of rotation
	// around z-axis and translation.

	//Arbitrary rotation:
	out = utils.MakeTranslateMatrix(0.625, 0.875, 0);
	out = utils.multiplyMatrices(out, utils.MakeRotateZMatrix(t*360));
	out = utils.multiplyMatrices(out, utils.MakeTranslateMatrix(-0.625, -0.875 ,0));

	//Final scaling and positioning:
	out = utils.multiplyMatrices(out, utils.MakeTranslateMatrix(0.5, 0.75 ,0));
	out = utils.multiplyMatrices(out, utils.MakeScaleMatrix(0.25));

	return out;
}

//Burning flame

// This starts from 5 since the first frames are the one with an higher y in the texture.
// See the reference and the assignment's specification to have more details.
var yframe_count = 5;
var xframe_count = 0;

var y_frame = (0.5) / 6;
var x_frame = (1.0) / 12;

function Anim4(t) {
	// Burning flame: We have 72 frames that must be shown one after the other. Here the variables
	// x_frame and y_frame contain the values at which each frame is found in the texture (rows are multiple
	// of 12 and columns of 6), and yframe_count and xframe_count take into account the number of frames per
	// row/column in order to switch to the next row/column when needed. The code is fairly simple.

	
	var out = utils.MakeTranslateMatrix(x_frame*xframe_count, y_frame*yframe_count, 0);
	xframe_count++;

	if(xframe_count>11){

		//If i have showed a whole row, I go to the next one by decreasing yframe_count.

		xframe_count = 0;
		yframe_count--;
	}

	if(yframe_count=0){
		//When I have done each row, I come back to the starting one.
		yframe_count = 5;
	}

	//Scaling in order to center the flames.
	out = utils.multiplyMatrices(out, utils.MakeScaleMatrix(0.0833));

	return out;
}
