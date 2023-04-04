import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { server } from "~/App";
import { AlbumAPIType, ResZingType } from "~/types";
import FourItemHome from "../home/components/FourItem";

type ResType = ResZingType & {
  data: Top100Type[];
};

type Top100Type = {
  genre: { name: "Nổi bật" };
  items: AlbumAPIType[];
  link: string;
  sectionId: string;
  sectionType: string;
  title: string;
  viewType: string;
};

function Top100Page() {
  const [item, setItem] = useState<Top100Type[] | null>(null);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const res = await axios.get(`${server}/zing/top100`);
    const data: ResType = res.data;

    if (data.err == 0) {
      setItem(() => data.data);
    }
  }

  if (!item) {
    return <></>;
  }

  return (
    <>
      {item.map((item, index) => (
        <Fragment key={index}>
          <FourItemHome data={{ title: item.genre.name, items: item.items }} />
        </Fragment>
      ))}
    </>
  );
}

export default Top100Page;
