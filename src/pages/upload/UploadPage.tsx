import { RouteComponentProps } from "@reach/router";
import React from "react";
import { DragDropUpload } from "../../components/DragDropUpload";

export const UploadPage: React.FunctionComponent<RouteComponentProps> = () => {
  return (
    <div className="container mx-auto">
      <div>Hier können Sie die Dateien übertragen</div>
      <DragDropUpload uploadType="customer" />
    </div>
  );
};
