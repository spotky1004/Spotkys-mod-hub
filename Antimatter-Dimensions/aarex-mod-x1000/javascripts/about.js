function giveachievement() {
	var check=localStorage.getItem(btoa("dsAM_asfd"))
	if (check!==null) {
		$.notify('A sound financial decision', "success")
		localStorage.removeItem(btoa("dsAM_asfd"))
	}
}