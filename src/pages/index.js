import styles from '../styles/Home.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text, FormLabel, Input, Box } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useFormik } from 'formik'

export default function Home() {
  const authSelector = useSelector(state => state.auth)
  const [selectedFile, setSelectedFile] = useState(null)

  const inputFileRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      caption: "",
      location: ""
    }
  })

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0])
    alert(event.target.files[0].name)
  }

  return (
    <div className={styles.container}>
      <Box>
        <FormLabel>Caption</FormLabel>
        <Input onChange={e => formik.setFieldValue("caption", e.target.value)} />
        <FormLabel>Location</FormLabel>
        <Input onChange={e => formik.setFieldValue("location", e.target.value)} />
        <FormLabel>Image</FormLabel>
        <Input accept="image/png, image/jpeg" onChange={handleFile} ref={inputFileRef} type="file" display="none" />
        <Button
          onClick={() => inputFileRef.current.click()}
          colorScheme="facebook"
        >
          Upload File
        </Button>
      </Box>
    </div>
  )
}
