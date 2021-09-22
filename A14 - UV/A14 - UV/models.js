
function buildGeometry() {
	// Draws a pyramid --- To complete for the assignment. This is just the one in Assignment 13, where two 0.1, 0.1 UV components have been added to the vertices definitions. Such number must be replaced (differently for each vertexes), to obtain a proper Egyptian Pyramid
		var vert1 = [
			[0.0, 1.0, 0.0, 0.0, 0.4472,-0.8944, 0.875, 0.5],
			[1.0, -1.0, -1.0, 0.0, 0.4472,-0.8944, 0.75, 0.25],
			[-1.0, -1.0, -1.0, 0.0, 0.4472,-0.8944, 1.0, 0.25],

			[0.0, 1.0, 0.0, 0.8944, 0.4472,0.0, 0.625, 0.5],
			[ 1.0, -1.0, 1.0, 0.8944, 0.4472,0.0, 0.5, 0.25],
			[ 1.0, -1.0, -1.0, 0.8944, 0.4472,0.0, 0.75, 0.25], 

			[0.0, 1.0, 0.0, 0.0, 0.4472,0.8944, 0.625, 0.25],
			[-1.0, -1.0, 1.0, 0.0, 0.4472,0.8944, 0.5, 0.0],
			[ 1.0, -1.0, 1.0, 0.0, 0.4472,0.8944, 0.75, 0.0], 

			[0.0, 1.0, 0.0, -0.8944, 0.4472,0.0, 0.625, 0.5],
			[-1.0, -1.0, -1.0, -0.8944, 0.4472,0.0, 0.5, 0.25],
			[-1.0, -1.0, 1.0, -0.8944, 0.4472,0.0, 0.75, 0.25], 

			[-1.0, -1.0, -1.0, 0.0,-1.0,0.0, 0.75, 0.0],
			[1.0, -1.0, -1.0, 0.0,-1.0,0.0, 1.0, 0.0], 
			[1.0, -1.0, 1.0, 0.0,-1.0,0.0, 1.0, 0.25],

			[-1.0, -1.0, -1.0, 0.0,-1.0,0.0, 0.75,0.0],
			[1.0, -1.0, 1.0, 0.0,-1.0,0.0, 1.0,0.25],
			[-1.0, -1.0, 1.0, 0.0,-1.0,0.0, 0.75,0.25]
			

				];

	var ind1 = [0, 1, 2,  3, 4, 5,  6, 7, 8,  9, 10, 11,  12, 13, 14,  15, 16, 17];
	var color1 = [0.0, 0.0, 1.0];
	
	addMesh(vert1, ind1, color1);
	
	// Draws a cube -- To do for the assignment.
	//NOTE: The UV coordinates have been manually inserted into the generation of the cube. See meshes.js 
	//to check the values.
	
	var cube = createCube();
	vert2 = cube.vert;
	ind2 = cube.ind;
	var color2 = [0.0, 0.5, 0.5];
	addMesh(vert2, ind2, color2);
	
	
	// Draws a Cylinder --- To do for the assignment
	var cylinder = buildCylinder();
	vert3 = cylinder.vert;
	ind3 = cylinder.ind;
	var color3 = [0.0, 1.0, 1.0];
	addMesh(vert3, ind3, color3);
}