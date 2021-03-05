/*
This third CG assignment is about transformations around arbitrary axes, inverse of transformations and composition of transformations.
The chosen approach is to write a separate function for each transformation that returns the correct matrix. Some of these functions will
perform computations in a more explicit way for learning purposes, others will exploit the function library "utils.js" to avoid writing 
the matrixes explicitly.
*/

function computeR1Matrix(){
// Rotate 60 degrees around an arbitrary axis passing through (0,1,-1). The x-axis can be aligned to the arbitrary axis after a rotation of 45 degrees around the z-axis, and then 15 degrees around the y-axis.
	
	
	//This is the matrix for the 60 degrees rotation, according to the fact that the x-axis must be aligned
	//to the arbitrary one.

	var alfa = utils.degToRad(60);
	var cosalfa = Math.cos(alfa);
	var senalfa = Math.sin(alfa);


	var Rx  =         [1.0,		0.0,		0.0,		0.0,
			   0.0,		cosalfa,	-senalfa,	0.0,
			   0.0,		senalfa,	cosalfa,	0.0,
			   0.0,		0.0,		0.0,		1.0];

	

	//This is the matrix for the translation of the point. Both T and its inverse will be needed.
	var T  =          [1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		1.0,
			   0.0,		0.0,		1.0,	       -1.0,
			   0.0,		0.0,		0.0,		1.0];
	var iT = utils.invertMatrix(T);

	//Let's compute the matrix for the rotation of 45 degrees around the z axis and its inverse:
	
	var gamma = utils.degToRad(45);
	var cosgamma = Math.cos(gamma);
	var sengamma = Math.sin(gamma);

	var Rz =          [cosgamma,	-sengamma,	0.0,		0.0,
			   sengamma,	cosgamma,	0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];

	var iRz = utils.invertMatrix(Rz);

	//Let's compute the matrix for the rotation of 15 degrees around the y axis and its inverse:

	var beta = utils.degToRad(15);
	var cosbeta = Math.cos(beta);
	var senbeta = Math.sin(beta);

	var Ry =          [cosbeta,	0.0,		senbeta,	0.0,
			   0.0,		1.0,		0.0,		0.0,
			   -senbeta,	0.0,		cosbeta,	0.0,
			   0.0,		0.0,		0.0,		1.0];

	var iRy = utils.invertMatrix(Ry);

	/*Now we compose the trasformations according to the matrix-on-the-left convention:
	  p' = T*Ry*Rz * Rx * iRz*iRy*iT * p
	  We will return a matrix M which is the composition of those transformations.
	*/  

	var M = utils.multiplyMatrices(T, Ry);
	M = utils.multiplyMatrices(M, Rz);
	M = utils.multiplyMatrices(M, Rx);
	M = utils.multiplyMatrices(M, iRz);
	M = utils.multiplyMatrices(M, iRy);
	M = utils.multiplyMatrices(M, iT);

	return M;
}

function move() {
	// Rotate 60 degrees around an arbitrary axis passing through (0,1,-1). The x-axis can be aligned to the arbitrary axis after a rotation of 45 degrees around the z-axis, and then 15 degrees around the y-axis.
	var R1 = computeR1Matrix();
				   
	// Half the size of the object along a line that bisects the positive x and y axes on the xy-plane. 
	var S1 = [1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];
			   
	// Mirror the starship along a plane passing through (1,1,1), and obtained rotating 15 degree around the x axis the xz plane
	var S2 =  [1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];
			   
	// Apply the inverse of the following sequence of transforms: rotation of 30 degree around the Y axis then Translation of (0, 0, 5), and finally a uniform scaling of a factor of 3.
	var I1 =  [1.0,		0.0,		0.0,		0.0,
			   0.0,		1.0,		0.0,		0.0,
			   0.0,		0.0,		1.0,		0.0,
			   0.0,		0.0,		0.0,		1.0];

	return [R1, S1, S2, I1];
}

