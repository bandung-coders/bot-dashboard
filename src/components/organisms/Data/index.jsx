import React, { useState, useEffect } from "react";
import { Button } from "components/atoms";

const Row = (props) => {
  const { data } = props;

  const onDelete = () => {
    if (props.onDelete) props.onDelete();
  };

  const onEdit = () => {
    if (props.onEdit) props.onEdit();
  };

  const onView = () => {
    if (props.onView) props.onView();
  };

  return (
    <tr>
      <td>{props.order}</td>
      <td>{props.message}</td>
      <td>{props.schedule}</td>
      <td>
        <Button
          type="button"
          className="mr-3"
          color="red"
          radius="xs"
          tooltipMessage="HAPUS"
          onClick={onDelete}
          sm
        >
          <i className="resitdc icon-trash-2"></i>
        </Button>
        <Button
          type="button"
          className="mr-3"
          color="green"
          radius="xs"
          tooltipMessage="UBAH"
          onClick={onEdit}
          sm
        >
          <i className="resitdc icon-edit"></i>
        </Button>
        <Button
          type="button"
          color="blue"
          radius="xs"
          tooltipMessage="DETAIL"
          onClick={onView}
          sm
        >
          <i className="resitdc icon-eye"></i>
        </Button>
      </td>
    </tr>
  );
};

const Data = (props) => {
  const { create, read, update, detail, search, api } = props;
  const [listData, seListData] = useState([]);
  const className = [props.className];

  // useEffect(() => {
  //   loadFirst();
  // }, []);

  return (
    <div className={className.join(" ")}>
      {props.children}
      <table className="resit-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Message</th>
            <th>Schedule</th>
            {
              (update || detail || props.delete) &&
              <th>Actions</th>
            }
          </tr>
        </thead>
        <tbody>
          {
            listData.length > 0
              ? listData.map((item, index) => {
                return (
                  <Row
                    key={index}
                    order={index + 1}
                    data={item}

                  />
                );
              })
              : <tr><td colSpan="4">NO DATA</td></tr>
          }
        </tbody>
      </table>
    </div>
  );
};

export default Data;
