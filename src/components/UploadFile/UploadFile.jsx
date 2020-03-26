import React, { useState } from 'react';
import { FilePond } from 'react-filepond';

const UploadFile = () => {
  const [files, setFiles] = useState([]);

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
      <div>Holis</div>
      <FilePond
        files={files}
        onupdatefiles={files => setFiles(files)}
        onprocessfile={uploadFinished}
        acceptedFileTypes={['image/jpeg', 'image/png']}
        name="index-face"
        server="http://localhost:5000/upload/BernieSanders"
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
