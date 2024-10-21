import axios from "axios";
import React, { FunctionComponent, useEffect, useState } from "react";
import { ReactNode } from "react";

export function Meraki() {
  const [devices, setDevices] = useState<DeviceProps[]>();
  const [tables, setTables] = useState(Array(DeviceSegment));
  const f = { name: "", address: "", model: "", serial: "", url: "" };
  useEffect(() => {
    axios.get("http://localhost:5000/api/meraki").then((res) => {
      //  console.log(res);

      var array: DeviceProps[] = [];

      //grab Statues

      var k;

      axios.get("http://localhost:5000/api/status").then((res1) => {
        k = res1.data;

        Object.values(res.data).forEach((element, index) => {
          // console.log(element);
          var f = element as DeviceProps;
          var locationName = "";
          var splits = f.name.split("-");

          for (let i = 1; i < splits.length; i++) {
            locationName += splits[i];

            if (i + 1 < splits.length) locationName += "-";
          }
          if (locationName !== "") {
            array.push({
              name: locationName,
              address: f.address,
              model: f.model.split("-")[0],
              serial: f.serial,
              url: f.url,
              office: splits[0],
              status: res1.data[index].status,
            });
          }
        });

        //unique models
        const uniqueTags = new Set(array.map((e) => e.model));

        array = array.sort((a, b) => {
          if (b.office !== a.office) {
            return b.office.localeCompare(a.office);
          } else if (b.status === "dormant") {
            return -1;
          } else if (a.status === "dormant") {
            return 1;
          }
          return a.status.localeCompare(b.status);
        });

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
          <th>Model</th>
          <th>Status</th>
          {/* <th>URL</th> */}
        </tr>
        {devices?.map((r, key) => {
          return (
            <>
              <DeviceEntry {...r} key={key}></DeviceEntry>
            </>
          );
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

const DeviceSegment = () => {
  const [boundEntries, setBoundEntries] = useState(Array(DeviceEntry));
  return (
    <>
      <h1>Parent</h1>
      {boundEntries}
    </>
  );
};

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
      <td onClick={() => window.open(DeviceProps.url, "_blank")}>
        {DeviceProps.name}
      </td>
      <td>{DeviceProps.model}</td>
      <td>{DeviceProps.status}</td>
      {/* <td onClick={() => window.open(DeviceProps.url, "_blank")}>
        {DeviceProps.url}
      </td> */}
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
