import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "services/axios";
import { Button } from "components/atoms";

const Approval = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState({});
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getDataUser();
  }, []);

  const getDataUser = async () => {
    const userId = params.id;
    try {
      const response = await axios.get("auth/user/" + userId);
      setUser(response.data.results);
    } catch (error) {
      if (error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("SOMETHING WRONG");
      }
    }
  };

  const onApprove = async (status) => {
    const userId = params.id;
    const formData = {
      status,
      password,
    };
    setIsLoading(true);
    try {
      const response = await axios.patch(`auth/approve/${userId}`, formData);
      if (response.data.success) {
        navigate("/login");
        alert(response.data.message);
      }
    } catch (error) {
      if (error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("SOMETHING WRONG");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute-center width-full height-full">
      <div className="box-checkin">
        <div className="d-flex align-y-center">
          <svg width={156 / 4} height={111 / 4} viewBox="0 0 130 93" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M81 25L43 92.5H27L0 46L27 0H42.5L16 46L34.5 79.5L65.5 25H81Z" fill="#19F8FF"></path>
            <path d="M50 14L57.5 0H102.5L129.5 46L102.5 92.5H87.5L72.5 67L80 54L95 79.5L114 46L95 14H50Z" fill="white"></path>
          </svg>
          <h4 className="ml-2" style={{ color: "var(--color-white)" }}>RESITDC</h4>
        </div>
        {
          user.isActive
            ? <div className="checkin-title text-center mt-13 mb-10">
              <h1>
                { user.name || "This user"} has been Approved.
              </h1>
            </div>
            : <>
              <div className="checkin-title text-center mt-13">
                <h1>
                  Approval for { user.name || "user" }
                </h1>
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  className="form-input dark text-center"
                  placeholder="PASSWORD"
                  onChange={(e) => { setPassword(e.target.value); }}
                  disabled={isLoading}
                />
              </div>
              <div className="row mt-8">
                <div className="col-6">
                  <Button
                    type="button"
                    color="primary"
                    radius="xl"
                    full
                    md
                    className="py-2"
                    loading={isLoading}
                    onClick={() => {
                      onApprove("approved");
                    }}
                  >
                  ACCEPT
                  </Button>
                </div>
                <div className="col-6">
                  <Button
                    type="button"
                    color="red"
                    radius="xl"
                    full
                    md
                    className="py-2"
                    loading={isLoading}
                    onClick={() => {
                      onApprove("rejected");
                    }}
                  >
                  REJECT
                  </Button>
                </div>
              </div>
            </>
        }
      </div>
    </div>
  );
};

export default Approval;
