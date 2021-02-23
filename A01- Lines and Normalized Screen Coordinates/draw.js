function draw() {

/*
This section simply draws the horizontal lines and the vertical one.
*/
	line(-0.5, 0.3,-0.5,-0.3);
	line(-0.5, 0.3,0.3, 0.3);
	line(-0.5, -0.3, 0.3,-0.3);

/*
Now let's start drawing the half circle. We need to approximate it with 64 straight lines: so we have to find 64 points 
that lay on the half circle and we need to connect them with a line. Since we have to cover an angle of pi (from -pi/2 to pi/2), each point will have 
an angular distance from its neighbors of pi/64. 
*/

	var pi = Math.PI;
	var step = pi/64; 

//Now we specify a starting angle and the values for the polar representation of the circle.
  
	var angle = -pi/2;  //The starting angle
	var radius = 3/10;  //The radius of the circle
	var x_center = 0.3; //Coordinates of the center
	var y_center = 0;

//For each couple of points we get the coordinates and we draw the line connecting them.

	for(i=0; i<64; i++){

		var p1_x = radius*(Math.cos(angle)) + x_center;
		var p1_y = radius*(Math.sin(angle)) + y_center;

		angle = angle + step;

		var p2_x = radius*(Math.cos(angle)) + x_center;
		var p2_y = radius*(Math.sin(angle)) + y_center;

		line(p1_x, p1_y, p2_x, p2_y);

	}
	

}
