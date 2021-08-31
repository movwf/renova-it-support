import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Column, Grid, Loading, Row, TextInput } from 'carbon-components-react';
import { useLazyQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthContext } from '../../contexts/AuthContext';
import { loginQuery } from '../../queries/authQueries';
import loginSchema from '../../configs/validations/Login.schema';
import Routes from '../../navigation/Routes';

import PageHeading from '../../components/PageHeading';
import Divider from '../../components/Divider';
import styles from './Login.module.css';
import { ILoginData } from '../../types/pages/Login.types';
import { loginStateMessages } from '../../configs/settings';

function Login() {
  const { login, isAuth, user } = React.useContext(AuthContext);
  const [loadLogin, { loading, data: queryData }] = useLazyQuery(loginQuery);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'all',
  });

  const loginUser = (loginData: ILoginData) => {
    loadLogin({ variables: loginData }); // Trigger DB query
  };

  const handleSubmitForm = (formData: ILoginData) => {
    loginUser(formData);
  };

  React.useEffect(() => {
    // If query returns with filled array -> Exists in DB
    if (queryData?.users?.length) {
      // Success toast
      toast(loginStateMessages.success, {
        toastId: 'login-toast-success',
        type: 'success',
        theme: 'dark',
        onClose: () => {
          login(queryData); // Authorize client
        },
        delay: 1000,
      });
    }

    // If query returns with empty array => Doesn't exist in DB
    if (queryData?.users?.length === 0) {
      // Error toast
      toast(loginStateMessages.error, {
        type: 'error',
        theme: 'dark',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData]);

  if (isAuth && user)
    return <Redirect to={user.users[0]?.isAdmin === true ? Routes.admin : Routes.user} />;

  return (
    <Grid fullWidth data-testid="login">
      <Column>
        <PageHeading title="Login" desc="Login to your account." />
        <Divider thickness={1} width="90%" marginY={25} color="#E0E0E0" />
        <Row>
          <Column className={styles.LoginForm}>
            <Row className={styles.Username}>
              <TextInput
                id="username"
                type="text"
                labelText="Username"
                placeholder="Username"
                invalid={!!errors?.username}
                invalidText={errors?.username?.message}
                data-testid="login-input-username"
                required
                {...register('username')}
              />
            </Row>
            <Row className={styles.Password}>
              <TextInput
                id="password"
                type="password"
                labelText="Password"
                placeholder="Password"
                invalid={!!errors?.password}
                invalidText={errors?.password?.message}
                data-testid="login-input-password"
                required
                {...register('password')}
              />
            </Row>
            <Row className={styles.LoginButtons}>
              <Button kind="ghost">Forgot Password</Button>
              <Button
                onClick={handleSubmit((data: any) => handleSubmitForm(data))}
                data-testid="login-button"
              >
                Login
              </Button>
            </Row>
          </Column>
        </Row>
      </Column>
      <ToastContainer />
      {loading && <Loading />}
    </Grid>
  );
}

export default Login;
