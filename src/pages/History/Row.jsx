import React from "react";
import { Button } from "components/atoms";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const Row = (props) => {
  const { data } = props;
  const onView = (eventData) => {
    if (props.onView) props.onView(eventData);
  };

  return (
    <tr>
      <td>{props.order}</td>
      <td dangerouslySetInnerHTML={{ __html: data.name }}></td>
      <td>{ data.type }</td>
      <td>{ data.is_success ? "BERHASIL" : "GAGAL" }</td>
      <td>
        {
          data.created_at &&
          dayjs(data.created_at).format("dddd, DD MMM YYYY - HH:mm:ss")
        }
      </td>
      <td>
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
