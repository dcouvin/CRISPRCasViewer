/**
 * Functions of CRISPR-Cas Viewer
 * DC
 * November 2017
 */



function logslider(position, totalSize) {
	// position will be between 0 and 900
	var minp = 0;
	var maxp = 900;

	// The result should be between 2 and totalSize
	var minv = Math.log(2);
	var maxv = Math.log(totalSize);

	// calculate adjustment factor
	var scale = (maxv-minv) / (maxp-minp);
	//return Math.log(minv + scale*(position-minp)) * maxv;
	return (Math.log(position)-minv)/scale + minp;
}

//function getBlueColorByIndex(index) {
			//  var colorMap = [   ];
			  
			//  return colorMap[index];
			//}

function getColorByIndex(index) {
	var colorMap = [
	  "Bisque", "Brown", "BurlyWood", 
	    "Chartreuse", "Chocolate", "Coral", "Crimson", 
		"DarkGoldenRod", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", 
		"DarkOrange", "DarkGoldenRod", "DarkSalmon", "DarkSeaGreen", "DarkSlateGray", "DeepPink",
		"FireBrick", "DodgerBlue",
		"Gold", "GreenYellow", 
		"HotPink",
		"IndianRed", "DarkKhaki", "Indigo", "CadetBlue",
		"Blue", 
		"LightCoral", "LightGreen", "MediumSlateBlue", "LightPink", "LightSeaGreen", "LightSlateGray", 
		"MediumOrchid", "MediumSeaGreen", "Moccasin", "BlueViolet",
		"Khaki", "Olive", "OliveDrab", "Orange", "SteelBlue", "OrangeRed", 
		"PaleVioletRed", "Peru", "Plum", "Purple", 
		"Red", "RosyBrown", "DarkSlateBlue",
		"SaddleBrown", "Salmon", "SandyBrown", "CornflowerBlue",
		"Teal", "Tomato", "Aqua",
		"Yellow", "DarkCyan", "YellowGreen",
	  "Bisque", "Aqua", "Brown", "BurlyWood", 
	    "Chartreuse", "Chocolate", "Coral", "Crimson", 
		"DarkGoldenRod", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", 
		"DarkOrange", "DarkGoldenRod", "DarkSalmon", "DarkSeaGreen", "DarkSlateGray", "DeepPink",
		"FireBrick", "DodgerBlue",
		"Gold", "GreenYellow", 
		"HotPink",
		"IndianRed", "DarkKhaki", "Indigo", "CadetBlue",
		"Blue", 
		"LightCoral", "LightGreen", "MediumSlateBlue", "LightPink", "LightSeaGreen", "LightSlateGray", 
		"MediumOrchid", "MediumSeaGreen", "Moccasin", "BlueViolet",
		"Khaki", "Olive", "OliveDrab", "Orange", "SteelBlue", "OrangeRed", 
		"PaleVioletRed", "Peru", "Plum", "Purple", 
		"Red", "RosyBrown", "DarkSlateBlue",
		"SaddleBrown", "Salmon", "SandyBrown", "CornflowerBlue",
		"Teal", "Tomato", "Aqua",
		"Yellow", "DarkCyan", "YellowGreen"
	];

	return colorMap[index];
}

function refreshMyPage(){
    
    window.localStorage.removeItem("val");
    window.localStorage.removeItem("cont");
    window.localStorage.removeItem("visu");
    location.reload();
    
}

function getSeq(element){
	var idx=element.selectedIndex;
	var val=element.options[idx].value;
	var content=element.options[idx].innerHTML;
	//alert(val + " " + content);
                            
	localStorage.setItem("val",val);
	localStorage.setItem("cont",content);
        console.log("slected seq:"+val +" , Content="+content);
}

function getVisu(element){
        var idx=element.selectedIndex;
	var val=element.options[idx].value;
	                    
	localStorage.setItem("visu",val);
        console.log("slected viz:"+val);
}

function createNewPage(seq){
        seq = localStorage.getItem("val");
        var visu = localStorage.getItem("visu");
        
        if(seq === "undefined" || seq === "default" || !seq){
            alert(" Please select a JSON file then a sequence! ");
        }
        else{
            if(!visu || visu === "1"){
                window.open("viewTnT.html", "_blank");
            }
            else{
                //if(visu === "2"){
                    //window.open("view2b.html", "_blank"); //window.open("view2.html", "_blank");
                //}
		if(visu === "4"){
                    window.open("viewBioCircos.html", "_blank");
                }
                //if(visu === "3"){
                  //  window.open("viewScribl.html", "_blank");
                //}

		if(visu === "6"){
                    window.open("scatter_plot.html", "_blank");
                }
		

            }
        }
}

