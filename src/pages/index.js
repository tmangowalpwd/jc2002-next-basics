import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text, FormLabel, Input, Box } from '@chakra-ui/react';
import auth_types from '../redux/types/auth';
import Cookies from 'js-cookie';
import { useRef } from 'react';

export default function Home() {
  const authSelector = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const inputFileRef = useRef(null);

  return (
    <div className={styles.container}>
      <Box>
        <FormLabel>Caption</FormLabel>
        <Input />
        <FormLabel>Location</FormLabel>
        <Input />
        <FormLabel>Image</FormLabel>
        <Input ref={inputFileRef} type="file" />
      </Box>
    </div>
  )
}
