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
	
	// Draws a cube -- To do for the assignment.

	// Here each triangle that makes the cube is considered with independent vertices. This means that
	// vertices are duplicated, and each face is made of single triangles. This allows us to have a different
	// lighting for each face without smoothing effect.

	var vert2 = [

		//Face with 5 dots
		[-1, -1, 1, 0,0,0, 0.125, 0.5], 
		[1, -1, 1, 0,0,0, 0.25, 0.5],
		[1, 1, 1, 0,0,0, 0.25, 0.625],
		
		[-1, -1, 1, 0,0,0, 0.125, 0.5],
		[1, 1, 1, 0,0,0, 0.25, 0.625],
		[-1, 1, 1, 0,0,0, 0.125, 0.625],
		
		//Face with 4 dots
		[1, -1, 1, 0,0,0, 0.375, 0.625],
		[1, -1, -1, 0,0,0, 0.375, 0.75],
		[1, 1, -1, 0,0,0, 0.25, 0.75],
		
		[1, -1, 1, 0,0,0, 0.375, 0.625],
		[1, 1, -1, 0,0,0, 0.25, 0.75],
		[1, 1, 1, 0,0,0, 0.25, 0.625],
		
		//Face with 2 dots
		[1, -1, -1, 0,0,0, 0.25, 0.875],
		[-1, -1, -1, 0,0,0, 0.125, 0.875],
		[-1, 1, -1, 0,0,0, 0.125, 0.75],
		
		[1, -1, -1, 0,0,0, 0.25, 0.875],
		[-1, 1, -1, 0,0,0, 0.125, 0.75],
		[1, 1, -1, 0,0,0, 0.25, 0.75],

		//Face with 3 dots
		[-1, -1, -1, 0,0,0, 0.0, 0.75],
		[-1, -1, 1, 0,0,0, 0.0, 0.625],
		[-1, 1, 1, 0,0,0, 0.125, 0.625],
		
		[-1, -1, -1, 0,0,0, 0.0, 0.75],
		[-1, 1, 1, 0,0,0, 0.125, 0.625],
		[-1, 1, -1, 0,0,0, 0.125, 0.75],

		//Face with 6 dots
		
		[-1, 1, 1, 0,0,0, 0.125, 0.625],
		[1, 1, 1, 0,0,0, 0.25, 0.625],
		[1, 1, -1, 0,0,0, 0.25, 0.75],
		
		[-1, 1, 1, 0,0,0, 0.125, 0.625],
		[1, 1, -1, 0,0,0, 0.25, 0.75],
		[-1, 1, -1, 0,0,0, 0.125, 0.75],
		
		//Face with 1 dot

		[1, -1, 1, 0,0,0, 0.25, 1.0],
		[-1, -1, -1, 0,0,0, 0.125, 0.875],
		[1, -1, -1, 0,0,0, 0.25, 0.875],
		
		[1, -1, 1, 0,0,0, 0.25, 1.0],
		[-1, -1, 1, 0,0,0, 0.125, 1.0],
		[-1, -1, -1, 0,0,0, 0.125, 0.875]
		
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
	
	var color2 = [0.0, 0.5, 1.0];

    var cube = {
        vert: [0,0,0],
        ind: [0,0,0],
    }

	cube.vert = vert2;
    cube.ind = ind2;

    function createCube(){
        return cube;
    }

	////////////////////////////////////////////////////////////////////////////////////////////////////

	// Draws a Cylinder --- To do for the assignment.
	// WARNING: this code is quite a mess but the result is achieved.

	//Radius and height of the cylinder
	var R = 1.0;
	var h = 4.0;

	//How many triangles form the bases and the sides:
	var slices = 40;
	var step = (2*Math.PI) / slices;

	//The cylinder will be built in two different phases: firstly the sides and then the two circular bases.
	//Let's start from the sides:
	var vert4 = [];
	var ind4 = [];
	var color4 = [1.0, 1.0, 0.0];

	//For the textures of the sides: since the texure has a length of 0.5 it is divided in slices according to the number of triangles.
	var texturestep = 0.5/slices;
	var u_sideUp = 1.0;
	var u_sideDown = 1.0;

	var j=0; //index in the array of vertices

	for(i = 0; i<2*Math.PI; i = i + step, j++, u_sideUp = u_sideUp - texturestep, u_sideDown = u_sideDown - texturestep){

		//A note: here the variable u goes from 1.0 progressively to 0.5 by subtracting texturestep. If you wrap the texture around the
		//cylinder starting instead from 0.5 and increasing until 1.0 (following the direction of the u axis) the texture turns out mirrored.

		//I build vertices using sin and cos, both from the upper edge and for the lower edge:
		vert4[j] = [R*Math.sin(i), R*Math.cos(i), 0.0, 0.0, 0.0, 0.0, u_sideDown, 0.5];
		vert4[j+slices] = [R*Math.sin(i), R*Math.cos(i), h, 0.0, 0.0, 0.0, u_sideUp, 0.75];

		//When I have enough vertices to start building the triangles, I add the indexes to the array:
		if(j>0){

			ind4.push(j, j-1, (j-1)+slices);
			ind4.push(j, (j-1)+slices, j+slices);

		}

		// This closes the last "hole" in order to have the complete sides:
		if(j==slices-1){

			ind4.push(0, j, j+slices);
			ind4.push(0, j+slices, j+1);

		}


	}


	//Now I will have to compute vertex normals with an algorithm I designed.

	//This is the number of triangles the sides have.
	var triangles = (ind4.length) / 3;

	
	for(i=0; i<vert4.length; i++){

		// For each vertex I loop through all the triangles, and, if a triangle has the i-th vertex, I compute the normal of the triangle.
		// Then I sum the value of the triangle normal to the already existing one of the vertex. The latter is weighted with "shares", in order to
		// keep track of the number of triangles that share that vertex and obtain an accurate value.

		var shares = 0;

		//I loop on the triangles and for each triangle I retrieve the vertices.
		for(j=0; j<triangles; j++){

			var triangle_vertices = [ind4[(j*3)], ind4[(j*3)+1], ind4[(j*3)+2]];

			if(triangle_vertices.includes(i)){

				//If a triangle uses the i-th vertex, I compute the normal of the triangle:
				var normal = compute_triangle_normal(vert4[triangle_vertices[0]], vert4[triangle_vertices[1]], vert4[triangle_vertices[2]]);
				normal = normalize(normal);

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



	//Next thing to do is to add to the vertices array the two bases built as independent discs. I follow exactly the same algorithm as
	//before, but here only the bases are built.
	var vert4t = []
	var ind4t = [];
	j = 0;

	//These are the centres of the two bases. Notice that their uv coordinates are already the ones of the center of the circular textures.
	vert4t[j] =  [0.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.875, 0.875];
	vert4t[j+(slices+1)] = [0.0, 0.0, h, 0.0, 0.0, 1.0, 0.625, 0.875];

	j = 1; //Index in the array of vertices

	for(i = 0; i<2*Math.PI; i = i + step, j++){

		// At first I generate the uv coordinates for each vertices. They simply follow the circles of the textures as given by the Professor.
		u_baseUp = (0.125 * Math.cos(i)) + 0.625;
		v_baseUp = (0.125* Math.sin(i)) + 0.875;

		u_baseDown = (0.125 * Math.cos(i)) + 0.875;
		v_baseDown = (0.125* Math.sin(i)) + 0.875;

		// This is the generation of the vertices. Notice that the normals here are fixed at -1 and 1.
		vert4t[j] = [R*Math.sin(i), R*Math.cos(i), 0.0, 0.0, 0.0, -1.0, u_baseDown, v_baseDown];
		vert4t[j+(slices+1)] = [R*Math.sin(i), R*Math.cos(i), h, 0.0, 0.0, 1.0, u_baseUp, v_baseUp];


		// From the second iteration, I have enough points to start the indexing for the triangles on the basis:
		if (j>1 && j<=slices){

			ind4t.push(j, 0, j-1);
			ind4t.push(j+1+slices, j+slices, slices+1);

		}

		//This is needed to add the last triangle, in order to connect it to the initial one and not to leave "holes" in the structure.
		if(j == slices){

			ind4t.push(0, j-1, 1);
			ind4t.push(slices+1, slices+2, slices+j);

		}


	}



	//Now I append the new vertices array to the old one. In order to make the mesh work correctly, I will have to rescale the values of 
	//the indices array for the basis: since I am merging two vertices arrays, each with its independent index array, I have to correct the index array
	//of the appended vertices array in order to make everything match.

	var index_correction_factor = vert4.length;

	vert4 = vert4.concat(vert4t);

	for(i=0; i<ind4t.length; i++){

		ind4t[i] = ind4t[i] + index_correction_factor;

	}

	ind4 = ind4.concat(ind4t);

	//Now it is done.

	var cylinder = {
		vert: vert4,
		ind: ind4,
	}

	function buildCylinder(){
		return cylinder;
	}