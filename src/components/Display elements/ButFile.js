import React, { useRef } from 'react';
import Button from "@mui/material/Button";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Typography from "@mui/material/Typography";

export default function FileUpload() {
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
            <div>
                <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept=".xls,.xlsx"
            />
                <Button display="left" size="large" aria-label="add" onClick={handleButtonClick} color="secondary">
                    <UploadFileIcon/>
                    <Typography sx={{marginLeft: 1}} component="h5">
                        Загрузите файл
                    </Typography>
                </Button>
            </div>
    );
}
