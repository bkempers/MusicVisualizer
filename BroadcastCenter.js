if ('BroadcastChannel' in window) {
	const channel = new BroadcastChannel("sound_value_chanel");

} 

else {
	alert("No BroadcastChannel available through web browser.")
}
