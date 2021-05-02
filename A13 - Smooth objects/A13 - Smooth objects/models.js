function normalize(vector){

	var norm = vector[0]**2 + vector[1]**2 + vector[2]**2;

	vector[0] = vector[0]/norm;
	vector[1] = vector[1]/norm;
	vector[2] = vector[2]/norm;

	return vector;

}

function buildGeometry() {
	// Draws a pyramid --- Already done, just for inspiration
	var vert1 = [[0.0,1.0,0.0, 0.0, 0.4472,-0.8944],[ 1.0,-1.0,-1.0, 0.0, 0.4472,-0.8944],[-1.0,-1.0,-1.0, 0.0, 0.4472,-0.8944],
				 [0.0,1.0,0.0, 0.8944, 0.4472,0.0],[ 1.0,-1.0, 1.0, 0.8944, 0.4472,0.0],[ 1.0,-1.0,-1.0, 0.8944, 0.4472,0.0], 
				 [0.0,1.0,0.0, 0.0, 0.4472,0.8944],[-1.0,-1.0, 1.0, 0.0, 0.4472,0.8944],[ 1.0,-1.0, 1.0, 0.0, 0.4472,0.8944], 
				 [0.0,1.0,0.0, -0.8944, 0.4472,0.0],[-1.0,-1.0,-1.0, -0.8944, 0.4472,0.0],[-1.0,-1.0, 1.0, -0.8944, 0.4472,0.0], 
				 [-1.0,-1.0,-1.0, 0.0,-1.0,0.0],[1.0,-1.0,-1.0, 0.0,-1.0,0.0], [1.0,-1.0,1.0, 0.0,-1.0,0.0], [-1.0,-1.0,1.0, 0.0,-1.0,0.0],
				];
	var ind1 = [0, 1, 2,  3, 4, 5,  6, 7, 8,  9, 10, 11,  12, 13, 14,  12, 14, 15];
	var color1 = [0.0, 0.0, 1.0];
	addMesh(vert1, ind1, color1);
	
	// Draws a cube -- To do for the assignment.
	var vert2 = [[-1.0,-1.0,0.0, 0.0, 0.0,1.0], [1.0,-1.0,0.0, 0.0, 0.0,1.0], [1.0,1.0,0.0, 0.0, 0.0,1.0], [-1.0,1.0,0.0, 0.0, 0.0,1.0]];
	var ind2 = [0, 1, 2,  0, 2, 3];
	var color2 = [0.0, 1.0, 1.0];
	addMesh(vert2, ind2, color2);
	
	// Draws function y = sin(x) * cos(z) with -3 <= x <= 3 and -3 <= z <= 3 -- To do for the assignment.
	var d = 0;
	var y = 0;
	vert2 = [];
	for(z = -3; z <= 3; z++) {
		for(x = -3; x <= 3; x++) {
			
			y = Math.sin(x) * Math.cos(z);
			//Here for each vertex the normal is initialized at 0
			vert2[d] = [x, y, z, 0, 0, 0];
			d++
		}
	}

	//Creates indices as a triangle list
	ind2 = [];
	var j = 0;
	var i = 0;

	for(i = 0; i<=5; i++){

		for(k = 0; k<=5; k++){

			ind2[j] = (i*7)+k+8;
			j++;
			ind2[j] = (i*7)+k+1;
			j++;
			ind2[j] = (i*7)+k;
			j++;

			//Here is the computation of the normal to the face:
			var xv1 = vert2[(i*7)+k][0];
			var yv1 = vert2[(i*7)+k][1];
			var zv1 = vert2[(i*7)+k][2];

			var xv2 = vert2[(i*7)+k+1][0];
			var yv2 = vert2[(i*7)+k+1][1];
			var zv2 = vert2[(i*7)+k+1][2];

			var xv3 = vert2[(i*7)+k+8][0];
			var yv3 = vert2[(i*7)+k+8][1];
			var zv3 = vert2[(i*7)+k+8][2];

			var v1 = [xv1, yv1, zv1];
			var v2 = [xv2, yv2, zv2];
			var v3 = [xv3, yv3, zv3];

			var uvec = v2 - v1;
			var vvec = v3 - v1;

			var nx = uvec[1] * vvec[2] - uvec[2] * vvec[1];
			var ny = uvec[2] * vvec[0] - uvec[0] * vvec[2];
			var nz = uvec[0] * vvec[1] - uvec[1] * vvec[0];

			var norm = [nx, ny, nz];
			norm = normalize(norm);

			nx = norm[0];
			ny = norm[1];
			nz = norm[2];

			console.log(norm);
			
			//Now I add the normal to each vertex:

			vert2[(i*7)+k][3] = vert2[(i*7)+k][3] + nx;
			vert2[(i*7)+k][4] = vert2[(i*7)+k][4] + ny;
			vert2[(i*7)+k][5] = vert2[(i*7)+k][5] + nz;

			vert2[(i*7)+k+1][3] =  vert2[(i*7)+k+1][3] + nx; 
			vert2[(i*7)+k+1][4] = vert2[(i*7)+k+1][4] + ny; 
			vert2[(i*7)+k+1][5] = vert2[(i*7)+k+1][5] + nz; 

			vert2[(i*7)+k+8][3] = vert2[(i*7)+k+8][3] + nx; 
			vert2[(i*7)+k+8][4] =  vert2[(i*7)+k+8][4] + ny; 
			vert2[(i*7)+k+8][5] =  vert2[(i*7)+k+8][5] + nz; 

			//Now I have to normalize each normal:
			var normalized_vertex_normal = normalize([vert2[(i*7)+k][3], vert2[(i*7)+k][4], vert2[(i*7)+k][5]]);
			vert2[(i*7)+k][3] = normalized_vertex_normal[0];
			vert2[(i*7)+k][4] = normalized_vertex_normal[1];
			vert2[(i*7)+k][5] = normalized_vertex_normal[2];

			normalized_vertex_normal = normalize([vert2[(i*7)+k+1][3], vert2[(i*7)+k+1][4], vert2[(i*7)+k+1][5]]);
			vert2[(i*7)+k+1][3] = normalized_vertex_normal[0];
			vert2[(i*7)+k+1][4] = normalized_vertex_normal[1];
			vert2[(i*7)+k+1][5] = normalized_vertex_normal[2];

			normalized_vertex_normal = normalize([vert2[(i*7)+k+8][3], vert2[(i*7)+k+8][4], vert2[(i*7)+k+8][5]]);
			vert2[(i*7)+k+8][3] = normalized_vertex_normal[0];
			vert2[(i*7)+k+8][4] = normalized_vertex_normal[1];
			vert2[(i*7)+k+8][5] = normalized_vertex_normal[2];

			///////
			ind2[j] = (i*7)+k+7;
			j++;
			ind2[j] = (i*7)+k+8;
			j++;
			ind2[j] = (i*7)+k;
			j++;

		}
	}


	//This loop normalizes the normal:


	color2 = [0.0, 0.5, 1.0];
	addMesh(vert2, ind2, color2);

	
	// Draws a Cylinder --- To do for the assignment
	var vert4 = [[-1.0,-1.0,0.0, 0.0, 0.0,1.0], [1.0,-1.0,0.0, 0.0, 0.0,1.0], [1.0,1.0,0.0, 0.0, 0.0,1.0], [-1.0,1.0,0.0, 0.0, 0.0,1.0]];
	var ind4 = [0, 1, 2,  0, 2, 3];
	var color4 = [1.0, 1.0, 0.0];
	addMesh(vert4, ind4, color4);

	// Draws a Sphere --- To do for the assignment.
	var vert5 = [[-1.0,-1.0,0.0, 0.0, 0.0,1.0], [1.0,-1.0,0.0, 0.0, 0.0,1.0], [1.0,1.0,0.0, 0.0, 0.0,1.0], [-1.0,1.0,0.0, 0.0, 0.0,1.0]];
	var ind5 = [0, 1, 2,  0, 2, 3];
	var color5 = [1.0, 0.0, 0.0];
	addMesh(vert5, ind5, color5);
}
