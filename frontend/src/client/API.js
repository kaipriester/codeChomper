import axios from "axios";
axios.defaults.withCredentials = true;

const login = async (username, password) => {
	return await axios.post("http://localhost:8080/login", { username: username, password: password });
};

const logout = async () => {
	return await axios.post("http://localhost:8080/logout");
};

const getZipFileMetadata = async () => {
	return await axios.get("http://localhost:8080/overview/zipfiles");
};

const getErrorTypes = async (id) => {
	return await axios.get(`http://localhost:8080/ErrorTypes?id=${id}`);
};

const getErrorTypesNum = async () => {
	return await axios.get(`http://localhost:8080/ErrorTypesNum`);
};

const getZipFile = async (id) => {
	return await axios.get(`http://localhost:8080/studentfiles?id=${id}`);
};

const deleteDatabase = async () => {
	return await axios.delete("http://localhost:8080/deleteAll");
};

const deleteZipFolder = async (id) => {
	console.log(`API JS Says ` + id);
	return await axios.delete(`http://localhost:8080/deleteZipFolder?id=${id}`);
};

export {
	getZipFileMetadata,
	getZipFile,
	login,
	logout,
	getErrorTypes,
	getErrorTypesNum,
	deleteZipFolder,
};