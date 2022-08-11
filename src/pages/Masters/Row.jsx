import React from "react";
import { Button } from "components/atoms";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const Row = (props) => {
  const { data } = props;
  const onDelete = (eventData) => {
    if (props.onDelete) props.onDelete(eventData);
  };

  const onEdit = (eventData) => {
    if (props.onEdit) props.onEdit(eventData);
  };

  const onView = (eventData) => {
    if (props.onView) props.onView(eventData);
  };

  return (
    <tr>
      <td>{props.order}</td>
      <td>{data.name}</td>
      <td>{data.whatsapp}</td>
      <td>
        <Button
          type="button"
          className="mr-3"
          color="red"
          radius="xs"
          tooltipMessage="HAPUS"
          onClick={() => { onDelete(data); }}
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
          onClick={() => { onEdit(data); }}
          sm
        >
          <i className="resitdc icon-edit"></i>
        </Button>
      </td>
    </tr>
  );
};

export default Row;
