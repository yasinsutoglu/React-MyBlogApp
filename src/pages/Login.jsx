import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import * as yup from "yup";
import google from "../assets/imgs/google.png"
import { forgotPassword, signWithGoogle, userLogin } from "../helpers/firebase";


const loginSchema = yup.object().shape({
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


const Login = () => {
  const navigate = useNavigate();
 

  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundImage: `url(${"https://picsum.photos/1600/900"})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "90vh",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "75vh",
          p: 2,
          backgroundColor: "rgba(255,255,255,0.8)",
          minWidth: "40%",
          borderRadius: "1rem",
        }}
      >
        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              userLogin(values, navigate);
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
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <TextField
                      label="Email"
                      name="email"
                      id="email"
                      type="email"
                      variant="outlined"
                      //! bu alttakileri formikten kullanarak ekledik
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <TextField
                      label="Password"
                      name="password"
                      id="password"
                      type="password"
                      variant="outlined"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                    <LoadingButton
                      type="submit"
                      loading={isSubmitting}
                      loadingPosition="center"
                      variant="contained"
                    >
                      Login
                    </LoadingButton>

                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() => {
                        signWithGoogle(navigate);
                      }}
                    >
                      Continue with
                      <span style={{ marginLeft: ".5rem" }}>
                        <img src={google} width="70px" alt="img" />
                      </span>
                    </Button>
                  </Box>

                  <Box sx={{ marginTop: "1rem", fontSize: "0.75rem",display:"flex", justifyContent:"space-between"}} className="flex-column flex-md-row">
                    <Button onClick={()=> forgotPassword(values.email)}>Forgot password?</Button>
                    <Button onClick={()=> navigate("/register")}>Do you have not an account?</Button>
                  </Box>
                </Form>
              );
            }}
          </Formik>

        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
