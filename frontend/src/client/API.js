import axios from "axios";

const getZipFileMetadata = async () => {
	return await axios.get("http://localhost:8080/overview/zipfiles");
};

const getZipFile = async (id) => {
	return await axios.get(`http://localhost:8080/studentfiles?id=${id}`);
};


const getErrorTypes = async (id) =>
{
	return await axios.get(`http://localhost:8080/ErrorTypes?id=${id}`);
};

const getErrorTypesNum = async () =>
{
	return await axios.get(`http://localhost:8080/ErrorTypesNum`);
};

export { getZipFileMetadata, getZipFile, getErrorTypes, getErrorTypesNum };
