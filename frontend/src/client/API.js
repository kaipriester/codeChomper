import axios from "axios";

const login = async (password) => {
	return await axios.post(`http://localhost:8080/login?password=${password}`);
};

const getZipFileMetadata = async (password) => {
	return await axios.get(
		`http://localhost:8080/overview/zipfiles?password=${password}`
	);
};


const getErrorTypes = async (id) =>
{
	return await axios.get(`http://localhost:8080/ErrorTypes?id=${id}`);
};

const getErrorTypesNum = async () =>
{
	return await axios.get(`http://localhost:8080/ErrorTypesNum`);
};
const getZipFile = async (password, id) => {
	return await axios.get(
		`http://localhost:8080/studentfiles?password=${password}&id=${id}`
	);
};

export { getZipFileMetadata, getZipFile, login, getErrorTypes, getErrorTypesNum };
