import { RouteComponentProps } from "@reach/router";
import React, { useEffect, useState } from "react";
import { DisplayLink } from "../../adminComponents/DisplayLink";
import { PageHeader } from "../../adminComponents/PageHeader";
import { Tile } from "../../adminComponents/Tile";
import { Progress } from "../../components/Progress";
import { TJobData, useCreateJob } from "../../hooks/useCreateJob";

type TJobType = TJobData["jobType"];
interface CreateProps extends RouteComponentProps {
  type?: string;
}

const isValidJobType = (jType: string): jType is TJobType => {
  return ["download", "upload"].includes(jType);
};

const expireTimes = [2, 4, 8, 12, 24, 36];

export const Create: React.FunctionComponent<CreateProps> = ({ type }) => {
  const [jobType, setJobType] = useState<TJobType>();
  const [title, setTitle] = useState("Job");
  const [jobName, setJobName] = useState("");
  const [expires, setExpires] = useState<number>();
  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState<TJobData | null>(null);
  const { progress, link } = useCreateJob(data);

  const onClick = () => {
    if (!jobType) {
      return;
    }

    setData({
      jobType,
      jobName,
      expires,
    });
  };

  const resetJobData = () => {
    setData(null);
  };

  useEffect(() => {
    if (!type || !isValidJobType(type)) {
      return;
    }

    setJobType(type);
  }, [type]);

  useEffect(() => {
    if (link) {
      setJobName("");
    }
  }, [link]);

  useEffect(() => {
    let t = "Job";
    if (jobType === "upload") {
      t = "Empfang von Dateien";
    } else if (jobType === "download") {
      t = "Senden von Dateien ";
    }

    setTitle(t);
  }, [jobType, setTitle]);

  useEffect(() => {
    if (!jobName) {
      return setDisabled(true);
    }
    setDisabled(false);
  }, [jobType, jobName, setDisabled]);

  if (!jobType) {
    return null;
  }

  if (progress === true) {
    return <Progress message={`${title} wird erstellt`} />;
  } else if (link) {
    return <DisplayLink link={link} onClose={() => resetJobData()} />;
  }

  return (
    <Tile>
      <PageHeader title={`${title} einrichten`} />
      <div className="py-2">
        <label>Auftrag</label>
        <input
          type="text"
          placeholder="Name des Auftrages"
          className="w-full"
          value={jobName}
          onChange={(e) => setJobName(e.target.value)}
        />
        <div className="text-xs">
          Dieser Name wird in der Übersicht angezeigt.
        </div>
      </div>
      <div className="py-2">
        <label>Ablauf</label>
        <select
          value={expires}
          onChange={(e) => {
            const exp = Number(e.target.value);
            if (isNaN(exp) || !expireTimes.includes(exp)) {
              return;
            }
            setExpires(exp);
          }}>
          {expireTimes.map((t) => (
            <option value={t} key={t}>
              {t} Stunden
            </option>
          ))}
        </select>
        <div className="text-xs">
          Der Zeitraum, wie lange der Link gültigkeit haben soll
        </div>
      </div>
      <div className="py-2 text-right">
        <button disabled={disabled} onClick={onClick}>
          Erstellen
        </button>
      </div>
    </Tile>
  );
};
