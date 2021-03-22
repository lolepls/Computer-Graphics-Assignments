// these global variables are used to contain the current angles of the world
// HERE YOU WILL HAVE TO ADD ONE OR MORE GLOBAL VARIABLES TO CONTAIN THE ORIENTATION
// OF THE OBJECT

// this function returns the world matrix with the updated rotations.
// parameters rvx, rvy and rvz contains a value in the degree that how much the object rotates in the given direction.
//IDEA: salvare ogni volta la direzione dell'oggetto e usare quella come direzione di partenza.

Pitch = 0;
Yaw = 0;
Roll = 0;

//By using the quaternion library, let's create an instance of quaternion that contains the orientation
//of the object at the start.

positionQ = new Quaternion();

//This implementation updates the variables Pitch, Yaw and Roll according to the rotation expressed with the
//quaternion. The code of this algorithm was kindly given by Professor Marco Gribaudo.

function getEulerAngles(rotationMatrix){

	xaxis = [rotationMatrix[0],rotationMatrix[4],rotationMatrix[8]];
	yaxis = [rotationMatrix[1],rotationMatrix[5],rotationMatrix[9]];
	zaxis = [rotationMatrix[2],rotationMatrix[6],rotationMatrix[10]];
	
	R11=rotationMatrix[10];R12=rotationMatrix[8];R13=rotationMatrix[9];
	R21=rotationMatrix[2]; R22=rotationMatrix[0];R23=rotationMatrix[1];
	R31=rotationMatrix[6]; R32=rotationMatrix[4];R33=rotationMatrix[5];
	
	if((R31<1)&&(R31>-1)) {

		theta = -Math.asin(R31);
		phi = Math.atan2(R32/Math.cos(theta), R33/Math.cos(theta));
		psi = Math.atan2(R21/Math.cos(theta), R11/Math.cos(theta));
	} 
	else 
	{
		phi = 0;
		if(R31<=-1) {

			theta = Math.PI / 2;
			psi = phi + Math.atan2(R12, R13);
		} 
		else 
			{

			theta = -Math.PI / 2;
			psi = Math.atan2(-R12, -R13) - phi;
		}
	}

	Pitch = theta/Math.PI*180;
	Roll = phi/Math.PI*180;
	Yaw = psi/Math.PI*180;

}


function updateWorld(rvx, rvy, rvz) {

	rvx = rvx * Math.PI/180;
	rvy = rvy * Math.PI/180;
	rvz = rvz * Math.PI/180;

	//We create the quaternion deltaQ in order to represent the desired rotation:
	var deltaQ = new Quaternion.fromEuler(rvz, rvx, rvy, order = 'ZXY');
	console.log("X: " + rvx + " Y: " + rvy + " Z: " + rvz);
	positionQ = deltaQ.mul(positionQ);
	
	var out = positionQ.toMatrix4();
	//getEulerAngles(out);

	return out;

}

