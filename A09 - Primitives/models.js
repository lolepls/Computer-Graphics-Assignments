function buildGeometry() {
	var i;
	
	// Draws the outline of letter F (replace the vertices and primitive type)
	var vert1 = [[-1.0,-1.0,-1.0], [1.0,-1.0,-1.0], [0.0,1.0,0.0], [-1.0,-1.0, 1.0]];

	addMesh(vert1, "L", [1.0, 0.0, 0.0]);


	// Draws a filled S-shaped pattern (replace the vertices and primitive type)
	var vert2 = [[-1.0,-1.0,-1.0], [1.0,-1.0,-1.0], [1.0, 1.0,-1.0], [-1.0, 1.0,-1.0]];

	addMesh(vert2, "F", [0.0, 0.0, 1.0]);


	// Draws a filled pentacong (replace the vertices and primitive type)
	var vert3 = [[-1.0,-1.0, 1.0], [1.0,-1.0, 1.0], [1.0,1.0, 1.0], [-1.0,1.0, 1.0], [0.0,1.5, 1.0], [2.0, 1.0, 0.0]];

	addMesh(vert3, "T", [0.0, 1.0, 0.0]);
	
}

