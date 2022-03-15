import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import auth_types from "../../redux/types/auth";
import { axiosInstance } from "../../configs/api";
import { useRouter } from "next/router";

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await axiosInstance.get("/users", {
          params: {
            username: values.username,
            password: values.password,
          },
        });

        if (res.data.length) {
          dispatch({
            type: auth_types.LOGIN_USER,
            payload: {
              id: res.data[0].id,
              username: res.data[0].username,
            },
          });

          localStorage.setItem(
            "user_data",
            JSON.stringify({
              id: res.data[0].id,
              username: res.data[0].username,
            })
          );

          router.push("/");
        }
      } catch (err) {
        console.log(err);
        toast({
          title: "Error",
          description: err.message,
          status: "error",
        });
      }
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
      // email: Yup.string()
      //   .required("This field is required")
      //   .email("Please use a valid email"),
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

          {/* <FormControl isInvalid={formik.errors.email}>
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
          </FormControl> */}

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
