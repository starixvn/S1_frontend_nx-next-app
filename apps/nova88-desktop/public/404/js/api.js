const getSiteName = async () => {
	await fetch('/api/env')
		.then(response => response.json())
		.then(data => {
			console.log(data)
			document.title = data.BRAND_NAME
		})
}
