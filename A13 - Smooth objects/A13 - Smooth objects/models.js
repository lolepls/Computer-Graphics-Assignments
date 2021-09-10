//Here some functions defined by me in order to have it easier when computing normals:

function normalize(vector){

	var norm = Math.sqrt(vector[0]**2 + vector[1]**2 + vector[2]**2);

	vector[0] = vector[0]/norm;
	vector[1] = vector[1]/norm;
	vector[2] = vector[2]/norm;

	return vector;

}

function cross(a, b){

	var result = [0.0, 0.0, 0.0];

	result[0] = a[1]*b[2] - a[2]*b[1];
	result[1] = a[2]*b[0] - a[0]*b[2];
	result[2] = a[0]*b[1] - a[1]*b[0];

	return result;

}

function sub(a, b){

	return[a[0]-b[0], a[1]-b[1], a[2]-b[2]];

}

//Find the middle point of the segment with vertices vector1 and vector2.
function middlepoint(vector1, vector2){

		var result = [
			(vector1[0]+vector2[0])/2,
			(vector1[1]+vector2[1])/2, 
			(vector1[2]+vector2[2])/2,
			0,
			0,
			0
		];

		return result;

}

//This function takes three vec3 variables representing vertices of a triangle in clockwise order and returns the normal of the triangle.
function compute_triangle_normal(a, b, c){

	var vec1 = sub(b, a);
	var vec2 = sub (c, a);

	var nvec = cross(vec1, vec2);
	nvec = normalize(nvec);
	//console.log(nvec);
	return nvec;

}

