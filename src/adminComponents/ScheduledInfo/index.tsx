import { TJobState } from "../../hooks/adminContext/useAdminJobState";
import { getFormattedTimeByZone } from "../../utils/dateUtils";

type TSheduledInfoProps = {
  name: string;
} & TJobState;

export const SheduledInfo: React.FunctionComponent<TSheduledInfoProps> = ({
  name,
  state,
  lastExecute,
  executed,
  failCount,
}) => {
  return (
    <div>
      <div className="font-bold text-sm">{name}</div>
      <div className="p-1 text-xs divide-y divide-black">
        <div className="flex justify-between">
          <div> Zuletzt ausgeführt:</div> {getFormattedTimeByZone(lastExecute)}
        </div>
        <div className="flex justify-between">
          <div>Gesamt ausgeführt</div> {executed}
        </div>
        <div className="flex justify-between">
          <div>Fehlerhaft</div> {failCount}
        </div>
      </div>
    </div>
  );
};
