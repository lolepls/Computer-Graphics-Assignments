function buildGeometry() {
	

/*
In order to create the requested shape, first we design a grid on the xz plane and the we assign the correct y to each vertex.
*/
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

	//Creates indices as a triangle list
	var ind2 = [];
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


	//////////////////////////////////////Half Sphere //////////////////////////////////////////////////
	


	//Normalizes a vector
	function normalize(vector){

		var norm = Math.sqrt(vector[0]**2 + vector[1]**2 + vector[2]**2);
		var result = [vector[0]/norm, vector[1]/norm, vector[2]/norm];
		console.log("Il vettore normalizzato in normalize è " + result);
		return result;

	}

	//Find the middle point of the segment with vertices vector1 and vector2.
	function middlepoint(vector1, vector2){

		var result = [
			(vector1[0]+vector2[0])/2,
			(vector1[1]+vector2[1])/2, 
			(vector1[2]+vector2[2])/2,
		];

		return result;

	}

	/*
	In order to create a semisphere, the chosen approach is to start from a pyramid (which is an half octahedron)
	and then we recursively split each face in 4 other faces by computing the middle point of each edge. Then we push away from the center the new vertices
	in order to let them lay on the unit sphere. The important thing is to keep the right order for the vertices in the index vector, so that
	the rendering is correct and there are no issues given by Backface Culling.
	*/

	var vert3 = [];
	var ind3 = [];

	//Let's start by creating an octahedron with the bottom vertex in the origin (a pyramid):

	vert3 = [

		[0,0,0], [1,0,0], //If you change the first element into [0, -1, 0] you will get a sphere.
		[0,0,1], [-1,0,0],
		[0,0,-1], [0,1,0]

	]

	ind3 = [  //All the triangles have the vertices specified in clockwise order.
		0,1,2,
		0,2,3,
		0,3,4,
		0,4,1,
		1,5,2,
		2,5,3,
		3,5,4,
		4,5,1,
	]

	//Now we have to recursively split the edges and normalize the distance of the points:
	var iterations = 5; //Leave this reasonably low (4 or 5) or the algorithm will take too much time

	
	for(i=0; i<iterations; i++){ //For each iteration, we split each face of the pyramid into 4 more faces

		var newVert3 = [];
		var newInd3 = [];
		var d = 0;
		var k = 0;
		var faces = ind3.length / 3;

		for(j=0; j<faces; j++){  //This is the algorithm that split the single face. It is repeated for each face.

			console.log("Inizio calcolo faccia numero " + j);

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

			/*
			//Debug messages
			console.log("il punto medio 01 è " + midpoint_01);
			console.log("il punto medio 02 è " + midpoint_02);
			console.log("il punto medio 12 è " + midpoint_12);
			*/

			//I normalize the distance of each point by using a custom function
			midpoint_01 = normalize(midpoint_01);
			midpoint_02 = normalize(midpoint_02);
			midpoint_12 = normalize(midpoint_12);

			/*
			//Debug messages
			console.log("il punto medio 01 è " + midpoint_01);
			console.log("il punto medio 02 è " + midpoint_02);
			console.log("il punto medio 12 è " + midpoint_12);
			*/

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

			newInd3[k+3] = d+3; //midpoint_01
			newInd3[k+4] = d+1; //vertex1
			newInd3[k+5] = d+5; //midpoint_12

			newInd3[k+6] = d+4; //midpoint_02
			newInd3[k+7] = d+5; //midpoint_12
			newInd3[k+8] = d+2; //vertex2

			newInd3[k+9] = d+3; //midpoint_01
			newInd3[k+10] = d+5; //midpoint_12
			newInd3[k+11] = d+4;//midpoint_02
			
			//Increment of indexes used in the arrays:
			k = k+12;
			d = d+6;
		}

		//When all the faces are completed, the result is treated as a new polyhedron.
		vert3 = newVert3;
		ind3 = newInd3;

	}




	/*
	//Debug messages
	console.log(vert3);
	console.log(newInd3);
	*/
	
	var color3 = [0.0, 1.0, 0.0];
	addMesh(vert3, ind3, color3);
}

