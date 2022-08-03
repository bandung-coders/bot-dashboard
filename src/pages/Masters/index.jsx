import React from "react";
import { MainBody } from "components/templates";

const Masters = () => {
  return (
    <MainBody>
      <h1>Masters Data</h1>
      <div className="mt-10">
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

export default Masters;
