import axios from "axios";
let devmode = true;
let url;
const development_url = "http://localhost";
const development_port = 8080;
const production_url = "https://codechomper.herokuapp.com";
axios.defaults.withCredentials = true;

if (devmode) 
{
	url = development_url;
	if (url.charAt(url.length - 1) === "/")
	{
		url = url.substring(0, (url.length - 1));
	}
	url = (url + ":" + development_port + "/");
}
else
{
	url = production_url;
	if (url.charAt(url.length - 1) !== "/")
	{
		url = (url + "/");
	}
}

const login = async (username, password) => {
	return await axios.post((url + "login"), { username: username, password: password });
};

const signup = async (username, password) => {
	return await axios.post((url + "signup"), { username: username, password: password });
};

const logout = async () => {
	return await axios.post(url + "logout");
};

const upload = async (formData) => {
	return axios.post((url + "upload"), formData);
};

const getZipFileMetadata = async () => {
	return await axios.get(url + "overview/zipfiles");
};

const getErrorTypes = async (id) => {
	return await axios.get(url + "ErrorTypes?id=" + id);
};

const getErrorTypesNum = async () => {
	return await axios.get(url + "ErrorTypesNum");
};

const getZipFile = async (id) => {
	return await axios.get(url + "studentfiles?id=" + id);
};

const deleteDatabase = async () => {
	return await axios.delete(url + "deleteAll");
};

const deleteZipFolder = async (id) => {
	console.log(`API JS Says ` + id);
	return await axios.delete(url + "deleteZipFolder?id=" + id);
};

export {
	getZipFileMetadata,
	getZipFile,
	login,
	signup,
	logout,
	upload,
	getErrorTypes,
	getErrorTypesNum,
	deleteZipFolder,
};