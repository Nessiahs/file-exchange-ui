type TDeleteJobMessageProps = {
  jobname: string;
};

export const DeleteJobMessage: React.FunctionComponent<TDeleteJobMessageProps> =
  ({ jobname }) => {
    return (
      <div>
        Wollen Sie:
        <div className="text-red-600 font-bold">{jobname}</div>
        wirklich löschen. Alle hinterlegten Dateien werden auch gelöscht und es
        kann nicht rückgängig gemacht werden!
      </div>
    );
  };
