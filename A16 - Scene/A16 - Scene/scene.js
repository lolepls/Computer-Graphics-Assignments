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

In order to implement correctly the hierarchy, a stack structure will be used. First of all we will check 
if a node has children. If it has children, its world matrix is computed and then passed to the child 
in order to compute its own world matrix and so on.

*/

function drawSceneTree(S) {

	stackHierarchy(S, 0);

}

function stackHierarchy(S, i){

	// Cosa deve fare la funzione: implemenare una DFS sull'albero: la visita del nodo include la
	//moltiplicazione della matrice ereditata dal padre per quella del figlio.
	transformMatrix = utils.identityMatrix();

	// Base case: the node does not have children anymore
	if(S[i][6] == -1 & S[i][7] == -1){

		transformMatrix = utils.multiplyMatrices(transformMatrix, 
			utils.multiplyMatrices(utils.MakeTranslateMatrix(S[i][0], S[i][1], S[i][2]),
			utils.multiplyMatrices(utils.MakeRotateXMatrix)(S[i][3]),
			utils.multiplyMatrices(utils.MakeRotateYMatrix)(S[i][3]),
			utils.multiplyMatrices(utils.MakeRotateZMatrix)(S[i][3])));
			

	}


	//If the node has children:
	
	draw(i, transformMatrix);
}