function myDrawTnT2(val, tabS, divName){
    var genome = tnt.board.genome().species("bacteroides").gene().width(950);

  var gene_track = tnt.board.track()
      .height(200)
      .color("white")
      .display(tnt.board.track.feature.genome.gene()
          .color("#550055")
      )
      .data(tnt.board.track.data.genome.gene());

  var sequence_track = tnt.board.track()
          .height(30)
          //.background_color("white")
          .display(tnt.board.track.feature.genome.sequence())
          .data(tnt.board.track.data.genome.sequence()
              .limit(150)
          );
  genome
      .zoom_in(100)
      .add_track(sequence_track)
      .add_track(gene_track);

  genome(document.getElementById(divName));
  genome.start();
}

function myDrawTnT(val, tabS, divName, zoom){  
    console.log("Val = "+val);
    
    var crisprNb = tabS[val].Crisprs.length;
    var crisprsTab = [];
    
    var casSysNb = tabS[val].Cas.length;
    var casSysTab = [];
    var casGenTab = [];
    
    for (var row = 0; row < crisprNb; row += 1) {

        var crisprID = tabS[val].Crisprs[row].Name.split("_");
        var idRow = crisprID.pop();
        var crispr = {
		start:tabS[val].Crisprs[row].Start,
		end:tabS[val].Crisprs[row].End,
		id:"CRISPR_"+idRow,
		color: getColorByIndex(idRow),
		strand:tabS[val].Crisprs[row].CRISPRDirection
	};

        crisprsTab.push(crispr);
    }
    
    var indexColor = 0;
    for (var r = 0; r < casSysNb; r += 1) {
        
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
            start:tabS[val].Cas[r].Start,
            end:tabS[val].Cas[r].End,
            id:tabS[val].Cas[r].Type,
	    color: getColorByIndex(closeCrisprId)
        };
        casSysTab.push(cas);
        
        var casGenNb = tabS[val].Cas[r].Genes.length;
        
            for (var cs = 0; cs < casGenNb; cs += 1) {
                indexColor += 1;
                var cg = {
                    start:tabS[val].Cas[r].Genes[cs].Start,
                    end:tabS[val].Cas[r].Genes[cs].End,
                    id:tabS[val].Cas[r].Genes[cs].Sub_type,
                    strand:tabS[val].Cas[r].Genes[cs].Orientation,
                    color: getColorByIndex(indexColor)
                };
                casGenTab.push(cg);
            }
        
    }
    
    console.log("Size of CRISPR table = "+crisprsTab.length);
    
    console.log("Zoom value = "+zoom);

    if(!zoom){
	zoom = 1;
    }

    var zoomValue = tabS[val].Length / zoom;
	
    console.log("CRISPR1 Start Position = "+crisprsTab[0].start);

    var myBoard = tnt.board().from(0).to(zoomValue).max(tabS[val].Length).width(1000); //tnt.board.genome().species("bacteria").gene(this).width(950);

    // Size select:
        //d3.select("#size-select")
          //  .on ("change", function () {
            //    console.log("current size is " + this.value);
              //  board.to(~~this.value);
            //});
            
    var axis_track = tnt.board.track()
        .height(20)
        .color("white")
        .display(tnt.board.track.feature.axis()
            .orientation("top")
        );
    
    //CRISPR track
    var crispr_track = tnt.board.track()
        .label("CRISPR array(s)")
        .height(30)
        .color("Cornsilk") // #FFCFDD
        .data (tnt.board.track.data.sync()
            .retriever (function () {
                
                return crisprsTab; //blocks_data;
                
            })
        )
        .display(tnt.board.track.feature.block()
            .color(function (e){ return e.color})              //.color("blue")
            
            .on("mouseover", function (d) {   // click replaced by mouseover
                tnt.tooltip.table()
                    .width(120)
                    .call(this, {
                        header: "CRISPR",
                        rows: [
                            {"label":"ID", "value":d.id},
                            {"label":"Start", "value":d.start},
                            {"label":"End", "value":d.end},
                            {"label":"Direction", "value":d.strand}
                        ]
                    });
            })
        );


    //CAS system track
    var casSys_track = tnt.board.track()
        .label("Cas system(s)")
        .height(30)
        .color("#FFCFDD") // #FFCFDD
        .data (tnt.board.track.data.sync()
            .retriever (function () {
                
                return casSysTab; //casSysTab;
                
            })
        )
        .display(tnt.board.track.feature.block()
            .color(function (e){ return e.color})  //.color("#585858")
            
            .on("mouseover", function (d) {
                tnt.tooltip.table()
                    .width(120)
                    .call(this, {
                        header: "Cas System",
                        rows: [
                            {"label":"ID", "value":d.id},
                            {"label":"Start", "value":d.start},
                            {"label":"End", "value":d.end}
                        ]
                    });
            })
        );

    //CAS gene track
    var casGen_track = tnt.board.track()
        .label("Cas gene(s)")
        .height(30)
        .color("white") // #FFCFDD
        .data (tnt.board.track.data.sync()
            .retriever (function () {
                
                return casGenTab;
                
            })
        )
        .display(tnt.board.track.feature.block()
            .color(function (e){ return e.color})           
            
            .on("mouseover", function (d) {
                tnt.tooltip.table()
                    .width(120)
                    .call(this, {
                        header: "Cas gene",
                        rows: [
                            {"label":"ID", "value":d.id},
                            {"label":"Start", "value":d.start},
                            {"label":"End", "value":d.end},
                            {"label":"Orientation", "value":d.strand}
                        ]
                    });
            })
        );    

        //#FFCFDD
    myBoard(document.getElementById(divName));
    myBoard
        .zoom_out(tabS[val].Length/10000)
        //.zoom_in(10)
        .add_track(axis_track)
        .add_track(crispr_track)
        .add_track(casSys_track)
        .add_track(casGen_track);

    myBoard.start();
    
}


