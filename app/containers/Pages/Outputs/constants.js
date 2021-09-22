import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { Link } from 'react-router-dom';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlDocx from 'html-docx-js/dist/html-docx';
import Loader from '@api/ui/Loader';

export const tableOptions = (onDelete, loading) => ({
  filterType: 'dropdown',
  responsive: 'stacked',
  print: true,
  rowsPerPage: 10,
  page: 0,
  onRowsDelete: onDelete,
  textLabels: {
    body: {
      noMatch: loading
        ? <Loader />
        : 'Det ser vist ud som om du ikke har lavet noget rapportindhold endnu',
    },
  }
});

const downloadFile = (label, file) => {
  const link = document.createElement('a');
  link.href = file;
  link.target = '_blank';
  link.download = `${label}`;
  link.click();
};

export const columns = [
  {
    name: 'Title',
    options: {
      filter: true
    }
  },
  {
    name: 'Description',
    options: {
      filter: true,
    }
  },
  {
    name: 'Group',
    options: {
      filter: true,
    }
  },
  {
    name: 'See Output',
    options: {
      filter: true,
      customBodyRender: (value) => (
        <Link to={`/app/outputs/${value}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="secondary">
              Open
          </Button>
        </Link>
      )
    }
  },
  {
    name: 'Download',
    options: {
      filter: true,
      customBodyRender: (value, tableMeta) => (
        <IconButton disabled={!value} color="primary" aria-label="download file" component="span" onClick={() => downloadFile(tableMeta.rowData[0], value)}>
          <CloudDownloadIcon />
        </IconButton>
      )
    }
  },
  {
    name: 'Last edited',
    options: {
      filter: true,
    }
  },
];

export const reducer = 'output';

export const fromDraftToDocx = (editorState) => {
  const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  const converted = htmlDocx.asBlob(html);
  const convertedFile = new File([converted], 'name');
  Object.assign(convertedFile, {
    preview: URL.createObjectURL(convertedFile)
  });
  return convertedFile;
};
