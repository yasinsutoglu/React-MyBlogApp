import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import google from "../assets/imgs/google.png";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { signWithGoogle, userRegister } from "../helpers/firebase";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("Please fill the first name"),
  lastName: yup.string().required("Please fill the last name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please fill the email input"),
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Password must have min 8 chars")
    .max(16, "Password must have max 16 chars")
    .matches(/\d+/, "Password must have a number")
    .matches(/[a-z]+/, "Password must have a lowercase")
    .matches(/[A-Z]+/, "Password must have a uppercase")
    .matches(/[!,?{}><%&$#£+-.]+/, "Password must have a special char"),
});


const theme = createTheme();

export default function Register() {

  const navigate = useNavigate()

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "95vh"}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ height: "95vh" }}>
          <Box
            sx={{
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">Register</Typography>

            <Formik
            initialValues={{firstName:"" , lastName:"", email: "", password: "" }}
            validationSchema={registerSchema}
            onSubmit={(values, actions) => {
              userRegister(values,navigate);               
              actions.resetForm();
              actions.setSubmitting(false); 
            }}
          >
            {({
              values,
              isSubmitting,
              handleChange,
              handleBlur,
              touched,
              errors,
            }) => {
              return (
                <Form>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="dense"
                autoComplete="given-name"
                name="firstName"
                fullWidth
                id="firstName"
                label="First Name"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                margin="dense"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
              <TextField
                margin="dense"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                margin="dense"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 1 }}>Register</Button>

              <Button type="button" variant="outlined" fullWidth sx={{mb:1}} onClick={()=>{signWithGoogle(navigate)}}>
                      Continue with <span style={{marginLeft:".5rem"}}><img src={google} width="70px"/></span>
              </Button>
              
            </Box>
          </Form> )
            }}
      </Formik>

            <Grid container>
                <Grid item sx={{margin:"0 auto"}}>
                  <Link href="/login" variant="body2">
                    {"I have an account! Let's Login"}
                  </Link>
                </Grid>
            </Grid>

          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
