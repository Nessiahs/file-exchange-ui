import { RouteComponentProps } from "@reach/router";

export const Expired: React.FunctionComponent<RouteComponentProps> = () => {
  return (
    <div className="container mx-auto">
      <div className="text-xl text-center font-bold">
        Der Link ist abgelaufen!
      </div>
      <div>
        <div className="w-80 mx-auto mt-2">
          <p>Das kann folgende gründe haben:</p>
          <ul>
            <li>Er war Zeitlich begrenzt</li>
            <li>Der Upload wurde bereits abgeschlossen</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