function fillTable(val, tabS){
    var myDiv = document.getElementById('myTable');
    
    /*var tableString = "<br/><table class='myFormat' width='950' border='1' style='font-size:13px; font-family:Courier;'>";
    var headerTable = "<tr> <th>CRISPR Id</th> <th>Evidence Level</th> "+
                        "<th>Start</th> <th>End</th> <th>Potential Orientation</th> <th>Number of spacers</th> "+
                        "<th>DR Consensus</th> <th>DR Length</th> <th>Conservation of DRs based on entropy</th> "+
                        "<th>Conservation of spacers</th> </tr>";
    tableString += headerTable;*/
    
    //injectCSS('.myFormat { border:  1px solid black; } ');
    // CSS rules
	//var rule  = '#myFormat { border:  1px solid black; font-size: 12px; } ';
	    //rule += '.blue {background-color: blue}';

	// Load the rules and execute after the DOM loads
	//window.onload = function() {cssEngine(rule)};

	
    var crisprNb = tabS[val].Crisprs.length;
    
    //var crisprsTab = [];
    
    //crisprsTab[0]="Something";
    
    //tabS[val].Crisprs.sort(function(a, b){return a - b});
    //var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
    //tabS[val].Crisprs = tabS[val].Crisprs.sort(sortAlphaNum);
    
    
    
    
    //for (var row = 0; row < crisprNb; row++) {

        //var crisprID = tabS[val].Crisprs[row].Name.split("_");
        //var idRow = parseInt(crisprID.pop());
        
        /*var crisprElement = {
            "ident":idRow,
            "evidence":tabS[val].Crisprs[row].Evidence_Level, 
            "start":tabS[val].Crisprs[row].Start,
            "end":tabS[val].Crisprs[row].End,
            "strand":tabS[val].Crisprs[row].Potential_Orientation,
            "spacers":tabS[val].Crisprs[row].Spacers,
            "consensus":tabS[val].Crisprs[row].DR_Consensus,
            "drLength":tabS[val].Crisprs[row].DR_Length,
            "conservationDRs":tabS[val].Crisprs[row].Conservation_DRs,
            "conservationSpacers":tabS[val].Crisprs[row].Conservation_Spacers
        };    */
        
        //crisprsTab[idRow]=crisprElement;
        //console.log("CRISPR Tab id = "+idRow+" value = "+crisprsTab[idRow]);
        
        /*
        tableString += "<tr>";
        
        tableString += "<td bgcolor='"+getColorByIndex(idRow)+"'>"  + "CRISPR_" + idRow + "</td>";
        tableString += "<td>" + tabS[val].Crisprs[row].Evidence_Level + "</td>";
        tableString += "<td>" + tabS[val].Crisprs[row].Start + "</td>";
        tableString += "<td>" + tabS[val].Crisprs[row].End + "</td>";
        tableString += "<td>" + tabS[val].Crisprs[row].Potential_Orientation + "</td>";
        tableString += "<td>" + tabS[val].Crisprs[row].Spacers + "</td>";
        tableString += "<td>" + tabS[val].Crisprs[row].DR_Consensus + "</td>";
        tableString += "<td>" + tabS[val].Crisprs[row].DR_Length + "</td>";
        tableString += "<td>" + Math.round(tabS[val].Crisprs[row].Conservation_DRs * 100) / 100 + "</td>";
        tableString += "<td>" + Math.round(tabS[val].Crisprs[row].Conservation_Spacers *100) / 100 + "</td>";

        tableString += "</tr>";*/

	//crisprsTab[idRow] = [parseInt(tabS[val].Crisprs[row].Start), parseInt(tabS[val].Crisprs[row].End)];
	//console.log("CRISPR_"+idRow+" table = "+crisprsTab[idRow]+ " id 1 = "+crisprsTab[1][0] );
        
    //}
    
    /*for (var crisp = 1; crisp <= crisprNb; crisp++) {
        
        console.log("CRISPR = "+crisp+" value = "+crisprsTab[crisp]);
        
        tableString += "<tr>";
        
        tableString += "<td bgcolor='"+getColorByIndex(crisprsTab[crisp].ident)+"'>" + "CRISPR_" + crisprsTab[crisp].ident + "</td>";
        tableString += "<td>" + crisprsTab[crisp].evidence + "</td>";
        tableString += "<td>" + crisprsTab[crisp].start + "</td>";
        tableString += "<td>" + crisprsTab[crisp].end + "</td>";
        tableString += "<td>" + crisprsTab[crisp].strand + "</td>";
        tableString += "<td>" + crisprsTab[crisp].spacers + "</td>";
        tableString += "<td>" + crisprsTab[crisp].consensus + "</td>";
        tableString += "<td>" + crisprsTab[crisp].drLength + "</td>";
        tableString += "<td>" + crisprsTab[crisp].conservationDRs + "</td>";
        tableString += "<td>" + crisprsTab[crisp].conservationSpacers + "</td>";

        tableString += "</tr>";
    }*/

    //tableString += "</table><br/><br/>";
    
    // Cas table
    var tableString = "<p>CRISPR arrays and their closest Cas systems are represented by the same color.</p><br/><table class='myFormat' width='750' border='1' style='font-size:13px; font-family:Arial;'>";
    var headerTableCas = "<tr> <th>Cas system/Cas gene</th>"+
                        "<th>Start</th> <th>End</th> <th>Orientation</th> "+
                        "</tr>";
                
    tableString += headerTableCas;
    
    var indexColor = 0;
    
    var casSysNb = tabS[val].Cas.length;
    for (var cas = 0; cas < casSysNb; cas += 1) {
        
        var casSysName = tabS[val].Cas[cas].Type;
        var casGenesNb = tabS[val].Cas[cas].Genes.length;  //#DCDCDC
        
        //if(tabS[val].Crisprs[cl].Start <= (tabS[val].Cas[cas].End + 3200) || 
                  //      tabS[val].Crisprs[cl].End <= (tabS[val].Cas[cas].Start + 3200) )
        
	//check if a CRISPR array is close to this Cas Sys
	var closeCrisprId = 0;
	var closeCrisprId2 = 0;
        var tabDistances1 =[];
	var tabDistances2 =[];
	var tabIndexes = [];
	var tabIndexe2 = [];
	for (var cl = 0; cl < crisprNb; cl++) {

		if(tabS[val].Crisprs[cl].Start >= tabS[val].Cas[cas].Start){
			closeCrisprId = parseInt(tabS[val].Crisprs[cl].Name.split("_").pop());
			var dist1 = tabS[val].Crisprs[cl].Start - tabS[val].Cas[cas].End;
                        console.log("CRISPR ID loop 1 = "+closeCrisprId);
			tabIndexes.push(closeCrisprId);
			tabDistances1.push(dist1);
		}
            
	}
        tabDistances1[0] = Math.min.apply(null, tabDistances1);
        tabIndexes[0] = Math.min.apply(null, tabIndexes);
        console.log("closest Cr ID for loop1 = "+ tabIndexes[0]);
        
	for (var cl2 = crisprNb-1; cl2 >= 0; cl2--) {
		if(tabS[val].Crisprs[cl2].End < tabS[val].Cas[cas].Start){
			
			closeCrisprId2 = parseInt(tabS[val].Crisprs[cl2].Name.split("_").pop());
			var dist2 = tabS[val].Cas[cas].Start - tabS[val].Crisprs[cl2].End;
			//tabIndexes.push(closeCrisprId);
			tabDistances2.push(dist2);
			tabIndexe2.push(closeCrisprId2);
		}
	}
        //console.log("Lenght Tab dist1= "+tabDistances1.length + " , Length Tab dist2 = "+tabDistances2.length);
        tabDistances2[0] = Math.min.apply(null, tabDistances2);
        tabIndexe2[0] = Math.max.apply(null, tabIndexe2);
        console.log("closest Cr ID for loop2 = "+ tabIndexe2[0]);
        
	console.log("For Cas Type="+tabS[val].Cas[cas].Type+" , Tab distances = "+tabDistances1[0] +" , 2="+ tabDistances2[0]);
		

	if(tabDistances1[0] < tabDistances2[0]){
		closeCrisprId = tabIndexes[0];
	}
	else{
		closeCrisprId = tabIndexe2[0];
	}
	console.log("CloseCrisprId = "+closeCrisprId);
        //console.log("Index 2 = "+closeCrisprId2);
	//end checking

        tableString += "<tr> <td style='font-weight:bold;' bgcolor='"+getColorByIndex(closeCrisprId)+"'>"+casSysName+" (n="+casGenesNb+" cas genes)</td><td>"+tabS[val].Cas[cas].Start+"</td><td>"+tabS[val].Cas[cas].End+"</td> <td></td></tr>";
        for (var i = 0; i < casGenesNb; i += 1){
            indexColor += 1;
            
            tableString += "<tr> <td>"+tabS[val].Cas[cas].Genes[i].Sub_type+"</td>";
            tableString += "<td>"+tabS[val].Cas[cas].Genes[i].Start+"</td>";
            tableString += "<td>"+tabS[val].Cas[cas].Genes[i].End+"</td>";
            tableString += "<td>"+tabS[val].Cas[cas].Genes[i].Orientation+"</td></tr> ";
            
        }
        tableString += "<tr><td colspan='4' bgcolor='grey'></td></tr>";
        
    }
    
    tableString += "</table>";
    
    
    myDiv.innerHTML = tableString;
    //body.appendChild(myDiv);

}

