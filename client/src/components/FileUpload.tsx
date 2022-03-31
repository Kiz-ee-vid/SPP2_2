import React, {ChangeEvent, Fragment} from "react";

// tslint:disable-next-line:interface-name
interface FileUploadProps {
    onChange(file: File): void;
}

const FileUpload: React.FC<FileUploadProps> = ({onChange}) => {
    const onFileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;

        if (fileList) {
            onChange(fileList[0]);
        }
    };

    return (<Fragment>
        <div className="d-flex flex-column mb-3">
            <label htmlFor="file" className="col-form-label">File:</label>
            <input className="form-control" type="file" name="file" id="file"
                   onChange={(event) => onFileChangeHandler(event)}/>
        </div>
    </Fragment>);
};

export default FileUpload;
