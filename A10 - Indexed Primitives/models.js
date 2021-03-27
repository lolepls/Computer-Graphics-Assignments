function buildGeometry() {
	var i;
	

	// Draws function y = sin(x) * cos(z) with -3 <= x <= 3 and -3 <= z <= 3.
	///// Creates vertices
	var d = 0;
	var y = 0;
	var vert2 = [];
	for(z = -3; z <= 3; z++) {
		for(x = -3; x <= 3; x++) {
			
			y = Math.sin(x) * Math.cos(z);
			vert2[d] = [x, y, z];
			d++
		}
	}

	////// Creates indices as a triangle list
	var ind2 = [];
	var j = 0;

	for(i = 0; i<=5; i++){

		for(k = 0; k<=5; k++){

			ind2[j] = (i*7)+k+8;
			j++;
			ind2[j] = (i*7)+k+1;
			j++;
			ind2[j] = (i*7)+k;
			j++;
			///////
			ind2[j] = (i*7)+k+7;
			j++;
			ind2[j] = (i*7)+k+8;
			j++;
			ind2[j] = (i*7)+k;
			j++;

		}
	}


	var color2 = [0.0, 0.5, 1.0];
	addMesh(vert2, ind2, color2);



	// Draws a Half Sphere
	/*
	By using the spherical coordinates, we define vertices of the sphere:
	*/
	var step = 100;
	var theta = 0;
	var phi = 0;
	var r = 1;
	var d = 0;

	var vert3 = [];

	for(theta = 0; theta <= Math.PI / 2; theta = theta + Math.PI/step) {
		for(phi = 0; phi <= 2*Math.PI; phi = phi + Math.PI / step) {

			x = r * Math.sin(theta) * Math.cos(phi);
			y = r * Math.sin(theta) * Math.sin(phi);
			z = r * Math.cos(theta);

			vert3[d] = [x,y,z];
			d++;
		}
	}

	////// Creates indices as a triangle list
	var ind3 = [];
	for(i = 0; i < 2; i++) {
		for(j = 0; j < 2; j++) {
			ind3[6*(i*2+j)  ] = 3*j+i;
			ind3[6*(i*2+j)+1] = 3*j+i+1;
			ind3[6*(i*2+j)+2] = 3*(j+1)+i+1;
			ind3[6*(i*2+j)+3] = 3*j+i;
			ind3[6*(i*2+j)+4] = 3*(j+1)+i+1;
			ind3[6*(i*2+j)+5] = 3*(j+1)+i;
		}
	}
	
	var color3 = [0.0, 1.0, 0.0];
	addMesh(vert3, ind3, color3);
}

