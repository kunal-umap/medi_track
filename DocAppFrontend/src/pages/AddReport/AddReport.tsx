import React from 'react'
import AddStyle from './AddReport.module.css'
import { FileInput, Button } from '@mantine/core';

export default function AddReport() {
  return (
    <div className={AddStyle.AddReportPage}>
      Add Report
      <FileInput
      label="Select File"
      description="Upload report File"
      placeholder="Upload eport file"
    />
    <Button fullWidth>Full width button</Button>
    </div>
  )
}
