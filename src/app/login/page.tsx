import { AuthGuard } from "@/containers/authentication/authGuard";
import { Footer } from "@/containers/footer/Footer";
import { Login } from "@/containers/login/Login";
import { UnauthorizedLayout } from "@/layouts/unauthorized/UnauthorizedLayout";

const LoginPage = () => {
  return (
    <AuthGuard redirectTarget="/dashboard" sessionRestriction="prohibited">
      <UnauthorizedLayout footer={<Footer />}>
        <Login />
      </UnauthorizedLayout>
    </AuthGuard>
  );
};

export default LoginPage;