//new simple tab
function fillTableSimple(val, tabS){
    var myDiv = document.getElementById('myTable');
    
    /*var tableString = "<br/><div align='center'><table class='myFormat' width='950' border='1' style='font-size:13px; font-family:Courier;'>";
    var headerTable = "<tr> <th>CRISPR Id</th> <th>Evidence Level</th> "+
                        "<th>Start</th> <th>End</th> <th>Direction</th> <th>Number of spacers</th> "+
                        "<th>DR Consensus</th> <th>DR Length</th> <th>Conservation of DRs based on entropy</th> "+
                        "<th>Conservation of spacers</th> </tr>";
    tableString += headerTable;
	
    var crisprNb = tabS[val].Crisprs.length;
    
    var crisprsTab = [];
    
    
    for (var row = 0; row < crisprNb; row++) {

        var crisprID = tabS[val].Crisprs[row].Name.split("_");
        var idRow = parseInt(crisprID.pop());
        
        
        
        //crisprsTab[idRow]=crisprElement;
        //console.log("CRISPR Tab id = "+idRow+" value = "+crisprsTab[idRow]);
        
        
        tableString += "<tr>";
        
        tableString += "<td>"  + "CRISPR_" + idRow + "</td>";
        tableString += "<td>" + tabS[val].Crisprs[row].Evidence_Level + "</td>";
        tableString += "<td>" + tabS[val].Crisprs[row].Start + "</td>";
        tableString += "<td>" + tabS[val].Crisprs[row].End + "</td>";
        tableString += "<td>" + tabS[val].Crisprs[row].CRISPRDirection + "</td>";
        tableString += "<td>" + tabS[val].Crisprs[row].Spacers + "</td>";
        tableString += "<td>" + tabS[val].Crisprs[row].DR_Consensus + "</td>";
        tableString += "<td>" + tabS[val].Crisprs[row].DR_Length + "</td>";
        tableString += "<td>" + Math.round(tabS[val].Crisprs[row].Conservation_DRs * 100) / 100 + "</td>";
        tableString += "<td>" + Math.round(tabS[val].Crisprs[row].Conservation_Spacers *100) / 100 + "</td>";

        tableString += "</tr>";
        
    }
    
    

    tableString += "</table><br/><br/>";*/
    
    // Cas table
    var tableString = "<div align='center'><table class='myFormat' width='750' border='1' style='font-size:13px; font-family:Arial;'>";
    var headerTableCas = "<tr> <th>Cas system/Cas gene</th>"+
                        "<th>Start</th> <th>End</th> <th>Orientation</th> "+
                        "</tr>";
                
    tableString += headerTableCas;
    
    var indexColor = 0;
    
    var casSysNb = tabS[val].Cas.length;
    for (var cas = 0; cas < casSysNb; cas += 1) {
        
        var casSysName = tabS[val].Cas[cas].Type;
        var casGenesNb = tabS[val].Cas[cas].Genes.length;  //#DCDCDC
        
        tableString += "<tr> <td style='font-weight:bold;' bgcolor='#DCDCDC'>"+casSysName+" (n="+casGenesNb+" cas genes)</td><td>"+tabS[val].Cas[cas].Start+"</td><td>"+tabS[val].Cas[cas].End+"</td> <td></td></tr>";
        for (var i = 0; i < casGenesNb; i += 1){
            indexColor += 1;
            
            tableString += "<tr> <td>"+tabS[val].Cas[cas].Genes[i].Sub_type+"</td>";
            tableString += "<td>"+tabS[val].Cas[cas].Genes[i].Start+"</td>";
            tableString += "<td>"+tabS[val].Cas[cas].Genes[i].End+"</td>";
            tableString += "<td>"+tabS[val].Cas[cas].Genes[i].Orientation+"</td></tr> ";
            
        }
        tableString += "<tr><td colspan='4' bgcolor='grey'></td></tr>";
        
    }
    
    tableString += "</table></div>";
    
    
    myDiv.innerHTML = tableString;
    //body.appendChild(myDiv);

}


