import React from "react";
import { Button } from "components/atoms";

const Row = (props) => {
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

export default Row;
