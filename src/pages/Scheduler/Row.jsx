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
      <td>
        {
          data.destination &&
          data.destination.length > 0 &&
          <ol className="normal">
            {
              data.destination.map((item, index) => {
                return (
                  <li key={index}>{item.no} - <b>{item.name}</b></li>
                );
              })
            }
          </ol>
        }
      </td>
      <td>
        {
          data.schedule &&
          dayjs(data.schedule).format("dddd, DD MMM YYYY - HH:mm:ss")
        }
      </td>
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
        {/* <Button
          type="button"
          className="mr-3"
          color="green"
          radius="xs"
          tooltipMessage="UBAH"
          onClick={() => { onEdit(data); }}
          sm
        >
          <i className="resitdc icon-edit"></i>
        </Button> */}
        <Button
          type="button"
          color="blue"
          radius="xs"
          tooltipMessage="DETAIL"
          onClick={() => { onView(data); }}
          sm
        >
          <i className="resitdc icon-eye"></i>
        </Button>
      </td>
    </tr>
  );
};

export default Row;
