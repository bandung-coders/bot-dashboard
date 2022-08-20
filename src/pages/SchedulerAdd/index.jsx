import React, { useState, useEffect } from "react";
import { MainBody } from "components/templates";
import { BoxInfo } from "components/molecules";
import { Button } from "components/atoms";
import readXlsxFile from "read-excel-file";

const SchedulerAdd = () => {
  const [date, setDate] = useState("");
  const [destination, setDestination] = useState([]);
  const [message, setMessage] = useState("");

  const onSubmit = () => {

  };

  const onSelectExcel = (e) => {
    const file = e.target.files[0];
    if (file) {
      const list = [];
      readXlsxFile(file).then((rows) => {
        if (rows) {
          if (rows.length > 1) {
            rows.forEach((item, index) => {
              if (index > 0) {
                if (item[1]) {
                  list.push({
                    no: item[1],
                    name: item[0] || "kak",
                  });
                }
              }
            });
            setDestination(list);
          } else {
            setDestination([]);
          }
        } else {
          setDestination([]);
        }
      });
    }
  };

  return (
    <MainBody>
      <h1>Add Schedule</h1>
      <div className="mt-10">
        <BoxInfo title="PERINGATAN PENTING" color="red">
          Untuk saat ini scheduler dibatasi hanya sampai 13 orang / whatsapp sampai fitur Interval Scheduler beres, aturan ini untuk menghindari pemblokiran dari whatsapp, terimakasih.
          <br />
          <br />
          <b>#percayaAjaSamaRestu</b>
        </BoxInfo>
      </div>
      <div className="mt-10">
        <form onSubmit={onSubmit}>
          <input
            type="datetime-local"
            className="form-input"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <div className="width-full mt-5">
            <div className="form-excel">
              <input
                type="file"
                className="form-excel-input"
                accept=".xlsx"
                onChange={onSelectExcel}
              />
              <div className="form-excel-title">
                PILIH FILE EXCEL
              </div>
            </div>
          </div>
          <textarea
            className="form-input mt-5"
            rows="10"
            placeholder="Message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></textarea>
          <div className="mt-5 text-center">
            <Button type="submit" color="black" full md>SAVE</Button>
          </div>
        </form>
      </div>
    </MainBody>
  );
};

export default SchedulerAdd;
