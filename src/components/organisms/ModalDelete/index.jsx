import React, { useState } from "react";
import { Modal } from "components/molecules";
import { Button } from "components/atoms";
import axios from "services/axios";

const ModalDelete = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { api, id, show } = props;

  const onCloseHandler = () => {
    if (props.onClose) props.onClose();
  };

  const deleteData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(api);
      if (response.data.success) {
        if (props.onDeleted) props.onDeleted();
      }
    } catch (error) {
      setErrorMessage("ERROR WHEN DELETE, TRY TO CONTACT RESTU");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} radius="md" size="md" onClose={onCloseHandler}>
      <div className="px-10 py-15">
        {
          errorMessage
            ? <h2 className="text-center" style={{ color: "var(--color-red-1)" }}>
              { errorMessage }
            </h2>
            : <>
              <h2 className="text-center">Kamu yakin ingin menghapus data ini ?</h2>
              {
                props.info &&
                <div className="mt-5 mb-2 text-center">
                  {props.info}
                </div>
              }
              <div className="text-center mt-10">
                <Button
                  type="button"
                  color="gray"
                  className="mr-4"
                  onClick={onCloseHandler}
                  disabled={isLoading}
                >
                  TIDAK
                </Button>
                <Button
                  type="button"
                  color="red"
                  loading={isLoading}
                  onClick={() => { deleteData(); }}
                >
                  IYA
                </Button>
              </div>
            </>
        }
      </div>
    </Modal>
  );
};

export default ModalDelete;
