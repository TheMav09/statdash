import axios from "axios";
import React, { FunctionComponent, useEffect, useState } from "react";
import { ReactNode } from "react";

export function Meraki() {
  const [devices, setDevices] = useState<DeviceProps[]>();

  const f = { name: "", address: "", model: "", serial: "", url: "" };
  useEffect(() => {
    axios.get("http://localhost:5000/api/meraki").then((res) => {
      //  console.log(res);

      var array: DeviceProps[] = [];
      Object.values(res.data).forEach((element) => {
        console.log(element);
        var f = element as DeviceProps;
        var fName = "";
        var splits = f.name.split("-");

        for (let i = 1; i < splits.length; i++) {
          fName += splits[i];

          if (i + 1 < splits.length) fName += "-";
        }

        array.push({
          name: fName,
          address: f.address,
          model: f.model,
          serial: f.serial,
          url: f.url,
          office: splits[0],
        });
      });

      setDevices(array);
    });
  }, []);

  return (
    <>
      <h1>Meraki</h1>
      <button onClick={ButtonClick}>Click</button>
      <h1>I hate it here</h1>
      <ol>
        {devices?.map((r) => {
          return <DeviceEntry {...r}></DeviceEntry>;
        })}
      </ol>
    </>
  );
}

//
// class DeviceEntry extends React.Component {
//   render(): ReactNode {
//     return <h1>Test</h1>;
//   }
// }

interface DeviceProps {
  name: string;
  address: string;
  model: string;
  serial: string;
  url: string;
  office: string;
}

const DeviceEntry: React.FC<DeviceProps> = (DeviceProps) => {
  return (
    <h1>
      {DeviceProps.office}-{DeviceProps.name}
    </h1>
  );
};

function ButtonClick() {
  console.log("Logged");

  axios.get("http://localhost:5000/api/meraki").then((res) => {
    console.log(res);
  });
}

export default Meraki;
