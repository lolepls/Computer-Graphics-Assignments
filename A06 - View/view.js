function view() {


function computeA1Matrix(){
// Make a Look-In-Direction matrix centered at (5,2.5,0), looking west and aiming 30 degrees down.
/*
In order to compute this matrix we have to perform the following series of matrices multiplications:
M = Rx(30)*Ry(-90)*T(-5, -2.5, 0)
*/

var M = utils.MakeRotateXMatrix(30);
M = utils.multiplyMatrices(M, utils.MakeRotateYMatrix(-90));
M = utils.multiplyMatrices(M, utils.MakeTranslateMatrix(-5, -2.5, 0));

return M;

}

function computeA2Matrix(){
// Make a Look-In-Direction matrix centered at (0,-1,-5), angled 170 degrees, with an elevation of 15 degrees, and a roll of 45 degrees.
/*
In order to compute this matrix we have to perform the following series of matrices multiplications:
M = Rz(-170)*Rx(-45)*Ry(-15)*T(0, 1, 5)
*/

var M = utils.MakeRotateZMatrix(-45);
M = utils.multiplyMatrices(M, utils.MakeRotateXMatrix(-15))
M = utils.multiplyMatrices(M, utils.MakeRotateYMatrix(-170));
M = utils.multiplyMatrices(M, utils.MakeTranslateMatrix(0, 1, 5));

return M;

}

/*
In order to do the computations needed for Look-At-Matrices, I will define here a function that compute
the difference of two vectors of size 3. For the normalization I will use the function provided by
the Professor in file utils.js.
*/

function vectDifference(a, b){

var c = [0,0,0];
for(var i = 0; i<3; i++){
	c[i] = a[i] - b[i];
}

return c;

}

function vectorialProduct(a, b){

	var c = [0,0,0];

	c[0] = a[1]*b[2] - a[2]*b[1];
	c[1] = a[2]*b[0] - a[0]*b[2];
	c[2] = a[0]*b[1] - a[1]*b[0];

	return c;

}

function computeA3Matrix(){
// Make a Look-At-Matrix, centered at (-4, 2, -4), aiming at (0,0.5,0.5) and with up-vector (0,1,0).

var c = [-4, 2, -4];
var a = [0, 0.5, 0.5];
var u = [0, 1, 0];

//We compute the vector by using the defined functions:
var Vz = utils.normalizeVector3(vectDifference(c,a));
var Vx = utils.normalizeVector3(vectorialProduct(u, Vz));
var Vy = vectorialProduct(Vz, Vx);

//We now have to compose manually the matrix Mc:
Mc =	[Vx[0],		Vy[0],		Vz[0],		c[0],
		 Vx[1],		Vy[1],		Vz[1],		c[1],
		 Vx[2],		Vy[2],		Vz[2],		c[2],
		 0.0, 		0.0,		0.0,		1.0];

//To obtain the View Matrix we only have to invert the matrix Mc:
var M = utils.invertMatrix(Mc);

return M;

}

function computeA4Matrix(){
	// Make a Look-At-Matrix, centered at (2.57, 0, 0), aiming at (2.8,0,-1) and with up-vector (1,0,0).

	var c = [2.57, 0, 0];
	var a = [2.8, 0, -1];
	var u = [1, 0, 0];
	
	//We compute the vector by using the defined functions:
	var Vz = utils.normalizeVector3(vectDifference(c,a));
	var Vx = utils.normalizeVector3(vectorialProduct(u, Vz));
	var Vy = vectorialProduct(Vz, Vx);
	
	//We now have to compose manually the matrix Mc:
	Mc =	[Vx[0],		Vy[0],		Vz[0],		c[0],
			 Vx[1],		Vy[1],		Vz[1],		c[1],
			 Vx[2],		Vy[2],		Vz[2],		c[2],
			 0.0, 		0.0,		0.0,		1.0];
	
	//To obtain the View Matrix we only have to invert the matrix Mc:
	var M = utils.invertMatrix(Mc);
	
	return M;

}
	

	// Make a Look-In-Direction matrix centered at (5,2.5,0), looking west and aiming 30 degrees down.
	var A1 =  computeA1Matrix();
			   
	// Make a Look-In-Direction matrix centered at (0,-1,-5), angled 170 degrees, with an elevation of 15 degrees, and a roll of 45 degrees.
	var A2 =  computeA2Matrix();
			   
	// Make a Look-At-Matrix, centered at (-4, 2, -4), aiming at (0,0.5,0.5) and with up-vector (0,1,0).
	var A3 =  computeA3Matrix();
			   
	// Make a Look-At-Matrix, centered at (2.57, 0, 0), aiming at (2.8,0,-1) and with up-vector (1,0,0).
	var A4 = computeA4Matrix();


	return [A1, A2, A3, A4];
}