import React from 'react';
import Button from '@mui/material/Button';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Typography from '@mui/material/Typography';
import {invoke} from '@tauri-apps/api';
import {open} from '@tauri-apps/api/dialog';
import {State} from '../state';

export default function FileUpload({state, setter}) {
    const handleButtonClick = async () => {
        const selected = await open({
            multiple: true,
            filters: [{name: 'Excel file', extensions: ['xlsx', 'xls']}],
        });
        if (selected) {
            setter(State.LOADING);
            invoke('get_rows', {path: selected[0]}).then(() => {
                setter(State.HAVE_DATA);
            });
        }
    };

    return (
        <div>
            <Button
                display="left"
                size="large"
                aria-label="add"
                onClick={handleButtonClick}
                color="secondary"
                disabled={state === State.LOADING}
                startIcon={<UploadFileIcon/>}
            >
                <Typography sx={{marginLeft: 1}} component="h5">
                    Загрузите файл
                </Typography>
            </Button>
        </div>
    );
}