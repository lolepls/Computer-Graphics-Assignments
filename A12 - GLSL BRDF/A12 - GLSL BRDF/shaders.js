function shaders() {
// The shader can find the required informations in the following variables:

//vec3 fs_pos;		// Position of the point in 3D space
//
//float SpecShine;		// specular coefficient for both Blinn and Phong
//float DToonTh;		// Threshold for diffuse in a toon shader
//float SToonTh;		// Threshold for specular in a toon shader
//
//vec4 diffColor;		// diffuse color
//vec4 ambColor;		// material ambient color
//vec4 specularColor;		// specular color
//vec4 emit;			// emitted color
//	
//vec3 normalVec;		// direction of the normal vecotr to the surface
//vec3 eyedirVec;		// looking direction
//
//
// Lighr directions can be found into:
//vec3 lightDirA;
//vec3 lightDirB;
//vec3 lightDirC;
//
//and intensity is returned into:
//
//vec4 lightColorA;
//vec4 lightColorB;
//vec4 lightColorC;
//
// Ambient light contribution can be found intop
//
// vec4 ambientLight;

// Lambert diffuse and Ambient material. No specular or emisssion.
var S1 = `
//fr function: for each light
	vec4 LAcontr = clamp(dot(lightDirA, normalVec),0.0,1.0) * lightColorA;
	vec4 LBcontr = clamp(dot(lightDirB, normalVec),0.0,1.0) * lightColorB;
	vec4 LCcontr = clamp(dot(lightDirC, normalVec),0.0,1.0) * lightColorC;
//
	out_color = clamp(diffColor * (LAcontr + LBcontr + LCcontr) + ambientLight * ambColor, 0.0, 1.0);
`;

// Lambert diffuse and Blinn specular. No ambient and emission.
var S2 = `
//Lambert diffuse

    vec4 LAcontr = clamp(dot(lightDirA, normalVec),0.0,1.0) * lightColorA;
	vec4 LBcontr = clamp(dot(lightDirB, normalVec),0.0,1.0) * lightColorB;
	vec4 LCcontr = clamp(dot(lightDirC, normalVec),0.0,1.0) * lightColorC;
	vec4 lambertDiff = LAcontr + LBcontr + LCcontr;

//Blinn specular:

	//Light A
	float LNA = dot(normalVec, lightDirA);
	vec4 LScolorA = lightColorA * specularColor;
	vec3 normA = normalize(lightDirA + eyedirVec);
	float HNA = max(dot(normalVec, normA), 0.0);

	//Light B
	float LNB = dot(normalVec, lightDirB);
	vec4 LScolorB = lightColorB * specularColor;
	vec3 normB = normalize(lightDirB + eyedirVec);
	float HNB = max(dot(normalVec, normB), 0.0);

	//Light C
	float LNC = dot(normalVec, lightDirC);
	vec4 LScolorC = lightColorC * specularColor;
	vec3 normC = normalize(lightDirC + eyedirVec);
	float HNC = max(dot(normalVec, normC), 0.0);

	vec4 blinnSpec = LScolorA * pow(HNA , SpecShine) + 
					 LScolorB * pow(HNB, SpecShine) + 
					 LScolorC * pow(HNC, SpecShine);


//Out computation
	out_color = clamp(diffColor * (lambertDiff) + specularColor * (blinnSpec), 0.0, 1.0);
`;

// Ambient and Phong specular. No emssion and no diffuse.
var S3 = `
	//Phong specular light A:
	vec4 LScolorA = lightColorA * specularColor;
	vec3 reflA = -reflect(lightDirA, normalVec);
	float LRA = max(dot(reflA, eyedirVec), 0.0);

	//Phong specular light B:
	vec4 LScolorB = lightColorB * specularColor;
	vec3 reflB = -reflect(lightDirB, normalVec);
	float LRB = max(dot(reflB, eyedirVec), 0.0);

	//Phong specular light C:
	vec4 LScolorC = lightColorC * specularColor;
	vec3 reflC = -reflect(lightDirC, normalVec);
	float LRC = max(dot(reflC, eyedirVec), 0.0);

	vec4 phongSpec = LScolorA * pow(LRA, SpecShine) + 
					 LScolorB * pow(LRB, SpecShine) + 
					 LScolorB * pow(LRC, SpecShine);

	out_color =  clamp(ambientLight * ambColor + specularColor * (phongSpec), 0.0, 1.0);
`;

// Diffuse, ambient, emission and Phong specular.
var S4 = `

//Here I implemented Lambert Diffusion:

vec4 LAcontr = clamp(dot(lightDirA, normalVec),0.0,1.0) * lightColorA;
vec4 LBcontr = clamp(dot(lightDirB, normalVec),0.0,1.0) * lightColorB;
vec4 LCcontr = clamp(dot(lightDirC, normalVec),0.0,1.0) * lightColorC;
vec4 lambertDiff = LAcontr + LBcontr + LCcontr;

	//Phong specular light A:
	vec4 LScolorA = lightColorA * specularColor;
	vec3 reflA = -reflect(lightDirA, normalVec);
	float LRA = max(dot(reflA, eyedirVec), 0.0);

	//Phong specular light B:
	vec4 LScolorB = lightColorB * specularColor;
	vec3 reflB = -reflect(lightDirB, normalVec);
	float LRB = max(dot(reflB, eyedirVec), 0.0);

	//Phong specular light C:
	vec4 LScolorC = lightColorC * specularColor;
	vec3 reflC = -reflect(lightDirC, normalVec);
	float LRC = max(dot(reflC, eyedirVec), 0.0);

	vec4 phongSpec = LScolorA * pow(LRA, SpecShine) + 
					 LScolorB * pow(LRB, SpecShine) + 
					 LScolorB * pow(LRC, SpecShine);

	out_color = clamp(ambientLight * ambColor + specularColor * (phongSpec) + emit + diffColor * lambertDiff, 0.0, 1.0);
`;

// Ambient, Toon diffuse and and Toon (Blinn based) specular. No emssion.
var S5 = `

//Toon diffuse A:
	float LNA = dot(normalVec, lightDirA);
	vec4 LDcolA = lightColorA * diffColor;
	vec4 toonDiffA = max(sign(LNA - DToonTh),0.0) * LDcolA;

//Toon diffuse B:
	float LNB = dot(normalVec, lightDirB);
	vec4 LDcolB = lightColorB * diffColor;
	vec4 toonDiffB = max(sign(LNB - DToonTh),0.0) * LDcolB;

//Toon diffuse C:
	float LNC = dot(normalVec, lightDirC);
	vec4 LDcolC = lightColorC * diffColor;
	vec4 toonDiffC = max(sign(LNC - DToonTh),0.0) * LDcolC;

vec4 toonDiff = toonDiffA + toonDiffB + toonDiffC;

//Toon Blinn spec A
	
	vec4 LScolorA = lightColorA * specularColor;
	vec3 normA = normalize(lightDirA + eyedirVec);
	float HNA = max(dot(normalVec, normA), 0.0);

	vec4 toonBlinnA = max(sign(HNA - SToonTh), 0.0) * LScolorA;

	//Toon Blinn spec B

	vec4 LScolorB = lightColorB * specularColor;
	vec3 normB = normalize(lightDirB + eyedirVec);
	float HNB = max(dot(normalVec, normB), 0.0);

	vec4 toonBlinnB = max(sign(HNB - SToonTh), 0.0) * LScolorB;

	//Toon Blinn spec C
	
	vec4 LScolorC = lightColorC * specularColor;
	vec3 normC = normalize(lightDirC + eyedirVec);
	float HNC = max(dot(normalVec, normC), 0.0);

	vec4 toonBlinnC = max(sign(HNC - SToonTh), 0.0) * LScolorC;

	vec4 toonBlinnSpec = toonBlinnA + toonBlinnB + toonBlinnC;

//Ambient:
	vec4 amb = ambientLight * ambColor;

out_color = clamp(amb + specularColor * (toonBlinnSpec) + diffColor * toonDiff, 0.0, 1.0);

`;

	return [S1, S2, S3, S4, S5];
}

