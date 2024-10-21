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

      //grab Statues

      var k;

      axios.get("http://localhost:5000/api/status").then((res1) => {
        k = res1.data;
        console.log(k[1]);
        Object.values(res.data).forEach((element, index) => {
          // console.log(element);
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
            model: f.model.split("-")[0],
            serial: f.serial,
            url: f.url,
            office: splits[0],
            status: res1.data[index].status,
          });
        });

        //unique models
        const uniqueTags = [new Set(array.map((e) => e.model))];
        console.log(uniqueTags);

        let l = { key: "", value: "" };

        let f = Array({ key: "", value: "" });

        for (let i = 0; i < array.length; i++) {}

        setDevices(array);
      });
    });
  }, []);

  return (
    <>
      <h1>Meraki</h1>
      <button onClick={ButtonClick}>Click</button>
      <table>
        <tr>
          <th>Location</th>
          <th>Name</th>
          <th>Other</th>
        </tr>
        {devices?.map((r, key) => {
          return <DeviceEntry {...r} key={key}></DeviceEntry>;
        })}
      </table>
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
  status: string;
}

const DeviceEntry: React.FC<DeviceProps> = (DeviceProps, key) => {
  return (
    <tr key={key}>
      <td>{DeviceProps.office}</td>
      <td>{DeviceProps.name}</td>
      <td>{DeviceProps.model}</td>
      <td>{DeviceProps.status}</td>
    </tr>
  );
};

function ButtonClick() {
  console.log("Logged");

  axios.get("http://localhost:5000/api/meraki").then((res) => {
    console.log(res);
  });
}

export default Meraki;
