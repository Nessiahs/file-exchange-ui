import { RouteComponentProps } from "@reach/router";
import React, { useEffect, useState } from "react";
import { DisplayLink } from "../../adminComponents/DisplayLink";
import { PageHeader } from "../../adminComponents/PageHeader";
import { Tile } from "../../adminComponents/Tile";
import { Progress } from "../../components/Progress";
import { TJobData, useCreateJob } from "../../hooks/useCreateJob";

type TJobType = TJobData["jobType"] | null;

export const Create: React.FunctionComponent<RouteComponentProps> = () => {
  const [jobType, setJobType] = useState<TJobType>(null);
  const [title, setTitle] = useState("Job");
  const [jobName, setJobName] = useState("");
  const [expires, setExpires] = useState<string>();
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState<TJobData | null>(null);

  const { progress, link } = useCreateJob(data);

  const onClick = () => {
    if (jobType === null) {
      return;
    }

    setData({
      jobType,
      jobName,
      expires,
      password,
    });
  };

  const resetJobData = () => {
    setData(null);
  };

  useEffect(() => {
    if (link) {
      setJobName("");
      setExpires("");
      setJobType(null);
      setPassword("");
    }
  }, [link]);

  useEffect(() => {
    let t = "Job";
    if (jobType === "upload") {
      t = "Upload";
    } else if (jobType === "download") {
      t = "Download";
    }

    setTitle(t);
  }, [jobType, setTitle]);

  useEffect(() => {
    if (!jobName || !jobType) {
      return setDisabled(true);
    }
    setDisabled(false);
  }, [jobType, jobName, setDisabled]);

  if (progress === true) {
    return <Progress message="Erstelle Job" />;
  }

  return (
    <Tile>
      <PageHeader title={`${title} einrichten`} />
      <DisplayLink link={link} onClose={() => resetJobData()} />
      <div className="py-2">
        <label>Art:</label>
        <select
          value={jobType ?? ""}
          onChange={(e) => setJobType(e.target.value as TJobType)}>
          <option value="">Bitte wählen</option>
          <option value="upload">Upload</option>
          <option value="download">Download</option>
        </select>
      </div>
      <div className="py-2">
        <label>Auftrag</label>
        <input
          type="text"
          placeholder="Name des Auftrages"
          style={{ maxWidth: "600px" }}
          className="w-full"
          value={jobName}
          onChange={(e) => setJobName(e.target.value)}
        />
        <div className="text-xs">
          Dieser Name wird in der Übersicht angezeigt
        </div>
      </div>
      <div className="py-2">
        <label>Ablaufdatum</label>
        <input
          type="date"
          value={expires}
          onChange={(e) => setExpires(e.target.value)}
        />
        <div className="text-xs">
          Datum, ab wann der Link nicht mehr gehen soll. Wird kein Datum
          eingetragen ist er immer gültig
        </div>
      </div>
      <div className="py-2">
        <label>Passwort</label>
        <input
          type="text"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-xs">Ist Optional um die Sicherheit zu erhöhen</div>
      </div>
      <div className="py-2 text-right">
        <button disabled={disabled} onClick={onClick}>
          Erstellen
        </button>
      </div>
    </Tile>
  );
};
