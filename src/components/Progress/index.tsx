type TProgressProps = {
  message?: string;
};

export const Progress: React.FunctionComponent<TProgressProps> = ({
  message = "",
}) => {
  return (
    <div
      className="text-center pt-20 h-96"
      style={{ border: "1px solid deeppink" }}>
      <div className="lds-roller ml-auto mr-auto">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div>{message}</div>
    </div>
  );
};
