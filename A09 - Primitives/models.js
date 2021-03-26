function buildGeometry() {
	var i;
	
	// Draws the outline of letter F (replace the vertices and primitive type)
	var vert1 = [[0,0,0], [0,6,0], [4,6,0], [4,5,0], [1,5,0], [1,4,0], [4,4,0], [4,3,0], [1,3,0], [1,0,0]];

	addMesh(vert1, "O", [1.0, 0.0, 0.0]);


	// Draws a filled S-shaped pattern (replace the vertices and primitive type)
	var vert2 = [
			
		[0,1,0], 
		[0,0,0],
		[4,1,0],

		[0,0,0],
		[5,0,0],
		[4,1,0],

		[5,0,0],
		[4,1,0],
		[5,3,0],

		[4,1,0],
		[4,2,0],
		[5,3,0],

		[0,2,0],
		[4,2,0],
		[5,3,0],

		[0,2,0],
		[5,3,0],
		[1,3,0],

		[0,2,0],
		[1,3,0],
		[0,5,0],

		[0,5,0],
		[1,3,0],
		[1,4,0],

		[0,5,0],
		[1,4,0],
		[5,5,0],

		[1,4,0],
		[5,5,0],
		[5,4,0]
	

	];

	addMesh(vert2, "T", [0.0, 0.0, 1.0]);


	// Draws a filled pentacong (replace the vertices and primitive type)
	var vert3 = [[0,0,0], [-3, 6, 0], [3,12,0], [9,6,0], [6,0,0]];

	addMesh(vert3, "F", [0.0, 1.0, 0.0]);
	
}

