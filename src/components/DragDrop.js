import {FileUploader} from "react-drag-drop-files";


const DragDrop = ({setFile, uploadedFile}) => {

    const handleChange = (file) => {
        setFile(file);
    };
    return (
        <FileUploader
            handleChange={handleChange}
            name="file"
            multiple={false}
            required
            uploaded={uploadedFile !== null}
            currFile={uploadedFile}
            style
        />
    );
}

export default DragDrop;
