import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";

const LoginPage = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    onSubmit: (values) => {
      console.log(values);
      formik.setFieldValue("username", "");
      formik.setFieldValue("email", "");
      formik.setFieldValue("password", "");
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required("This field is required")
        .min(3, "Your username has to be 3 characters or more"),
      password: Yup.string()
        .required("This field is required")
        .min(8, "Your password needs at least 8 characters"),
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      // ),
      email: Yup.string()
        .required("This field is required")
        .email("Please use a valid email"),
    }),
    validateOnChange: false,
  });

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Text fontSize="2xl" mb="4">
        Welcome, please login
      </Text>
      <Box width="md">
        <form>
          <FormControl isInvalid={formik.errors.username}>
            <FormLabel htmlFor="inputUsername">Username</FormLabel>
            <Input
              onChange={(event) =>
                formik.setFieldValue("username", event.target.value)
              }
              id="inputUsername"
              name="username"
              value={formik.values.username}
            />
            <FormHelperText>{formik.errors.username}</FormHelperText>
          </FormControl>

          <FormControl isInvalid={formik.errors.email}>
            <FormLabel htmlFor="inputEmail">Email</FormLabel>
            <Input
              onChange={(event) =>
                formik.setFieldValue("email", event.target.value)
              }
              id="inputEmail"
              name="email"
              value={formik.values.email}
              type="email"
            />
            <FormHelperText>{formik.errors.email}</FormHelperText>
          </FormControl>

          <FormControl isInvalid={formik.errors.password}>
            <FormLabel htmlFor="inputPassword">Password</FormLabel>
            <Input
              onChange={(event) =>
                formik.setFieldValue("password", event.target.value)
              }
              id="inputPassword"
              value={formik.values.password}
              type="password"
            />
            <FormHelperText>{formik.errors.password}</FormHelperText>
          </FormControl>

          <Button
            type="submit"
            onClick={formik.handleSubmit}
            mt="2"
            colorScheme="teal"
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
