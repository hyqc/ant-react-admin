export type AuthorizationType = {
  name?: string;
  children?: React.ReactNode;
};

const Authorization: React.FC<AuthorizationType> = (props) => {
  return <>{props?.children}</>;
};

export default Authorization;
