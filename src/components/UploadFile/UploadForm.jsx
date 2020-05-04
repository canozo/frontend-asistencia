import React, { useState } from 'react';

const server = 'http://localhost:5000/api/student/upload';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkVXNlciI6NiwiaWRVc2VyVHlwZSI6MywibmFtZXMiOiJKYXZpZXIgRWRnYXJkbyIsInN1cm5hbWVzIjoiQ2FubyBEZXJhcyIsImVtYWlsIjoiY2Fub0B1bml0ZWMuZWR1IiwiYWNjb3VudE51bWJlciI6IjExNzQxMjkxIn0sImlhdCI6MTU4ODUwNjMyOH0.PV336cxcp3Uy3J9-a2BPAijj--eMlAAjOuiGDWcFSPM';

const UploadForm = () => {
  const [file, setFile] = useState(null);

  const submit = e => {
    e.preventDefault();
    if (file !== null) {
      const form = document.getElementById('upload-form');
      const data = new FormData(form);

      fetch(server, {
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      })
        .then(res => res.json())
        .then(res => {
          if (res.status !== 'error') {
            console.log(res);
          } else {
            throw new Error(`Error: ${res.msg}`);
          }
        })
          .catch(err => console.log(err));
    }
  };

  const fileChange = e => {
    const nextSib = e.target.nextElementSibling;
    nextSib.innerText = e.target.files[0].name;
    setFile(e.target.files[0]);
  };

  return (
  <form
    id="upload-form"
    onSubmit={submit}
    action={server}
    method="post"
    encType="multipart/form-data"
  >
    {/* Input */}
    <div className="custom-file">
      <input
        type="file"
        onChange={fileChange}
        name="face"
        accept="image/jpeg,image/png"
        id="file-input"
        className="custom-file-input"
      />
      <label className="custom-file-label" htmlFor="file-input" data-browse="Elegir">
        Seleccionar Archivo
      </label>
    </div>

    {/* Submit button */}
    <button type="submit" className="btn btn-primary btn-block">
      Guardar
    </button>
  </form>
  );
};

export default UploadForm;
