function erfc (x){
    // Complementary Error Function
    return 1 - math.erf(x);
};

function runsTest(){
    // pre: bits should be an array containing only 0 and 1 as a number
	bits = document.getElementById("input").value.split("").map(Number);
    var n = bits.length;

	console.log("n: " + n);

	for (var i of bits) {
		if (i !== 0 && i !== 1) {
			document.getElementById("result").value = "Error: input must contain 0s and 1s only";
			return 0;
		}
   	}
	
	if (n != 25) {
		document.getElementById("result").value = "Error: input must have 25 digits";
		return 0;
	}

    var pi = bits.reduce((a, b) => a + b) / n;
    if(Math.abs(pi - 0.5) >= 2 / Math.sqrt(n)) return 0;
    var r = (_, k) => bits[k] == bits[k+1]? 0: 1;
    var s = math.sum(bits.map(r));
    var PValue = erfc(math.abs(s - 2 * n * pi * (1-pi))/(2 * Math.sqrt(2 * n) * pi * (1-pi)));
    console.log(PValue);
	document.getElementById("result").value = PValue;

	var div = document.createElement("div")
	div.setAttribute("style", "display: flex; justify-content: space-between;")

    var node1 = document.createElement("button")    
    var node2 = document.createElement("button")         

    var textnode1 = document.createTextNode(document.getElementById("input").value)     
    node1.appendChild(textnode1)
    
    var textnode2 = document.createTextNode(document.getElementById("result").value)     
    node2.appendChild(textnode2)

    node1.setAttribute("type","button")
    node1.setAttribute("class","list-group-item list-group-item-action p-3")

	
    node2.setAttribute("type","button")
    node2.setAttribute("class","list-group-item list-group-item-action p-3")

	div.appendChild(node1)
	div.appendChild(node2)

    document.getElementById("list").appendChild(div)
};

function updateCount() {
	var bits = document.getElementById("input").value.split("").map(Number);
	var counts = bits.length;
	var ones = bits.reduce((a, b) => a + b);
	var zeros = counts - ones;
	document.getElementById('count').value = "n = " + counts;
	document.getElementById('count01').value = "no. ones = " + ones + "\tno. zeros = " + zeros;
}

  