import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
    if (!file || !file.originalname) {
        throw new Error("File or originalname is missing");
    }

    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();

    console.log('File extension:', extName); // For debugging

    return parser.format(extName, file.buffer);
}

export default getDataUri;
