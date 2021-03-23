//By using the quaternion.js library, let's create an instance of quaternion that contains the orientation
//of the object at the start.
positionQ = new Quaternion();


function updateWorld(rvx, rvy, rvz) {

	//Conversion in radiants of the translation required by pressing keys:
	rvx = rvx * Math.PI/180;
	rvy = rvy * Math.PI/180;
	rvz = rvz * Math.PI/180;

	//Creation of the quaternion deltaQ in order to represent the desired rotation:
	var deltaQ = new Quaternion.fromEuler(rvz, rvx, rvy);
	
	
	//Computation of the quaternion of the new position of the object by appliying the rule:
	//p' = deltap * p
	positionQ = deltaQ.mul(positionQ);
	//console.log(positionQ);
	//By exploiting the provided library function, let's convert the quaternion of the new position into a
	//rotation matrix that represents Ry*Rx*Rz:
	var rotationMatrix = positionQ.toMatrix4();
	
	//Computation of the world matrix by using its definition: W = T*Ry*Rx*Rz*S
	var worldMatrix = utils.multiplyMatrices(utils.MakeTranslateMatrix(0,0,0), rotationMatrix);
	worldMatrix = utils.multiplyMatrices(worldMatrix, utils.MakeScaleMatrix(1));
	
	return worldMatrix;

}

