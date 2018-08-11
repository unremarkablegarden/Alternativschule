function clearObjProps (obj) {
	Object.keys(obj).forEach((k) => { obj[k] = null })
}

function Cfirst (value) {
	return value.charAt(0).toUpperCase() + value.substr(1).toLowerCase()
}

export default { clearObjProps, Cfirst }
