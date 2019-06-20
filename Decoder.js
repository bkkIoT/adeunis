function Decoder(bytes, port){

	function Hex2Bin(n){if(!checkHex(n))return 0; var binstr=""; for (var i=0; i<n.length; i+=2) { binstr += parseInt(n[i]+n[i+1],16).toString(2); } return binstr;}
    function checkHex(n){return/^[0-9A-Fa-f]{1,64}$/.test(n);}
    function checkBin(n){return/^[01]{1,64}$/.test(n)}
    function Bin2Dec(n){if(!checkBin(n))return 0;return parseInt(n,2);}




	var param = {

		"type": null,
		"Frame_Counter": null,
		"Hardware_error": false,
		"Low_battery": false,
		"configuration_successfull": false,
  		"configuration_inconsistency": false,
  		"presence_global_counter": null,
  		"presence_current_counter": null,
  		"luminosity_current_percentage": null
	};
	
	for (var i = 0; i < bytes.length; i++){

		if(0x4E === bytes[0]){
			param.type = "0x4E Periodic data";
		}	
		var status = Hex2Bin(bytes[1]);
		param.Frame_Counter = parseInt(status.charAt(0),10)*Math.pow(2,2) + parseInt(status.charAt(1),10)*Math.pow(2,1) + parseInt(status.charAt(2),10);
		//ignorerer foreløpig reserved bit
		if(parseInt(status.charAt(4)) === 1){
			param.configuration_inconsistency = true;
		}else if(parseInt(status.charAt(4)) === 0){
			param.configuration_inconsistency = false;
		}if(parseInt(status.charAt(5)) === 1){
			param.Hardware_error = true;
		}else if(parseInt(status.charAt(5)) === 0){
			param.Hardware_error = false;
		}if(parseInt(status.charAt(6)) === 1){
			param.Low_battery = true;
		}else if(parseInt(status.charAt(6)) === 0){
			param.Low_battery = false;
		}if(parseInt(status.charAt(7)) === 1){
			param.configuration_successfull = true;
		}else if(parseInt(status.charAt(7)) === 0){
			param.configuration_successfull = false;
		}


		
		
	



	}


	return param;

}


