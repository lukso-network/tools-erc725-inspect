interface Props {
  header: string;
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ header, message }) => {
  return (
    <article className="message is-danger my-4">
      <div className="message-header">
        <p>{header}</p>
      </div>
      <div className="message-body">{message}</div>
    </article>
  );
};

export default ErrorMessage;