function go(viz,zoom) {
                            
        var jsonTab = localStorage.getItem("tabSeq");
        var tabS = JSON.parse(jsonTab);
        console.log(tabS);
        
        var val = localStorage.getItem("val"); 
	//var content = localStorage.getItem("cont");
        
        //var visu = localStorage.getItem("visu");
        //console.log("Visu value: "+visu);
        
        if(!viz){
            viz = '1';
        }
        
        if(viz === '1'){
            myDrawTnT(val, tabS, 'divTnT', zoom);
        }
        
        if(viz === '3'){
            //myDrawScribl(val, tabS, 'canvas2');
	    //draw('canvas2');
        }
	
        
        fillTable(val, tabS);
        
                            
}


function clearCanvas(element){
    //sessionStorage.clear();
    //localStorage.clear();
                            
    canvas = document.getElementById(element);
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
                            
}

function draw(canvasName) {  
					
		// Get Canvas and Create Chart
		var canvas = document.getElementById(canvasName);  	
		
		// Create Chart
		chart1 = new Scribl(canvas, 700);

		// Add Genes      position, length, orientation
		gene1 = chart1.addGene(900,  750 , '-' );
		gene2 = chart1.addGene(3500, 2500, '+') ;
		gene3 = chart1.addGene(8100, 1000, '-' ) ;
                // gene4 = chart1.addGene(6200, 1500, '+') ;
                // gene5 = chart1.addGene(1000, 1000, '-');     
                // gene6 = chart1.addGene(3500, 1500, '-') ;    
                gene7 = chart1.addGene(2230, 1000, '+') ;
                gene8 = chart1.addGene(4500, 1500, '+') ;          
                gene9 = chart1.addGene(7230, 1000, '-') ;
                
                var startPos = 3500;
                gene2.onMouseover = "Start:"+startPos+", Length:2500";
		gene2.onClick = function() {alert("you clicked me: Start Pos="+startPos)};
		
        
//                gene10 = chart1.addFeature( 
//                       new Complex('complex', 0, 8000, '+', [
//                       new Rect('complex',0,30),
//                       new Rect('complex',50,30),
//                       new Rect('complex',100,30),
//                       new BlockArrow('complex',140,500, '+'),
//                       new Arrow('complex',1500, '+'), 
//                       new Rect('complex',1650, 50),
//                       new Rect('complex',1750, 100),
//                       new Rect('complex',1900, 100),
//                       new Rect('complex',2200, 200),
//                       new Rect('complex',2500, 50),
//                       new Rect('complex',2600, 50),
//                       new Rect('complex',2700, 50),
//                       new Rect('complex',3500,100), 
//                       new Rect('complex',3650, 50),
//                       new Rect('complex',3750, 100),
//                       new Rect('complex',3900, 100),
//                       new Rect('complex',4200, 200),
//                       new Rect('complex',4500, 50),
//                       new Rect('complex',4600, 50),
//                       new Rect('complex',4700, 50),
//                       new BlockArrow('complex',6000, 2000, '+', {
//      	         'color':'none',
//      	         'borderColor':'black'
//      	      } )
//                    ]
//                 ));
         
                 gene11 = chart1.addGene(8500, 500, '+') ;          
                 gene12 = chart1.addGene(9230, 400, '-') ;


		 // Draw Chart
		 chart1.draw();
					
		 // Create image of chart1
		 var img = chart1.canvas.toDataURL("image/png");
		 // Add link to download image
		 document.getElementById('export').href = img;
                 document.getElementById('export').innerHTML = "Export as PNG (right click Save As)";
}

