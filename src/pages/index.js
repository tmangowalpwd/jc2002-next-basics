import styles from '../styles/Home.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text, FormLabel, Input, Box } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useFormik } from 'formik'
import { axiosInstance } from '../configs/api';

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

  const uploadContentHandler = async () => {
    // Proteksi jika file belum dipilih
    if (!selectedFile) {
      alert("Anda belum pilih file")
      return;
    };

    const formData = new FormData();
    const { caption, location } = formik.values

    formData.append("caption", caption)
    formData.append("location", location)
    // formData.append("user_id", authSelector.id)
    formData.append("user_id", 2)
    formData.append("post_image_file", selectedFile)

    try {
      await axiosInstance.post("/posts", formData)
      setSelectedFile(null)
      formik.setFieldValue("caption", "")
      formik.setFieldValue("location", "")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <Box>
        <FormLabel>Caption</FormLabel>
        <Input value={formik.values.caption} onChange={e => formik.setFieldValue("caption", e.target.value)} />
        <FormLabel>Location</FormLabel>
        <Input value={formik.values.location} onChange={e => formik.setFieldValue("location", e.target.value)} />
        <FormLabel>Image</FormLabel>
        <Input accept="image/png, image/jpeg" onChange={handleFile} ref={inputFileRef} type="file" display="none" />
        <Button
          onClick={() => inputFileRef.current.click()}
          colorScheme="facebook"
        >
          Choose File
        </Button>
        <Button onClick={uploadContentHandler} colorScheme="green" ml={4}>
          Upload Content
        </Button>
      </Box>
    </div>
  )
}
