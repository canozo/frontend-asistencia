
import React from 'react';
import ReactDOM from 'react-dom';
import UploadFile from './components/UploadFile/UploadFile';
import { registerPlugin } from 'react-filepond';
import FilePondPluginValidateTypes from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import './index.scss';

registerPlugin(
  FilePondPluginValidateTypes,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
);

ReactDOM.render(
  <UploadFile />,
  document.getElementById('root'),
);
