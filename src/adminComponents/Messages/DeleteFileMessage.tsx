import React from "react";

type TFileDeleteMessageProps = { filename: string };

export const DeleteFileMessage: React.FunctionComponent<TFileDeleteMessageProps> =
  ({ filename }) => {
    return (
      <div>
        Wollen Sie die Datei:
        <div className="text-red-600 font-bold">{filename}</div>
        wirklich löschen. Dieser Vorgang kann nicht rückgängig gemacht werden!
      </div>
    );
  };
