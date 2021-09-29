/*
Notes and explanation:

The information about the rotation of the various parts can be found, at any time, in the values of the
elements of S. In particular:

S[i] = index of the i-th element

S[i][0] = x-translation
S[i][1] = y-translation
S[i][2] = z-translation

S[i][3] = x-rotation
S[i][4] = y-rotation
S[i][5] = z-rotation

S[i][6] = index of the first child of the i-th node
S[i][7] = index of the last child of the i-th node.

If a node does not have any children (he is a leaf), the latter two values are set to -1.

NOTE:
A better version of the algorithm can be obtained by implemented an automatic tree traversing. This version
uses a hardcoded list of nodes, one for each finger, in order to perform the computation. This is feasible 
since the number of elements is small and the specification was clear, but in more complex models this is
not the right approach.

*/


var nodesQueue = [[5, 10], [1, 6, 11], [2, 7, 12], [3, 8, 13], [4, 9, 14]];

function buildMatrix(e){

	var transformMatrix = utils.MakeTranslateMatrix(e[0], e[1], e[2]);
	transformMatrix = utils.multiplyMatrices(transformMatrix, utils.MakeRotateXMatrix(e[3]));
	transformMatrix = utils.multiplyMatrices(transformMatrix, utils.MakeRotateYMatrix(e[4]));
	transformMatrix = utils.multiplyMatrices(transformMatrix, utils.MakeRotateZMatrix(e[5]));
	
	return transformMatrix;
}


function drawSceneTree(S) {

	var i = 0;

	var parentMatrix = buildMatrix(S[0]);
	draw(0, parentMatrix);

	for(i=0; i<5; i++){

		stackHierarchy(S, parentMatrix, i);
	}

}


function stackHierarchy(S, parentMatrix, finger){


	var i = 0;

	for(i = 0; i < nodesQueue[finger].length; i++){

		var nodeIndex = nodesQueue[finger][i];
		var childMatrix = utils.multiplyMatrices(parentMatrix, buildMatrix(S[nodeIndex]));
		draw(nodeIndex, childMatrix);
		parentMatrix = childMatrix;

	}


}