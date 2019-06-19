//Get the sequence tab and its id
var jsonTab = localStorage.getItem("tabSeq");
var tabS = JSON.parse(jsonTab);
console.log("Tab in circular view: "+tabS);
        
var val = localStorage.getItem("val");
console.log("Tab index in circular view: "+tabS);

var crisprNb = tabS[val].Crisprs.length;
var crisprs = [];

var casSysNb = tabS[val].Cas.length;
var casSysTab = [];
var casGenTab = [];

//var genomeSize = Math.log(tabS[val].Length);
var ratio = 300;

for (var row = 0; row < crisprNb; row += 1) {

        var crisprID = tabS[val].Crisprs[row].Name.split("_");
        var idRow = parseInt(crisprID.pop());
	var crisprStrand = 0;
	if(tabS[val].Crisprs[row].CRISPRDirection === "+") {
		crisprStrand = 1;
	}
	if(tabS[val].Crisprs[row].CRISPRDirection === "-") {
		crisprStrand = -1;
	}
	console.log("CRISPR_"+idRow+" Strand = "+crisprStrand);
	
	var crispr = {
		chr:"CHR", 
		start:tabS[val].Crisprs[row].Start/ratio,
		end:tabS[val].Crisprs[row].End/ratio,
		color: getColorByIndex(idRow),
		des:"CRISPR_"+idRow+" ["+tabS[val].Crisprs[row].Start+"-"+tabS[val].Crisprs[row].End+"] (strand: "+tabS[val].Crisprs[row].CRISPRDirection+")", 
		//link: "table.html"
	};

        crisprs.push(crispr);
}

var indexCas = 0;
var indexCasGene = 0;
for (var r = 0; r < casSysNb; r += 1) {
        indexCas += 1;
        
        //check if a CRISPR array is close to this Cas Sys
	var closeCrisprId = 0;
	var closeCrisprId2 = 0;
        var tabDistances1 =[];
	var tabDistances2 =[];
	var tabIndexes = [];
	var tabIndexe2 = [];
	for (var cl = 0; cl < crisprNb; cl++) {

		if(tabS[val].Crisprs[cl].Start >= tabS[val].Cas[r].Start){
			closeCrisprId = parseInt(tabS[val].Crisprs[cl].Name.split("_").pop());
			var dist1 = tabS[val].Crisprs[cl].Start - tabS[val].Cas[r].End;
                        console.log("CRISPR ID loop 1 = "+closeCrisprId);
			tabIndexes.push(closeCrisprId);
			tabDistances1.push(dist1);
		}
            
	}
        tabDistances1[0] = Math.min.apply(null, tabDistances1);
        tabIndexes[0] = Math.min.apply(null, tabIndexes);
        console.log("closest Cr ID for loop1 = "+ tabIndexes[0]);
        
	for (var cl2 = crisprNb-1; cl2 >= 0; cl2--) {
		if(tabS[val].Crisprs[cl2].End < tabS[val].Cas[r].Start){
			
			closeCrisprId2 = parseInt(tabS[val].Crisprs[cl2].Name.split("_").pop());
			var dist2 = tabS[val].Cas[r].Start - tabS[val].Crisprs[cl2].End;
			//tabIndexes.push(closeCrisprId);
			tabDistances2.push(dist2);
			tabIndexe2.push(closeCrisprId2);
		}
	}
        //console.log("Lenght Tab dist1= "+tabDistances1.length + " , Length Tab dist2 = "+tabDistances2.length);
        tabDistances2[0] = Math.min.apply(null, tabDistances2);
        tabIndexe2[0] = Math.max.apply(null, tabIndexe2);
        console.log("closest Cr ID for loop2 = "+ tabIndexe2[0]);
        
	console.log("For Cas Type="+tabS[val].Cas[r].Type+" , Tab distances = "+tabDistances1[0] +" , 2="+ tabDistances2[0]);
		

	if(tabDistances1[0] < tabDistances2[0]){
		closeCrisprId = tabIndexes[0];
	}
	else{
		closeCrisprId = tabIndexe2[0];
	}
	console.log("CloseCrisprId = "+closeCrisprId);
        //console.log("Index 2 = "+closeCrisprId2);
	//end checking
        
        
        var cas = {
	    chr:"CHR",
            start:tabS[val].Cas[r].Start/ratio,
            end:tabS[val].Cas[r].End/ratio,
	    color: getColorByIndex(closeCrisprId),
    	    des:tabS[val].Cas[r].Type + " ["+tabS[val].Cas[r].Start+"-"+tabS[val].Cas[r].End+"]"
        };
        casSysTab.push(cas);
        
        var casGenNb = tabS[val].Cas[r].Genes.length;
        
        for (var cs = 0; cs < casGenNb; cs += 1) {
                indexCasGene += 1;

		var casStrand = 0;
		if(tabS[val].Cas[r].Genes[cs].Orientation === "+") {
			casStrand = 1;
		}
		if(tabS[val].Cas[r].Genes[cs].Orientation === "-") {
			casStrand = -1;
		}

                var cg = {
		    chr:"CHR",
                    start:tabS[val].Cas[r].Genes[cs].Start/ratio,
                    end:tabS[val].Cas[r].Genes[cs].End/ratio,
		    color: getColorByIndex(crisprNb+indexCasGene),
                    des:tabS[val].Cas[r].Genes[cs].Sub_type + " ["+tabS[val].Cas[r].Genes[cs].Start+"-"+tabS[val].Cas[r].Genes[cs].End+"] (strand: "+tabS[val].Cas[r].Genes[cs].Orientation+")"
                    
                };
                casGenTab.push(cg);
        }
        
}


/*CRISPR = [ "CRISPR" , {
  innerRadius: -60,
  outerRadius: -50,
} , crisprs ];

CASS = [ "CASS" , {
  innerRadius: -100,
  outerRadius: -90,
} , casSysTab
];

CASG = [ "CASG" , {
  innerRadius: -110,
  outerRadius: -110,
} , casGenTab
];*/

ARC01 = [ "ARC01" , {
  innerRadius: -40,
  outerRadius: -30
} , crisprs
];

ARC02 = [ "ARC02" , {
  innerRadius: -20,
  outerRadius: -10
} , casSysTab ];

ARC03 = [ "ARC03" , {
  innerRadius: -10,
  outerRadius: 0
} , casGenTab ];

