import axios from "axios";
import React, { FunctionComponent, useEffect, useState } from "react";
import { ReactNode } from "react";
import { JSX } from "react/jsx-runtime";

export function Meraki() {
  const [devices, setDevices] = useState<DeviceProps[]>();
  const [tables, setTables] = useState<F[]>();
  const [downSpeed, setDownSpeed] = useState<Speed[] | undefined>();
  const [upSpeed, setUpSpeed] = useState<Speed[]>();

  const f = { name: "", address: "", model: "", serial: "", url: "" };
  useEffect(() => {
    axios.get("http://localhost:5000/api/meraki").then((res) => {
      //  console.log(res);

      var array: DeviceProps[] = [];

      //grab Statues

      var k;

      axios.get("http://localhost:5000/api/meraki_status").then((res1) => {
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

          array.push({
            name: locationName,
            address: f.address,
            model: f.model.split("-")[0],
            serial: f.serial,
            url: f.url,
            office: splits[0],
            status: res1.data[index].status,
            downStreamSpeed: "",
            upStreamSpeed: "",
            percentLost: "",
          });
        });

        //unique models
        const uniqueTags = new Set(array.map((e) => e.model));
        var segments: F[] = [];

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

        let set = new Set();

        array.forEach((ele) => {
          if (set.has(ele.office)) {
            segments[segments.length - 1].devices.push(ele);
            return;
          }
          segments.push({
            priority: 0,
            devices: [],
          });
          segments[segments.length - 1].devices.push(ele);
          set.add(ele.office);
        });

        let tempArray = array;
        setTables(segments);
        setDevices(array);
      });
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/meraki_speed").then((res) => {
      console.log(res.data);
    });
  }, []);
  // useEffect(() => {
  //   axios.get("http://localhost:5000/api/meraki_speed").then((res) => {
  //     console.log(res.data);

  //     res.data.forEach((element: any) => {
  //       if (
  //         downSpeed?.find((e) => e.deviceSerial === element.device.serial) !==
  //         undefined
  //       ) {
  //       } else {
  //         let l: Speed[] = [];
  //         l.push({
  //           deviceSerial: element.device.serial,
  //           reportedSpeed: [element.downstream.total],
  //         });
  //         setDownSpeed((z) => [z, ...l]);
  //         console.log(element.device.serial);
  //       }
  //     });
  //   });
  // }, []);

  return (
    <>
      <h1>Meraki</h1>
      <button onClick={ButtonClick}>Click</button>
      <table>
        <tr>
          <th>Location</th>
          <th>Name</th>
          <th>Model</th>
          <th>Serial</th>
          <th>Status</th>
          <th>Down</th>
          <th>Up</th>
          <th>Loss</th>
          {/* <th>URL</th> */}
        </tr>
        {/* {devices?.map((r, key) => {
          return (
            <>
              <DeviceEntry {...r} key={key}></DeviceEntry>
            </>
          );
        })} */}
        {tables?.map((r, key) => {
          return (
            <>
              <DeviceSegment {...r} key={key}></DeviceSegment>
            </>
          );
        })}
      </table>
    </>
  );
}

const DeviceSegment: React.FC<F> = (F) => {
  // const [boundEntries, setBoundEntries] = useState(F);

  // setBoundEntries(F);

  return (
    <>
      <tr>Parent</tr>
      {F.devices.map((ele) => {
        return <DeviceEntry {...ele}></DeviceEntry>;
      })}
    </>
  );
};

// <DeviceSegment
// f={r}
// reportedSpeed={downSpeed?.at(0)}
// key={key}
// ></DeviceSegment>
// const DeviceSegment: React.FC<any> = (
//   { f }: F,
//   { reportedSpeed }: Speed | undefined
// ) => {
//   // const [boundEntries, setBoundEntries] = useState(F);

//   // setBoundEntries(F);

//   //console.log(F.props[0]);
//   console.log(f.devices);
//   if (f === undefined) return <h1>error</h1>;
//   return (
//     <>
//       <tr>Parent</tr>
//       {f.devices.map((ele: JSX.IntrinsicAttributes & DeviceProps) => {
//         if (reportedSpeed !== undefined) {
//           ele.downStreamSpeed = 90;
//         }
//         return <DeviceEntry {...ele}></DeviceEntry>;
//       })}
//     </>
//   );
// };

// function DeviceSegment() {
//   const [f, sf] = useState();
//   let K = 0;
// }

interface F {
  priority: number;
  devices: DeviceProps[];
}

interface DeviceProps {
  name: string;
  address: string;
  model: string;
  serial: string;
  url: string;
  office: string;
  status: string;

  downStreamSpeed: string;
  upStreamSpeed: string;
  percentLost: string;
}

interface Speed {
  deviceSerial: string;
  reportedSpeed: number[];
}

const DeviceEntry: React.FC<DeviceProps> = (DeviceProps, key) => {
  return (
    <tr key={key}>
      <td>{DeviceProps.office}</td>
      <td onClick={() => window.open(DeviceProps.url, "_blank")}>
        {DeviceProps.name}
      </td>
      <td>{DeviceProps.model}</td>
      <td>{DeviceProps.serial}</td>
      <td>{DeviceProps.status}</td>
      <td>{DeviceProps.downStreamSpeed}</td>
      <td>{DeviceProps.upStreamSpeed}</td>
      <td>{DeviceProps.percentLost}</td>
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

function CountData(data: any[], key: string | number) {
  if (data === null || data.length == 0) return undefined;

  return data.reduce((result: any[], current) => {
    if (!result[current[key]]) {
      result[current[key]] = 1;
    } else {
      result[current[key]] += 1;
    }
    return result;
  }, {});
}

export default Meraki;
