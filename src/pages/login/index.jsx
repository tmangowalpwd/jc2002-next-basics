import { Box, Button, FormLabel, Input, Text } from "@chakra-ui/react";
import { useFormik } from "formik";

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Text fontSize="2xl" mb="4">
        Welcome, please login
      </Text>
      <Box width="md">
        <FormLabel htmlFor="inputUsername">Username</FormLabel>
        <Input
          onChange={(event) =>
            formik.setFieldValue("username", event.target.value)
          }
          mb="3"
          id="inputUsername"
        />
        <FormLabel htmlFor="inputPassword">Password</FormLabel>
        <Input
          onChange={(event) =>
            formik.setFieldValue("password", event.target.value)
          }
          id="inputPassword"
        />

        <Button onClick={formik.handleSubmit} mt="2" colorScheme="teal">
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
