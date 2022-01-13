import { Alert } from '@mui/material';

interface Props {
  header: string;
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ header, message }) => {
  return (
    <Alert severity="error">
      <b>{header}</b>
      <br />
      {message}
    </Alert>
  );
};

export default ErrorMessage;
