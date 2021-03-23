/*
Seventh assignment of CG course. This was done by exploiting the library functions provided by Professor
in order to have a more readable code that focuses on the transormations to be applied. The rule followed
to compute each world matrix is this:

W = T(x,y,z) * Ry(yaw) * Rz(Pitch) * Rz(Roll)

The sequence of multiplications performed exploits the associative property of the matrix product:

W = (((T*Ry)*Rz)*Rx)

*/


function computeA1Matrix(){
	// Positioned in 0,0,-3. Yaw=90, Pitch and Roll = 0

	var M = utils.MakeTranslateMatrix(0,0,-3);
	M = utils.multiplyMatrices(M, utils.MakeRotateYMatrix(90));

	return M;


}

function computeA2Matrix(){
	// Positioned in 0,2,0. Yaw=0, Pitch = 60, Roll = 0, 1/10th of size

	var M = utils.MakeTranslateMatrix(0,2, 0);
	M = utils.multiplyMatrices(M, utils.MakeRotateXMatrix(60));
	M = utils.multiplyMatrices(M, utils.MakeScaleMatrix(0.1));

	return M;


}

function computeA3Matrix(){
	// Positioned in 0,0,0. Yaw=30, Pitch = 0 Roll = 45

	var M = utils.identityMatrix();
	M = utils.multiplyMatrices(M, utils.MakeRotateYMatrix(30));
	M = utils.multiplyMatrices(M, utils.MakeRotateZMatrix(45));

	return M;


}

function computeA4Matrix(){
	// Positioned in 2,0,2. Yaw=180, Pitch and Roll = 0, two times wider

	var M = utils.MakeTranslateMatrix(2,0,2);
	M = utils.multiplyMatrices(M, utils.MakeRotateYMatrix(180));
	M = utils.multiplyMatrices(M, utils.MakeScaleNuMatrix(2,1,1));

	return M;


}


function computeA5Matrix(){
	// Positioned in 1,-1,2.5. Yaw=-30, Pitch = 45 Roll = -15, Scaled with the following factors: 0.8 (x), 0.75 (y), 1.2 (z)

	var M = utils.MakeTranslateMatrix(1, -1, 2.5);
	M = utils.multiplyMatrices(M, utils.MakeRotateYMatrix(-30));
	M = utils.multiplyMatrices(M, utils.MakeRotateXMatrix(45));
	M = utils.multiplyMatrices(M, utils.MakeRotateZMatrix(-15));
	M = utils.multiplyMatrices(M, utils.MakeScaleNuMatrix(0.8, 0.75, 1.2));
	
	return M;


}



function world() {
	// Positioned in 0,0,-3. Yaw=90, Pitchx and Rollz = 0
	var A1 = computeA1Matrix();
			   
	// Positioned in 0,2,0. Yaw=0, Pitch = 60, Roll = 0, 1/10th of size
	var A2 =  computeA2Matrix();
			   
	// Positioned in 0,0,0. Yaw=30, Pitch = 0 Roll = 45
	var A3 =  computeA3Matrix();
			   
	// Positioned in 2,0,2. Yaw=180, Pitch and Roll = 0, two times wider
	var A4 =  computeA4Matrix();

	// Positioned in 1,-1,2.5. Yaw=-30, Pitch = 45 Roll = -15, Scaled with the following factors: 0.8 (x), 0.75 (y), 1.2 (z)
	var A5 =  computeA5Matrix();

	return [A1, A2, A3, A4, A5];
}