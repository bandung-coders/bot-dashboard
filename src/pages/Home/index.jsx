import React, { useState, useEffect } from "react";
import { MainBody } from "components/templates";
import axios from "services/axios";
import { BoxInfo } from "components/molecules";
import { getBotLocalData } from "utils/helpers";
const backendHost = process.env.REACT_APP_API;

const Home = () => {
  const [features, setFeatures] = useState([]);
  const [botId, setBotId] = useState("");

  useEffect(() => {
    getUpcomingFeatures();
    setBotId(getBotLocalData());
  }, []);

  const getUpcomingFeatures = async () => {
    try {
      const response = await axios("/upcoming");
      if (response.data.success) {
        setFeatures(response.data.results.data);
      }
    } catch (error) {
      console.log("ERROR ===>", error);
    }
  };

  return (
    <MainBody>
      <h1>Home Page</h1>
      <div className="mt-10">
        <div className="row">
          <div className="col-6 col-mobile-12">
            <div className="">
              <BoxInfo title="PERINGATAN PENTING" color="red">
                <h2>System ini hanya didesain untuk 8 whatsapp session.</h2>
                <br />
                <h2>Ada bug ketika disconnect whatsapp, so kalo udah connect jangan pernah coba coba di disconnect</h2>
                <hr />
                <p>System ini masih belum diuji sepenuhnya secara Alpha, perlu pengujian tingkat Beta lalu Production</p>
              </BoxInfo>
            </div>
            <div className="mt-5">
              <h2>Cara pake aplikasi ini :</h2>
              <ol className="normal">
                <li>ucap Restu Ganteng</li>
                <li>siapkan HP dan Whatsapp</li>
                <li>buka whatsapp dan klik menu <b>Linked Device</b></li>
                <li>Scan barcode dibawah</li>
                <li>Refresh halaman ini ( F5 ) jika Whatsapp tidak mau terhubung</li>
                <li>Jika sudah terhubung image akan berubah menjadi CONNECTED</li>
              </ol>
              <h2 className="mt-15 mb-5">SCAN THIS BARCODE WITH YOUR WHATSAPP</h2>
              <div className="whatsapp-barcode">
                <div className="whatsapp-barcode-body mt-2">
                  <img
                    src={backendHost + "/wa/barcode/" + botId + "?type=image"}
                    className="width-full" alt="WHATSAPP BARCODE"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-mobile-12">
            <h2>Fitur yang akan datang :</h2>
            {
              features.length > 0
                ? <ol className="normal">
                  {
                    features.map((item, index) => {
                      return <li key={index}>{item.name}</li>;
                    })
                  }
                </ol>
                : <h3 className="mt-5"><i>KOSONG</i></h3>
            }
          </div>
        </div>
      </div>
    </MainBody>
  );
};

export default Home;
