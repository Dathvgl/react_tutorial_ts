import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "~/App";
import BannerHome from "./components/Banner";
import NewReleaseHome from "./components/NewRelease";
import FourItemHome from "./components/FourItem";
import { ResZingType } from "~/types";
import WeekChartHome from "./components/WeekChart";
import RTChartHome from "./components/RTChart";

type ResType = ResZingType & {
  data: DataType;
};

type DataType = {
  total: number;
  items: any[];
  hasMore: boolean;
};

function HomePage() {
  const [state, setState] = useState<any[]>([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const res = await axios.get(`${server}/zing/home`);
    const data: ResType = res.data;

    state.find((item) => {
      return item?.sectionId && item?.sectionType;
    });

    if (data.err == 0) setState(() => data.data.items);
  }

  return (
    <>
      <BannerHome
        data={state.find((item) => {
          return item?.sectionId == "hSlider" && item?.sectionType == "banner";
        })}
      />
      <NewReleaseHome
        data={state.find((item) => {
          return item?.sectionType == "new-release";
        })}
      />
      <FourItemHome
        data={state.find((item) => {
          return (
            item?.sectionId == "hEditorTheme2" &&
            item?.sectionType == "playlist"
          );
        })}
        row={1}
      />
      <FourItemHome
        data={state.find((item) => {
          return (
            item?.sectionId == "hEditorTheme" && item?.sectionType == "playlist"
          );
        })}
        row={1}
      />
      <RTChartHome
        data={state.find((item) => {
          return item?.sectionId == "hZC" && item?.sectionType == "RTChart";
        })}
      />
      <WeekChartHome
        data={state.find((item) => {
          return item?.sectionType == "weekChart";
        })}
      />
      <FourItemHome
        data={state.find((item) => {
          return (
            item?.sectionId == "hArtistTheme" && item?.sectionType == "playlist"
          );
        })}
        row={1}
      />
      <FourItemHome
        data={state.find((item) => {
          return item?.sectionId == "h100" && item?.sectionType == "playlist";
        })}
        row={1}
      />
      <FourItemHome
        data={state.find((item) => {
          return item?.sectionId == "hAlbum" && item?.sectionType == "playlist";
        })}
        row={1}
      />
    </>
  );
}

export default HomePage;
