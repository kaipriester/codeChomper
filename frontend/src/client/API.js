import axios from "axios";

const getZipFileMetadata = async () => {
    return await axios.get("http://localhost:8080/overview/zipfiles");
}

export { getZipFileMetadata };