import React from "react";
import { MainBody } from "components/templates";
import { BoxInfo } from "components/molecules";
import { Button } from "components/atoms";

const Scheduler = () => {
  return (
    <MainBody>
      <h1>Scheduler PAGE</h1>
      <div className="mt-10">
        <div className="row">
          <div className="col-6">
            <Button type="button" color="black" radius="xs" href="/scheduler/add" md>TAMBAH SCHEDULER</Button>
          </div>
          <div className="col-6">

          </div>
        </div>
        <table className="resit-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Restu Dwi Cahyo</td>
              <td>
                <button>TEST</button>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Restu Dwi Cahyo</td>
              <td>
                <button>TEST</button>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Restu Dwi Cahyo</td>
              <td>
                <button>TEST</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </MainBody>
  );
};

export default Scheduler;