//This function algorithmically builds a sphere starting from an octahedron.
function buildSphere(sphere){

	vert3 = [];
	ind3 = [];

	//Let's start by creating an octahedron

	vert3 = [

		/*[0,-1,0, 0,0,0], [1,0,0, 0,0,0],
		[0,0,1, 0,0,0], [-1,0,0, 0,0,0],
		[0,0,-1, 0,0,0], [0,1,0, 0,0,0]*/

		[0,0,1, 0,0,0], [1,0,0, 0,0,0],
		[0,1,0, 0,0,0], [-1,0,0, 0,0,0],
		[0,-1,0, 0,0,0], [0,0,-1, 0,0,0]


	]

	ind3 = [  //All the triangles have the vertices specified in clockwise order.
		/*0,1,2,
		0,2,3,
		0,3,4,
		0,4,1,
		1,5,2,
		2,5,3,
		3,5,4,
		4,5,1,*/

		1,5,2,
		1,0,4,
		2,5,3,
		4,0,3,
		3,5,4,
		3,0,2,
		4,5,1,
		2,0,1


	]

	//Now we have to recursively split the edges and normalize the distance of the points:
	var iterations = 5; //Leave this reasonably low (4 or 5) or the algorithm will take too much time

	
	for(i=0; i<iterations; i++){ //For each iteration, we split each face of the pyramid into 4 more faces

		var newVert3 = [];
		var newInd3 = [];
		var d = 0;
		var k = 0;
		var faces = ind3.length / 3;

		for(j=0; j<faces; j++){  //This is the algorithm that splits the single face. It is repeated for each face.


			//For each face, I retrieve its vertices by reading indexes in triplets
			var vertex0_index = ind3[(j*3)];
			var vertex1_index = ind3[(j*3)+1];
			var vertex2_index = ind3[(j*3)+2];

			var vertex0 = vert3[vertex0_index];
			var vertex1 = vert3[vertex1_index];
			var vertex2 = vert3[vertex2_index];

			//I add a point in the middle of each vertex by using a custom function:
			var midpoint_01 = middlepoint(vertex0, vertex1);
			var midpoint_02 = middlepoint(vertex0, vertex2);
			var midpoint_12 = middlepoint(vertex1, vertex2);


			//I normalize the distance of each point by using a custom function
			midpoint_01 = normalize(midpoint_01);
			midpoint_02 = normalize(midpoint_02);
			midpoint_12 = normalize(midpoint_12);

			//I add the vertices to a new vertices vector:
			newVert3[d] = vertex0;
			newVert3[d+1] = vertex1;
		    newVert3[d+2] = vertex2;
			newVert3[d+3] = midpoint_01;
			newVert3[d+4] = midpoint_02;
			newVert3[d+5] = midpoint_12;
			

			//I add the indexes to the array respecting the clockwise order of each triangle:
			newInd3[k] = d; //vertex0
			newInd3[k+1] = d+3; //midpoint_01
			newInd3[k+2] = d+4; //midpoint_02

			newInd3[k+3] = d+1; //vertex1
			newInd3[k+4] = d+5; //midpoint_12
			newInd3[k+5] = d+3; //midpoint_01

			newInd3[k+6] = d+2; //vertex2
			newInd3[k+7] = d+4; //midpoint_02
			newInd3[k+8] = d+5; //midpoint_12

			newInd3[k+9] = d+5; //midpoint_12
			newInd3[k+10] = d+4; //midpoint_02
			newInd3[k+11] = d+3;//midpoint_01
			
			//Increment of indexes used in the arrays:
			k = k+12;
			d = d+6;
		}

		//When all the faces are completed, the result is treated as a new polyhedron.
		vert3 = newVert3;
		ind3 = newInd3;
	}

	sphere.vert = vert3;
	sphere.ind = ind3;
	return sphere;

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

	/**************************************************************************/
	
	// Draws a cube -- To do for the assignment.

	// Here each triangle that makes the cube is considered with independent vertices. This means that
	// vertices are duplicated, and each face is made of single triangles. This allows us to have a different
	// lighting for each face without smoothing effect.

	var vert2 = [

		[-1, -1, 1, 0,0,0], 
		[1, -1, 1, 0,0,0],
		[1, 1, 1, 0,0,0],
		
		[-1, -1, 1, 0,0,0],
		[1, 1, 1, 0,0,0],
		[-1, 1, 1, 0,0,0],
		
		[1, -1, 1, 0,0,0],
		[1, -1, -1, 0,0,0],
		[1, 1, -1, 0,0,0],
		
		[1, -1, 1, 0,0,0],
		[1, 1, -1, 0,0,0],
		[1, 1, 1, 0,0,0],
		
		[1, -1, -1, 0,0,0],
		[-1, -1, -1, 0,0,0],
		[-1, 1, -1, 0,0,0],
		
		[1, -1, -1, 0,0,0],
		[-1, 1, -1, 0,0,0],
		[1, 1, -1, 0,0,0],
		
		[-1, -1, -1, 0,0,0],
		[-1, -1, 1, 0,0,0],
		[-1, 1, 1, 0,0,0],
		
		[-1, -1, -1, 0,0,0],
		[-1, 1, 1, 0,0,0],
		[-1, 1, -1, 0,0,0],
		
		[-1, 1, 1, 0,0,0],
		[1, 1, 1, 0,0,0],
		[1, 1, -1, 0,0,0],
		
		[-1, 1, 1, 0,0,0],
		[1, 1, -1, 0,0,0],
		[-1, 1, -1, 0,0,0],
		
		[1, -1, 1, 0,0,0],
		[-1, -1, -1, 0,0,0],
		[1, -1, -1, 0,0,0],
		
		[1, -1, 1, 0,0,0],
		[-1, -1, 1, 0,0,0],
		[-1, -1, -1, 0,0,0]
		
		];

	var ind2 = [ 0,1,2, 3,4,5, 6,7,8, 9,10,11, 12,13,14, 15,16,17, 18,19,20, 21,22,23, 24,25,26, 27,28,29, 30,31,32, 33,34,35 ];
	
	//I now loop through all the faces (each triangle) and compute its normal. Each vertex of the triangle
	// has assigned the normal of its face, without interference from the other faces.

	for(i=0; i<=33; i=i+3){

		var normal = compute_triangle_normal(vert2[i], vert2[i+1], vert2[i+2]);
		vert2[i][3] = normal[0];
		vert2[i][4] = normal[1];
		vert2[i][5] = normal[2]; 

		vert2[i+1][3] = normal[0];
		vert2[i+1][4] = normal[1];
		vert2[i+1][5] = normal[2]; 

		vert2[i+2][3] = normal[0];
		vert2[i+2][4] = normal[1];
		vert2[i+2][5] = normal[2]; 
	}
	
	var color2 = [0.0, 1.0, 1.0];
	addMesh(vert2, ind2, color2);

	//**********************************************************************//

	// Draws function y = sin(x) * cos(z) with -3 <= x <= 3 and -3 <= z <= 3 -- To do for the assignment.
	var d = 0;
	var y = 0;
	vert3 = [];

	for(z = -3; z <= 3; z++) {
		for(x = -3; x <= 3; x++) {
			
			y = Math.sin(x) * Math.cos(z);
			//Here for each vertex the normal is initialized at 0
			vert3[d] = [x, y, z, 0, 0, 0];
			d++
		}
	}

	//Creates indices as a triangle list
	ind3 = [];
	var j = 0;
	var i = 0;

	for(i = 0; i<=5; i++){

		for(k = 0; k<=5; k++){

			ind3[j] = (i*7)+k+8;
			j++;
			ind3[j] = (i*7)+k+1;
			j++;
			ind3[j] = (i*7)+k;
			j++;

			//Here is the computation of the normal to the face:
			var veca = [vert3[(i*7)+k+8][0], vert3[(i*7)+k+8][1], vert3[(i*7)+k+8][2] ];
			var vecb = [vert3[(i*7)+k+1][0], vert3[(i*7)+k+1][1], vert3[(i*7)+k+1][2] ];
			var vecc = [vert3[(i*7)+k][0], vert3[(i*7)+k][1], vert3[(i*7)+k][2] ];

			vec1 = sub(vecb, veca);
			vec2 = sub(vecc, veca);

			var nvec = cross(vec1, vec2);
			nvec = normalize(nvec);
			
			//Now I have to assign the normal to each vertex of the face:
			vert3[(i*7)+k+8][3] = vert3[(i*7)+k+8][3] + nvec[0];
			vert3[(i*7)+k+8][4] = vert3[(i*7)+k+8][4] + nvec[1];
			vert3[(i*7)+k+8][5] = vert3[(i*7)+k+8][5] + nvec[2];

			vert3[(i*7)+k+1][3] = vert3[(i*7)+k+1][3] + nvec[0];
			vert3[(i*7)+k+1][4] = vert3[(i*7)+k+1][4] + nvec[1];
			vert3[(i*7)+k+1][5] = vert3[(i*7)+k+1][5] + nvec[2];

			vert3[(i*7)+k][3] = vert3[(i*7)+k][3] + nvec[0];
			vert3[(i*7)+k][4] = vert3[(i*7)+k][4] + nvec[1];
			vert3[(i*7)+k][5] = vert3[(i*7)+k][5] + nvec[2];

			//Now I have to normalize each vertex normal and reassign it
			vertn1 = [ vert3[(i*7)+k+8][3], vert3[(i*7)+k+8][4], vert3[(i*7)+k+8][5]];
			vertn1 = normalize(vertn1);
			vert3[(i*7)+k+8][3] = vertn1[0];
			vert3[(i*7)+k+8][4] = vertn1[1];
			vert3[(i*7)+k+8][5] = vertn1[2];
                               
			vertn2 = [ vert3[(i*7)+k+1][3], vert3[(i*7)+k+1][4], vert3[(i*7)+k+1][5]];
			vertn2 = normalize(vertn2);
			vert3[(i*7)+k+1][3] = vertn2[0];
			vert3[(i*7)+k+1][4] = vertn2[1];
			vert3[(i*7)+k+1][5] = vertn2[2];

			vertn3 = [ vert3[(i*7)+k][3], vert3[(i*7)+k][4], vert3[(i*7)+k][5]];
			vertn3 = normalize(vertn3);
			vert3[(i*7)+k][3] = vertn3[0];
			vert3[(i*7)+k][4] = vertn3[1];
			vert3[(i*7)+k][5] = vertn3[2];


			//////////////////////////////////////////////////////////////////7
			ind3[j] = (i*7)+k+7;
			j++;
			ind3[j] = (i*7)+k+8;
			j++;
			ind3[j] = (i*7)+k;
			j++;

			//Vertex normals of the second face:

			//Here is the computation of the normal to the face:
			veca = [vert3[(i*7)+k+7][0], vert3[(i*7)+k+7][1], vert3[(i*7)+k+7][2] ];
			vecb = [vert3[(i*7)+k+8][0], vert3[(i*7)+k+8][1], vert3[(i*7)+k+8][2] ];
			vecc = [vert3[(i*7)+k][0], vert3[(i*7)+k][1], vert3[(i*7)+k][2] ];

			vec1 = sub(vecb, veca);
			vec2 = sub(vecc, veca);

			nvec = cross(vec1, vec2);
			nvec = normalize(nvec);
			
			//Now I have to assign the normal to each vertex of the face:
			vert3[(i*7)+k+7][3] = vert3[(i*7)+k+7][3] + nvec[0];
			vert3[(i*7)+k+7][4] = vert3[(i*7)+k+7][4] + nvec[1];
			vert3[(i*7)+k+7][5] = vert3[(i*7)+k+7][5] + nvec[2];

			vert3[(i*7)+k+8][3] = vert3[(i*7)+k+8][3] + nvec[0];
			vert3[(i*7)+k+8][4] = vert3[(i*7)+k+8][4] + nvec[1];
			vert3[(i*7)+k+8][5] = vert3[(i*7)+k+8][5] + nvec[2];

			vert3[(i*7)+k][3] = vert3[(i*7)+k][3] + nvec[0];
			vert3[(i*7)+k][4] = vert3[(i*7)+k][4] + nvec[1];
			vert3[(i*7)+k][5] = vert3[(i*7)+k][5] + nvec[2];

			//Now I have to normalize each vertex normal and reassign it
			vertn1 = [ vert3[(i*7)+k+7][3], vert3[(i*7)+k+7][4], vert3[(i*7)+k+7][5]];
			vertn1 = normalize(vertn1);
			vert3[(i*7)+k+7][3] = vertn1[0];
			vert3[(i*7)+k+7][4] = vertn1[1];
			vert3[(i*7)+k+7][5] = vertn1[2];
                               
			vertn2 = [ vert3[(i*7)+k+8][3], vert3[(i*7)+k+8][4], vert3[(i*7)+k+8][5]];
			vertn2 = normalize(vertn2);
			vert3[(i*7)+k+8][3] = vertn2[0];
			vert3[(i*7)+k+8][4] = vertn2[1];
			vert3[(i*7)+k+8][5] = vertn2[2];

			vertn3 = [ vert3[(i*7)+k][3], vert3[(i*7)+k][4], vert3[(i*7)+k][5]];
			vertn3 = normalize(vertn3);
			vert3[(i*7)+k][3] = vertn3[0];
			vert3[(i*7)+k][4] = vertn3[1];
			vert3[(i*7)+k][5] = vertn3[2];


		}
	}

	color3 = [0.0, 0.5, 1.0];
	addMesh(vert3, ind3, color3);

	/*************************************************************************/
	
	// Draws a Cylinder --- To do for the assignment
	var R = 2.0;
	var h = 4.0;

	var vert4 = [[0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, h, 0.0, 0.0, 0.0]];
	var ind4 = [];
	var color4 = [1.0, 1.0, 0.0];

	var center =[0.0, 0.0, 0.0];

	// I will now build algotirhmically the cylinder.

	var slices = 40;
	var step = (2*Math.PI) / slices;
	var j=2;


	for(i = 0; i<2*Math.PI; i = i + step){

		// At first I generate the vertices for the two circular basis.
		vert4[j] = [R*Math.sin(i), R*Math.cos(i), 0.0, 0.0, 0.0, 0.0];
		vert4[j+slices] = [R*Math.sin(i), R*Math.cos(i), h, 0.0, 0.0, 0.0];
		j++;

		// From the second iteration, I add both the indexing for the triangles on the basis and for the triangles of the sides:
		if (j>2 && j<slices+2){

			ind4.push(0,j-1,j);
			ind4.push(1, j+slices, (j-1)+slices);

			ind4.push(j, j-1, (j-1)+slices);
			ind4.push((j-1)+slices, j+slices, j);

		}



		//This is needed to add the last triangle, in order to connect it to the initial one and not to leave "holes" in the structure.
		if(j == slices+2){


			//This connects the last vertex to the initial one (the one with index 2, since indexes 0 and 1 contain the centres).
			ind4.push(0, j-1, 2);
			ind4.push(1,2+slices, (j-1)+slices);

			// Same but for the other basis.
			ind4.push(2, (j-1), (j-1)+slices);
			ind4.push((j-1)+slices, 2+slices, 2);

		}
	}


	//Now I will have to compute vertex normals with an algorithm I designed.

	var triangles = (ind4.length) / 3;

	for(i=0; i<vert4.length; i++){

		// For each vertex I loop through all the triangles, and, if a triangle has the i-th vertex, I compute the normal of the triangle.
		// Then I sum the value of the triangle normal to the already existing one of the vertex. The latter is weighted with "shares", in order to
		// keep track of the number of triangles that share that vertex and obtain an accurate value.
		var shares = 0;

		for(j=0; j<triangles; j++){

			var triangle_vertices = [ind4[(j*3)], ind4[(j*3)+1], ind4[(j*3)+2]];

			if(triangle_vertices.includes(i)){

				//If a triangle uses the i-th vertex, I compute the normal of the triangle:
				var normal = compute_triangle_normal(vert4[triangle_vertices[0]], vert4[triangle_vertices[1]], vert4[triangle_vertices[2]]);
				normal = normalize(normal);

				//console.log(normal);

				var vertex_normal = [0.0, 0.0, 0.0];

				// I weight the existing vertex normal with "shares" and I add the newly computed triangle normal
				vertex_normal[0] = vert4[i][3]*shares + normal[0];
				vertex_normal[1] = vert4[i][4]*shares + normal[1];
				vertex_normal[2] = vert4[i][5]*shares + normal[2];

				// I normalize the new normal
				vertex_normal = normalize(vertex_normal);

				// I assign it to the vertex:
				vert4[i][3] = vertex_normal[0];
				vert4[i][4] = vertex_normal[1];
				vert4[i][5] = vertex_normal[2];
				
				// I increment "shares" because now there is another triangle that shares the i-th vertex.
				shares++;


			}
			

		}

	}

	addMesh(vert4, ind4, color4);

	/*************************************************************************/

	// Draws a Sphere --- To do for the assignment.
	//Here I create the Sphere object in order to build a sphere with an algorithm.
	var sphere = {
		vert: [0,0,0],
		ind: [0,0,0],
	}

	sphere = buildSphere(sphere);

	var vert5 = sphere.vert;
	var ind5 = sphere.ind;
	//console.log(ind5);

	//Now we have to compute the normal for each vertex. This is quite easy, since the normal for each vertex is in the same direction
	// that points to the center of the sphere. The normal direction is the same position of the point, since the center is in 0,0,0 and
	// the radius of the sphere is 1.

	for(i=0; i<vert5.length; i++){


		vert5[i][3] = vert5[i][0];
		vert5[i][4] = vert5[i][1];
		vert5[i][5] = vert5[i][2];

	}

	var color5 = [0.0, 0.5, 0.3];
	addMesh(vert5, ind5, color5);
}
