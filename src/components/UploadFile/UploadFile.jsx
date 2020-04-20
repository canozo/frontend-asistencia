import React, { useState } from 'react';
import { FilePond } from 'react-filepond';

const UploadFile = () => {
  const [files, setFiles] = useState([]);
  const [server, setServer] = useState('http://localhost:5000/api/student/upload');
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkVXNlciI6NiwiaWRVc2VyVHlwZSI6MywibmFtZXMiOiJKYXZpZXIgRWRnYXJkbyIsInN1cm5hbWVzIjoiQ2FubyBEZXJhcyIsImVtYWlsIjoiY2Fub0B1bml0ZWMuZWR1IiwiYWNjb3VudE51bWJlciI6IjExNzQxMjkxIn0sImlhdCI6MTU4NzMzMjMwNX0.VZYDS4-HLQuGXY3c_5KAT2RA7rCtu8k7ihYJicvokQw');

  const uploadFinished = (error, file) => {
    if (error) {
      console.log(error);
      return;
    }

    setTimeout(() => {
      // remove file after 5 seconds
      setFiles(files.filter(mFile => mFile.id !== file.id));
    }, 5000);
  }

  const submit = e => {
    e.preventDefault();
    console.log(files);
  };

  return (
    <form onSubmit={submit}>
      <label>
        Server:
        <input type="text" name="server" value={server} onChange={setServer} />
      </label>
      <label>
        Token:
        <input type="text" name="token" value={token} onChange={e => setToken(e.target.value)} />
      </label>
      <FilePond
        files={files}
        onupdatefiles={files => setFiles(files)}
        onprocessfile={uploadFinished}
        acceptedFileTypes={['image/jpeg', 'image/png']}
        name="face"
        server={{
          url: server,
          process: {
            headers: { Authorization: `Bearer ${token}` }
          }
        }}
        {...defaultProps}
      />
      <button type="submit">Subir</button>
    </form>
  );
};

const defaultProps = {
  labelIdle: 'Arrastre y suelte el archivo o <span class="filepond--label-action">Seleccione</span>',
  labelFileProcessing: 'Cargando',
  labelFileProcessingError: 'Error cargando el archivo',
  labelFileProcessingComplete: 'Carga completa',
  labelFileProcessingAborted: 'Carga cancelada',
  labelTapToRetry: 'click para intentar denuevo',
  labelTapToCancel: 'click para cancelar',
  labelButtonRemoveItem: 'Quitar',
  labelButtonProcessItem: 'Cargar',
  labelButtonAbortItemProcessing: 'Cancelar',
  labelButtonRetryItemProcessing: 'Intentar denuvo',
  labelFileTypeNotAllowed: 'El archivo es de un tipo no permitido',
  fileValidateTypeLabelExpectedTypes: 'Se esperaba {allButLastType} o {lastType}',
  labelMaxFileSizeExceeded: 'La imagen es muy grande',
  labelMaxFileSize: 'El tamaño maximo es de {filesize}',
  maxFileSize: '5MB',
  allowImageExifOrientation: true,
  allowFileSizeValidation: true,
  allowFileTypeValidation: true,
  instantUpload: true,
  allowRevert: false,
  allowMultiple: true,
  maxFiles: 3,
};

export default UploadFile;
