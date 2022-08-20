import React, { useState, useEffect } from "react";
import { MainBody } from "components/templates";
import { BoxInfo } from "components/molecules";
import { Button } from "components/atoms";

const SchedulerAdd = () => {
  const onSubmit = () => {

  };

  return (
    <MainBody>
      <h1>Add Schedule</h1>
      <div className="mt-10">
        <BoxInfo title="PERINGATAN PENTING" color="red">
          Untuk saat ini scheduler dibatasi hanya sampai 13 orang / whatsapp sampai fitur Interval Scheduler beres, aturan ini untuk menghindari pemblokiran dari whatsapp, terimakasih.
          <br />
          <br />
          <b>#udahPercayaAjaSamaRestu</b>
        </BoxInfo>
      </div>
      <div className="mt-10">
        <form onSubmit={onSubmit}>
          <Button type="submit" color="black" md>SAVE</Button>
        </form>
      </div>
    </MainBody>
  );
};

export default SchedulerAdd;