function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
			function( m, key, value ) { // callback
                                        vars[key] = value !== undefined ? value : '';
                                }
                        );

		if ( param ) {
			return vars[param] ? vars[param] : null;	
		}
	return vars;
}


function myDrawScribl(val, tabS, canvasName){
    var zoomCanvas = document.getElementById(canvasName);
                            
        origZoomChart = new Scribl(zoomCanvas, 900); //1000
         
        var crisprNb = tabS[val].Crisprs.length;
        console.log("Nb of CRISPRs for index="+val+" ; CRISPRs="+crisprNb);
                            
        var crispr = [];
                                        
        for(var i=1;i<=crisprNb;++i)
        {
            var lengthCrispr = logslider( (tabS[val].Crisprs[i-1].End - tabS[val].Crisprs[i-1].Start), tabS[val].Length);    //*1000/tableSequences[0].Length;
                                
            lengthCrispr = lengthCrispr / (60 * Math.log(lengthCrispr)) ; //Math.log(lengthCrispr) ;
            var startCrispr = logslider(tabS[val].Crisprs[i-1].Start, tabS[val].Length);
    
            if (tabS[val].Crisprs[i-1].Potential_Orientation === '.') {
                crispr[i] =  origZoomChart.addFeature( new Rect('crispr', startCrispr,  lengthCrispr, '.' )); // origZoomChart.addGene(tabS[val].Crisprs[i-1].Start,  lengthCrispr , tabS[val].Crisprs[i-1].Potential_Orientation );
            }
            else{
		if((tabS[val].Crisprs[i-1].End - tabS[val].Crisprs[i-1].Start) > 1500){
                    crispr[i] =  origZoomChart.addFeature( new BlockArrow('crispr', startCrispr,  lengthCrispr, tabS[val].Crisprs[i-1].Potential_Orientation ));
                    //crispr[i].thickness = 1;
                    crispr[i].text.size = '12';  // default: '15' in pixels 
                    crispr[i].text.color = 'black'; // default: 'black'
                }
		else{
                    crispr[i] =  origZoomChart.addFeature( new Arrow('crispr', startCrispr, tabS[val].Crisprs[i-1].Potential_Orientation )); //BlockArrow replaced by Arrow
                    crispr[i].thickness = 1;
                }
            }
            var crisprID = tabS[val].Crisprs[i-1].Name.split("_");
            crispr[i].name = "#" + crisprID.pop();
            console.log(crispr[i].name);
                                    
             crispr[i].onMouseover = "Crispr"+crispr[i].name+": ["+tabS[val].Crisprs[i-1].Start+", "+tabS[val].Crisprs[i-1].End+", "+tabS[val].Crisprs[i-1].Potential_Orientation+"]";
        }
        //crispr[1].color="red";
	origZoomChart.crispr.color = "Blue";
	//origZoomChart.crispr.borderColor = "black";
                            
        //Cas systems and genes
        var casNb = tabS[val].Cas.length;
        var cas_sys = [];
                            
                            
                            for(var k=1;k<=casNb;k++)
                            {
                                var lengthCasSys = logslider( (tabS[val].Cas[k-1].End - tabS[val].Cas[k-1].Start), tabS[val].Length); 
				lengthCasSys = lengthCasSys / (60 * Math.log(lengthCrispr)); //Math.log(lengthCasSys / 10);
				var startCasSys = logslider(tabS[val].Cas[k-1].Start, tabS[val].Length);

                                //cas_sys[k]= origZoomChart.addFeature(new Complex('system', startCasSys, lengthCasSys, '.', []));
//origZoomChart.addFeature( new Line('system', startCasSys, lengthCasSys));
				cas_sys[k]= origZoomChart.addFeature(new Rect('system', startCasSys, lengthCasSys, '.'));

				var cas_gen = '';
				var cas_genNb = tabS[val].Cas[k-1].Genes.length;
				for(var g=1;g<=cas_genNb;g++){
				//	var lengthCasGen = (tabS[val].Cas[k-1].Genes[g-1].End - tabS[val].Cas[k-1].Genes[g-1].Start); 
				//	lengthCasGen = (Math.log(tabS[val].Length) * Math.log(tabS[val].Length)) / 100 ;
				//	var startCasGen = (Math.log(tabS[val].Cas[k-1].Genes[g-1].Start) / Math.log(tabS[val].Length)) * (100*Math.log(tabS[val].Length)) ; 
				//	startCasGen = startCasGen - startCasSys;
				//	cas_gen[g] = cas_sys[k].addSubFeature(new Rect('gene', startCasGen, lengthCasGen, tabS[val].Cas[k-1].Genes[g-1].Orientation));
					cas_gen = cas_gen + "(" + tabS[val].Cas[k-1].Genes[g-1].Sub_type
							+ ", " + tabS[val].Cas[k-1].Genes[g-1].Start
							+ ", " + tabS[val].Cas[k-1].Genes[g-1].End 
							+ ", " + tabS[val].Cas[k-1].Genes[g-1].Orientation + ") ";
				}		

				cas_sys[k].text.size = '10';
				cas_sys[k].text.color = 'black';		
				var casType = tabS[val].Cas[k-1].Type.split("CAS-Type");
				//console.log(casType[1]);
			
				if(typeof(casType[1]) === "undefined"){
					cas_sys[k].name = 'CAS';
					cas_sys[k].onMouseover = 'CAS: ['+cas_gen+']';
				}
				else{
					cas_sys[k].name = casType[1];
					cas_sys[k].onMouseover = "Type_"+casType[1]+": ["+cas_gen+']';
				}
                                cas_sys[k].color = getColorByIndex(k);

				console.log(cas_sys[k].name);
                                //cas_sys[k].onMouseover = casType[1];//tabS[val].Cas[k-1].Type;
                                
                            }
			    //origZoomChart.system.color = "red";
                            
			    //origZoomChart.tick.auto = false;
			    //origZoomChart.scale.auto = false;

			    // No scale
			    //origZoomChart.scale.off = true;



                            //origZoomChart.loadGenbank(getGenbankData());
                            //origZoomChart.scrollable = false;   trying to find a way to reset image
                            origZoomChart.scale.pretty = true;
                            origZoomChart.scrollable = true;
                            //origZoomChart.scrollValues = [1000, 50000];  //default values= [200000, 250000]
                            origZoomChart.draw();
                            
                            
                            // Create image of origZoomChart
                            //var img = origZoomChart.canvas.toDataURL("image/png");
                            // Add link to download image
                            //document.getElementById('export').href = img;
                            //document.getElementById('export').innerHTML = "Export as PNG (right click Save As)";
}


function cssEngine(rule) {
  var css = document.createElement('style'); // Creates <style></style>
  css.type = 'text/css'; // Specifies the type
  if (css.styleSheet) css.styleSheet.cssText = rule; // Support for IE
  else css.appendChild(document.createTextNode(rule)); // Support for the rest
  document.getElementsByTagName("head")[0].appendChild(css); // Specifies where to place the css
}
