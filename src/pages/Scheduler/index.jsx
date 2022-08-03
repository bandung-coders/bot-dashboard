import React from "react";
import { MainBody } from "components/templates";
import { BoxInfo } from "components/molecules";
import { Button } from "components/atoms";
import Row from "./Row";

const data = [
  {
    message: "TESTING 123",
    schedule: "12 April 2023",
  },
  {
    message: "TESTING 1",
    schedule: "13 April 2023",
  },
  {
    message: "TESTING 9999",
    schedule: "14 April 2023",
  },
];

const Scheduler = () => {
  return (
    <MainBody>
      <h1>Scheduler PAGE</h1>
      <div className="mt-10">
        <div className="row">
          <div className="col-6">
            <Button type="button" color="black" radius="xs" href="/scheduler/add" md>
              TAMBAH SCHEDULER
            </Button>
          </div>
          <div className="col-6">

          </div>
        </div>
        <table className="resit-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Message</th>
              <th>Schedule</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, index) => {
                return (
                  <Row
                    key={index}
                    order={index + 1}
                    message={item.message}
                    schedule={item.schedule}
                  />
                );
              })
            }
          </tbody>
        </table>
      </div>
    </MainBody>
  );
};

export default Scheduler;
